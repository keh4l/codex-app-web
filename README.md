# codex-app-web

为 codex desktop 打造的浏览器前端，运行在你掌控的机器上。

> 本仓库是 [0xcaff/codex-web](https://github.com/0xcaff/codex-web) 的私有 fork：
> 已把打过补丁的桌面前端（`scratch/asar`，约 150 MB）直接提交进仓库，
> clone 后即可运行，无需在每台机器上下载约 330 MB 的官方 Codex 应用。
> ⚠️ 因为包含 OpenAI 专有前端代码，本仓库必须保持**私有**。

https://github.com/user-attachments/assets/0a33cbd8-741c-412c-9e75-46dfe9324596

## 动机

智能体本就不该长期困在终端窗口里。codex desktop 把智能体的能力带到了你的本地电脑上，因为你的文件、凭据和工具早已驻留在那里。

codex-web 把 codex desktop 带进浏览器，同时让后端继续运行在你掌控的机器上（云端的一台 linux 机器、你的家庭实验室，或一台台式机 / mac mini）。即便合上笔记本，智能体仍会继续运行。你可以从任意带浏览器的设备重新连接。

本项目力求做成尽可能薄的封装层，以确保 codex desktop 应用的上游变更能够被快速集成。

## 工作原理（一句话）

`codex-web` 把官方 Codex desktop（Electron）的前端跑在浏览器里，由内嵌的 desktop 主进程
spawn `codex app-server`（stdio JSON-RPC）作为后端。默认监听 `127.0.0.1:8214`。
codex 二进制的查找顺序：`.env` / 环境变量里的 `CODEX_CLI_PATH` → 进程 `PATH` 中的 `codex`。

**支持平台：macOS 与 Linux**（与上游一致）。已提交的 `scratch/asar` 是 `darwin-arm64`
构建，但上游在每个操作系统上用的也正是这个 asar——它的内容是跨平台的 JS。有两点需要了解：

- 运行时实际用到的唯一一个与平台相关的原生模块是 `better-sqlite3`，它并未内置（它位于顶层的 `node_modules` 中）。`npm install` 会为当前的操作系统/架构构建它，因此每台机器都能拿到正确的二进制文件。
- 提交在 `scratch/asar/node_modules` 下的 arm64-macOS 原生模块（`node-pty`、`objc-js`）在无头服务器路径上从不会被加载——它们在 Linux/Intel 上闲置不用，无害。

`npx github:...` 对本 fork **不**起作用——npm 打包时会剥离嵌套的 `node_modules`
并丢弃其中的原生模块。请使用 git clone。

## 快速开始（macOS 本机）

前置条件：Node 24+、Xcode Command Line Tools（`xcode-select --install`，编译
`better-sqlite3` 用）、一个已登录的 `codex`。

```bash
git clone https://github.com/keh4l/codex-app-web.git
cd codex-app-web
npm install          # 安装依赖；prepare 会重建 shim 与 server（不下载）
cp .env.example .env # 按需设置 CODEX_CLI_PATH / HOST / 代理
npm start            # 加载 .env，然后启动 server
```

打开 <http://127.0.0.1:8214>。macOS 上 `CODEX_CLI_PATH` 推荐直接用官方桌面应用自带的
二进制：`/Applications/Codex.app/Contents/Resources/codex`（已登录的话凭据直接复用）。

## Linux 服务器部署

### 1. 前置条件

```bash
# Debian/Ubuntu：Node 24+ 以及编译 better-sqlite3 的工具链
sudo apt install -y build-essential python3 git

# 安装 codex CLI 并登录（登录用户必须与之后运行服务的用户一致！）
npm install -g @openai/codex
codex login --device-auth
```

### 2. 拉取与安装

```bash
git clone https://github.com/keh4l/codex-app-web.git
cd codex-app-web
npm install     # 触发 prepare：只构建，不下载；并编译 Linux 版 better-sqlite3
```

### 3. 配置 `.env`（关键步骤）

```bash
cp .env.example .env
```

**`CODEX_CLI_PATH` 必须填绝对路径，并指向原生二进制。** 不要依赖 PATH：
systemd / 宝塔等进程管理器的精简 PATH 里没有 npm 全局 bin 目录，交互终端里
`codex` 能用不代表服务进程能找到（这是最常见的部署翻车点，报错为
`Unable to locate the Codex CLI binary`）。

用下面的命令找到 npm 包里自带的静态原生二进制：

```bash
find "$(npm root -g)/@openai/codex" -type f -name "codex*" ! -name "*.js" ! -name "*.json" -exec file {} \;
# 输出形如：.../node_modules/@openai/codex-linux-x64/vendor/x86_64-unknown-linux-musl/bin/codex: ELF ...
```

把这个 ELF 文件的绝对路径填进 `.env`：

```bash
CODEX_CLI_PATH="/www/server/nodejs/v24.14.1/lib/node_modules/@openai/codex/node_modules/@openai/codex-linux-x64/vendor/x86_64-unknown-linux-musl/bin/codex"
HOST="0.0.0.0"   # 需要从其他机器访问时设置；注意阅读下方“安全”一节
```

注意：`npm install -g @openai/codex` 升级后这个深层路径可能变化，
届时重新执行上面的 `find` 并更新 `.env` 即可。

### 4. 启动

```bash
npm start        # 前台运行，先验证一切正常
```

浏览器打开 `http://服务器IP:8214` 确认页面可用后，再配置常驻服务。

### 5. 常驻运行（systemd）

`/etc/systemd/system/codex-web.service`：

```ini
[Unit]
Description=codex-web
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/www/gitroot/codex-app-web
ExecStart=/www/gitroot/codex-app-web/scripts/start
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now codex-web
journalctl -u codex-web -f      # 跟踪日志
```

`ExecStart` 直接指向 `scripts/start`，它会自己 source `.env`，因此代理等
启动期变量在 systemd 下同样生效。`User=` 必须与执行过 `codex login` 的用户一致。

## 常见问题排查

| 现象 | 原因与解法 |
|---|---|
| `Unable to locate the Codex CLI binary` | 服务进程的 PATH 没有 codex，且 `CODEX_CLI_PATH` 未设或路径错。按上文用 `find` 找到原生 ELF 二进制，绝对路径填进 `.env`，重启。 |
| 登录相关报错 / 提示未登录 | `codex login` 的凭据存在 `~/.codex/auth.json`，跟用户绑定。服务运行用户（systemd 的 `User=`）必须与执行过 login 的用户一致。 |
| UI 启动页卡约 10 秒才进主界面 | 服务器连不上 `ab.chatgpt.com`（Statsig 超时后才降级）。在 `.env` 打开代理四件套（`NODE_USE_ENV_PROXY` / `HTTP_PROXY` / `HTTPS_PROXY` / `NO_PROXY`），并务必经 `npm start` 启动（直接 `node src/server/main.js` 时代理变量不生效，node 在 bootstrap 阶段就读取它们）。 |
| `npm install` 在 better-sqlite3 处报错 | 缺编译工具链：`sudo apt install build-essential python3`（macOS：`xcode-select --install`）。 |
| 升级 `@openai/codex` 后又找不到二进制 | npm 包内部路径随版本变化，重新 `find` 并更新 `.env` 的 `CODEX_CLI_PATH`。 |

## 升级内置的 Codex 前端版本

编辑 `scripts/prepare` 和 `default.nix` 中的版本号，运行 `npm run setup:asar`
（下载新版、解包、打补丁），验证后提交刷新的 `scratch/asar`。详见
[UPGRADING.md](./UPGRADING.md)。

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

然后让 codex-web 经代理脚本连接它（需要安装 [websocat](https://github.com/vi/websocat)）。
在 `.env` 中设置：

```bash
CODEX_UNIX_SOCKET="/tmp/codex-app-server.sock"
CODEX_CLI_PATH="/绝对路径/codex-app-web/scripts/codex_remote_proxy"
```

再 `npm start` 即可。`codex_remote_proxy` 只接受 `app-server` 子命令，把 stdio
桥接到已运行的 app-server 的 unix socket 上。

## 安全

只在受信任的网络上运行 `codex-web`。要把任何能访问到 `codex-web` 服务器的人，都视为能够以运行该服务器的同一用户身份在主机上操作 codex 的人。

### 内置认证（登录页）

在 `.env` 中设置密码即可要求登录（覆盖所有页面请求与后端 WebSocket）：

```bash
AUTH_USERNAME="codex"   # 可选，默认 codex
AUTH_PASSWORD="一个足够长的随机密码"
```

重启服务后，未登录的浏览器访问会跳转到自带的登录页（`/__auth/login`）。
登录成功后下发 30 天有效的会话 cookie（HMAC 签名、HttpOnly），服务重启
不掉线；修改密码会让已有会话全部失效。访问 `/__auth/logout` 可退出登录。
留空 `AUTH_PASSWORD` 则不启用认证（与之前行为一致）。

- 脚本 / curl 无需走登录页，直接带 HTTP Basic 头即可：`curl -u 用户名:密码`。
- 登录接口带按 IP 防爆破限制（15 分钟内最多失败 10 次）。识别来源用的是直连
  TCP 源 IP（**不**信任 `X-Forwarded-For`，避免被伪造头绕过）。因此套反向代理
  时，所有请求的源 IP 都是反代地址，限流会按反代聚合（同窗口内全体共享失败
  额度）——防爆破仍生效，但可能误伤同反代后的其他用户。需要精确的按客户端
  限流 / 封禁时，建议在反代层做。
- 凭据与 cookie 经纯 http 传输时是明文。在公网上使用请配合 https
  反向代理（caddy / nginx + 证书），或走 wireguard / tailscale / ssh 隧道。
- 设置认证后，HTTP 层会拦下未授权的一切请求，包括 codex-web 用于读本地文件的
  `/@fs/` 路径。但请记住：**通过认证的用户等同于拥有主机访问权**——可经 UI 或
  `/@fs/` 读取该进程能访问的任意文件。认证是访问闸门，不是沙箱。

更强的隔离仍建议在 `codex-web` 之外实现：wireguard、tailscale、ssh 隧道，或带认证的反向代理。

能够访问 web UI 的人可能可以：

- 在主机上运行命令，仅受 `codex-web` 服务器进程权限的限制。
- 读取或修改文件、环境变量、凭据、ssh 密钥，以及该进程可访问的其他本地资源。
- 使用主机上已登录的 codex / chatgpt 账户。这可能会消耗使用配额或计费额度，并可能暴露应用或 cli 所显示的账户元数据，例如姓名或电子邮件地址。

### Telegram Bot 桥接

设置 `.env` 的 `TELEGRAM_BOT_TOKEN` 即启用一个可选的 Telegram bot：在 Telegram 里给 bot 发消息会驱动一个 codex 会话，跑完把回复发回来（详见 `.env.example`）。

**这是又一个主机级访问入口，安全模型与上面完全相同，且更宽松：**

- 审批策略**固定为 `never`**（Telegram 端无法做交互式审批，否则需确认的操作会永久卡住），默认沙箱为 `danger-full-access`（**无沙箱**）。这意味着 allowlist 内的任何人，发一条消息就等同于以服务进程的身份在主机上任意执行命令、读写文件、使用你的 codex 凭据。
- **务必保密 bot token**：拿到 token 的人 = 能控制这个 bot。
- **务必严格设置 `TELEGRAM_ALLOWED_USER_IDS`**：只填你信任的数字 user id。留空则无人可用；设为 `*` 会放行所有人，仅限私有测试。
- 想收紧可用 `TELEGRAM_SANDBOX_MODE` 设为 `workspace-write` 或 `read-only`。
- bot 与浏览器那条链路共享 `~/.codex`（凭据与历史），但各自 spawn 独立的 `codex app-server`。见过的 chat 会持久化到 `~/.codex/telegram-bridge.json`，服务重启后会向这些 chat 发一条上线通知。

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
