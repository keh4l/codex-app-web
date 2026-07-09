---
title: '升级官方 ChatGPT/Codex 桌面前端至 26.707.30751'
type: 'chore'
created: '2026-07-10'
status: 'in-progress'
baseline_commit: '7e1e10a3cd8079d743161e2a59a12023d1bcec06'
context:
  - '{project-root}/_bmad-output/planning-artifacts/project-context.md'
  - '{project-root}/UPGRADING.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** 仓库仍 vendoring 官方 `26.608.12217`，并把下载包和 Bundle 写死为 Codex；官方 `26.707.30751` 已改用 `ChatGPT-darwin-arm64-*.zip` 与 `ChatGPT.app`，新版重分包也使现有补丁目标失效。

**Approach:** 升级官方前端、配套 CLI 和 Electron 兼容层，以上游 `6e8efc9` 的 26.623 适配为迁移参考，按语义重生补丁并验证浏览器宿主。只迁移外层 ChatGPT 品牌；内部继续使用官方保留的 Codex productName、标题、URL scheme 和 `codex_desktop:*` 协议。

## Boundaries & Constraints

**Always:** 保留本 fork 的认证、缓存压缩、Telegram、IPC 心跳/MessagePort、裸 HTTP polyfill、i18n layer override 和邀请入口；vendored 改动只通过 `patches/*.patch` 与生成流程表达；固定版本/哈希，清理旧生成树后重建。

**Ask First:** 若新版已删除某项现有定制，或恢复它必须改变 IPC/安全边界、放弃 Nix 构建或关键交互，先停止说明取舍。

**Never:** 不直接手改 `scratch/asar/**` 作为最终方案；不全局替换 Codex→ChatGPT；不静默丢补丁；不提交临时解包/备份或 `src/server` 编译产物。

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|---------------|----------------------------|----------------|
| 全新升版 | 无新版 scratch | 下载固定 ChatGPT ZIP，提取唯一 app.asar 并完成构建 | 下载、Bundle 或入口缺失时明确失败 |
| 旧版残留 | 存在 Codex.app/旧 asar | 先清理，产物只含 26.707 文件 | 禁止旧 hash 资源混入 |
| 补丁迁移 | JS chunks 重组 | 既有语义与 app-host 修复均可从纯净树重放 | 无法映射时触发 Ask First |
| 原生拖拽 | preload 请求 start-file-drag | Web 宿主安全返回“不支持”且不抛错 | 不伪造同步 WebSocket RPC |

</frozen-after-approval>

## Code Map

- `scripts/prepare`、`scripts/prepare_asar`、`default.nix` -- 固定版本取包、Bundle 解包、Nix 打包与补丁编排。
- `nix/codex/default.nix` -- 配套 CLI 版本、四平台哈希和二进制路径。
- `patches/*.patch`、`scratch/asar/**` -- 浏览器定制语义及其从官方 app.asar 重建的产物。
- `src/browser/shim.ts` -- preload 的浏览器 Electron API、MessagePort、功能开关和降级行为。
- `src/server/electron/index.ts`、`src/server/main.ts` -- Electron stub、版本快照和 main bundle 启动契约。
- `README.md`、`UPGRADING.md`、`_bmad-output/planning-artifacts/project-context.md` -- 版本、路径和品牌边界说明。

## Tasks & Acceptance

**Execution:**
- [ ] `scripts/prepare`、`scripts/prepare_asar`、`default.nix` -- 改用官方 `26.707.30751` ChatGPT ZIP/Bundle/SRI，加入确定性清理和入口校验。
- [ ] `nix/codex/default.nix` -- 同步 CLI `0.144.0-alpha.4`、四平台哈希及新版 npm 包内路径。
- [ ] `patches/*.patch` -- 在纯净 26.707 树按语义迁移全部补丁并吸收上游 app-host 修复；用 diff 生成并从零重放。
- [ ] `src/browser/shim.ts` -- 适配新版 preload 与 `start-file-drag` 降级，保留本 fork 的 polyfill、override 和 MessagePort。
- [ ] `src/server/electron/index.ts`、`src/server/main.ts`、`package.json`、`package-lock.json` -- 对齐 Electron 42.1/应用版本，仅按启动证据补最小 stub，不改 IPC 桥协议。
- [ ] `scratch/asar/**`、`README.md`、`UPGRADING.md`、`_bmad-output/planning-artifacts/project-context.md` -- 全量重建资源并更新操作说明。

**Acceptance Criteria:**
- Given 固定版本配置，when 执行 `npm run setup:asar`，then 补丁无 fuzz/reject、两端构建成功且 asar 版本为 `26.707.30751`。
- Given 服务启动，when 浏览器建立 app-host RPC，then 首屏、新建/恢复任务、设置页和 MessagePort 正常，无未处理异常。
- Given 导航、移动侧栏、prompt query、文件粘贴/预览、i18n、标题和拖拽降级，when 逐项操作，then 既有定制保留且无关键 console 错误或 404。
- Given Nix 环境，when 构建默认包，then ZIP/CLI 哈希闭合，产物不含外层 `.app` 或 vendored `better-sqlite3`。

## Spec Change Log

## Design Notes

官方 ZIP 与本机安装的外层名称是 ChatGPT，但 Bundle ID 仍是 `com.openai.codex`，asar 内的 productName/title/IPC 仍是 Codex。archive/bundle 名应独立于内部协议；不要盲目复用上游把浏览器 `process.versions.electron` 设为非空的改动。

## Verification

**Commands:**
- `npm run setup:asar` -- 下载、解包、补丁及 browser/server 构建成功。
- `npm start`；`curl -fsS http://127.0.0.1:8214/`；`curl -fsS http://127.0.0.1:8214/assets/preload.js` -- 服务、首页与 preload 可用。
- `nix build .#default` -- 固定资源及打包规则通过。

**Manual checks:**
- 桌面/移动视口检查任务、设置、侧栏、prompt URL、上传/粘贴、图片、PWA、i18n、标题，并核对 console/server 日志。
