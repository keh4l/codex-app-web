# 实现 Spec：codex-web 接入 Telegram Bot（复刻 codex-mobile）

> 本文件是 `bmad-quick-dev`（QQ）的输入 brief，自包含——新 context 的 agent 读这一份即可上手实现，无需重新调研。
> 作者：前置调研会话（2026-06-12）。语言：中文。

---

## 1. 上下文与目标

**目标**：在本仓库 codex-web（`0xcaff/codex-web` 的私有 fork）里复刻参考项目 [`friuns2/codex-mobile`](https://github.com/friuns2/codex-mobile)（npm 包 `codexapp`）的 **Telegram Bot 桥接**功能：用户在 Telegram 里给 bot 发消息，消息进入一个 codex 会话（thread），codex 跑完后把 assistant 回复发回 Telegram。

**硬约束（最重要）**：**不得影响官方 codex app 前端资源的更新流程**。本 fork 的设计哲学是所有自定义代码都放在 `src/server/`（fork 自有），`scratch/asar/`（打过补丁的官方 Electron 前端）一字不动；升级官方前端只需重跑 `setup:asar`。因此 TG Bot 的所有新代码必须落在 `src/server/`，走 `build:server`（tsc）编译，**绝不碰 `scratch/asar/`**。

**用户已确认的两个关键决策**：
1. **执行权限**：完全访问，复刻原版 —— `approval_policy="never"` + `sandbox_mode="danger-full-access"` 作为默认值；做成 `.env` 开关 `TELEGRAM_SANDBOX_MODE`（审批策略固定 `never`，因为 Telegram 端无法做交互式审批，否则需要确认的 turn 会永久卡住）。
2. **持久化**：记忆 chat + 上线通知 —— 把见过的 chatId 持久化到 `~/.codex/telegram-bridge.json`，服务重启后主动给这些 chat 发一条"已上线"。

---

## 2. 可行性结论：完全可行，且天然契合 fork 架构

三条已验证的事实支撑：

1. **codex-mobile 的 TG bridge 是纯后端**：原生 `fetch` 长轮询（`getUpdates`，非 webhook），**零** telegram 库依赖；自己 `spawn` 一个 `codex app-server` 子进程，走 **stdio 换行分隔 JSON-RPC**；只用到 4 个方法 + 1 个通知。不依赖它的 Vue 前端。
2. **协议完全一致**：codex-web 内置 codex（26.513）用的是 **v2 thread API**（实测 grep `scratch/asar/.vite/build/main-*.js`：`thread/start`/`turn/start`/`thread/read`/`thread/list`/`turn/completed` 均存在，`newConversation` 出现 **0** 次）。与 codex-mobile 用的协议**逐一对应**，移植无需改协议。
3. **新代码完全隔离**：TG 这条链路自己 spawn 一个独立 app-server，与浏览器那条链路（`main.ts` 的 WS 桥 → 官方主进程 → 它自己 spawn 的 app-server）**互不干扰**，二者共享 `~/.codex`（凭据 + 历史 DB）。

---

## 3. 架构事实（实现必读）

### 3.1 codex-web 后端启动链路（`src/server/main.ts`）

- `main(args)`（约 `main.ts:799`）→ 仅调用 `startIpcBridgeServer(options)`。
- `startIpcBridgeServer`（约 `main.ts:425-797`）：建 Fastify + `WebSocketServer`；配置认证（onRequest hook、登录路由）；注册 multipart / `/__backend/upload` / static（`/@fs/` 与 `scratch/asar/webview`）/ 404 兜底；处理 `/__backend/ipc` 的 WS 升级与消息（把浏览器 ipcRenderer 调用桥到 `bridgeState.handleRendererInvoke/Send/...`）；`await app.listen(...)`；最后 `ensureElectronLikeProcessContext()` + `installModuleAliasHook()` + glob 找到 `scratch/asar/.vite/build/main-*.js` 并 `require(...)` 后 `module.runMainAppStartup()` —— **这一步启动官方主进程，它内部 spawn 浏览器那条链路的 app-server**。
- **关键洞察**：`src/server` 自己**不** spawn app-server（grep 确认）。真正 spawn 的是官方主进程（`scratch/asar/.vite/build/main-CIL4OHS5.js`）。`src/server/module.ts` 用 `Module._load` hook 把官方主进程的 `require("electron")` 重定向到 `src/server/electron/index.ts`（一个 Electron API 全 stub）。

### 3.2 配置链路（`.env` → 环境变量）

- `scripts/start`：`set -a; . ./.env; set +a; exec node src/server/main.js`。所以 `.env` 里任何变量都成为 `process.env.*`，TG bridge 直接 `process.env.TELEGRAM_*` 即可读到。
- `CODEX_CLI_PATH`：codex 二进制路径，留空则用 PATH 里的 `codex`。**TG bridge 必须复用同一个变量来 spawn 自己的 app-server**，保证与浏览器那条用同一个 codex。
  - 额外好处：若用户用了代理模式（`CODEX_CLI_PATH` 指向 `scripts/codex_remote_proxy` + `CODEX_UNIX_SOCKET`），TG spawn `proxy app-server` 会**连到同一个共享 app-server**，自动消除双 app-server 并发问题。直接复用 `CODEX_CLI_PATH` 让两种模式都自动适配，无需特判。

### 3.3 构建

- `npm run build:server` = `cd src/server && tsc`。新加的 `src/server/*.ts` 会被 tsc 自动编译进 `src/server/*.js`。
- `.gitignore` 忽略 `src/server/**/*.js`（生成物不入库，靠 build:server 重建）。
- **不要动** `build:browser` / `scratch/asar`。

---

## 4. 参考源码（codex-mobile）

源码可能已 clone 在 `/tmp/codex-mobile`（前置会话所为，可能已被清理）。若不在，重新获取：
```bash
git clone https://github.com/friuns2/codex-mobile /tmp/codex-mobile
```
关键文件：
- `src/server/telegramThreadBridge.ts`（~765 行）—— `class TelegramThreadBridge`，整个 TG bot。
- `src/server/codexAppServerBridge.ts` —— `class AppServerProcess`（spawn + stdio JSON-RPC + `rpc()`/`onNotification()`/`initialize` 握手 + server-request 处理）。
- `src/server/appServerRuntimeConfig.ts` —— `buildAppServerArgs()`（app-server 命令行参数）。
- `documentation/APP_SERVER_DOCUMENTATION.md` 与 `documentation/app-server-schemas/typescript/v2/*.ts` —— 协议类型定义。

`TelegramThreadBridge` 只依赖一个注入接口（完全解耦 app-server 内部）：
```ts
type AppServerLike = {
  rpc: (method: string, params: unknown) => Promise<unknown>;
  onNotification: (listener: (value: { method: string; params: unknown }) => void) => () => void;
};
```

### 协议细节（v2，复刻必备）

JSON-RPC 框架：换行分隔 JSON over stdin/stdout。
- `{ jsonrpc:"2.0", id, method, params }` = 请求；响应按 `id` 匹配。
- 有 `method` 无 `id` = 通知（notification）。
- 有 `method` 有 `id` = 服务端发起的请求（审批等）；本场景 `approval_policy=never` 故不会出现，但应实现通用回复路径以防卡死。

握手（首次 rpc 前必须，懒执行）：
```ts
await call("initialize", { clientInfo:{ name:"codex-web", version:"0.1.0" }, capabilities:{ experimentalApi:true } });
sendLine({ jsonrpc:"2.0", method:"initialized" }); // 通知
```

bridge 实际用到的方法：
| 用途 | method | params | 返回字段 |
|---|---|---|---|
| 建 thread | `thread/start` | `{ cwd }` | `res.thread.id` |
| 发消息/起 turn | `turn/start` | `{ threadId, input:[{ type:"text", text }] }` | `res.turn` |
| 读 thread（取最新回复 / 历史） | `thread/read` | `{ threadId, includeTurns:true }` | `res.thread.turns[].items[]` |
| 列最近 thread（picker） | `thread/list` | `{ archived:false, limit:20, sortKey:"updated_at", modelProviders:[] }` | `res.data[]`（`{id,name,preview,cwd}`）|

唯一消费的通知：`turn/completed`，params 形如 `{ threadId, turn }`（threadId 也可能在 `turn.threadId`；turnId 在 `turn.id`）。处理：按 threadId 找映射的 chatIds → 用 `turnId` 去重 → `thread/read` 取最后一个 `agentMessage.text` → 发回各 chat。**不聚合流式 delta**，等 turn 完成后整条 re-read（更简单）。

`thread/read` 返回的 item 类型里，本场景只读两种：`{type:"userMessage",...}`、`{type:"agentMessage", text}`。取「最后一个非空 agentMessage 的 text」。

移植注意：原版发 `input:[{type:"text",text}]`；若本仓库 app-server 对 schema 更严格，补 `text_elements:[]`。实现时先按原版发，turn 失败再补。

---

## 5. 推荐实现方案（文件级）

全部新文件落在 `src/server/`。

### 5.1 新增 `src/server/app-server.ts`
从 codex-mobile `codexAppServerBridge.ts` 抽取精简的 `AppServerProcess`：
- 构造参数：`{ codexPath, sandboxMode, defaultCwd }`。`codexPath = process.env.CODEX_CLI_PATH || "codex"`。
- `start()`：`spawn(codexPath, buildArgs(), { stdio:["pipe","pipe","pipe"] })`。
  - `buildArgs()` = `["app-server", "-c", 'approval_policy="never"', "-c", `sandbox_mode="${sandboxMode}"`]`（参考 `appServerRuntimeConfig.ts`）。
- stdout 按行解析（`readline` 或自维护 buffer 按 `\n` split）；实现 `handleLine`：按 `id` resolve pending / 有 method 无 id → emit notification / 有 method 有 id → 通用回复（result 或 error）防卡。
- 懒执行 `ensureInitialized()`（见 §4 握手）。
- 暴露 `rpc(method, params): Promise<unknown>` 与 `onNotification(cb): () => void`（满足 §4 的 `AppServerLike`）。
- 进程退出/出错时日志 + 自动重启（可选，至少要记日志，别静默死掉）。

### 5.2 新增 `src/server/telegram-bridge.ts`
从 `telegramThreadBridge.ts` 移植 `TelegramBridge`（几乎照搬，去掉它的 Vue/HTTP 配置耦合）：
- 构造：`new TelegramBridge(appServer: AppServerLike, { token, allowedUserIds, defaultCwd, onChatSeen })`。
- 长轮询 `pollLoop`：`getUpdates`（`timeout:45, offset, allowed_updates:["message","callback_query"]`）；出错 sleep 1.5s。
- `start()`：注册 `appServer.onNotification(handleNotification)`、`setMyCommands`、启动 poll、（持久化档）`notifyOnlineForKnownChats`。
- 命令（全部复刻，见 §6）。
- 内存映射：`threadIdByChatId: Map<number,string>`、`chatIdsByThreadId: Map<string,Set<number>>`、`lastForwardedTurnByThreadId: Map<string,string>`。
- 鉴权 `isAllowedSender`（基于 `message.from.id`，支持 `*`）；拒绝时回显其 user id 提示加白名单。
- 格式化：markdown→Telegram HTML（`<pre><code>`/`<b>`/`<i>`/`<a>`，转义 `& < >`）；发送 `parse_mode:"HTML"`，失败回退纯文本；按 3500 字分片（优先 `\n\n`>`\n`>空格>硬切）；inline keyboard 仅用于 thread picker（`callback_data:"thread:<id>"`）。

### 5.3 新增 `src/server/telegram-config.ts`
- 读 `.env`：`TELEGRAM_BOT_TOKEN`、`TELEGRAM_ALLOWED_USER_IDS`（逗号分隔，支持 `*`）、`TELEGRAM_DEFAULT_CWD`（默认服务进程 cwd）、`TELEGRAM_SANDBOX_MODE`（默认 `danger-full-access`）。
- 持久化：`~/.codex/telegram-bridge.json`，形如 `{ chatIds: number[] }`（token/allowlist 走 .env，不入此文件）。提供 `readConfig()` / `rememberChatId(id)`（去重写回）。`~/.codex` 路径 = `process.env.CODEX_HOME || path.join(os.homedir(), ".codex")`。

### 5.4 改 `src/server/main.ts`（最小改动）
在 `main()` 末尾追加（不进 `startIpcBridgeServer` 内部，保持解耦）：
```ts
async function main(args: string[]) {
  const options = parseServerArgs(args);
  await startIpcBridgeServer(options);
  await startTelegramBridgeIfConfigured(); // 新增
}
```
`startTelegramBridgeIfConfigured`：读 token，没配就直接 return（功能默认关闭）；配了则 `new AppServerProcess({...}).start()` + `new TelegramBridge(appServer, {...})`、`bridge.start()`、`onChatSeen → rememberChatId`。整段 try/catch 包裹——**TG 启动失败绝不能拖垮主服务**。

### 5.5 改 `.env.example` 与 `README.md`
- `.env.example` 增一节：`TELEGRAM_BOT_TOKEN` / `TELEGRAM_ALLOWED_USER_IDS`（必填、安全闸门）/ `TELEGRAM_DEFAULT_CWD` / `TELEGRAM_SANDBOX_MODE`，带中文注释与安全警示。
- `README.md` 安全节补一段：TG Bot 是**又一个主机级访问入口**，默认 `danger-full-access` 无沙箱，allowlist 内任何人发消息 = 以服务进程身份在主机任意执行；务必保密 bot token + 严格 allowlist；`TELEGRAM_SANDBOX_MODE` 可收紧。

---

## 6. 复刻范围清单（对齐 codex-mobile）

命令（`handleIncomingUpdate` 字符串匹配）：
- `/start` — 帮助 + thread picker
- `/threads` — `thread/list` → inline keyboard 选择
- `/newthread` — `thread/start{cwd}` → 绑定 chat→thread
- `/thread <id>` — 绑定到已有 thread
- `/current` — 显示当前绑定 thread
- `/history` — `thread/read` 走 turns，输出最近 User/Assistant 行（截断 ~3800 字）
- `/status` — 配置/活跃/映射数/allowlist/lastError
- `/whoami` — from.id、chat.id、是否授权
- `/help` — 命令参考
- 其它任意文本 — 复用/新建 thread → `turn/start` → 等 `turn/completed` → 回发

行为：HTML 格式化 + 纯文本 fallback + 3500 字分片；thread picker inline keyboard（callback `thread:<id>`）；allowlist 鉴权（支持 `*`）；长轮询 timeout 45。
**不含**（原版也没有）：图片收发、审批 inline 按钮（因 `approval_policy=never`）。

---

## 7. 风险与缓解（实现时注意）

1. **双 app-server 并发访问 `~/.codex` SQLite**：浏览器一条 + TG 一条，共享历史 DB。codex 设计上支持多进程共存（CLI+desktop），且 TG 写频率低，预期 OK。**实现后首先验证**：同时开 web UI 与 TG 发消息，看有无 `SQLITE_BUSY` / 历史错乱。若有问题，降级方案：引导用户用代理模式（`CODEX_UNIX_SOCKET` 共享单 app-server，直接复用 `CODEX_CLI_PATH` 即自动生效，见 §3.2）。
2. **安全**：见 §5.5。这是核心风险，文档必须讲清。
3. **协议漂移**：未来升级内置 codex 若改 thread API，TG 要跟着改。method 名集中在 `app-server.ts`，便于维护；与浏览器那条共担此风险。

---

## 8. 端到端验证

1. `cp .env.example .env`，填 `CODEX_CLI_PATH`（本机用 `/Applications/Codex.app/Contents/Resources/codex`）、`TELEGRAM_BOT_TOKEN`（@BotFather 建）、`TELEGRAM_ALLOWED_USER_IDS`（自己的 user id，可先用 @userinfobot 查）。
2. `npm run build:server && npm start`。
3. 给 bot 发 `/whoami` → 应回显你的 user id 且 authorized；发 `/newthread` → 回 thread id；发一句任务（如「列出当前目录文件」）→ 稍候应收到 codex 的 assistant 回复。
4. `/threads` → 出现 inline 按钮，点选能绑定。
5. 验证隔离：浏览器打开 web UI 正常用，与 TG 并发互不影响（重点观察 §7.1）。
6. 验证持久化：重启服务，已交互过的 chat 应收到「已上线」。
7. 验证**核心约束**：确认本次改动 `git status` 只动了 `src/server/*`、`.env.example`、`README.md`，`scratch/asar/` 零改动；重跑 `npm run setup:asar` 升级官方前端不受影响。

---

## 9. 给 QQ（bmad-quick-dev）的提示

- 本 spec 的 clarify/plan 已基本完成，可直接进入 implement。
- 实现顺序建议：`app-server.ts`（先用一个小脚本验证能 spawn + initialize + thread/start 往返）→ `telegram-config.ts` → `telegram-bridge.ts` → 接进 `main.ts` → 文档。
- 每步用 `npm run build:server` 确认 tsc 通过（本仓库 tsc 严格）。
- 完成后建议跑 BMAD 的代码评审（CR / 对抗评审）做质量把关。
