# 升级官方前端

本文说明如何把 codex-web vendoring 的官方 ChatGPT/Codex Desktop 前端升级到新版本。

官方应用从 `26.707` 起把下载包和外层 Bundle 改名为
`ChatGPT-darwin-arm64-<version>.zip` 与 `ChatGPT.app`。asar 内部仍可能沿用
Codex productName、标题、`codex://` scheme 和 `codex_desktop:*` IPC；不要做全局品牌替换。

## 1. 记录基线

升级前确认工作区状态并保留旧版补丁语义：

```bash
git status --short
git rev-parse HEAD
```

`scratch/asar` 是生成物，最终禁止直接手改。需要研究旧行为时可以复制到仓库外的
临时目录，但所有可持久化改动都必须表达在 `patches/*.patch`、shim 或构建脚本中。

## 2. 固定官方资源

同时更新：

- `scripts/prepare` 的应用版本与 ChatGPT ZIP 名；
- `scripts/prepare_asar` 的 `ChatGPT.app` 路径和期望版本；
- `default.nix` 的 `appVersion`、ZIP URL 与 SRI hash。

下载必须使用固定 URL，并先校验 ZIP：

```bash
curl --fail --location --retry 3 \
  -o /tmp/ChatGPT-darwin-arm64-<version>.zip \
  https://persistent.oaistatic.com/codex-app-prod/ChatGPT-darwin-arm64-<version>.zip
unzip -tq /tmp/ChatGPT-darwin-arm64-<version>.zip
printf 'sha256-'
openssl dgst -sha256 -binary /tmp/ChatGPT-darwin-arm64-<version>.zip | base64
```

`scripts/prepare_asar` 应先删除旧 `scratch/asar`、`scratch/Codex.app` 和
`scratch/ChatGPT.app`，再检查 ZIP 中存在 app.asar、package.json、webview、preload
以及唯一的 `main-*.js`。这样旧 chunk 不会混入新产物。

## 3. 同步 Codex CLI

从新版 Bundle 确认 CLI 版本：

```bash
/Applications/ChatGPT.app/Contents/Resources/codex --version
```

更新 `nix/codex/default.nix` 的版本、四个平台 tarball SRI hash 和包内二进制路径。
当前 npm 平台包的二进制位于 `package/vendor/*/bin/codex`。每个 tarball 都要实际下载、
计算 hash，并检查路径；不要复用旧版本哈希。

## 4. 按语义迁移补丁

在仓库外准备两个从同一官方 app.asar 提取的临时目录：

- `clean`：只做与 `scripts/prepare_asar` 相同的 Prettier 格式化；
- `modified`：从 clean 复制，逐项恢复现有补丁语义。

逐个阅读旧补丁，不要只按旧 chunk 名搜索。重点检查初始路由/侧栏、URL prompt、
ProseMirror 输入模式、本地文件 `/@fs`、标题、Statsig、Sentry、PWA/CSP，以及新版
app-host services。MessagePort RPC、认证、心跳、i18n override 等本 fork 能力必须保留。

用 `diff -u --label a/<path> --label b/<path> clean/<path> modified/<path>` 生成每个
正式 patch。把 patch 放回 `patches/` 后，在 clean 的副本上按
`scripts/prepare_asar` 的真实顺序逐个应用，并将结果与 modified 逐字节比较。任何 fuzz、
reject、遗漏或意外 chunk 都要先修正。

`app-initial-*.js` 里 Statsig / Sentry / memory-router 的改动落在超长单行上，
统一 diff 会达到数 MB。这些语义改动维护在
`scripts/apply_webview_js_semantic_fixes.py`（精确字符串替换，必须恰好命中一次）。
升级时同步更新该脚本里的锚点，不要再为它们新增 `patches/*.patch`。

## 5. 从零重建

不要把临时 modified 树复制进 `scratch/asar`。使用固定官方 ZIP 运行真实生成流程：

```bash
HOSTED_CODEX_APP_ZIP=/tmp/ChatGPT-darwin-arm64-<version>.zip npm run setup:asar
```

确认：

```bash
node -e 'console.log(require("./scratch/asar/package.json").version)'
find scratch/asar/.vite/build -maxdepth 1 -name 'main-*.js'
git status --short
```

生成结果应只有新版本资源；不得残留旧 hash chunk 或外层 `.app` 到最终 Nix 包。

## 6. 验证

先构建，再启动服务：

```bash
npm run build:server
npm run build:browser
npm start
curl -fsS http://127.0.0.1:8214/
curl -fsS http://127.0.0.1:8214/assets/preload.js
```

浏览器至少检查：首屏、新建/恢复任务、设置、桌面与移动侧栏、`?prompt=` 回填、
文件粘贴/预览、图片、PWA、语言切换、任务标题和原生拖拽降级。控制台与 server 日志
不能出现未处理异常、关键 404 或 app-host/MessagePort 断连。

有 Nix 环境时还要运行：

```bash
nix build .#default
```

确认 ZIP/CLI 固定哈希闭合，包内不含 `scratch/ChatGPT.app`，并且 vendored asar 中的
`better-sqlite3` 已按打包规则移除/替换。若本机没有 Nix，明确记录该验证未执行，不能
把普通 npm 构建当作 Nix 构建通过。
