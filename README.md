# codex-web

为 codex desktop 打造的浏览器前端，运行在你掌控的机器上。

https://github.com/user-attachments/assets/0a33cbd8-741c-412c-9e75-46dfe9324596

## 动机

智能体本就不该长期困在终端窗口里。codex desktop 把智能体的能力带到了你的本地电脑上，因为你的文件、凭据和工具早已驻留在那里。

codex-web 把 codex desktop 带进浏览器，同时让后端继续运行在你掌控的机器上（云端的一台 linux 机器、你的家庭实验室，或一台台式机 / mac mini）。即便合上笔记本，智能体仍会继续运行。你可以从任意带浏览器的设备重新连接。

本项目力求做成尽可能薄的封装层，以确保 codex desktop 应用的上游变更能够被快速集成。

## 用法

`codex-web` 既提供浏览器客户端，也托管桌面侧的桥接服务。默认情况下，它监听 `127.0.0.1:8214`。

如果 `PATH` 中有 `codex`，它会直接使用；或者，如果你设置了 `CODEX_CLI_PATH`，则使用该路径。

用 `npx` 运行：

```bash
npx --yes github:0xcaff/codex-web
```

或者用 nix 运行：

```bash
nix run github:0xcaff/codex-web
```

然后在浏览器中打开 <http://127.0.0.1:8214>。

## 在本地运行此 fork（内置构建）

此 fork 将打过补丁的桌面前端（`scratch/asar`）提交进了仓库，这样无需在每台机器上下载约 330 MB 的 Codex 应用即可运行。

**支持平台：macOS 与 Linux**（与上游一致）。已提交的 `scratch/asar` 是 `darwin-arm64` 构建，但上游在每个操作系统上用的也正是这个 asar——它的内容是跨平台的 JS。有两点需要了解：

- 运行时实际用到的唯一一个与平台相关的原生模块是 `better-sqlite3`，它并未内置（它位于顶层的 `node_modules` 中）。`npm install` 会为当前的操作系统/架构构建它，因此每台机器都能拿到正确的二进制文件。
- 提交在 `scratch/asar/node_modules` 下的 arm64-macOS 原生模块（`node-pty`、`objc-js`）在无头服务器路径上从不会被加载——它们在 Linux/Intel 上闲置不用，无害。（无论如何，需要平台 `node-pty` 的终端功能目前也还没接上。）

前置条件：Node 24+，用于构建 `better-sqlite3` 的 C/C++ 工具链（macOS：`xcode-select --install`；Debian/Ubuntu：`build-essential python3`），以及一个适用于你操作系统的 `codex` 二进制文件（在 PATH 上或通过 `CODEX_CLI_PATH` 指定）。

```bash
npm install          # 安装依赖；prepare 会重建 shim 与 server（不下载）
cp .env.example .env # 然后按需设置 CODEX_CLI_PATH / 代理
npm start            # 加载 .env，然后启动 server
```

然后打开 <http://127.0.0.1:8214>。

配置位于 `.env` 中（由 `scripts/start` 加载）：`CODEX_CLI_PATH`（留空 → 使用 PATH 中的 `codex`）、`HOST`、`PORT`，以及代理变量（`NODE_USE_ENV_PROXY` / `HTTP(S)_PROXY`）。仅当你的网络无法访问 `ab.chatgpt.com` 时才需要代理——没有它，UI 会在启动页卡住约 10 秒。代理变量只有通过 `npm start` 才会生效，直接 `node src/server/main.js` 则不行（node 在启动时就读取这些变量）。

`npx github:...` 对这套内置方案**不**起作用——npm 打包时会剥离嵌套的 `node_modules` 并丢弃其中的原生模块。请使用 git clone。

要升级内置的 Codex 版本，请编辑 `scripts/prepare` 和 `default.nix` 中的版本号，运行 `npm run setup:asar`，然后提交刷新后的 `scratch/asar`。

### 登录

在启动服务器之前，请确保主机上的 codex cli 已经登录。

```bash
codex login --device-auth
```

### 代理到 app-server（进阶用法）

单独运行 app server 往往很有用，这样 codex-web 的崩溃或重启就不会打断正在执行命令的 codex 进程。

可以使用 `codex_remote_proxy` 脚本，把 codex-web 接到一个已经运行中的 app server 上。

先在某处启动一个长期运行的 app server：

```bash
codex app-server --listen unix:///tmp/codex-app-server.sock
```

然后用代理辅助脚本运行 `codex-web`：

```bash
nix shell github:0xcaff/codex-web github:0xcaff/codex-web#codex_remote_proxy -c bash -lc '
  export CODEX_UNIX_SOCKET=/tmp/codex-app-server.sock
  export CODEX_CLI_PATH="$(command -v codex_remote_proxy)"
  codex-web
'
```

## 安全

只在受信任的网络上运行 `codex-web`。要把任何能访问到 `codex-web` 服务器的人，都视为能够以运行该服务器的同一用户身份在主机上操作 codex 的人。

如果你需要认证（authn）或授权（authz），请在 `codex-web` 之外实现：通过 wireguard、tailscale 或 ssh 隧道进行代理，并在前面放置一个认证网关或反向代理。

能够访问 web UI 的人可能可以：

- 在主机上运行命令，仅受 `codex-web` 服务器进程权限的限制。
- 读取或修改文件、环境变量、凭据、ssh 密钥，以及该进程可访问的其他本地资源。
- 使用主机上已登录的 codex / chatgpt 账户。这可能会消耗使用配额或计费额度，并可能暴露应用或 cli 所显示的账户元数据，例如姓名或电子邮件地址。

## 功能

- 可托管于 macOS、Linux（以及任何能运行 codex cli + node 的环境）
- 可从浏览器访问
- 薄封装层，因此更新应当落地很快
- 当前已可用：
  - 子智能体（subagents）
  - 内联图片
  - 编辑器侧边栏
  - 转录（transcription）

## 路线图

桌面体验中有一些部分尚未接入：

- 浏览器面板支持，可能会围绕 iframe 重建
- linux 上的 computer use，这有望成为一项非常强大的功能
- 终端支持
- git worker 集成
- 以及其他人们发现并提交 issue 的功能

## 欢迎提交 issue

如果有东西坏了、缺失，或者用起来不顺手，请提交一个 issue。

在以有趣的方式使用 `codex-web`？把它发到 x 上并 @我 [@0xcaff](https://x.com/0xcaff)。

在公司里使用本项目，需要更定制化的东西？给我发邮件，我们可以聊聊。

## 替代方案

* [davej/pocodex](https://github.com/davej/pocodex) 在情况彻底失控之前，我一直在用它。我需要子智能体和内联图片查看器。它没有这些功能，而且很难跟上上游 codex 的更新。
* 原生的 codex remote 功能（隐藏在一个功能开关后面）非常适合通过 ssh 连接到远程 codex 主机来管理长时间运行的任务，但这只在你的客户端设备上装有 codex desktop 时才行。这意味着它在移动端无法使用。
* openai 即将推出的第一方移动应用。`codex-web` 如今已经存在并可用。我非常期待那款移动应用，但从 openai 其他的移动应用来看，我对其移动体验的质量略有怀疑。时间会给出答案。
