import {
  mapBrowserPathToInitialRoute,
  mapMemoryPathToBrowserPath,
} from "./routes";
import {
  handleLocalFilePickerMessage,
  isLocalFilePickerMessage,
} from "./files";
import {
  installWorkspaceRootDialog,
  openSelectWorkspaceRootDialog,
  type WorkspaceDirectoryEntries,
} from "./workspace-root-dialog";

type IpcListener = (event: unknown, ...args: unknown[]) => void;

type RendererToMainMessage =
  | {
      type: "ipc-renderer-invoke";
      requestId: string;
      channel: string;
      args: unknown[];
    }
  | {
      type: "ipc-renderer-send";
      channel: string;
      args: unknown[];
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

const RECONNECT_DELAY_MS = 1_000;

// crypto.randomUUID only exists in secure contexts (https / localhost), but
// codex-web is commonly served over plain http from a LAN/server IP. Statsig
// and the vscode-api RPC layer call it unguarded, so polyfill it from
// getRandomValues, which is available in insecure contexts too.
if (typeof crypto.randomUUID !== "function") {
  crypto.randomUUID = () => {
    const bytes = crypto.getRandomValues(new Uint8Array(16));
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    const hex = Array.from(bytes, (byte) =>
      byte.toString(16).padStart(2, "0"),
    ).join("");
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
  };
}

// Minimal `process` for the browser context. Several vendored modules
// dereference it without a typeof guard (the preload's isIntelMacBuild, the
// vscode path polyfill's process.cwd, ...) and crash the app otherwise. Keep
// `versions` empty so Node/Electron detection in guarded code stays false.
if (!("process" in globalThis)) {
  (globalThis as Record<string, unknown>).process = {
    argv: [] as string[],
    arch: "arm64",
    cwd: () => "/",
    env: {} as Record<string, string | undefined>,
    platform: "darwin",
    versions: {} as Record<string, string>,
  };
}

type MemoryNavigationChange = {
  action: "POP" | "PUSH" | "REPLACE";
  delta: number;
  location: {
    hash: string;
    key: string;
    pathname: string;
    search: string;
    state: unknown;
  };
};

type ElectronShimState = {
  initialRoute?: string;
  initialSidebarState?: boolean;
  closeSidebar?: () => void;
  onMemoryNavigationChanged?: (navigation: MemoryNavigationChange) => void;
  overrideAdapter?: {
    getGateOverride?: (
      e: StatsigGateEvaluation,
      ...args: unknown[]
    ) => StatsigGateEvaluation | null;
    getLayerOverride?: (
      e: StatsigLayerEvaluation,
      ...args: unknown[]
    ) => StatsigLayerEvaluation | null;
  };
};

type StatsigGateEvaluation = {
  name: string;
  value: boolean;
  [key: string]: unknown;
};

type StatsigLayerEvaluation = {
  name: string;
  // Layer parameter values; the SDK rebuilds the typed `.get` from this when an
  // override is returned (_mergeOverride), so providing __value is enough.
  __value: Record<string, unknown>;
  [key: string]: unknown;
};

declare global {
  interface Window {
    __ELECTRON_SHIM__?: ElectronShimState;
  }
}

declare const __CODEX_APP_VERSION__: string;

let requestCounter = 0;
let socket: WebSocket | null = null;
let reconnectTimeoutId: number | null = null;
const outboundQueue: RendererToMainMessage[] = [];
const pendingInvokes = new Map<
  string,
  {
    reject: (reason?: unknown) => void;
    resolve: (value: unknown) => void;
  }
>();
const pendingDirectoryEntries = new Map<
  string,
  {
    reject: (reason?: unknown) => void;
    resolve: (value: WorkspaceDirectoryEntries) => void;
  }
>();
const rendererListeners = new Map<string, Set<IpcListener>>();
// MessagePorts handed to ipcRenderer.postMessage (26.608+ connect-app-host
// RPC). The port stays in this page; only its string frames cross the bridge.
const bridgedPorts = new Map<string, MessagePort>();

function unimplemented(method: string): never {
  debugger;
  throw new Error(`[electron-stub] ${method} is not implemented`);
}

export function emitRendererEvent(channel: string, args: unknown[]): void {
  const listeners = rendererListeners.get(channel);
  if (!listeners || listeners.size === 0) {
    return;
  }
  const event = { sender: null };
  for (const listener of listeners) {
    listener(event, ...args);
  }
}

function handleIncomingMessage(message: MainToRendererMessage): void {
  if (message.type === "ipc-main-event") {
    emitRendererEvent(message.channel, message.args);
    return;
  }

  if (message.type === "ipc-port-message") {
    bridgedPorts.get(message.portId)?.postMessage(message.data);
    return;
  }

  if (message.type === "ipc-port-close") {
    const port = bridgedPorts.get(message.portId);
    if (port) {
      bridgedPorts.delete(message.portId);
      port.close();
    }
    return;
  }

  if (message.type === "ipc-renderer-invoke-result") {
    const pending = pendingInvokes.get(message.requestId);
    if (!pending) {
      return;
    }
    pendingInvokes.delete(message.requestId);
    if (message.ok) {
      pending.resolve(message.result);
      return;
    }
    pending.reject(new Error(message.errorMessage));
    return;
  }

  if (message.type === "workspace-directory-entries-result") {
    const pending = pendingDirectoryEntries.get(message.requestId);
    if (!pending) {
      return;
    }
    pendingDirectoryEntries.delete(message.requestId);
    if (message.ok) {
      pending.resolve(message.result);
      return;
    }
    pending.reject(new Error(message.errorMessage));
  }
}

function flushOutboundQueue(): void {
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    return;
  }
  for (const message of outboundQueue.splice(0)) {
    socket.send(JSON.stringify(message));
  }
}

function scheduleReconnect(): void {
  if (reconnectTimeoutId !== null) {
    return;
  }
  reconnectTimeoutId = window.setTimeout(() => {
    reconnectTimeoutId = null;
    ensureSocket();
  }, RECONNECT_DELAY_MS);
}

function ensureSocket(): void {
  if (
    socket &&
    (socket.readyState === WebSocket.OPEN ||
      socket.readyState === WebSocket.CONNECTING)
  ) {
    return;
  }

  socket = new WebSocket(
    `${window.location.protocol === "https:" ? "wss:" : "ws:"}//${window.location.host}/__backend/ipc`,
  );
  socket.addEventListener("open", () => {
    flushOutboundQueue();
  });
  socket.addEventListener("message", (event) => {
    try {
      const message = JSON.parse(String(event.data)) as MainToRendererMessage;
      handleIncomingMessage(message);
    } catch (error) {
      console.error(
        "[electron-stub] failed to parse IPC bridge message",
        error,
      );
    }
  });
  socket.addEventListener("close", () => {
    scheduleReconnect();
  });
  socket.addEventListener("error", () => {
    scheduleReconnect();
  });
}

function enqueueMessage(message: RendererToMainMessage): void {
  outboundQueue.push(message);
  ensureSocket();
  flushOutboundQueue();
}

function nextRequestId(): string {
  requestCounter += 1;
  return `ipc_bridge_${requestCounter}`;
}

function invokeMain(channel: string, args: unknown[]): Promise<unknown> {
  const requestId = nextRequestId();
  return new Promise((resolve, reject) => {
    pendingInvokes.set(requestId, { resolve, reject });
    enqueueMessage({
      type: "ipc-renderer-invoke",
      requestId,
      channel,
      args,
    });
  });
}

function addIpcListener(channel: string, listener: IpcListener): void {
  const listeners = rendererListeners.get(channel) ?? new Set<IpcListener>();
  listeners.add(listener);
  rendererListeners.set(channel, listeners);
}

function shouldCloseSidebarForMemoryPath(path: string): boolean {
  return (
    path === "/" ||
    path.startsWith("/local/") ||
    path === "/skills" ||
    path === "/automations"
  );
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isUnhandledAddWorkspaceRootOptionMessage(value: unknown): value is {
  root?: unknown;
  type: "electron-add-new-workspace-root-option";
} {
  return (
    isRecord(value) &&
    value.type === "electron-add-new-workspace-root-option" &&
    typeof value.root !== "string"
  );
}

function isOpenInBrowserMessage(value: unknown): value is {
  type: "open-in-browser";
  url: string;
} {
  return (
    isRecord(value) &&
    value.type === "open-in-browser" &&
    typeof value.url === "string"
  );
}

function requestWorkspaceDirectoryEntries(
  directoryPath: string | null,
): Promise<WorkspaceDirectoryEntries> {
  const requestId = nextRequestId();
  return new Promise((resolve, reject) => {
    pendingDirectoryEntries.set(requestId, { resolve, reject });
    enqueueMessage({
      type: "workspace-directory-entries-request",
      requestId,
      directoryPath,
      directoriesOnly: true,
    });
  });
}

const themeMediaQuery = matchMedia("(prefers-color-scheme: dark)");
const mobileMediaQuery = matchMedia("(max-width: 768px)");
const initialSidebarState = !mobileMediaQuery.matches;
const electronShim = (window.__ELECTRON_SHIM__ ??= {});

// Statsig layer "72216192" carries `enable_i18n`, the flag that gates loading
// translated UI messages. It is delivered by the live Statsig service, which
// this deployment intentionally never reaches (telemetry is silenced and the
// app is often served over plain http). Without it the locale provider leaves
// `enable_i18n` false: the locale still resolves (the language picker even
// renders in the chosen language), but no message bundle loads, so every string
// falls back to its English default. Force it on locally so language selection
// works offline. It is read via useLayer in both the locale provider and the
// settings page, so the override must target the *layer* API.
const I18N_LAYER = "72216192";
const I18N_LAYER_OVERRIDES: Record<string, unknown> = {
  enable_i18n: true,
};

electronShim.overrideAdapter = {
  getGateOverride(e) {
    if (e.name === "2929582856") { // codex_app_sunset
      return {
        ...e,
        value: false,
      };
    }

    return null;
  },
  getLayerOverride(e) {
    if (e.name === I18N_LAYER) {
      return {
        ...e,
        __value: { ...e.__value, ...I18N_LAYER_OVERRIDES },
      };
    }

    return null;
  },
};

const initialRoute = mapBrowserPathToInitialRoute(
  window.location.pathname,
  window.location.search,
);
electronShim.initialRoute = initialRoute.memoryPath;

if (initialRoute.browserPath) {
  window.history.pushState(undefined, "", initialRoute.browserPath);
}

electronShim.initialSidebarState = initialSidebarState;
electronShim.onMemoryNavigationChanged = (navigation) => {
  const path = navigation.location.pathname;
  if (
    navigation.action !== "POP" &&
    mobileMediaQuery.matches &&
    shouldCloseSidebarForMemoryPath(path)
  ) {
    electronShim.closeSidebar?.();
  }

  const browserPath = mapMemoryPathToBrowserPath(path);
  if (browserPath == null) {
    return;
  }

  if (browserPath.titleChange) {
    document.title = browserPath.titleChange;
  }

  if (window.location.pathname === browserPath.path) {
    window.history.replaceState(undefined, "", browserPath.path);
    return;
  }

  window.history.pushState(undefined, "", browserPath.path);
};

const buildFlavor: "prod" | "dev" | "agent" | string = "prod";

export const ipcRenderer = {
  invoke(channel: string, ...args: unknown[]): Promise<unknown> {
    if (channel === "codex_desktop:message-from-view" && args.length === 1) {
      if (isOpenInBrowserMessage(args[0])) {
        window.open(args[0].url, "_blank", "noopener,noreferrer");
      }

      if (isLocalFilePickerMessage(args[0])) {
        return handleLocalFilePickerMessage(args[0]);
      }

      if (isUnhandledAddWorkspaceRootOptionMessage(args[0])) {
        return openSelectWorkspaceRootDialog({
          listDirectory: requestWorkspaceDirectoryEntries,
        }).then((root) => {
          if (!root) {
            return undefined;
          }

          return invokeMain(channel, [{ ...args[0], root }]);
        });
      }
    }

    return invokeMain(channel, args);
  },
  on(channel: string, listener: IpcListener): unknown {
    addIpcListener(channel, listener);
    return this;
  },
  once(channel: string, listener: IpcListener): unknown {
    const wrapped: IpcListener = (event, ...args) => {
      this.removeListener(channel, wrapped);
      listener(event, ...args);
    };
    addIpcListener(channel, wrapped);
    return this;
  },
  addListener(channel: string, listener: IpcListener): unknown {
    addIpcListener(channel, listener);
    return this;
  },
  removeListener(channel: string, listener: IpcListener): unknown {
    rendererListeners.get(channel)?.delete(listener);
    return this;
  },
  off(channel: string, listener: IpcListener): unknown {
    return this.removeListener(channel, listener);
  },
  send(channel: string, ...args: unknown[]): void {
    enqueueMessage({
      type: "ipc-renderer-send",
      channel,
      args,
    });
  },
  postMessage(channel: string, _message: unknown, transfer?: unknown[]): void {
    const port = transfer?.[0];
    if (!(port instanceof MessagePort)) {
      console.warn(
        `[electron-shim] ipcRenderer.postMessage(${channel}) without a MessagePort dropped`,
      );
      return;
    }

    const portId =
      typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `port_${nextRequestId()}`;
    bridgedPorts.set(portId, port);
    port.onmessage = (event) => {
      enqueueMessage({
        type: "ipc-port-message",
        portId,
        data: event.data,
      });
    };
    enqueueMessage({
      type: "ipc-renderer-post-message",
      channel,
      portId,
    });
  },
  sendSync(channel: string, ..._args: unknown[]): unknown {
    if (channel === "codex_desktop:get-sentry-init-options") {
      return {
        codexAppSessionId: "42626fde-7064-471f-b44d-b1a7ad849c7f",
        buildFlavor,
        buildNumber: null,
        appVersion: __CODEX_APP_VERSION__,
        enabled: false,
      };
    }

    if (channel === "codex_desktop:get-build-flavor") {
      return buildFlavor;
    }

    if (channel === "codex_desktop:get-uses-owl-app-shell") {
      // 26.608+: gate for the new "owl" app shell; keep the classic shell.
      return false;
    }

    if (channel === "codex_desktop:get-shared-object-snapshot") {
      return {
        host_config: {
          id: "local",
          display_name: "Local",
          kind: "local",
        },
        remote_connections: [],
        remote_control_connections: [],
        remote_control_connections_state: {
          available: false,
          authRequired: false,
        },
        pending_worktrees: [],
        statsig_default_enable_features: {
          enable_request_compression: true,
          collaboration_modes: true,
          personality: true,
          request_rule: true,
          fast_mode: true,
          image_generation: true,
          image_detail_original: true,
          workspace_dependencies: true,
          guardian_approval: true,
          apps: true,
          plugins: true,
          tool_search: true,
          tool_suggest: false,
          tool_call_mcp_elicitation: true,
          memories: false,
          realtime_conversation: false,
        },
      };
    }

    if (channel === "codex_desktop:get-system-theme-variant") {
      return themeMediaQuery.matches ? "dark" : "light";
    }

    return unimplemented("ipcRenderer.sendSync");
  },
};

ensureSocket();

export const contextBridge = {
  exposeInMainWorld(_key: string, _api: unknown): void {
    Reflect.set(window, _key, _api);
  },
};

export const webUtils = {
  getPathForFile(_file: File): string | null {
    return unimplemented("webUtils.getPathForFile");
  },
};
