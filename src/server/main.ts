#!/usr/bin/env node

import {
  createHash,
  createHmac,
  randomUUID,
  timingSafeEqual,
} from "node:crypto";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { parseArgs as parseCliArgs } from "node:util";
import { constants as zlibConstants } from "node:zlib";
import { WebSocket, WebSocketServer } from "ws";
import Fastify, { type FastifyReply } from "fastify";
import fastifyMultipart from "@fastify/multipart";
import fastifyCompress from "@fastify/compress";
import fastifyStatic from "@fastify/static";
import { installModuleAliasHook } from "./module";
import { glob } from "glob";
import { AppServerProcess } from "./app-server";
import { TelegramBridge } from "./telegram-bridge";
import {
  readKnownChatIds,
  readTelegramSettings,
  rememberChatId,
} from "./telegram-config";
import { injectClientPatches } from "./client-inject";

// Best-effort load of a project-root .env so `node src/server/main.js` also
// picks up CODEX_CLI_PATH / HOST / PORT. Startup-time vars (NODE_USE_ENV_PROXY,
// HTTP(S)_PROXY) are read by node during bootstrap, before this runs — to use a
// proxy, export them first via `npm start` (scripts/start sources .env).
try {
  (
    process as NodeJS.Process & { loadEnvFile?: (envPath: string) => void }
  ).loadEnvFile?.(path.resolve(__dirname, "../../.env"));
} catch {
  // no .env present; rely on the ambient environment
}

type ServerOptions = {
  host: string;
  port: number;
};

type RendererToMainMessage =
  | {
      type: "ipc-renderer-invoke";
      requestId: string;
      channel: string;
      args: unknown[];
      sourceUrl: string;
    }
  | {
      type: "ipc-renderer-send";
      channel: string;
      args: unknown[];
      sourceUrl: string;
    }
  | {
      type: "ipc-renderer-post-message";
      channel: string;
      portId: string;
    }
  | {
      type: "ipc-port-message";
      portId: string;
      data: unknown;
    }
  | {
      type: "ipc-port-close";
      portId: string;
    }
  | {
      type: "workspace-directory-entries-request";
      requestId: string;
      directoryPath: string | null;
      directoriesOnly: boolean;
    };

type MainToRendererMessage =
  | {
      type: "ipc-main-event";
      channel: string;
      args: unknown[];
    }
  | {
      type: "ipc-port-message";
      portId: string;
      data: unknown;
    }
  | {
      type: "ipc-port-close";
      portId: string;
    }
  | {
      type: "ipc-renderer-invoke-result";
      requestId: string;
      ok: true;
      result: unknown;
    }
  | {
      type: "ipc-renderer-invoke-result";
      requestId: string;
      ok: false;
      errorMessage: string;
    }
  | {
      type: "workspace-directory-entries-result";
      requestId: string;
      ok: true;
      result: WorkspaceDirectoryEntries;
    }
  | {
      type: "workspace-directory-entries-result";
      requestId: string;
      ok: false;
      errorMessage: string;
    };

type WorkspaceDirectoryEntry = {
  name: string;
  path: string;
  type: "directory" | "file";
};

type WorkspaceDirectoryEntries = {
  directoryPath: string;
  parentPath: string | null;
  entries: WorkspaceDirectoryEntry[];
};

function workspaceDirectoryEntryTypeRank(
  entry: WorkspaceDirectoryEntry,
): number {
  return entry.type === "directory" ? 0 : 1;
}

function workspaceDirectoryEntryHiddenRank(
  entry: WorkspaceDirectoryEntry,
): number {
  return entry.name.startsWith(".") ? 1 : 0;
}

function compareWorkspaceDirectoryEntries(
  left: WorkspaceDirectoryEntry,
  right: WorkspaceDirectoryEntry,
): number {
  return (
    workspaceDirectoryEntryTypeRank(left) -
      workspaceDirectoryEntryTypeRank(right) ||
    workspaceDirectoryEntryHiddenRank(left) -
      workspaceDirectoryEntryHiddenRank(right) ||
    left.name.localeCompare(right.name)
  );
}

type IpcMainBridgeState = {
  broadcastToRenderer?: (message: MainToRendererMessage) => void;
  handleRendererInvoke?: (channel: string, args: unknown[]) => Promise<unknown>;
  handleRendererSend?: (channel: string, args: unknown[]) => void;
  handleRendererPostMessage?: (channel: string, portId: string) => void;
  handlePortMessage?: (portId: string, data: unknown) => void;
  handlePortClose?: (portId: string) => void;
};

function printUsage(): void {
  console.log(
    [
      "Usage:",
      "  server [--host <host>] [--port <port>]",
      "",
      "Defaults:",
      "  --host 127.0.0.1",
      "  --port 8214",
      "",
      "Examples:",
      "  yarn server",
      "  yarn server --port 9000",
    ].join("\n"),
  );
}

function parsePort(raw: string): number {
  const parsed = Number(raw);
  if (!Number.isInteger(parsed) || parsed <= 0 || parsed > 65535) {
    throw new Error(`Invalid port: ${raw}`);
  }
  return parsed;
}

function parseServerArgs(args: string[]): ServerOptions {
  const parsed = parseCliArgs({
    args,
    allowPositionals: false,
    options: {
      help: {
        short: "h",
        type: "boolean",
      },
      host: {
        type: "string",
      },
      port: {
        type: "string",
      },
    },
    strict: true,
  });

  if (parsed.values.help) {
    printUsage();
    process.exit(0);
  }

  return {
    host: parsed.values.host ?? process.env.HOST ?? "127.0.0.1",
    port: parsed.values.port
      ? parsePort(parsed.values.port)
      : process.env.PORT
        ? parsePort(process.env.PORT)
        : 8214,
  };
}

type AuthConfig = {
  username: string;
  password: string;
  // HMAC key for session cookies, derived from the credentials so sessions
  // survive server restarts and are invalidated by a password change.
  sessionKey: Buffer;
};

const AUTH_COOKIE_NAME = "codex_web_auth";
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000;
const LOGIN_FAILURE_WINDOW_MS = 15 * 60 * 1000;
const LOGIN_MAX_FAILURES_PER_WINDOW = 10;
// Native ws ping interval to reap half-open dead client connections so they
// don't accumulate in the broadcast set.
const WS_KEEPALIVE_INTERVAL_MS = 30 * 1000;

// 上游 Vite 资源名带内容 hash，但本仓库会在相同文件名下打 patch / 重抽 asar，
// 因此「hash 不变 ⇒ 内容不可变」不成立。若再发 immutable，浏览器会把错误的
// 旧内容（例如非法 defaultText 解构）锁一年，表现为加载页 SyntaxError。
// 一律 no-cache：浏览器每次校验，本地改 asar 后刷新即可拿到新文件。
const HASHED_ASSET_RE = /-[A-Za-z0-9_-]{8,}\.[a-z0-9]+(\.map)?$/i;

function resolveAuthConfig(): AuthConfig | null {
  const password = process.env.AUTH_PASSWORD ?? "";
  if (!password) {
    return null;
  }
  const username = process.env.AUTH_USERNAME || "codex";
  return {
    username,
    password,
    sessionKey: createHash("sha256")
      .update(`codex-web-auth-v1:${username}:${password}`)
      .digest(),
  };
}

function createSessionToken(auth: AuthConfig): string {
  const expiresAt = Date.now() + SESSION_TTL_MS;
  const signature = createHmac("sha256", auth.sessionKey)
    .update(String(expiresAt))
    .digest("hex");
  return `${expiresAt}.${signature}`;
}

function verifySessionToken(auth: AuthConfig, token: string): boolean {
  const separatorIndex = token.indexOf(".");
  if (separatorIndex < 0) {
    return false;
  }
  const expiresAtRaw = token.slice(0, separatorIndex);
  const expiresAt = Number(expiresAtRaw);
  if (!Number.isFinite(expiresAt) || expiresAt < Date.now()) {
    return false;
  }
  const expectedSignature = createHmac("sha256", auth.sessionKey)
    .update(expiresAtRaw)
    .digest("hex");
  return safeEqual(token.slice(separatorIndex + 1), expectedSignature);
}

function sessionCookie(token: string): string {
  // No Secure flag: codex-web is commonly served over plain http.
  return `${AUTH_COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${Math.floor(SESSION_TTL_MS / 1000)}`;
}

function safeEqual(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }
  return timingSafeEqual(leftBuffer, rightBuffer);
}

function hasValidBasicCredentials(
  auth: AuthConfig,
  authorizationHeader: string | undefined,
): boolean {
  if (!authorizationHeader?.startsWith("Basic ")) {
    return false;
  }
  let decoded: string;
  try {
    decoded = Buffer.from(authorizationHeader.slice(6), "base64").toString(
      "utf8",
    );
  } catch {
    return false;
  }
  const separatorIndex = decoded.indexOf(":");
  if (separatorIndex < 0) {
    return false;
  }
  const usernameMatches = safeEqual(
    decoded.slice(0, separatorIndex),
    auth.username,
  );
  const passwordMatches = safeEqual(
    decoded.slice(separatorIndex + 1),
    auth.password,
  );
  return usernameMatches && passwordMatches;
}

function hasValidAuthCookie(
  auth: AuthConfig,
  cookieHeader: string | undefined,
): boolean {
  if (!cookieHeader) {
    return false;
  }
  for (const part of cookieHeader.split(";")) {
    const trimmed = part.trim();
    if (!trimmed.startsWith(`${AUTH_COOKIE_NAME}=`)) {
      continue;
    }
    return verifySessionToken(auth, trimmed.slice(AUTH_COOKIE_NAME.length + 1));
  }
  return false;
}

function isAuthorizedRequest(
  auth: AuthConfig,
  headers: { authorization?: string; cookie?: string },
): boolean {
  return (
    hasValidBasicCredentials(auth, headers.authorization) ||
    hasValidAuthCookie(auth, headers.cookie)
  );
}

function getIpcMainBridgeState(): IpcMainBridgeState {
  const globals = globalThis as typeof globalThis & {
    __codexElectronIpcBridge?: IpcMainBridgeState;
  };
  if (!globals.__codexElectronIpcBridge) {
    globals.__codexElectronIpcBridge = {};
  }
  return globals.__codexElectronIpcBridge;
}

function errorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.stack ?? error.message;
  }
  return String(error);
}

async function getWorkspaceDirectoryEntries({
  directoryPath,
  directoriesOnly,
}: {
  directoryPath: string | null;
  directoriesOnly: boolean;
}): Promise<WorkspaceDirectoryEntries> {
  const requestedPath = directoryPath?.trim() || os.homedir();
  const resolvedPath = path.resolve(requestedPath);
  const stat = await fs.stat(resolvedPath);
  if (!stat.isDirectory()) {
    throw new Error(`Directory not found: ${requestedPath}`);
  }

  const entries = (await fs.readdir(resolvedPath, { withFileTypes: true }))
    .flatMap((entry): WorkspaceDirectoryEntry[] => {
      const type = entry.isDirectory() ? "directory" : "file";
      if (directoriesOnly && type !== "directory") {
        return [];
      }

      return [
        {
          name: entry.name,
          path: path.join(resolvedPath, entry.name),
          type,
        },
      ];
    })
    .sort(compareWorkspaceDirectoryEntries);

  const rootPath = path.parse(resolvedPath).root;
  const parentPath =
    resolvedPath === rootPath ? null : path.dirname(resolvedPath);

  return {
    directoryPath: resolvedPath,
    parentPath,
    entries,
  };
}

function ensureElectronLikeProcessContext(): void {
  const versions = process.versions as NodeJS.ProcessVersions & {
    electron?: string;
  };
  if (!versions.electron) {
    Object.defineProperty(versions, "electron", {
      value: "42.1.0",
      configurable: true,
      enumerable: true,
      writable: false,
    });
  }

  const processWithElectronFields = process as NodeJS.Process & {
    resourcesPath?: string;
    type?: string;
  };
  processWithElectronFields.resourcesPath ??= path.resolve(
    __dirname,
    "../../scratch/asar",
  );
  processWithElectronFields.type ??= "browser";
}

async function startIpcBridgeServer(options: ServerOptions): Promise<void> {
  const bridgeState = getIpcMainBridgeState();
  const auth = resolveAuthConfig();
  const app = Fastify({ logger: false });
  const websocketServer = new WebSocketServer({ noServer: true });
  const sockets = new Set<WebSocket>();

  // 静态资源（前端 ~136MB，跨境部署时未压缩裸传是首屏加载慢的主因）运行时
  // gzip / brotli 压缩。注册在所有路由之前，全局 onSend 钩子即可覆盖静态文件与
  // 注入版 index.html。现代浏览器优先取 br，旧的回退 gzip；brotli 用中等质量
  // （q5）在压缩比与实时压缩 CPU 之间取平衡（文件名带 hash，浏览器缓存后基本
  // 不再重复请求，CPU 峰值只在部署后首次全量加载时出现）。补丁全在 src/server，
  // 不碰 asar、跟随升级零维护。
  await app.register(fastifyCompress, {
    global: true,
    encodings: ["br", "gzip"],
    threshold: 1024,
    brotliOptions: {
      params: { [zlibConstants.BROTLI_PARAM_QUALITY]: 5 },
    },
  });

  if (auth) {
    const loginFailures = new Map<
      string,
      { count: number; windowStart: number }
    >();

    const isLoginRateLimited = (ip: string): boolean => {
      const entry = loginFailures.get(ip);
      if (!entry) {
        return false;
      }
      if (Date.now() - entry.windowStart > LOGIN_FAILURE_WINDOW_MS) {
        loginFailures.delete(ip);
        return false;
      }
      return entry.count >= LOGIN_MAX_FAILURES_PER_WINDOW;
    };

    const recordLoginFailure = (ip: string): void => {
      // Opportunistically drop expired windows so a flood of distinct source
      // IPs can't grow this map without bound (expired entries are otherwise
      // only purged when that same IP tries again).
      if (loginFailures.size > 1024) {
        const cutoff = Date.now() - LOGIN_FAILURE_WINDOW_MS;
        for (const [key, value] of loginFailures) {
          if (value.windowStart < cutoff) {
            loginFailures.delete(key);
          }
        }
      }
      const entry = loginFailures.get(ip);
      if (!entry || Date.now() - entry.windowStart > LOGIN_FAILURE_WINDOW_MS) {
        loginFailures.set(ip, { count: 1, windowStart: Date.now() });
        return;
      }
      entry.count += 1;
    };

    // Must be registered before any route/plugin so it covers them all.
    app.addHook("onRequest", async (request, reply) => {
      const requestPath = request.url.split("?")[0];
      if (requestPath === "/__auth/login" || requestPath === "/__auth/logout") {
        return;
      }
      // Browsers fetch the PWA manifest without credentials; it only holds
      // the app name and icon paths, so exempt it instead of letting every
      // page load log a 401.
      if (requestPath === "/manifest.json") {
        return;
      }
      if (isAuthorizedRequest(auth, request.headers)) {
        return;
      }
      const wantsHtml = (request.headers.accept ?? "").includes("text/html");
      if (request.method === "GET" && wantsHtml) {
        return reply
          .code(302)
          .header(
            "location",
            `/__auth/login?next=${encodeURIComponent(request.url)}`,
          )
          .send();
      }
      return reply.code(401).send({ error: "Unauthorized" });
    });

    const loginPagePath = path.resolve(__dirname, "login.html");

    app.get("/__auth/login", async (request, reply) => {
      if (isAuthorizedRequest(auth, request.headers)) {
        return reply.code(302).header("location", "/").send();
      }
      const page = await fs.readFile(loginPagePath, "utf8");
      return reply.type("text/html; charset=utf-8").send(page);
    });

    app.post("/__auth/login", async (request, reply) => {
      if (isLoginRateLimited(request.ip)) {
        return reply.code(429).send({ error: "too many attempts" });
      }
      const body = request.body as {
        username?: unknown;
        password?: unknown;
      } | null;
      const username = typeof body?.username === "string" ? body.username : "";
      const password = typeof body?.password === "string" ? body.password : "";
      const usernameMatches = safeEqual(username, auth.username);
      const passwordMatches = safeEqual(password, auth.password);
      if (!usernameMatches || !passwordMatches) {
        recordLoginFailure(request.ip);
        return reply.code(401).send({ error: "invalid credentials" });
      }
      loginFailures.delete(request.ip);
      return reply
        .header("set-cookie", sessionCookie(createSessionToken(auth)))
        .send({ ok: true });
    });

    app.get("/__auth/logout", async (_request, reply) => {
      return reply
        .code(302)
        .header(
          "set-cookie",
          `${AUTH_COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`,
        )
        .header("location", "/__auth/login")
        .send();
    });
  }

  await app.register(fastifyMultipart, {
    limits: {
      fileSize: Infinity,
    },
  });

  const uploadRoot = await fs.mkdtemp(
    path.join(os.tmpdir(), "codex-web-uploads-"),
  );

  app.post("/__backend/upload", async (request, reply) => {
    if (!request.isMultipart()) {
      return reply.code(400).send({ error: "expected multipart upload body" });
    }

    const files = await Array.fromAsync(
      (async function* () {
        for await (const part of request.files()) {
          const label = part.filename?.trim() || "upload";

          const uploadedPath = path.join(uploadRoot, randomUUID());

          await fs.writeFile(uploadedPath, await part.toBuffer());

          yield {
            label,
            path: uploadedPath,
            fsPath: uploadedPath,
          };
        }
      })(),
    );

    return reply.send({ files });
  });

  await app.register(fastifyStatic, {
    root: "/",
    prefix: "/@fs/",
    decorateReply: false,
  });

  const webviewRoot = path.resolve(__dirname, "../../scratch/asar/webview");

  await app.register(fastifyStatic, {
    root: webviewRoot,
    prefix: "/",
    // 缓存策略自己用 setHeaders 全权决定，关掉默认的 max-age=0。
    cacheControl: false,
    setHeaders: (res, filePath) => {
      // Prefer explicit opt-in only: CODEX_WEB_IMMUTABLE_ASSETS=1 restores the
      // production-style long cache for true content-addressed deploys.
      const allowImmutable = process.env.CODEX_WEB_IMMUTABLE_ASSETS === "1";
      res.setHeader(
        "cache-control",
        allowImmutable && HASHED_ASSET_RE.test(path.basename(filePath))
          ? "public, max-age=31536000, immutable"
          : "no-cache",
      );
    },
  });

  // 预读 index.html 并注入客户端补丁（修复浏览器端粘贴/拖拽图片、文件等）。
  // 注入逻辑全在 src/server，asar 零改动；升级 asar 后重启服务会自动重新注入。
  // 读取失败时回退到原始 sendFile，保证页面仍可用（只是少了补丁）。
  let injectedIndexHtml = "";
  try {
    injectedIndexHtml = injectClientPatches(
      await fs.readFile(path.join(webviewRoot, "index.html"), "utf8"),
    );
  } catch (error) {
    console.error(
      `[codex-web] failed to prepare patched index.html: ${errorMessage(error)}`,
    );
  }
  // index.html 绝不能强缓存：它引用带 hash 的 assets，部署后必须立刻拿到新版，
  // 否则会一直加载旧 hash 的资源。no-cache 让浏览器每次校验后再用。
  // Clear-Site-Data 只挂在真正的入口 HTML（/、/index.html）上，用来清掉本源
  // 下曾被 immutable 锁死的错误 chunk。SPA fallback 不能带这个头，否则客户端
  // 路由每次导航都会反复清缓存，控制台刷屏。
  const sendIndexHtml = (
    reply: FastifyReply,
    { clearSiteData = false }: { clearSiteData?: boolean } = {},
  ) => {
    if (injectedIndexHtml) {
      reply.type("text/html; charset=utf-8").header("cache-control", "no-cache");
      if (clearSiteData) {
        reply.header("Clear-Site-Data", '"cache"');
      }
      return reply.send(injectedIndexHtml);
    }

    reply.header("cache-control", "no-cache");
    if (clearSiteData) {
      reply.header("Clear-Site-Data", '"cache"');
    }
    return reply.sendFile("index.html");
  };

  app.get("/", async (_request, reply) => {
    return sendIndexHtml(reply, { clearSiteData: true });
  });

  app.get("/index.html", async (_request, reply) => {
    return sendIndexHtml(reply, { clearSiteData: true });
  });

  app.setNotFoundHandler((request, reply) => {
    if (request.url.startsWith("/@fs/")) {
      return reply.code(404).send({ error: "Not Found" });
    }

    if (request.method === "GET") {
      return sendIndexHtml(reply);
    }
    return reply.code(404).send({ error: "Not Found" });
  });

  app.server.on("upgrade", (request, socket, head) => {
    const requestUrl = request.url ?? "/";
    const host = request.headers.host ?? "localhost";
    const url = new URL(requestUrl, `http://${host}`);
    if (url.pathname !== "/__backend/ipc") {
      socket.destroy();
      return;
    }

    if (
      auth &&
      !isAuthorizedRequest(auth, {
        authorization: request.headers.authorization,
        cookie: request.headers.cookie,
      })
    ) {
      socket.write("HTTP/1.1 401 Unauthorized\r\nConnection: close\r\n\r\n");
      socket.destroy();
      return;
    }

    websocketServer.handleUpgrade(request, socket, head, (upgradedSocket) => {
      websocketServer.emit("connection", upgradedSocket, request);
    });
  });

  const pendingBroadcasts: string[] = [];
  const MAX_PENDING_BROADCASTS = 500;

  bridgeState.broadcastToRenderer = (message: MainToRendererMessage): void => {
    const payload = JSON.stringify(message);
    let sent = false;
    for (const socket of sockets) {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(payload);
        sent = true;
      }
    }
    // During WS reconnect the socket set can be briefly empty; queue so turn
    // deltas aren't dropped while the browser is reconnecting.
    if (!sent) {
      pendingBroadcasts.push(payload);
      if (pendingBroadcasts.length > MAX_PENDING_BROADCASTS) {
        pendingBroadcasts.splice(
          0,
          pendingBroadcasts.length - MAX_PENDING_BROADCASTS,
        );
      }
    }
  };

  websocketServer.on("connection", (socket) => {
    sockets.add(socket);
    if (pendingBroadcasts.length > 0 && socket.readyState === WebSocket.OPEN) {
      for (const payload of pendingBroadcasts.splice(0)) {
        socket.send(payload);
      }
    }

    // Native ws ping/pong to reap half-open dead connections server-side, so a
    // client that vanished without a TCP close doesn't linger in `sockets`.
    let isAlive = true;
    socket.on("pong", () => {
      isAlive = true;
    });
    const keepalive = setInterval(() => {
      if (!isAlive) {
        clearInterval(keepalive);
        socket.terminate();
        return;
      }
      isAlive = false;
      socket.ping();
    }, WS_KEEPALIVE_INTERVAL_MS);

    socket.on("close", () => {
      clearInterval(keepalive);
      sockets.delete(socket);
    });

    socket.on("message", (rawData) => {
      let message: RendererToMainMessage;
      try {
        message = JSON.parse(String(rawData)) as RendererToMainMessage;
      } catch (error) {
        console.error("[ipc-bridge] invalid JSON payload", error);
        return;
      }

      if ((message as { type?: string }).type === "ipc-ping") {
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify({ type: "ipc-pong" }));
        }
        return;
      }

      if (message.type === "ipc-renderer-send") {
        bridgeState.handleRendererSend?.(message.channel, message.args);
        return;
      }

      if (message.type === "ipc-renderer-post-message") {
        bridgeState.handleRendererPostMessage?.(
          message.channel,
          message.portId,
        );
        return;
      }

      if (message.type === "ipc-port-message") {
        bridgeState.handlePortMessage?.(message.portId, message.data);
        return;
      }

      if (message.type === "ipc-port-close") {
        bridgeState.handlePortClose?.(message.portId);
        return;
      }

      if (message.type === "workspace-directory-entries-request") {
        const { requestId } = message;
        getWorkspaceDirectoryEntries(message)
          .then((result) => {
            const payload: MainToRendererMessage = {
              type: "workspace-directory-entries-result",
              requestId,
              ok: true,
              result,
            };
            if (socket.readyState === WebSocket.OPEN) {
              socket.send(JSON.stringify(payload));
            }
          })
          .catch((error) => {
            const payload: MainToRendererMessage = {
              type: "workspace-directory-entries-result",
              requestId,
              ok: false,
              errorMessage: errorMessage(error),
            };
            if (socket.readyState === WebSocket.OPEN) {
              socket.send(JSON.stringify(payload));
            }
          });
        return;
      }

      if (message.type === "ipc-renderer-invoke") {
        const { channel, requestId, args } = message;
        Promise.resolve(
          bridgeState.handleRendererInvoke?.(channel, args) ??
            Promise.reject(
              new Error(
                `[ipc-bridge] no ipcMain.handle for channel ${channel}`,
              ),
            ),
        )
          .then((result) => {
            const payload: MainToRendererMessage = {
              type: "ipc-renderer-invoke-result",
              requestId,
              ok: true,
              result,
            };
            if (socket.readyState === WebSocket.OPEN) {
              socket.send(JSON.stringify(payload));
            }
          })
          .catch((error) => {
            const payload: MainToRendererMessage = {
              type: "ipc-renderer-invoke-result",
              requestId,
              ok: false,
              errorMessage: errorMessage(error),
            };
            if (socket.readyState === WebSocket.OPEN) {
              socket.send(JSON.stringify(payload));
            }
          });
      }
    });
  });

  await app.listen({ host: options.host, port: options.port });
  console.log(`IPC bridge listening at ws://${options.host}:${options.port}`);
  if (auth) {
    console.log(
      `Auth enabled: login page at /__auth/login (user: ${auth.username}); set AUTH_PASSWORD="" to disable`,
    );
  } else if (options.host !== "127.0.0.1" && options.host !== "localhost") {
    console.warn(
      `WARNING: listening on ${options.host} with no authentication. ` +
        `Anyone who can reach this port can run codex as you. ` +
        `Set AUTH_PASSWORD in .env to require a login.`,
    );
  }

  ensureElectronLikeProcessContext();
  installModuleAliasHook();

  const matches = await glob("../../scratch/asar/.vite/build/main-*.js", {
    nodir: true,
    cwd: __dirname,
  });

  if (matches.length === 0) {
    throw new Error("no main bundle found");
  }

  if (matches.length > 1) {
    throw new Error("multiple main bundles found");
  }

  const module = require(matches[0]!);
  module.runMainAppStartup();
}

// 在主服务启动后，按需拉起 Telegram bridge（独立的第二条链路）。功能由
// TELEGRAM_BOT_TOKEN 触发，未配置则静默关闭。整段 try/catch 包裹 —— TG 启动失败
// 绝不能拖垮主服务。
async function startTelegramBridgeIfConfigured(): Promise<void> {
  try {
    const settings = readTelegramSettings();
    if (!settings) {
      return;
    }
    if (!settings.allowAllUsers && settings.allowedUserIds.size === 0) {
      console.warn(
        `[telegram] TELEGRAM_BOT_TOKEN is set but TELEGRAM_ALLOWED_USER_IDS is ` +
          `empty; no one is authorized. Set it to your numeric user id ` +
          `(or "*" to allow everyone).`,
      );
    }
    const codexPath = process.env.CODEX_CLI_PATH || "codex";
    const appServer = new AppServerProcess({
      codexPath,
      sandboxMode: settings.sandboxMode,
      memories: settings.memories,
    });
    appServer.start();
    const bridge = new TelegramBridge(appServer, {
      token: settings.token,
      allowedUserIds: settings.allowedUserIds,
      allowAllUsers: settings.allowAllUsers,
      defaultCwd: settings.defaultCwd,
      sandboxMode: settings.sandboxMode,
      streaming: settings.streaming,
      knownChatIds: readKnownChatIds(),
      onChatSeen: (chatId) => {
        rememberChatId(chatId);
      },
    });
    await bridge.start();
    console.log(
      `[telegram] bridge started (sandbox=${settings.sandboxMode}, ` +
        `approval=never, allowlist=${
          settings.allowAllUsers ? "*" : `${settings.allowedUserIds.size} ids`
        })`,
    );
  } catch (error) {
    console.error(
      `[telegram] failed to start bridge (main service continues): ${
        error instanceof Error ? (error.stack ?? error.message) : String(error)
      }`,
    );
  }
}

async function main(args: string[]) {
  const options = parseServerArgs(args);

  await startIpcBridgeServer(options);
  await startTelegramBridgeIfConfigured();
}

main(process.argv.slice(2));
