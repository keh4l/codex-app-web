// 独立的 codex app-server 子进程封装，供 Telegram bridge 使用。
//
// 与浏览器那条链路（main.ts → 官方主进程 → 它自己 spawn 的 app-server）完全隔离：
// 这里自己 spawn 一个 `codex app-server`，走 stdio 换行分隔 JSON-RPC（v2 thread API）。
// 二者共享 ~/.codex（凭据 + 历史 DB），互不干扰。
//
// 复用 CODEX_CLI_PATH 保证与浏览器那条用同一个 codex（含代理模式自动适配）。

import { spawn, type ChildProcessWithoutNullStreams } from "node:child_process";

export type AppServerNotification = { method: string; params: unknown };
export type NotificationListener = (value: AppServerNotification) => void;

/** TelegramBridge 唯一依赖的注入接口（完全解耦 app-server 内部）。 */
export type AppServerLike = {
  rpc: (method: string, params: unknown) => Promise<unknown>;
  onNotification: (listener: NotificationListener) => () => void;
};

export type AppServerOptions = {
  /** codex 二进制路径，通常来自 CODEX_CLI_PATH || "codex"。 */
  codexPath: string;
  /** sandbox_mode 的 -c 值；approval_policy 固定写死 "never"。 */
  sandboxMode: string;
  /** features.memories 的 -c 值（codex 记忆功能）。 */
  memories: boolean;
};

type JsonRpcMessage = {
  jsonrpc?: string;
  id?: number | string;
  method?: string;
  params?: unknown;
  result?: unknown;
  error?: { code?: number; message?: string };
};

type PendingRequest = {
  resolve: (value: unknown) => void;
  reject: (error: Error) => void;
};

export class AppServerProcess implements AppServerLike {
  private proc: ChildProcessWithoutNullStreams | null = null;
  private initializePromise: Promise<void> | null = null;
  private nextId = 1;
  private readBuffer = "";
  private readonly pending = new Map<number, PendingRequest>();
  private readonly notificationListeners = new Set<NotificationListener>();

  constructor(private readonly options: AppServerOptions) {}

  /** 立即拉起进程（懒握手仍在首个 rpc 时执行）。可选——rpc 也会按需拉起。 */
  start(): void {
    this.spawnProcess();
  }

  async rpc(method: string, params: unknown): Promise<unknown> {
    await this.ensureInitialized();
    return this.call(method, params);
  }

  onNotification(listener: NotificationListener): () => void {
    this.notificationListeners.add(listener);
    return () => {
      this.notificationListeners.delete(listener);
    };
  }

  private ensureInitialized(): Promise<void> {
    if (!this.initializePromise) {
      // 惰性（重）启动：进程曾意外退出时，下一条消息会重新拉起。thread 状态在
      // ~/.codex 的 SQLite 里仍有效，已绑定的 threadId 依旧可读。
      this.spawnProcess();
      this.initializePromise = this.handshake().catch((error: unknown) => {
        // 握手失败 —— 清掉缓存的 promise，允许下次重试。
        this.initializePromise = null;
        throw error instanceof Error ? error : new Error(String(error));
      });
    }
    return this.initializePromise;
  }

  private async handshake(): Promise<void> {
    await this.call("initialize", {
      clientInfo: { name: "codex-web", version: "0.1.0" },
      capabilities: { experimentalApi: true },
    });
    // initialized 是通知（无 id），握手第二阶段。
    this.sendLine({ jsonrpc: "2.0", method: "initialized" });
  }

  private spawnProcess(): void {
    if (this.proc) {
      return;
    }
    const args = buildAppServerArgs(this.options.sandboxMode, this.options.memories);
    console.log(
      `[app-server] spawning: ${this.options.codexPath} ${args.join(" ")}`,
    );
    const proc = spawn(this.options.codexPath, args, {
      stdio: ["pipe", "pipe", "pipe"],
    });
    this.proc = proc;

    proc.stdout.setEncoding("utf8");
    proc.stdout.on("data", (chunk: string) => {
      this.onStdout(chunk);
    });

    // codex 的诊断常走 stderr —— 接管并 log，排查问题需要它。
    proc.stderr.setEncoding("utf8");
    proc.stderr.on("data", (chunk: string) => {
      const text = String(chunk).trimEnd();
      if (text) {
        console.error(`[app-server stderr] ${text}`);
      }
    });

    proc.on("error", (error: Error) => {
      console.error(`[app-server] process error: ${error.message}`);
      this.failAllPending(`codex app-server failed to start: ${error.message}`);
    });

    proc.on("exit", (code: number | null, signal: string | null) => {
      console.error(
        `[app-server] exited (code=${code}, signal=${signal}); ` +
          `pending rpc rejected, will respawn on next request`,
      );
      this.failAllPending("codex app-server exited");
    });
  }

  /** 拒绝所有 pending 并重置状态，使下次 rpc 触发重新 spawn + 握手。 */
  private failAllPending(reason: string): void {
    for (const request of this.pending.values()) {
      request.reject(new Error(reason));
    }
    this.pending.clear();
    this.proc = null;
    this.initializePromise = null;
    this.readBuffer = "";
    // 每个进程实例独立的 id 空间：重启后从 1 重新计数。
    this.nextId = 1;
  }

  private call(method: string, params: unknown): Promise<unknown> {
    const id = this.nextId++;
    return new Promise<unknown>((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      try {
        this.sendLine({ jsonrpc: "2.0", id, method, params });
      } catch (error) {
        this.pending.delete(id);
        reject(error instanceof Error ? error : new Error(String(error)));
      }
    });
  }

  private sendLine(message: unknown): void {
    const proc = this.proc;
    if (!proc || !proc.stdin.writable) {
      throw new Error("codex app-server is not running");
    }
    proc.stdin.write(`${JSON.stringify(message)}\n`);
  }

  private onStdout(chunk: string): void {
    this.readBuffer += chunk;
    let newlineIndex = this.readBuffer.indexOf("\n");
    while (newlineIndex !== -1) {
      const line = this.readBuffer.slice(0, newlineIndex).trim();
      this.readBuffer = this.readBuffer.slice(newlineIndex + 1);
      if (line) {
        this.handleLine(line);
      }
      newlineIndex = this.readBuffer.indexOf("\n");
    }
  }

  private handleLine(line: string): void {
    let message: JsonRpcMessage;
    try {
      message = JSON.parse(line) as JsonRpcMessage;
    } catch {
      console.error(`[app-server] failed to parse line: ${line.slice(0, 200)}`);
      return;
    }

    const id = message.id;
    const hasId = id !== undefined && id !== null;
    const hasMethod = typeof message.method === "string";

    if (hasId && hasMethod) {
      // 服务端发起的请求（审批等）。approval_policy=never 下不该出现，但仍通用
      // 回错误以防 app-server 永久等待。id 按原类型（number 或 string）回显。
      this.respondToServerRequest(id, message.method as string);
      return;
    }

    if (hasMethod) {
      this.emitNotification({
        method: message.method as string,
        params: message.params ?? null,
      });
      return;
    }

    if (typeof id === "number") {
      // 响应。本端只用 number id 发请求，故只匹配 number id 的响应。
      const request = this.pending.get(id);
      if (!request) {
        return;
      }
      this.pending.delete(id);
      if (message.error) {
        request.reject(
          new Error(message.error.message ?? "codex app-server error"),
        );
      } else {
        request.resolve(message.result ?? null);
      }
    }
  }

  private respondToServerRequest(id: number | string, method: string): void {
    console.warn(
      `[app-server] unexpected server request "${method}" (id=${id}); ` +
        `replying with error to avoid a hang`,
    );
    try {
      this.sendLine({
        jsonrpc: "2.0",
        id,
        error: { code: -32601, message: "client does not handle server requests" },
      });
    } catch {
      // 进程已不可用 —— failAllPending 会处理其余。
    }
  }

  private emitNotification(value: AppServerNotification): void {
    for (const listener of this.notificationListeners) {
      try {
        listener(value);
      } catch (error) {
        console.error(
          `[app-server] notification listener threw: ${
            error instanceof Error ? error.message : String(error)
          }`,
        );
      }
    }
  }
}

/**
 * app-server 命令行参数。approval_policy 固定 never（Telegram 端无法交互式审批），
 * sandbox_mode 与 features.memories 由调用方传入。对齐参考项目 codex-mobile 的
 * 这三个 -c；不照搬其 provider / freeMode 等依赖其专有后端的参数。
 */
function buildAppServerArgs(sandboxMode: string, memories: boolean): string[] {
  return [
    "app-server",
    "-c",
    `approval_policy="never"`,
    "-c",
    `sandbox_mode="${sandboxMode}"`,
    "-c",
    `features.memories=${memories ? "true" : "false"}`,
  ];
}
