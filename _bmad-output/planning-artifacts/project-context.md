---
project_name: 'codex-web (codex-app-web)'
user_name: 'keh4l'
date: '2026-07-10'
sections_completed:
  ['technology_stack', 'language_rules', 'framework_rules', 'testing_rules', 'quality_rules', 'workflow_rules', 'anti_patterns']
status: 'complete'
optimized_for_llm: true
---

# Project Context for AI Agents

_本文件是 AI 智能体在 codex-web 中写代码前必须遵守的关键规则。聚焦那些不读源码就会踩坑、LLM 容易忽略的非显然约定。务必先读本文件，再动手。_

---

## 0. 第一铁律（违反即破坏可升级性）

- **只允许改 `src/server/`、`src/browser/`、文档（含 `_bmad-output/`、`README.md`、`patches/`）。绝不改动 `scratch/asar/`。**
- `scratch/asar/` 是打过补丁的**官方 ChatGPT/Codex desktop（Electron）前端**，含 OpenAI 专有代码，由 `npm run setup:asar` 从固定版本的官方 zip 重建——任何手改都会在下次重建时丢失。
- 需要改 vendored 前端时，**改 `patches/*.patch`**（由 `scripts/prepare_asar` 用 `patch --forward` 应用），不要直接编辑 asar 文件。
- 本仓库是 `0xcaff/codex-web` 的**私有 fork**，必须保持私有（含 OpenAI 代码）。一切设计以"薄封装、能干净 rebase 上游"为准。

## 1. Technology Stack & Versions

- **运行时**：Node **24+**（README 前置条件）。`better-sqlite3` 需本机编译（macOS 需 Xcode CLT）。
- **语言**：TypeScript `^6.0.2`，`strict` + `noUncheckedIndexedAccess` + NodeNext + `target esnext` + `isolatedModules` + `moduleDetection: force`，`types: []`（不自动引入 `@types/node` 全局）。
- **后端**：Fastify `^5.8.5`、`ws` `^8.20.0`、`@fastify/multipart`、`@fastify/static`、`better-sqlite3` `^12.9.0`、`glob`。
- **前端/preload 构建**：Vite `^8.0.8`，React `^19.2`（**仅** `src/browser/` 的工作区对话框等组件使用；vendored 前端自带 React，勿混淆）。
- **Electron**：`42.1.0` 仅 devDependency，用于 `launch:unpacked` 调试，**生产路径不跑 Electron**。
- **Vendored 前端**：`scratch/asar`，官方 ChatGPT app 版本 **26.707.30751**（见 `scripts/prepare`）。外层 archive/Bundle 是 `ChatGPT-darwin-arm64-*.zip` / `ChatGPT.app`；asar 内 productName、title、URL scheme 和 `codex_desktop:*` 协议仍是 Codex，禁止全局改名。

## 2. 架构心智模型（动手前必须建立）

```
浏览器(preload = src/browser/shim.ts 编译产物)
   │  WebSocket  /__backend/ipc  (纯 JSON 文本帧)
   ▼
Fastify server (src/server/main.ts)
   │  globalThis.__codexElectronIpcBridge  (进程内共享桥)
   ▼
Electron stub (src/server/electron/index.ts，假装是 electron 模块)
   │  require("electron") 被 module.ts 的 _load hook 重定向到这里
   ▼
官方主进程 (scratch/asar/.vite/build/main-*.js，被 require 进来)
   │  真正 spawn `codex app-server` (stdio JSON-RPC) 的是它
   ▼
codex 二进制 (CODEX_CLI_PATH → PATH 中的 codex)
```

- `main.ts` 启动顺序固定：`ensureElectronLikeProcessContext()`（伪造 `process.versions.electron` / `resourcesPath` / `type`）→ `installModuleAliasHook()` → `glob` 找**唯一**的 `main-*.js` → `require()` 后调 `module.runMainAppStartup()`。顺序不能乱。
- `IpcMainBridgeState`（桥的形状）在 `main.ts` 与 `electron/index.ts` **各定义一份，必须保持同构**——改一个消息字段，两边都要改。

## 3. IPC 桥规则（改通信层时）

- 桥只走**字符串/JSON**。消息类型见两端的联合类型：`ipc-renderer-invoke` / `-send` / `-post-message`、`ipc-port-message` / `-close`、`workspace-directory-entries-request`；反向 `ipc-main-event`、`ipc-renderer-invoke-result`、`workspace-directory-entries-result`。新增类型要**两端同步**加 case。
- **26.608+ MessagePort RPC**：`codex_desktop:connect-app-host` 经 `ipcRenderer.postMessage` 传一个 MessagePort，RPC 会话在其上跑。Port 留在各自进程，只有**字符串帧**过桥（JSON 无损）。`BridgedMessagePort` **故意不打日志**（RPC 太吵）。26.707 新增 app-host service 时也必须保留这条桥，不能用提前返回绕开连接。
- **双层心跳，勿删**：
  - 浏览器侧 `shim.ts`：应用层 `ipc-ping`/`ipc-pong`（15s 间隔 / 10s 超时）+ 自动重连 + `outboundQueue` 离线缓冲——兜底跨境 ws **half-open 死连接**（commit b65cdf1）。
  - server 侧 `main.ts`：native ws `ping/pong`（30s）回收半开连接。
- 任何 server→client 发送前都要判 `socket.readyState === WebSocket.OPEN`。

## 4. Electron Stub 规则（`src/server/electron/index.ts`）

- 这是官方主进程能 `require("electron")` 拿到的**全部** API。缺啥补啥；未覆盖的属性由 `createDeepStub` 兜底（记录调用并返回 deep proxy）。
- **致命陷阱**：所有 Proxy 的 `get(prop === "then")` 必须返回 `undefined`。26.608 会 `await` `BrowserWindow` / `webContents` 实例——若 stub 是 thenable，启动会**永久挂起**。
- stub 内的 renderer 消息处理（`handleRendererSend` 等）必须 `try/catch`：**一个坏消息不能拖垮整个 server 进程**。
- `app.whenReady()` 调用即把 `appReady` 置 true 并 resolve；`requestSingleInstanceLock()` 返回 true（无头单例）。

## 5. Browser Shim 规则（`src/browser/shim.ts`）

- **裸 http 场景的两个 polyfill 勿删**（codex-web 常以 http 从 LAN/服务器 IP 提供，非安全上下文）：
  - `crypto.randomUUID`：非安全上下文无此 API，Statsig / vscode-api RPC 无防护调用它 → 用 `getRandomValues` 补。
  - `globalThis.process` 最小填充：vendored 模块无 `typeof` 守卫就解引用 `process`；**`versions` 必须留空**，让 Node/Electron 探测在 guarded 代码里保持 false。
- 新版 preload 的 `codex_desktop:start-file-drag` 是同步原生能力；浏览器 shim 必须同步返回“不支持”，不能伪造成阻塞式 WebSocket RPC。
- **Statsig override 是离线/静默遥测下控制功能开关的唯一途径**（本部署故意永不连 Statsig 服务）。改功能开关看 `electronShim.overrideAdapter`：
  - layer `72216192` 强制 `enable_i18n: true`——否则选了语言仍回退英文（commit ab2405f）。i18n 经 `useLayer` 读取，override 必须打**layer** API，不是 gate。
  - gate `2929582856`（`codex_app_sunset`）强制 `false`。
- `sendSync` 里 `get-shared-object-snapshot`、`get-uses-owl-app-shell`（返 `false` = 保留经典 shell，不用 26.608 的 owl）、`get-build-flavor` 等是**硬编码快照**；上游升级时可能需同步这些常量。

## 6. Code Quality & Style Rules

- **只改 `.ts`**：`src/server/**/*.js`、`*.d.ts`、`*.js.map` 全是 `tsc` 生成物，已 gitignore。改了别 commit 编译产物。
- `noUncheckedIndexedAccess` 生效：索引访问结果可能 `undefined`，需判空或断言（如 `matches[0]!`，已确认 length===1 后）。
- `src/server/login.html` 是**源资产**，与 `main.ts` 同目录（运行时 `__dirname` 读取），不是生成物，勿删。
- 格式化用 **Prettier `^3.8.2`**（无独立配置文件，走默认）。
- 注释/提交信息/文档用**中文**，与现有风格一致（见近期 commit）。

## 7. Build & Run（命令语义）

- `build:server` = `cd src/server && tsc`。`build:browser` = `vite build --config vite.browser.config.ts`（把 `electron` alias 到 `src/browser/shim.ts`，入口 `scratch/asar/.vite/build/preload.js` → 输出 `preload.js` 到 `webview/assets`）。
- `npm run setup:asar` = 下载固定版本官方 ChatGPT app + 清理旧 `scratch` 生成树 + 提取唯一 app.asar + 应用 `patches/*` + 构建。**升级官方版本**：同步改 `scripts/prepare`、`default.nix` 与 CLI 固定哈希，再从纯净树按语义重生补丁。
- `scripts/start` = `source .env`（`set -a`）后 `exec node src/server/main.js`。**必须经此启动**：`NODE_USE_ENV_PROXY` / `HTTP(S)_PROXY` 在 node bootstrap 阶段就被读取，早于任何用户代码；直接 `node main.js` 代理设置**无效**。
- `.env` 值**一律加引号**（被 bash `source`，未引号含空格的值会被当命令执行）。`.env` 已 gitignore，模板见 `.env.example`。

## 8. Security Rules

- `AUTH_PASSWORD` 非空即开启登录：HMAC 签名 session cookie（`sessionKey` 由 `用户名:密码` 派生 → **改密码即让所有会话失效**，重启不掉线）。cookie **无 Secure flag**（常裸 http）。
- `HOST=0.0.0.0` 暴露到网络 = **任何能到该端口的人都能以你的身份跑 codex**（执行命令、读写文件、用你的凭据）。对外务必配 `AUTH_PASSWORD` + https 反代 / wireguard / tailscale。
- 凭据比较用 `safeEqual`（`timingSafeEqual`）；登录限流 10 次/15 分钟/IP，map 有上界清理。
- 改登录页 / 重定向时注意已修过的 **open redirect 与 username HTML 注入**（commit 76a3142、d6684b9）；登录页不预填用户名。

## 9. Development Workflow Rules

- 分支 `feat/*`（当前 `feat/telegram-bot`）。Commit message：**中文 + 类型前缀**（`auth:` / `ws:` / `i18n:` / `docs:` ...）。
- 一切以**薄封装**为先，便于 rebase 上游 `0xcaff/codex-web`。
- AI 工具脚手架（`_bmad/`、`.serena/`、`graphify-out/`、`.claude/`）已 gitignore，**勿提交**（可随时 `npx bmad-method install` 等重建）。
- `npx github:...` 对本 fork **无效**（npm 打包剥离嵌套 `node_modules` 的原生模块）；分发用 `git clone`。

## 10. Critical Don't-Miss（反模式清单）

- ❌ 编辑 `scratch/asar/**` 任何文件（用 patch）。
- ❌ 提交 `src/server/**/*.js` / `*.d.ts`（生成物）。
- ❌ 在 stub Proxy 上让 `then` 返回非 `undefined`（挂起启动）。
- ❌ 删除 `shim.ts` 的 `randomUUID` / `process` polyfill 或心跳逻辑。
- ❌ 把 `enable_i18n` override 打到 gate 而非 layer。
- ❌ 直接 `node src/server/main.js` 还指望代理 / `.env` 全量生效——用 `scripts/start` / `npm start`。
- ❌ 新增 IPC 消息类型只改一端（`main.ts` 与 `electron/index.ts` 必须同步）。
- ❌ 给 `.env` 的值漏引号。
- ❌ 把外层 ChatGPT 品牌全局替换进 asar 内部 Codex productName、scheme 或 IPC channel。

---

## Usage Guidelines

**For AI Agents：** 写任何代码前读本文件；不确定时选更严格/更保守的做法；改动只落在 `src/server` / `src/browser` / 文档；新模式出现时更新本文件。

**For Humans：** 保持精简、聚焦智能体易踩的非显然点；技术栈或上游版本变化时更新；定期清理已变显然的规则。

Last Updated: 2026-07-10
