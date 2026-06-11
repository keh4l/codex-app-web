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
import { WebSocket, WebSocketServer } from "ws";
import Fastify from "fastify";
import fastifyMultipart from "@fastify/multipart";
import fastifyStatic from "@fastify/static";
import { installModuleAliasHook } from "./module";
import { glob } from "glob";

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
      value: "41.2.0",
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
      return reply
        .type("text/html; charset=utf-8")
        .send(page.replaceAll("__DEFAULT_USERNAME__", auth.username));
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

  await app.register(fastifyStatic, {
    root: path.resolve(__dirname, "../../scratch/asar/webview"),
    prefix: "/",
  });

  app.get("/", async (_request, reply) => {
    return reply.sendFile("index.html");
  });

  app.setNotFoundHandler((request, reply) => {
    if (request.url.startsWith("/@fs/")) {
      return reply.code(404).send({ error: "Not Found" });
    }

    if (request.method === "GET") {
      return reply.sendFile("index.html");
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
      socket.write(
        "HTTP/1.1 401 Unauthorized\r\nConnection: close\r\n\r\n",
      );
      socket.destroy();
      return;
    }

    websocketServer.handleUpgrade(request, socket, head, (upgradedSocket) => {
      websocketServer.emit("connection", upgradedSocket, request);
    });
  });

  bridgeState.broadcastToRenderer = (message: MainToRendererMessage): void => {
    const payload = JSON.stringify(message);
    for (const socket of sockets) {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(payload);
      }
    }
  };

  websocketServer.on("connection", (socket) => {
    sockets.add(socket);

    socket.on("close", () => {
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

      if (message.type === "ipc-renderer-send") {
        bridgeState.handleRendererSend?.(message.channel, message.args);
        return;
      }

      if (message.type === "ipc-renderer-post-message") {
        bridgeState.handleRendererPostMessage?.(message.channel, message.portId);
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

async function main(args: string[]) {
  const options = parseServerArgs(args);

  await startIpcBridgeServer(options);
}

main(process.argv.slice(2));
