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
  setInterval as setIntervalTimer,
  clearInterval as clearIntervalTimer,
} from "node:timers";
import fs from "node:fs";
import path from "node:path";
import type { AppServerLike, AppServerNotification } from "./app-server";
import { telegramImageDir } from "./telegram-config";

// --- Telegram 数据形状（仅声明用到的字段） ---------------------------------

type TelegramUser = { id?: number };
type TelegramChat = { id?: number };
type TelegramPhotoSize = {
  file_id?: string;
  file_unique_id?: string;
};
type TelegramMessage = {
  message_id?: number;
  from?: TelegramUser;
  chat?: TelegramChat;
  text?: string;
  caption?: string;
  photo?: TelegramPhotoSize[];
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
  /** 是否启用 item 级流式（typing + editMessageText 实时更新）。 */
  streaming: boolean;
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

// 流式：turn 进行中每隔多久重发一次 typing 状态（Telegram typing 约 5 秒过期）。
const TYPING_INTERVAL_MS = 4000;
// 流式编辑节流：两次 editMessageText 的最小间隔，避免触发 Telegram 限流。
const STREAM_EDIT_MIN_INTERVAL_MS = 2500;
// 流式占位 / 进度消息的初始文本。
const STREAM_PLACEHOLDER = "⏳ 正在处理…";

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
  arrayBuffer(): Promise<ArrayBuffer>;
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

/** turn 进行中的流式编辑会话（per-thread，针对发起该 turn 的 chat）。 */
type StreamSession = {
  chatId: number;
  messageId: number;
  /** 已累积的 agentMessage 文本（codex 可能分多段 item）。 */
  accumulatedText: string;
  /** 当前活动标签（尚无 agentMessage 文本时显示）。 */
  activity: string;
  /** 上次实际编辑发出的文本（去重，避免 "message is not modified"）。 */
  lastEditedText: string;
  /** 上次编辑时间戳（节流用）。 */
  lastEditAt: number;
  /** 节流待发的编辑定时器。 */
  editTimer: ReturnType<typeof setTimer> | null;
  /** typing 状态重发定时器。 */
  typingTimer: ReturnType<typeof setIntervalTimer> | null;
  /** 定稿中标记，阻止后续中途编辑覆盖最终结果。 */
  finalizing: boolean;
};

export class TelegramBridge {
  private readonly token: string;
  private readonly allowedUserIds: Set<number>;
  private readonly allowAllUsers: boolean;
  private readonly defaultCwd: string;
  private readonly sandboxMode: string;
  private readonly streaming: boolean;
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
  // turn 进行中的流式编辑会话（threadId → session）。
  private readonly streamSessions = new Map<string, StreamSession>();

  constructor(
    private readonly appServer: AppServerLike,
    options: TelegramBridgeOptions,
  ) {
    this.token = options.token;
    this.allowedUserIds = options.allowedUserIds;
    this.allowAllUsers = options.allowAllUsers;
    this.defaultCwd = options.defaultCwd;
    this.sandboxMode = options.sandboxMode;
    this.streaming = options.streaming;
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
    for (const threadId of [...this.streamSessions.keys()]) {
      this.endStreamSession(threadId);
    }
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

    // 图片消息（photo）：下载后连同 caption 作为图文输入交给 codex。
    if (Array.isArray(message.photo) && message.photo.length > 0) {
      await this.handlePhotoMessage(chatId, message);
      return;
    }

    const text = (message.text ?? "").trim();
    if (!text) {
      // 其余非文本消息（语音/文件等）——给个明确反馈，避免用户以为 bot 掉线。
      await this.sendMessage(chatId, "暂仅支持文本和图片消息。");
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
    await this.runTurn(chatId, [{ type: "text", text }]);
  }

  private async handlePhotoMessage(
    chatId: number,
    message: TelegramMessage,
  ): Promise<void> {
    const photos = message.photo ?? [];
    // 同一张图的多个尺寸，取最后一个（分辨率最大）。
    const largest = photos[photos.length - 1];
    if (!largest?.file_id) {
      await this.sendMessage(chatId, "⚠️ 未能读取图片，请重试。");
      return;
    }
    let localPath: string;
    try {
      localPath = await this.downloadTelegramFile(
        largest.file_id,
        largest.file_unique_id ?? String(message.message_id ?? "image"),
      );
    } catch (error) {
      this.lastError = errText(error);
      await this.sendMessage(chatId, `⚠️ 图片下载失败：${errText(error)}`);
      return;
    }
    const caption = (message.caption ?? "").trim() || "请分析这张图片。";
    await this.runTurn(chatId, [
      { type: "text", text: caption },
      { type: "localImage", path: localPath },
    ]);
  }

  /** 建/复用 thread → 开流式 → 发 turn 的通用路径（文本与图文共用）。 */
  private async runTurn(
    chatId: number,
    input: Array<Record<string, unknown>>,
  ): Promise<void> {
    let threadId = this.threadIdByChatId.get(chatId);
    try {
      if (!threadId) {
        threadId = await this.startThread();
        this.bindChatToThread(chatId, threadId);
      }
      // 先开流式（占位 + typing）再发 turn —— 保证 turn/completed 一定能找到
      // session，避免极快 turn 抢在 session 建立前完成而留下孤儿占位消息。
      if (this.streaming) {
        await this.beginStreamSession(threadId, chatId);
      }
      await this.startTurn(threadId, input);
      // turn 已开始；turn/completed 通知会定稿（非流式时则一次性发）。
    } catch (error) {
      this.lastError = errText(error);
      const message = `⚠️ 发送失败：${errText(error)}\ncodex 后端可能已断开，请稍后重试。`;
      // 已开流式则把占位消息定稿为错误；否则直接发一条。
      if (!threadId || !(await this.failStreamSession(threadId, message))) {
        await this.sendMessage(chatId, message);
      }
    }
  }

  /** 下载 Telegram 文件到本地（CODEX_HOME/telegram-images），返回绝对路径。 */
  private async downloadTelegramFile(
    fileId: string,
    uniqueId: string,
  ): Promise<string> {
    const fileInfo = await this.callTelegram("getFile", { file_id: fileId });
    const filePath = (fileInfo as { file_path?: string } | null)?.file_path;
    if (!filePath) {
      throw new Error("getFile 未返回 file_path");
    }
    // 下载 URL 含 token —— 出错只报状态码，不打印 URL。
    const response = await httpFetch(
      `https://api.telegram.org/file/bot${this.token}/${filePath}`,
      { method: "GET" },
    );
    if (!response.ok) {
      throw new Error(`下载失败 HTTP ${response.status}`);
    }
    const bytes = new Uint8Array(await response.arrayBuffer());
    const dir = telegramImageDir();
    fs.mkdirSync(dir, { recursive: true });
    const ext = path.extname(filePath) || ".jpg";
    const dest = path.join(dir, `${uniqueId}${ext}`);
    fs.writeFileSync(dest, bytes);
    return dest;
  }

  /**
   * 在指定 thread 上跑一轮。turn/start 若因该 thread 未在当前 app-server 进程
   * 物化而报 "thread not found"（绑定了别进程 / 历史创建的 thread，或 app-server
   * 懒重启后内存态丢失），先 thread/resume 把它加载进当前进程，再重试一次。
   * 移植自 codex-mobile callRpcWithArchiveRecovery 的 turn/start 分支。
   */
  private async startTurn(
    threadId: string,
    input: Array<Record<string, unknown>>,
  ): Promise<void> {
    const params = { threadId, input };
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
    const method = notification.method;
    if (method === "item/started" || method === "item/completed") {
      this.handleItemNotification(method, notification.params);
      return;
    }
    if (method === "turn/completed") {
      this.handleTurnCompleted(notification.params);
    }
  }

  // --- 流式：item 级实时编辑 ------------------------------------------------

  /** turn 已开始：发占位消息 + 启动 typing，建立流式 session。 */
  private async beginStreamSession(
    threadId: string,
    chatId: number,
  ): Promise<void> {
    // 同 thread 上一轮残留的 session 先收尾，避免定时器泄漏。
    this.endStreamSession(threadId);
    let messageId: number | null;
    try {
      messageId = await this.sendPlainMessageReturningId(
        chatId,
        STREAM_PLACEHOLDER,
      );
    } catch (error) {
      // 占位消息发送失败 → 放弃流式，turn/completed 仍会兜底一次性发完整回复。
      this.lastError = errText(error);
      return;
    }
    if (messageId == null) {
      return;
    }
    const session: StreamSession = {
      chatId,
      messageId,
      accumulatedText: "",
      activity: STREAM_PLACEHOLDER,
      lastEditedText: STREAM_PLACEHOLDER,
      lastEditAt: Date.now(),
      editTimer: null,
      typingTimer: setIntervalTimer(() => {
        void this.sendChatAction(chatId, "typing");
      }, TYPING_INTERVAL_MS),
      finalizing: false,
    };
    this.streamSessions.set(threadId, session);
    // 立即发一次 typing，不等第一个 interval。
    void this.sendChatAction(chatId, "typing");
  }

  private handleItemNotification(method: string, rawParams: unknown): void {
    const params = rawParams as Record<string, unknown> | null;
    const threadId = extractThreadId(params);
    if (!threadId) {
      return;
    }
    const session = this.streamSessions.get(threadId);
    if (!session || session.finalizing) {
      return;
    }
    const item = (params?.["item"] ?? null) as Record<string, unknown> | null;
    const itemType =
      typeof item?.["type"] === "string" ? (item["type"] as string) : "";
    if (method === "item/completed" && itemType === "agentMessage") {
      const text =
        typeof item?.["text"] === "string"
          ? (item["text"] as string).trim()
          : "";
      if (text) {
        session.accumulatedText = session.accumulatedText
          ? `${session.accumulatedText}\n\n${text}`
          : text;
      }
    } else {
      session.activity = activityLabel(itemType);
    }
    this.scheduleStreamEdit(threadId);
  }

  /** 节流安排一次进度编辑。 */
  private scheduleStreamEdit(threadId: string): void {
    const session = this.streamSessions.get(threadId);
    if (!session || session.finalizing) {
      return;
    }
    const elapsed = Date.now() - session.lastEditAt;
    if (elapsed >= STREAM_EDIT_MIN_INTERVAL_MS) {
      void this.flushStreamEdit(threadId);
      return;
    }
    if (!session.editTimer) {
      session.editTimer = setTimer(() => {
        session.editTimer = null;
        void this.flushStreamEdit(threadId);
      }, STREAM_EDIT_MIN_INTERVAL_MS - elapsed);
    }
  }

  private async flushStreamEdit(threadId: string): Promise<void> {
    const session = this.streamSessions.get(threadId);
    if (!session || session.finalizing) {
      return;
    }
    const text = renderStreamProgress(session);
    if (text === session.lastEditedText) {
      return;
    }
    session.lastEditedText = text;
    session.lastEditAt = Date.now();
    // 中途用纯文本编辑（HTML 标签在累积过程中可能被截断成非法）；定稿才用 HTML。
    try {
      await this.editMessageText(session.chatId, session.messageId, text, null);
    } catch (error) {
      const message = errText(error);
      if (!message.includes("not modified")) {
        console.error(`[telegram] stream edit failed: ${message}`);
      }
    }
  }

  private handleTurnCompleted(rawParams: unknown): void {
    const params = rawParams as Record<string, unknown> | null;
    const threadId = extractThreadId(params);
    const turnId = extractTurnId(params);
    if (!threadId) {
      return;
    }
    const chatIds = this.chatIdsByThreadId.get(threadId);
    if (!chatIds || chatIds.size === 0) {
      this.endStreamSession(threadId);
      return;
    }
    // turnId 去重（同一 turn 可能被多次通知）。
    if (turnId) {
      if (this.lastForwardedTurnByThreadId.get(threadId) === turnId) {
        return;
      }
      this.lastForwardedTurnByThreadId.set(threadId, turnId);
    }
    const turn = (params?.["turn"] ?? null) as Record<string, unknown> | null;
    const turnError =
      turn?.["status"] === "failed" ? errText(turn?.["error"]) : "";
    void this.finalizeTurn(threadId, [...chatIds], turnError);
  }

  private async finalizeTurn(
    threadId: string,
    chatIds: number[],
    turnError: string,
  ): Promise<void> {
    let reply: string | null = null;
    try {
      reply = await this.readLatestAssistantMessage(threadId);
    } catch (error) {
      this.lastError = errText(error);
      console.error(`[telegram] thread/read failed: ${this.lastError}`);
    }

    const session = this.streamSessions.get(threadId);
    if (session) {
      session.finalizing = true;
      if (session.editTimer) {
        clearTimer(session.editTimer);
        session.editTimer = null;
      }
      this.stopTyping(session);
      const finalText =
        reply ||
        session.accumulatedText ||
        (turnError ? `⚠️ 任务失败：${turnError}` : "（codex 未返回文本回复）");
      await this.finalizeStreamMessage(session, finalText);
      this.streamSessions.delete(threadId);
      if (reply) {
        this.lastForwardedTextByThreadId.set(threadId, reply);
      }
      // 同一 thread 上的其他 chat（非本轮发起者，罕见）走老逻辑各自新发。
      const others = chatIds.filter((id) => id !== session.chatId);
      if (reply && others.length > 0) {
        for (const id of others) {
          await this.sendMessage(id, reply);
        }
      }
      return;
    }

    // 无流式 session（流式关闭 / 占位失败）→ 一次性发完整回复。
    if (!reply) {
      if (turnError) {
        for (const id of chatIds) {
          await this.sendMessage(id, `⚠️ 任务失败：${turnError}`);
        }
      }
      return;
    }
    if (this.lastForwardedTextByThreadId.get(threadId) === reply) {
      return;
    }
    this.lastForwardedTextByThreadId.set(threadId, reply);
    for (const id of chatIds) {
      await this.sendMessage(id, reply);
    }
  }

  /** 把进度消息定稿为最终回复：第一片编辑进占位消息，超长余片新发。 */
  private async finalizeStreamMessage(
    session: StreamSession,
    finalText: string,
  ): Promise<void> {
    const chunks = splitTelegramText(finalText);
    if (chunks.length === 0) {
      await this.editMessageHtml(
        session.chatId,
        session.messageId,
        "（无文本回复）",
      );
      return;
    }
    const [first, ...rest] = chunks;
    await this.editMessageHtml(session.chatId, session.messageId, first ?? "");
    for (const chunk of rest) {
      await this.sendMessage(session.chatId, chunk);
    }
  }

  /** 用 HTML 编辑消息；失败回退纯文本编辑。 */
  private async editMessageHtml(
    chatId: number,
    messageId: number,
    text: string,
  ): Promise<void> {
    try {
      await this.editMessageText(
        chatId,
        messageId,
        renderMarkdownToTelegramHtml(text),
        "HTML",
      );
    } catch {
      try {
        await this.editMessageText(chatId, messageId, text, null);
      } catch (error) {
        const message = errText(error);
        if (!message.includes("not modified")) {
          this.lastError = message;
          console.error(`[telegram] finalize edit failed: ${message}`);
        }
      }
    }
  }

  private stopTyping(session: StreamSession): void {
    if (session.typingTimer) {
      clearIntervalTimer(session.typingTimer);
      session.typingTimer = null;
    }
  }

  private endStreamSession(threadId: string): void {
    const session = this.streamSessions.get(threadId);
    if (!session) {
      return;
    }
    if (session.editTimer) {
      clearTimer(session.editTimer);
    }
    this.stopTyping(session);
    this.streamSessions.delete(threadId);
  }

  /**
   * 流式 session 收尾为一条错误消息（startTurn 失败等）。返回是否处理了 session：
   * false 表示当前无 session，调用方应自行发送错误。
   */
  private async failStreamSession(
    threadId: string,
    message: string,
  ): Promise<boolean> {
    const session = this.streamSessions.get(threadId);
    if (!session) {
      return false;
    }
    session.finalizing = true;
    if (session.editTimer) {
      clearTimer(session.editTimer);
      session.editTimer = null;
    }
    this.stopTyping(session);
    this.streamSessions.delete(threadId);
    await this.editMessageHtml(session.chatId, session.messageId, message);
    return true;
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
      "直接发文本或图片即可驱动一个 codex 会话；codex 跑完会把回复发回这里。",
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

  private async sendChatAction(chatId: number, action: string): Promise<void> {
    try {
      await this.callTelegram("sendChatAction", { chat_id: chatId, action });
    } catch {
      // typing 状态发送失败无碍，忽略。
    }
  }

  /** 发送纯文本消息并返回 message_id（流式占位消息用）。 */
  private async sendPlainMessageReturningId(
    chatId: number,
    text: string,
  ): Promise<number | null> {
    const result = await this.callTelegram("sendMessage", {
      chat_id: chatId,
      text,
    });
    const messageId = (result as { message_id?: number } | null)?.message_id;
    return typeof messageId === "number" ? messageId : null;
  }

  private async editMessageText(
    chatId: number,
    messageId: number,
    text: string,
    parseMode: "HTML" | null,
  ): Promise<void> {
    const payload: Record<string, unknown> = {
      chat_id: chatId,
      message_id: messageId,
      text,
    };
    if (parseMode) {
      payload["parse_mode"] = parseMode;
    }
    await this.callTelegram("editMessageText", payload);
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

// item.type → turn 进行中的活动标签。codex 流式是 item 级（非逐字），用类型给个
// 友好的"正在做什么"提示。未知类型回退到通用占位。
function activityLabel(itemType: string): string {
  switch (itemType) {
    case "agentMessage":
      return "✍️ 正在回复…";
    case "reasoning":
      return "💭 正在思考…";
    case "commandExecution":
      return "⚙️ 正在执行命令…";
    case "fileChange":
      return "📝 正在修改文件…";
    case "mcpToolCall":
    case "tool":
      return "🔧 正在调用工具…";
    case "plan":
      return "📋 正在规划…";
    case "webSearch":
      return "🔎 正在联网搜索…";
    default:
      return STREAM_PLACEHOLDER;
  }
}

// 渲染 turn 进行中的进度文本（纯文本）。有 agentMessage 文本则显示之 + 光标符，
// 否则显示当前活动标签。
function renderStreamProgress(session: StreamSession): string {
  if (session.accumulatedText) {
    return `${truncate(session.accumulatedText, TELEGRAM_MESSAGE_MAX_LENGTH - 2)} ▌`;
  }
  return session.activity || STREAM_PLACEHOLDER;
}
