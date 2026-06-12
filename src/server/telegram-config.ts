// Telegram bridge 的配置读取与轻量持久化。
//
// 配置来源：
//   - .env（经 scripts/start `set -a; . ./.env` 注入 process.env，或 main.ts 的
//     loadEnvFile 兜底）。
//   - ~/.codex/telegram-bridge.json：仅存见过的 chatId（用于重启上线通知）；
//     token / allowlist 永远走 .env，绝不落盘。
//
// 设计约束（见 project-context.md）：只用 `node:` 前缀 import，匹配 main.ts 风格。

import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const VALID_SANDBOX_MODES = [
  "read-only",
  "workspace-write",
  "danger-full-access",
] as const;

export type SandboxMode = (typeof VALID_SANDBOX_MODES)[number];

const DEFAULT_SANDBOX_MODE: SandboxMode = "danger-full-access";

export type TelegramSettings = {
  token: string;
  allowedUserIds: Set<number>;
  allowAllUsers: boolean;
  defaultCwd: string;
  sandboxMode: SandboxMode;
  memories: boolean;
  streaming: boolean;
};

/**
 * 读取 Telegram bridge 配置。未设置 TELEGRAM_BOT_TOKEN 时返回 null —— 该 token
 * 即功能总开关，缺失则桥接静默关闭。
 */
export function readTelegramSettings(): TelegramSettings | null {
  const token = (process.env.TELEGRAM_BOT_TOKEN ?? "").trim();
  if (!token) {
    return null;
  }

  const { allowedUserIds, allowAllUsers } = parseAllowedUserIds(
    process.env.TELEGRAM_ALLOWED_USER_IDS,
  );

  const defaultCwd =
    (process.env.TELEGRAM_DEFAULT_CWD ?? "").trim() || process.cwd();

  return {
    token,
    allowedUserIds,
    allowAllUsers,
    defaultCwd,
    sandboxMode: readSandboxMode(),
    memories: readMemories(),
    streaming: readStreaming(),
  };
}

function parseAllowedUserIds(raw: string | undefined): {
  allowedUserIds: Set<number>;
  allowAllUsers: boolean;
} {
  const tokens = (raw ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter((value) => value.length > 0);

  const allowAllUsers = tokens.includes("*");
  const allowedUserIds = new Set<number>();
  for (const value of tokens) {
    if (value === "*") {
      continue;
    }
    // Telegram user id 是正整数。只接受纯数字且在安全整数范围内的值，避免
    // 浮点/科学计数法/超 2^53 的 id 因 Number 精度损失导致鉴权误判。
    if (!/^\d+$/.test(value)) {
      console.warn(
        `[telegram] ignoring non-numeric user id "${value}" in TELEGRAM_ALLOWED_USER_IDS`,
      );
      continue;
    }
    const parsed = Number(value);
    if (Number.isSafeInteger(parsed)) {
      allowedUserIds.add(parsed);
    } else {
      console.warn(
        `[telegram] user id "${value}" exceeds safe integer range; ignoring`,
      );
    }
  }
  return { allowedUserIds, allowAllUsers };
}

function readSandboxMode(): SandboxMode {
  const raw = (process.env.TELEGRAM_SANDBOX_MODE ?? "").trim().toLowerCase();
  if (!raw) {
    return DEFAULT_SANDBOX_MODE;
  }
  if ((VALID_SANDBOX_MODES as readonly string[]).includes(raw)) {
    return raw as SandboxMode;
  }
  console.warn(
    `[telegram] invalid TELEGRAM_SANDBOX_MODE="${raw}"; ` +
      `falling back to "${DEFAULT_SANDBOX_MODE}". ` +
      `Valid values: ${VALID_SANDBOX_MODES.join(", ")}`,
  );
  return DEFAULT_SANDBOX_MODE;
}

// codex 记忆功能（features.memories）。默认开启，对齐参考项目 codex-mobile 的
// 行为；显式 false/0/no/off 才关闭。
function readMemories(): boolean {
  const raw = (process.env.TELEGRAM_MEMORIES ?? "").trim().toLowerCase();
  if (!raw) {
    return true;
  }
  return !["false", "0", "no", "off"].includes(raw);
}

// 流式输出（typing 状态 + 消息实时编辑）。默认开启；显式 false/0/no/off 关闭，
// 回退为 turn 完成后一次性发送。
function readStreaming(): boolean {
  const raw = (process.env.TELEGRAM_STREAMING ?? "").trim().toLowerCase();
  if (!raw) {
    return true;
  }
  return !["false", "0", "no", "off"].includes(raw);
}

// --- chatId 持久化 ----------------------------------------------------------

type BridgeState = { chatIds: number[] };

function codexHome(): string {
  return process.env.CODEX_HOME || path.join(os.homedir(), ".codex");
}

function bridgeStatePath(): string {
  return path.join(codexHome(), "telegram-bridge.json");
}

/** Telegram 收到的图片落地目录（CODEX_HOME/telegram-images）。 */
export function telegramImageDir(): string {
  return path.join(codexHome(), "telegram-images");
}

/** 读取持久化的 chatId 列表；文件缺失或损坏时返回空数组（永不抛）。 */
export function readKnownChatIds(): number[] {
  try {
    const raw = fs.readFileSync(bridgeStatePath(), "utf8");
    const parsed = JSON.parse(raw) as Partial<BridgeState> | null;
    if (parsed && Array.isArray(parsed.chatIds)) {
      return parsed.chatIds.filter(
        (value): value is number =>
          typeof value === "number" && Number.isFinite(value),
      );
    }
  } catch {
    // 文件不存在 / JSON 损坏 —— 当作空状态处理。
  }
  return [];
}

/** 记住一个 chatId（去重后写回）。失败仅告警，不影响主流程。 */
export function rememberChatId(chatId: number): void {
  try {
    const existing = readKnownChatIds();
    if (existing.includes(chatId)) {
      return;
    }
    existing.push(chatId);
    const target = bridgeStatePath();
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(
      target,
      `${JSON.stringify({ chatIds: existing } satisfies BridgeState, null, 2)}\n`,
      "utf8",
    );
  } catch (error) {
    console.warn(
      `[telegram] failed to persist chatId ${chatId}: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  }
}
