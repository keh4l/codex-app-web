// Telegram bot 桥接：用户在 Telegram 给 bot 发消息 → 进入一个 codex thread →
// turn 完成后把 assistant 回复发回 Telegram。
//
// 移植自 friuns2/codex-mobile 的 telegramThreadBridge.ts，去掉其 Vue/HTTP 配置耦合。
// 纯后端：原生 fetch 长轮询 getUpdates（非 webhook），零 telegram 库依赖；通过注入的
// AppServerLike 接口与 codex app-server（v2 thread API）通信。
//
// 设计约束（见 project-context.md）：只用 `node:` 前缀 import，匹配 main.ts 风格。

import { setTimeout as delay } from "node:timers/promises";
import {
  setTimeout as setTimer,
  clearTimeout as clearTimer,
} from "node:timers";
import type { AppServerLike, AppServerNotification } from "./app-server";

// --- Telegram 数据形状（仅声明用到的字段） ---------------------------------

type TelegramUser = { id?: number };
type TelegramChat = { id?: number };
type TelegramMessage = {
  message_id?: number;
  from?: TelegramUser;
  chat?: TelegramChat;
  text?: string;
};
type TelegramCallbackQuery = {
  id?: string;
  from?: TelegramUser;
  message?: TelegramMessage;
  data?: string;
};
type TelegramUpdate = {
  update_id?: number;
  message?: TelegramMessage;
  callback_query?: TelegramCallbackQuery;
};
type TelegramApiResponse = {
  ok?: boolean;
  result?: unknown;
  description?: string;
};

export type TelegramBridgeOptions = {
  token: string;
  allowedUserIds: Set<number>;
  allowAllUsers: boolean;
  defaultCwd: string;
  /** 仅用于 /status 展示。 */
  sandboxMode: string;
  /** 重启上线通知用的已知 chatId。 */
  knownChatIds: number[];
  /** 见到新 chat 时回调（用于持久化）。 */
  onChatSeen?: (chatId: number) => void;
};

const TELEGRAM_MESSAGE_MAX_LENGTH = 3500;
const POLL_TIMEOUT_SECONDS = 45;
// 客户端 fetch 超时 = 服务端长轮询超时 + 余量；防 half-open 连接下 getUpdates
// 永久挂起导致 pollLoop 静默卡死（跨境网络已知痛点）。
const POLL_HTTP_TIMEOUT_MS = (POLL_TIMEOUT_SECONDS + 15) * 1000;
const POLL_ERROR_BACKOFF_MS = 1500;

const BOT_COMMANDS = [
  { command: "start", description: "快速开始 + thread 选择器" },
  { command: "threads", description: "列出最近 thread 以连接" },
  { command: "newthread", description: "新建并连接一个 thread" },
  { command: "thread", description: "连接已有 thread：/thread <id>" },
  { command: "current", description: "显示当前连接的 thread" },
  { command: "history", description: "显示当前 thread 的近期历史" },
  { command: "status", description: "显示桥接与映射状态" },
  { command: "whoami", description: "显示你的 Telegram id" },
  { command: "help", description: "显示可用命令" },
];

// Node 18+ 提供全局 fetch；tsconfig `types: []` 下不引入其全局类型，故用结构化断言
// 包一层，零环境类型依赖、零声明冲突。
type FetchResponse = {
  ok: boolean;
  status: number;
  statusText: string;
  json(): Promise<unknown>;
};
type FetchInit = {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
  signal?: unknown;
};
const httpFetch = (
  globalThis as unknown as {
    fetch: (input: string, init?: FetchInit) => Promise<FetchResponse>;
  }
).fetch;
// AbortController 同理用结构化断言取全局，避免依赖环境类型（tsconfig types:[]）。
type AbortLike = { signal: unknown; abort: () => void };
const AbortControllerCtor = (
  globalThis as unknown as { AbortController: new () => AbortLike }
).AbortController;

export class TelegramBridge {
  private readonly token: string;
  private readonly allowedUserIds: Set<number>;
  private readonly allowAllUsers: boolean;
  private readonly defaultCwd: string;
  private readonly sandboxMode: string;
  private readonly onChatSeen: ((chatId: number) => void) | undefined;

  private nextUpdateOffset = 0;
  private running = false;
  private lastError: string | null = null;
  private unsubscribe: (() => void) | null = null;

  // chat ↔ thread 映射。
  private readonly threadIdByChatId = new Map<number, string>();
  private readonly chatIdsByThreadId = new Map<string, Set<number>>();
  // 按 threadId 去重已转发的 turn。
  private readonly lastForwardedTurnByThreadId = new Map<string, string>();
  // 按 threadId 记录上次转发的文本，turnId 缺失/重复通知时做内容级兜底去重。
  private readonly lastForwardedTextByThreadId = new Map<string, string>();
  // 重启上线通知用的已知 chatId。
  private readonly knownChatIds: number[];
  // 已触发过 onChatSeen 的 chat，避免重复持久化 IO。
  private readonly seenChatIds: Set<number>;

  constructor(
    private readonly appServer: AppServerLike,
    options: TelegramBridgeOptions,
  ) {
    this.token = options.token;
    this.allowedUserIds = options.allowedUserIds;
    this.allowAllUsers = options.allowAllUsers;
    this.defaultCwd = options.defaultCwd;
    this.sandboxMode = options.sandboxMode;
    this.onChatSeen = options.onChatSeen;
    this.knownChatIds = options.knownChatIds;
    this.seenChatIds = new Set(options.knownChatIds);
  }

  async start(): Promise<void> {
    this.unsubscribe = this.appServer.onNotification((notification) => {
      this.handleNotification(notification);
    });
    this.running = true;
    await this.setMyCommands();
    void this.pollLoop();
    await this.notifyOnlineForKnownChats();
  }

  stop(): void {
    this.running = false;
    this.unsubscribe?.();
    this.unsubscribe = null;
  }

  // --- 长轮询 ---------------------------------------------------------------

  private async pollLoop(): Promise<void> {
    while (this.running) {
      try {
        const updates = await this.getUpdates();
        for (const update of updates) {
          if (typeof update.update_id === "number") {
            this.nextUpdateOffset = update.update_id + 1;
          }
          try {
            await this.handleUpdate(update);
          } catch (error) {
            this.lastError = errText(error);
            console.error(`[telegram] handleUpdate error: ${this.lastError}`);
          }
        }
      } catch (error) {
        this.lastError = errText(error);
        console.error(`[telegram] poll error: ${this.lastError}`);
        await delay(POLL_ERROR_BACKOFF_MS);
      }
    }
  }

  private async getUpdates(): Promise<TelegramUpdate[]> {
    const result = await this.callTelegram(
      "getUpdates",
      {
        timeout: POLL_TIMEOUT_SECONDS,
        offset: this.nextUpdateOffset,
        allowed_updates: ["message", "callback_query"],
      },
      POLL_HTTP_TIMEOUT_MS,
    );
    return Array.isArray(result) ? (result as TelegramUpdate[]) : [];
  }

  // --- 更新分发 -------------------------------------------------------------

  private async handleUpdate(update: TelegramUpdate): Promise<void> {
    if (update.callback_query) {
      await this.handleCallbackQuery(update.callback_query);
      return;
    }
    if (update.message) {
      await this.handleMessage(update.message);
    }
  }

  private async handleMessage(message: TelegramMessage): Promise<void> {
    const chatId = message.chat?.id;
    const senderId = message.from?.id;
    if (typeof chatId !== "number") {
      return;
    }
    if (!this.isAllowedSender(senderId)) {
      await this.sendMessage(chatId, this.unauthorizedNotice(senderId));
      return;
    }
    this.noteChatSeen(chatId);

    const text = (message.text ?? "").trim();
    if (!text) {
      // 非文本消息（图片/语音/文件等）——给个明确反馈，避免用户以为 bot 掉线。
      await this.sendMessage(chatId, "暂仅支持文本消息。");
      return;
    }
    if (text.startsWith("/")) {
      await this.handleCommand(chatId, senderId, text);
    } else {
      await this.handleUserText(chatId, text);
    }
  }

  private async handleCallbackQuery(
    query: TelegramCallbackQuery,
  ): Promise<void> {
    const chatId = query.message?.chat?.id;
    const senderId = query.from?.id;
    // 先应答以消除 Telegram 端的按钮转圈。
    if (query.id) {
      try {
        await this.callTelegram("answerCallbackQuery", {
          callback_query_id: query.id,
        });
      } catch {
        // 应答失败无碍，继续处理。
      }
    }
    if (typeof chatId !== "number") {
      return;
    }
    if (!this.isAllowedSender(senderId)) {
      await this.sendMessage(chatId, this.unauthorizedNotice(senderId));
      return;
    }
    this.noteChatSeen(chatId);

    const data = query.data ?? "";
    if (data.startsWith("thread:")) {
      const threadId = data.slice("thread:".length).trim();
      if (threadId) {
        this.bindChatToThread(chatId, threadId);
        await this.sendMessage(chatId, `已连接 thread：\`${threadId}\``);
      }
    }
  }

  // --- 命令 -----------------------------------------------------------------

  private async handleCommand(
    chatId: number,
    senderId: number | undefined,
    text: string,
  ): Promise<void> {
    const [rawCommand, ...rest] = text.split(/\s+/);
    // 去掉群聊里的 @botname 后缀。
    const command = (rawCommand ?? "").split("@")[0]?.toLowerCase() ?? "";
    const argument = rest.join(" ").trim();

    switch (command) {
      case "/start":
        await this.sendMessage(chatId, this.helpText());
        await this.sendThreadPicker(chatId);
        break;
      case "/help":
      case "/":
        await this.sendMessage(chatId, this.helpText());
        break;
      case "/threads":
        await this.sendThreadPicker(chatId);
        break;
      case "/newthread":
        await this.createAndBindThread(chatId);
        break;
      case "/thread":
        if (!argument) {
          await this.sendMessage(chatId, "用法：`/thread <id>`");
        } else {
          this.bindChatToThread(chatId, argument);
          await this.sendMessage(chatId, `已连接 thread：\`${argument}\``);
        }
        break;
      case "/current": {
        const threadId = this.threadIdByChatId.get(chatId);
        await this.sendMessage(
          chatId,
          threadId
            ? `当前 thread：\`${threadId}\``
            : "尚未连接 thread。发任意消息会自动新建，或用 /threads 选择。",
        );
        break;
      }
      case "/history":
        await this.sendHistory(chatId);
        break;
      case "/status":
        await this.sendMessage(chatId, this.statusText(chatId));
        break;
      case "/whoami":
        await this.sendMessage(
          chatId,
          `user id：\`${senderId ?? "unknown"}\`\n` +
            `chat id：\`${chatId}\`\n` +
            `authorized：${this.isAllowedSender(senderId) ? "yes" : "no"}`,
        );
        break;
      default:
        await this.sendMessage(
          chatId,
          `未知命令 \`${command}\`。发送 /help 查看可用命令。`,
        );
    }
  }

  private async handleUserText(chatId: number, text: string): Promise<void> {
    let threadId = this.threadIdByChatId.get(chatId);
    try {
      if (!threadId) {
        threadId = await this.startThread();
        this.bindChatToThread(chatId, threadId);
      }
      await this.startTurn(threadId, text);
      // 不立即回复 —— 等 turn/completed 通知再回发 assistant 消息。
    } catch (error) {
      this.lastError = errText(error);
      await this.sendMessage(
        chatId,
        `⚠️ 发送失败：${errText(error)}\ncodex 后端可能已断开，请稍后重试。`,
      );
    }
  }

  /**
   * 在指定 thread 上跑一轮。turn/start 若因该 thread 未在当前 app-server 进程
   * 物化而报 "thread not found"（绑定了别进程 / 历史创建的 thread，或 app-server
   * 懒重启后内存态丢失），先 thread/resume 把它加载进当前进程，再重试一次。
   * 移植自 codex-mobile callRpcWithArchiveRecovery 的 turn/start 分支。
   */
  private async startTurn(threadId: string, text: string): Promise<void> {
    const params = { threadId, input: [{ type: "text", text }] };
    try {
      await this.appServer.rpc("turn/start", params);
    } catch (error) {
      if (!isThreadNotFoundError(error)) {
        throw error;
      }
      // thread 未物化：resume 加载进当前进程后重试一次。
      await this.appServer.rpc("thread/resume", { threadId });
      await this.appServer.rpc("turn/start", params);
    }
  }

  private async createAndBindThread(chatId: number): Promise<void> {
    try {
      const threadId = await this.startThread();
      this.bindChatToThread(chatId, threadId);
      await this.sendMessage(chatId, `已新建并连接 thread：\`${threadId}\``);
    } catch (error) {
      this.lastError = errText(error);
      await this.sendMessage(chatId, `⚠️ 新建 thread 失败：${errText(error)}`);
    }
  }

  private async startThread(): Promise<string> {
    const result = await this.appServer.rpc("thread/start", {
      cwd: this.defaultCwd,
    });
    const threadId = (result as { thread?: { id?: string } } | null)?.thread
      ?.id;
    if (typeof threadId !== "string" || !threadId) {
      throw new Error("thread/start 未返回 thread id");
    }
    return threadId;
  }

  private async sendThreadPicker(chatId: number): Promise<void> {
    let result: unknown;
    try {
      result = await this.appServer.rpc("thread/list", {
        archived: false,
        limit: 20,
        sortKey: "updated_at",
        modelProviders: [],
      });
    } catch (error) {
      await this.sendMessage(chatId, `⚠️ 获取 thread 列表失败：${errText(error)}`);
      return;
    }
    const items =
      (result as { data?: Array<Record<string, unknown>> } | null)?.data ?? [];
    const keyboard: Array<Array<{ text: string; callback_data: string }>> = [];
    for (const item of items) {
      const id = item["id"];
      if (typeof id !== "string" || !id) {
        continue;
      }
      const callbackData = `thread:${id}`;
      // Telegram callback_data 上限 64 字节；超限的 thread 跳过，避免整个 picker
      // 被 BUTTON_DATA_INVALID 打回。thread id 通常是 uuid，远不会触发。
      if (callbackData.length > 64) {
        continue;
      }
      const label =
        pickString(item["name"]) ||
        pickString(item["preview"]) ||
        pickString(item["cwd"]) ||
        id;
      keyboard.push([{ text: truncate(label, 60), callback_data: callbackData }]);
      if (keyboard.length >= 20) {
        break;
      }
    }
    if (keyboard.length === 0) {
      await this.sendMessage(
        chatId,
        "暂无历史 thread。发任意消息会自动新建，或用 /newthread。",
      );
      return;
    }
    try {
      await this.sendMessageRequest(chatId, "选择要连接的 thread：", {
        replyMarkup: { inline_keyboard: keyboard },
      });
    } catch (error) {
      this.lastError = errText(error);
      await this.sendMessage(chatId, `⚠️ 发送 thread 列表失败：${errText(error)}`);
    }
  }

  private async sendHistory(chatId: number): Promise<void> {
    const threadId = this.threadIdByChatId.get(chatId);
    if (!threadId) {
      await this.sendMessage(
        chatId,
        "尚未连接 thread。用 /threads 选择或发消息新建。",
      );
      return;
    }
    let turns: ThreadTurn[];
    try {
      turns = await this.readThreadTurns(threadId);
    } catch (error) {
      await this.sendMessage(chatId, `⚠️ 读取历史失败：${errText(error)}`);
      return;
    }
    const lines: string[] = [];
    for (const turn of turns) {
      for (const item of turn.items ?? []) {
        if (item.type === "userMessage" && item.text) {
          lines.push(`👤 ${item.text}`);
        } else if (item.type === "agentMessage" && item.text) {
          lines.push(`🤖 ${item.text}`);
        }
      }
    }
    if (lines.length === 0) {
      await this.sendMessage(chatId, "该 thread 暂无历史消息。");
      return;
    }
    const recent = lines.slice(-12).join("\n\n");
    await this.sendMessage(chatId, truncate(recent, 3800));
  }

  // --- turn/completed → 回发 assistant -------------------------------------

  private handleNotification(notification: AppServerNotification): void {
    if (notification.method !== "turn/completed") {
      return;
    }
    const params = notification.params as Record<string, unknown> | null;
    const threadId = extractThreadId(params);
    const turnId = extractTurnId(params);
    if (!threadId) {
      return;
    }
    const chatIds = this.chatIdsByThreadId.get(threadId);
    if (!chatIds || chatIds.size === 0) {
      return;
    }
    // 用 turnId 去重（同一 turn 可能被多次通知）。
    if (turnId) {
      if (this.lastForwardedTurnByThreadId.get(threadId) === turnId) {
        return;
      }
      this.lastForwardedTurnByThreadId.set(threadId, turnId);
    }
    void this.forwardLatestAssistantMessage(threadId, [...chatIds]);
  }

  private async forwardLatestAssistantMessage(
    threadId: string,
    chatIds: number[],
  ): Promise<void> {
    let reply: string | null;
    try {
      reply = await this.readLatestAssistantMessage(threadId);
    } catch (error) {
      this.lastError = errText(error);
      console.error(`[telegram] thread/read failed: ${this.lastError}`);
      return;
    }
    if (!reply) {
      return;
    }
    // 内容级兜底去重：turnId 缺失或同一回复被重复通知时，避免重复发送。
    if (this.lastForwardedTextByThreadId.get(threadId) === reply) {
      return;
    }
    this.lastForwardedTextByThreadId.set(threadId, reply);
    for (const chatId of chatIds) {
      await this.sendMessage(chatId, reply);
    }
  }

  private async readLatestAssistantMessage(
    threadId: string,
  ): Promise<string | null> {
    const turns = await this.readThreadTurns(threadId);
    for (let i = turns.length - 1; i >= 0; i--) {
      const items = turns[i]?.items ?? [];
      for (let j = items.length - 1; j >= 0; j--) {
        const item = items[j];
        if (item && item.type === "agentMessage" && item.text) {
          return item.text;
        }
      }
    }
    return null;
  }

  private async readThreadTurns(threadId: string): Promise<ThreadTurn[]> {
    const result = await this.appServer.rpc("thread/read", {
      threadId,
      includeTurns: true,
    });
    const turns = (result as { thread?: { turns?: unknown } } | null)?.thread
      ?.turns;
    return Array.isArray(turns) ? (turns as ThreadTurn[]) : [];
  }

  // --- 映射 -----------------------------------------------------------------

  private bindChatToThread(chatId: number, threadId: string): void {
    const previous = this.threadIdByChatId.get(chatId);
    if (previous && previous !== threadId) {
      const previousSet = this.chatIdsByThreadId.get(previous);
      previousSet?.delete(chatId);
      // set 空时清理 key，避免几个 Map 随 thread 数无界增长。
      if (previousSet && previousSet.size === 0) {
        this.chatIdsByThreadId.delete(previous);
        this.lastForwardedTurnByThreadId.delete(previous);
        this.lastForwardedTextByThreadId.delete(previous);
      }
    }
    this.threadIdByChatId.set(chatId, threadId);
    let set = this.chatIdsByThreadId.get(threadId);
    if (!set) {
      set = new Set<number>();
      this.chatIdsByThreadId.set(threadId, set);
    }
    set.add(chatId);
  }

  // --- 鉴权 -----------------------------------------------------------------

  private isAllowedSender(senderId: number | undefined): boolean {
    if (typeof senderId !== "number" || !Number.isSafeInteger(senderId)) {
      return false;
    }
    if (this.allowAllUsers) {
      return true;
    }
    return this.allowedUserIds.has(senderId);
  }

  private unauthorizedNotice(senderId: number | undefined): string {
    return (
      `🚫 未授权。你的 user id 是 \`${senderId ?? "unknown"}\`。\n` +
      `把它加入 .env 的 TELEGRAM_ALLOWED_USER_IDS 白名单后重试。`
    );
  }

  // --- 文案 -----------------------------------------------------------------

  private helpText(): string {
    return [
      "*codex-web Telegram bridge*",
      "",
      "直接发消息即可驱动一个 codex 会话；codex 跑完会把回复发回这里。",
      "",
      "/threads — 列出最近 thread 选择连接",
      "/newthread — 新建并连接 thread",
      "/thread <id> — 连接指定 thread",
      "/current — 当前连接的 thread",
      "/history — 当前 thread 近期历史",
      "/status — 桥接状态",
      "/whoami — 你的 Telegram id",
      "/help — 本帮助",
    ].join("\n");
  }

  private statusText(chatId: number): string {
    const currentThread = this.threadIdByChatId.get(chatId);
    const allowlist = this.allowAllUsers
      ? "`*`（所有人）"
      : `${this.allowedUserIds.size} 个 user id`;
    return [
      "*Telegram bridge 状态*",
      `运行中：${this.running ? "是" : "否"}`,
      `sandbox：\`${this.sandboxMode}\``,
      "审批策略：`never`",
      `活跃映射：${this.threadIdByChatId.size} 个 chat ↔ thread`,
      `allowlist：${allowlist}`,
      `当前 chat 绑定：${currentThread ? `\`${currentThread}\`` : "无"}`,
      `最近错误：${this.lastError ? this.lastError.slice(0, 300) : "无"}`,
    ].join("\n");
  }

  // --- chat 持久化触发 ------------------------------------------------------

  private noteChatSeen(chatId: number): void {
    if (this.seenChatIds.has(chatId)) {
      return;
    }
    this.seenChatIds.add(chatId);
    this.onChatSeen?.(chatId);
  }

  private async notifyOnlineForKnownChats(): Promise<void> {
    for (const chatId of this.knownChatIds) {
      try {
        await this.sendMessage(chatId, "✅ codex-web Telegram bridge 已上线。");
      } catch (error) {
        console.error(
          `[telegram] online notice failed for chat ${chatId}: ${errText(error)}`,
        );
      }
    }
  }

  // --- Telegram API ---------------------------------------------------------

  private apiUrl(method: string): string {
    return `https://api.telegram.org/bot${this.token}/${method}`;
  }

  private async callTelegram(
    method: string,
    payload: unknown,
    timeoutMs?: number,
  ): Promise<unknown> {
    const controller = timeoutMs ? new AbortControllerCtor() : null;
    let timer: ReturnType<typeof setTimer> | null = null;
    if (controller && timeoutMs) {
      timer = setTimer(() => controller.abort(), timeoutMs);
    }
    try {
      const response = await httpFetch(this.apiUrl(method), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller?.signal,
      });
      const data = (await response
        .json()
        .catch(() => null)) as TelegramApiResponse | null;
      if (!response.ok || !data || data.ok !== true) {
        const description = data?.description ?? response.statusText;
        throw new Error(`telegram ${method} failed: ${description}`);
      }
      return data.result ?? null;
    } finally {
      if (timer) {
        clearTimer(timer);
      }
    }
  }

  private async sendMessageRequest(
    chatId: number,
    text: string,
    options: { parseMode?: "HTML"; replyMarkup?: unknown } = {},
  ): Promise<void> {
    const payload: Record<string, unknown> = { chat_id: chatId, text };
    if (options.parseMode) {
      payload["parse_mode"] = options.parseMode;
    }
    if (options.replyMarkup) {
      payload["reply_markup"] = options.replyMarkup;
    }
    await this.callTelegram("sendMessage", payload);
  }

  /**
   * 把 markdown 文本发往 chat：先按 3500 字分片（防 HTML 渲染后切断标签），逐片
   * 渲染为 Telegram HTML 发送；HTML 失败则回退纯文本。
   */
  private async sendMessage(chatId: number, text: string): Promise<void> {
    const chunks = splitTelegramText(text);
    for (const chunk of chunks) {
      try {
        await this.sendMessageRequest(
          chatId,
          renderMarkdownToTelegramHtml(chunk),
          { parseMode: "HTML" },
        );
      } catch {
        try {
          await this.sendMessageRequest(chatId, chunk, {});
        } catch (error) {
          this.lastError = errText(error);
          console.error(
            `[telegram] sendMessage failed for chat ${chatId}: ${this.lastError}`,
          );
        }
      }
    }
  }

  private async setMyCommands(): Promise<void> {
    try {
      await this.callTelegram("setMyCommands", { commands: BOT_COMMANDS });
    } catch (error) {
      console.error(`[telegram] setMyCommands failed: ${errText(error)}`);
    }
  }
}

// --- thread/read item 形状 --------------------------------------------------

type ThreadItem = { type?: string; text?: string };
type ThreadTurn = { id?: string; items?: ThreadItem[] };

// --- 纯函数辅助 -------------------------------------------------------------

function extractThreadId(
  params: Record<string, unknown> | null,
): string | null {
  if (!params) {
    return null;
  }
  const direct = params["threadId"];
  if (typeof direct === "string" && direct) {
    return direct;
  }
  const turn = params["turn"] as { threadId?: unknown } | undefined;
  return typeof turn?.threadId === "string" && turn.threadId
    ? turn.threadId
    : null;
}

function extractTurnId(params: Record<string, unknown> | null): string | null {
  if (!params) {
    return null;
  }
  const direct = params["turnId"];
  if (typeof direct === "string" && direct) {
    return direct;
  }
  const turn = params["turn"] as { id?: unknown } | undefined;
  return typeof turn?.id === "string" && turn.id ? turn.id : null;
}

function pickString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function truncate(value: string, max: number): string {
  return value.length <= max ? value : `${value.slice(0, max - 1)}…`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * markdown → Telegram HTML（仅 <pre>/<code>/<b>/<i>/<a>，转义 & < >）。
 *
 * 占位符法：先把代码块 / 内联代码 / 链接抽成占位符（其内容已是构造好的安全 HTML，
 * 不再参与后续解析），再对剩余纯文本统一转义并处理粗体/斜体，最后回填。这样代码或
 * 链接内部的 `*`、`_`、`<` 等不会被误当作 markdown 标记二次解析（否则会向 <code>
 * 注入 <b>/<i> 导致 Telegram 拒绝非法嵌套标签）。
 */
function renderMarkdownToTelegramHtml(markdown: string): string {
  const placeholders: string[] = [];
  const stash = (html: string): string => {
    const token = `\u0000${placeholders.length}\u0000`;
    placeholders.push(html);
    return token;
  };

  let work = markdown.replace(/\r\n/g, "\n");

  // 围栏代码块 ```lang\n...```
  work = work.replace(
    /```([a-zA-Z0-9_+-]*)\n?([\s\S]*?)```/g,
    (_match, lang: string, code: string) => {
      const body = escapeHtml(code);
      return stash(
        lang
          ? `<pre><code class="language-${lang}">${body}</code></pre>`
          : `<pre>${body}</pre>`,
      );
    },
  );
  // 内联代码 `code`
  work = work.replace(/`([^`\n]+)`/g, (_match, code: string) =>
    stash(`<code>${escapeHtml(code)}</code>`),
  );
  // 链接 [text](url) —— url 走属性级转义（含 "）。
  work = work.replace(
    /\[([^\]\n]+)\]\((https?:\/\/[^\s)]+)\)/g,
    (_match, text: string, url: string) =>
      stash(`<a href="${escapeAttr(url)}">${escapeHtml(text)}</a>`),
  );

  // 剩余纯文本统一转义，再处理粗体/斜体（占位符 token 不含特殊字符，不受影响）。
  work = escapeHtml(work)
    .replace(/\*\*([^*\n]+)\*\*/g, (_match, text: string) => `<b>${text}</b>`)
    .replace(/__([^_\n]+)__/g, (_match, text: string) => `<b>${text}</b>`)
    .replace(
      /(?<!\*)\*([^*\n]+)\*(?!\*)/g,
      (_match, text: string) => `<i>${text}</i>`,
    )
    .replace(
      /(?<!_)_([^_\n]+)_(?!_)/g,
      (_match, text: string) => `<i>${text}</i>`,
    );

  // 回填占位符。
  return work.replace(
    /\u0000(\d+)\u0000/g,
    (_match, index: string) => placeholders[Number(index)] ?? "",
  );
}

function escapeAttr(value: string): string {
  return escapeHtml(value).replace(/"/g, "&quot;");
}

/**
 * 按 maxLength 分片。断点优先级：段落(\n\n) > 行(\n) > 词(空格) > 硬切；断点须
 * ≥ 50% maxLength，否则降级。作用于原始文本（渲染前），避免切断 HTML 标签。
 */
function splitTelegramText(
  text: string,
  maxLength = TELEGRAM_MESSAGE_MAX_LENGTH,
): string[] {
  const normalized = text.replace(/\r\n/g, "\n").trim();
  if (!normalized) {
    return [];
  }
  if (normalized.length <= maxLength) {
    return [normalized];
  }
  const chunks: string[] = [];
  const half = Math.floor(maxLength * 0.5);
  let remaining = normalized;
  while (remaining.length > maxLength) {
    let splitIndex = remaining.lastIndexOf("\n\n", maxLength);
    if (splitIndex < half) {
      splitIndex = remaining.lastIndexOf("\n", maxLength);
    }
    if (splitIndex < half) {
      splitIndex = remaining.lastIndexOf(" ", maxLength);
    }
    if (splitIndex <= 0) {
      splitIndex = maxLength;
    }
    const chunk = remaining.slice(0, splitIndex).trim();
    if (chunk) {
      chunks.push(chunk);
    }
    remaining = remaining.slice(splitIndex).trim();
  }
  if (remaining) {
    chunks.push(remaining);
  }
  return chunks;
}

function errText(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

// turn/start 报 thread 未物化时用于触发 resume 重试。判定字符串对齐 codex-mobile
// 的 isThreadNotFoundError，匹配 app-server 的错误文案。
function isThreadNotFoundError(error: unknown): boolean {
  const message = errText(error).toLowerCase();
  return (
    message.includes("thread not found") ||
    message.includes("no rollout found for thread id")
  );
}
