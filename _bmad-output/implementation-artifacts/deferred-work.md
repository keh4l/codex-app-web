# Deferred Work

记录 quick-dev 流程中识别、但有意推迟、不在当前 story 处理的事项。

## 来自 spec-telegram-bot-integration（对抗式 review，2026-06-13）

step-04 三方 review（Blind / Edge / Acceptance）识别、分类为 **defer** 的事项。均非当前改动引入的阻塞缺陷，规模/触发条件有限，留待后续聚焦。

- **rpc 调用无超时**：app-server 卡死但不退出时，`rpc()` 的 Promise 永久 pending，`handleUserText` 不返回、用户无反馈。当前**有意按 spec 设计保持**（Design Notes：原版无超时，turn 长任务不宜设短超时）。未来可只对非 turn 的短调用（`thread/list`、`thread/read`）加超时，`turn/start` 不设。
- **跨片代码围栏切断**：单个代码块超过 3500 字分片阈值被切成两片时，`renderMarkdownToTelegramHtml` 的 fence 在单片内不配对，该片退化为纯文本（有 fallback 兜底）。仅超长代码块触发。后续可在分片层识别 fence 边界并逐片闭合。
- **`lastForwardedTurn/Text` 无上限**：已对解绑 thread 做清理（`bindChatToThread` 空 set 删 key），但活跃 thread 长期累积仍缓慢增长；allowlist 限规模，影响有限。可加 LRU 上限。
- **ENOENT 每条消息重试无冷却**：`CODEX_CLI_PATH` 配错时，每条 TG 消息都会触发一次 spawn + 握手失败（有友好错误反馈，但无退避）。可加失败冷却。

## 来自 spec-update-official-chatgpt-frontend（边界 review，2026-07-10）

- **renderer WebSocket 断开时未主动回收其 MessagePort**：`src/server/main.ts` 会从 `sockets` 删除断开的连接，但没有记录并关闭该 socket 创建的 `portId`；浏览器正常关闭 port 时会清理，异常断线/刷新则可能让 `src/server/electron/index.ts` 的 `bridgedPorts` 暂时残留。这是升级前已经存在的桥接生命周期问题，本次 26.707 升级未改变协议且实测自动重连正常，因此不在本 story 扩大 IPC 变更；后续可按 socket 追踪 owned ports，并在 `close` 时调用 `handlePortClose`。
