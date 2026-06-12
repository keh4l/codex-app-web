---
title: 'codex-web 接入 Telegram Bot（复刻 codex-mobile TG bridge）'
type: 'feature'
created: '2026-06-12'
status: 'done'
baseline_commit: '75cb6e86e3d625375854698ad03efd5b90f7a510'
context:
  - '{project-root}/_bmad-output/planning-artifacts/tg-bot-integration-spec.md'
  - '{project-root}/_bmad-output/planning-artifacts/project-context.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** codex-web 目前只能经浏览器 WS 链路使用 codex。希望像参考项目 `friuns2/codex-mobile` 那样，能在 Telegram 里给 bot 发消息驱动一个 codex 会话（thread），codex 跑完把 assistant 回复发回 Telegram，实现远程/移动场景的免前端访问。

**Approach:** 在 `src/server/` 新增一条**完全隔离**的后端链路：自己 `spawn` 一个独立 `codex app-server`（stdio 换行分隔 JSON-RPC，复用 `CODEX_CLI_PATH`），用原生 `fetch` 长轮询 Telegram `getUpdates`，把消息桥接到 v2 thread API（`thread/start`/`turn/start`/`thread/read`/`thread/list` + `turn/completed` 通知）。功能默认关闭，由 `.env` 的 `TELEGRAM_BOT_TOKEN` 触发启用。

## Boundaries & Constraints

**Always:**
- 所有新代码只落在 `src/server/`，外加 `.env.example`、`README.md` 两处文档；走 `build:server`（tsc）编译。
- 用 `node:` 前缀 import 引用 Node 内置 API（匹配 main.ts 现有风格，`types:[]` 约束下必需）；`fetch` 用全局。
- `approval_policy="never"` **固定写死**（Telegram 端无法交互式审批，否则需确认的 turn 会永久卡死）。
- `sandbox_mode` 默认 `danger-full-access`，由 `.env` 开关 `TELEGRAM_SANDBOX_MODE` 覆盖；非法值回退默认并告警。
- spawn app-server 复用 `CODEX_CLI_PATH || "codex"`，与浏览器那条用同一个 codex（含代理模式自动适配）。
- TG 启动全程 try/catch 包裹——**启动失败绝不能拖垮主服务**。

**Ask First:**
- 若 `turn/start` 因 app-server schema 更严格而失败（如需补 `text_elements:[]`），先按原版 `input:[{type:"text",text}]` 发，失败再调整——此调整可自主，无需问。
- 若验证发现双 app-server 并发访问 `~/.codex` SQLite 出现 `SQLITE_BUSY`/历史错乱 → HALT 报告，再议降级方案。

**Never:**
- 绝不改动 `scratch/asar/`（含官方专有前端，破坏可升级性）。
- 不提交 `src/server/**/*.js` / `*.d.ts` 等 tsc 生成物（已 gitignore）。
- 不引入任何 telegram 第三方库（原版零依赖，纯 fetch）。
- 不实现图片收发、审批 inline 按钮（原版也没有，因 `approval_policy=never`）。
- 不照搬 codex-mobile 的 provider / freeMode 等依赖其专有后端的 `-c` 参数（`features.memories` 已按用户决策纳入，见 Spec Change Log）。

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| 授权用户普通文本 | text，from.id 在 allowlist | 复用绑定 thread（无则新建）→ `turn/start` → 等 `turn/completed` 回发 assistant | turn 失败回错误文本 |
| 未授权用户 | from.id 不在 allowlist（且无 `*`） | 回「未授权」并回显其 user id 以便加白名单 | — |
| `turn/completed` 通知 | `{threadId, turn}` | 用 turnId 去重 → `thread/read` 取最后非空 `agentMessage.text` → HTML 化 + 3500 字分片发回该 thread 的所有 chat | 无 agentMessage 则静默忽略 |
| `/threads` | 命令 | `thread/list` → inline keyboard（`callback_data:"thread:<id>"`） | RPC 失败回错误文本 |
| `thread:<id>` 回调 | callback_query | 绑定 chat→thread 并确认 | — |
| HTML 发送失败 | parse_mode HTML 被拒 | 回退纯文本重发 | — |
| 未配置 token | 服务启动 | TG 模块直接 return，主服务照常 | — |
| TG 初始化抛错 | 服务启动 | try/catch 吞掉 + 记日志，主服务继续 | 记 lastError |
| 服务重启 | 进程启动 | 读持久化 chatIds → 各发一条「已上线」 | 读/发失败忽略 |

</frozen-after-approval>

## Code Map

- `src/server/main.ts` -- 后端入口；`main()`（:800-803）在 `await startIpcBridgeServer` 后追加 `await startTelegramBridgeIfConfigured()`；新增该 wiring 函数。Node API 用 `node:` 前缀 import 的现有风格。
- `src/server/app-server.ts` -- **新增**。`class AppServerProcess`：spawn app-server + stdio JSON-RPC + 懒握手 + `rpc()`/`onNotification()`。
- `src/server/telegram-bridge.ts` -- **新增**。`class TelegramBridge`：长轮询 + 命令 + 映射 + 鉴权 + 格式化/分片，依赖注入的 `AppServerLike`。
- `src/server/telegram-config.ts` -- **新增**。读 `.env` 的 `TELEGRAM_*` + `~/.codex/telegram-bridge.json` 持久化（`readConfig`/`rememberChatId`）。
- `.env.example` -- 新增 `TELEGRAM_*` 配置段（含中文注释 + 安全警示）。
- `README.md` -- 安全节补一段 TG Bot 风险说明。
- 参考源码（蒸馏细节见 Design Notes）：`/tmp/codex-mobile/src/server/{telegramThreadBridge,codexAppServerBridge,appServerRuntimeConfig}.ts`。

## Tasks & Acceptance

**Execution:**
- [x] `src/server/telegram-config.ts` -- 实现 env 读取（`TELEGRAM_BOT_TOKEN`/`TELEGRAM_ALLOWED_USER_IDS` 逗号分隔含 `*`/`TELEGRAM_DEFAULT_CWD`/`TELEGRAM_SANDBOX_MODE` 默认 `danger-full-access` 且白名单校验）+ `~/.codex/telegram-bridge.json` 的 `readConfig()`/`rememberChatId(id)`（去重写回，路径 `CODEX_HOME||~/.codex`）-- 配置与持久化先行，余文件依赖它。
- [x] `src/server/app-server.ts` -- 移植精简 `AppServerProcess`：`spawn(codexPath, ["app-server","-c",'approval_policy="never"',"-c",`sandbox_mode="${mode}"`])`；stdout 按 `\n` 切行 + JSON.parse；`rpc(method,params)`（nextId++ / pending map / 进程退出批量 reject）；懒 `ensureInitialized`（initialize 握手 + initialized 通知）；server-request（有 method 有 id）通用回复防卡；`onNotification`；退出记日志 -- 满足 `AppServerLike`。
- [x] `src/server/telegram-bridge.ts` -- 移植 `TelegramBridge`：`pollLoop`/`getUpdates`（timeout45/offset/`allowed_updates:["message","callback_query"]`，出错 sleep1.5s）；命令 `/start /threads /newthread /thread<id> /current /history /status /whoami /help` + 普通文本；`turn/completed` 转发（去重 + thread/read 取最后 agentMessage）；映射三件套；`isAllowedSender`（`*` 通配，拒绝回显 id）；markdown→HTML + 纯文本 fallback + 3500 字分片；thread picker inline keyboard；`setMyCommands`；`start()` 注册通知/命令/启动 poll/上线通知 -- bridge 主体。
- [x] `src/server/main.ts` -- 新增 `startTelegramBridgeIfConfigured()`（读 token，未配 return；配了则 `new AppServerProcess().start()` + `new TelegramBridge(appServer,{...,onChatSeen:rememberChatId})` + `bridge.start()`，整段 try/catch），并在 `main()` 末尾调用 -- 接线。
- [x] `.env.example` + `README.md` -- 新增 TG 配置段与安全警示 -- 文档。

**Acceptance Criteria:**
- Given 未设 `TELEGRAM_BOT_TOKEN`，when `npm start`，then 服务正常启动且无 TG 相关报错（功能静默关闭）。
- Given 配好 token+allowlist，when 给 bot 发 `/whoami`，then 回显自己的 user id 且标记 authorized。
- Given 已绑定 thread，when 发一句任务文本，then 稍候收到 codex 的 assistant 回复（经 HTML 化分片）。
- Given 本次改动，when `git status`，then 仅 `src/server/*`（不含 .js 生成物）、`.env.example`、`README.md` 变更，`scratch/asar/` 零改动。
- Given `npm run build:server`，when 编译，then tsc 严格模式零报错。

## Spec Change Log

- **2026-06-13 — 纳入 features.memories（human 决策，非 loopback）**：用户在 step-04 后确认要更完整复刻参考项目。修改：Boundaries `Never` 移除「不照搬 memories」；`buildAppServerArgs` 增加第三个 `-c features.memories=<bool>`；新增 `.env` 开关 `TELEGRAM_MEMORIES`（默认开，对齐原版）。provider/freeMode 仍排除（依赖 codex-mobile 专有后端）。KEEP：approval_policy 仍固定 never、sandbox 白名单校验不变。
- **2026-06-13 — step-04 对抗式 review patch（无 intent_gap/bad_spec）**：三方 review 确认实现忠实 spec、0 高/严重违规。auto-fix 11 项 patch：渲染层重写为占位符法（修内联代码/链接二次解析 + `<a href>` 属性转义）、turnId 缺失时内容级兜底去重、getUpdates 加 AbortController 超时、allowlist 用安全整数校验、callback_data 64 字节校验 + picker try/catch、空 set 清理、重启重置 nextId、放宽 server-request id 类型、空命令→help、非文本消息提示。defer 4 项见 `deferred-work.md`。

## Design Notes

**协议（v2，换行分隔 JSON over stdin/stdout）**：`{jsonrpc:"2.0",id,method,params}`=请求（按 id 匹配响应）；有 method 无 id=通知；有 method 有 id=server-request（需通用回复防卡）。握手懒执行：`call("initialize",{clientInfo:{name:"codex-web",version:"0.1.0"},capabilities:{experimentalApi:true}})` 然后发通知 `{jsonrpc:"2.0",method:"initialized"}`。用到的 method：`thread/start{cwd}→res.thread.id`、`turn/start{threadId,input:[{type:"text",text}]}`、`thread/read{threadId,includeTurns:true}→res.thread.turns[].items[]`、`thread/list{archived:false,limit:20,sortKey:"updated_at",modelProviders:[]}→res.data[]`。

**turn/completed 处理**：threadId 取 `params.threadId||params.turn?.threadId`，turnId 取 `params.turnId||params.turn?.id`；按 threadId 找 chatIds → turnId 去重（`lastForwardedTurnByThreadId`）→ `thread/read` 从后往前取第一个非空 `agentMessage.text` → 分片发回。不聚合流式 delta。

**映射**：`threadIdByChatId: Map<number,string>`（1:1）、`chatIdsByThreadId: Map<string,Set<number>>`（1:N）、`lastForwardedTurnByThreadId: Map<string,string>`。

**分片算法**（max 3500）：优先 `lastIndexOf("\n\n")` > `"\n"` > `" "`（断点须 ≥ 50% maxLength，否则降级）> 硬切。

**与参考源码的差异**（务必注意，别照抄全部）：① `buildArgs` 发 approval_policy（固定 never）+ sandbox_mode + features.memories 三个 `-c`；**丢弃** provider/freeMode（依赖 codex-mobile 专有后端）；② clientInfo.name 用 `"codex-web"`；③ 持久化 chatIds + 上线通知是本仓库新增，参考源码无——自研 `telegram-config.ts`，`start()` 末尾遍历持久化 chatIds 发「已上线」；④ env 变量名用 `TELEGRAM_*`（非 codex-mobile 的 `CODEXUI_*`）。

**rpc 超时**：原版无显式超时，靠进程退出批量 reject。保持一致即可（turn 长任务不宜设短超时）。

**健壮性叮嘱（批准时追加，冻结块外）**：① app-server 的 **stderr 也接管并 log**（codex 诊断常走 stderr，排查需要）——不止 stdout 切行。② app-server 意外退出后**不自动重启**（同原版），但对后续 TG 消息要回**友好错误文本**（如「codex 后端已断开，请稍后重试」），不能让用户消息石沉大海——即 `rpc()` 在进程缺失时应快速 reject，bridge 捕获后回提示。

## Verification

**Commands:**
- `npm run build:server` -- expected: tsc 严格模式零报错，生成 `src/server/{app-server,telegram-bridge,telegram-config}.js`。
- `git status --short` -- expected: 仅 `src/server/*.ts`、`.env.example`、`README.md`；`scratch/asar/` 无任何条目。

**Manual checks:**
- 配好 `.env`（`CODEX_CLI_PATH`+`TELEGRAM_BOT_TOKEN`+`TELEGRAM_ALLOWED_USER_IDS`）后 `npm start`：bot 发 `/whoami`→回显 id+authorized；`/newthread`→回 thread id；发任务文本→收到 assistant 回复；`/threads`→inline 按钮可绑定；重启服务→已交互 chat 收到「已上线」。
- 并发隔离：同时开 web UI 与 TG 发消息，观察有无 `SQLITE_BUSY`/历史错乱（§风险首验项）。

## Suggested Review Order

**入口与接线（先看这个抓设计意图）**

- 独立第二链路：token 触发、整段 try/catch 不拖垮主服务
  [`main.ts:810`](../../src/server/main.ts#L810)
- 主服务启动后追加一行调用，保持解耦
  [`main.ts:861`](../../src/server/main.ts#L861)

**app-server 子进程与 JSON-RPC**

- spawn + stdio 换行 JSON-RPC 封装，满足注入的 AppServerLike
  [`app-server.ts:43`](../../src/server/app-server.ts#L43)
- spawn + stdout 切行 + stderr 接管 + 退出即重置（惰性重启）
  [`app-server.ts:93`](../../src/server/app-server.ts#L93)
- 懒握手 initialize/initialized
  [`app-server.ts:84`](../../src/server/app-server.ts#L84)
- 响应/通知/server-request 三路分发，server-request 通用回复防卡
  [`app-server.ts:181`](../../src/server/app-server.ts#L181)
- 三个 -c：approval=never（写死）+ sandbox + features.memories
  [`app-server.ts:262`](../../src/server/app-server.ts#L262)

**Telegram bridge 核心**

- 映射/鉴权/轮询主体
  [`telegram-bridge.ts:101`](../../src/server/telegram-bridge.ts#L101)
- turn/completed 转发：turnId + 内容双重去重，thread/read 取末尾 agentMessage
  [`telegram-bridge.ts:466`](../../src/server/telegram-bridge.ts#L466)
- 普通文本：复用/新建 thread → turn/start → 失败回友好错误
  [`telegram-bridge.ts:332`](../../src/server/telegram-bridge.ts#L332)
- allowlist 鉴权（安全整数校验 + `*` 通配）
  [`telegram-bridge.ts:566`](../../src/server/telegram-bridge.ts#L566)

**渲染与网络健壮性（review 重点）**

- markdown→HTML 占位符法：防代码/链接内二次解析 + href 属性转义
  [`telegram-bridge.ts:787`](../../src/server/telegram-bridge.ts#L787)
- 3500 字分片（段落>行>词>硬切）
  [`telegram-bridge.ts:848`](../../src/server/telegram-bridge.ts#L848)
- callTelegram：AbortController 客户端超时，防 half-open 卡死
  [`telegram-bridge.ts:647`](../../src/server/telegram-bridge.ts#L647)
- 长轮询 timeout 45 + 客户端超时兜底
  [`telegram-bridge.ts:181`](../../src/server/telegram-bridge.ts#L181)

**配置与持久化**

- env 读取，token 为功能总开关（缺失即静默关闭）
  [`telegram-config.ts:38`](../../src/server/telegram-config.ts#L38)
- 安全整数白名单解析（防大 id 精度丢失致鉴权误判）
  [`telegram-config.ts:61`](../../src/server/telegram-config.ts#L61)
- memories 开关（默认开，对齐原版）
  [`telegram-config.ts:114`](../../src/server/telegram-config.ts#L114)
- chatId 持久化到 ~/.codex/telegram-bridge.json（重启上线通知用）
  [`telegram-config.ts:152`](../../src/server/telegram-config.ts#L152)

**文档/配置（最后看）**

- TELEGRAM_* 配置段 + 安全警示
  [`.env.example`](../../.env.example)
- 安全节补 TG Bot 主机级访问风险说明
  [`README.md`](../../README.md)
