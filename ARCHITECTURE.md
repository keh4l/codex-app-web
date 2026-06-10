# 架构

简单说说这整套东西是如何拼装起来的。

这里的总体思路是：下载 Electron 应用，将其解包，并尽可能少地对其打补丁，让它能跑起来。

一个 Electron 应用有两部分，一部分运行在主进程（main process），另一部分运行在渲染进程（renderer process）。

主进程那部分本质上是一个带有 `require('electron')` 依赖的 Node 进程。它甚至在屏幕上出现任何内容之前就开始运行，负责设置系统托盘控件、运行后台任务，以及挂接 app launcher 事件的监听器。无论打开多少个窗口，主进程始终只有一个实例。

UI 运行在 Electron 渲染进程内部。在桌面应用里，这看起来有点像一个对浏览器 chrome 做了一些修改的浏览器。它负责显示界面、对用户交互产生的事件作出反应，并持有那些贴近 UI 的状态（比如提示框里输入的是什么文本）。

Electron 渲染进程通常由 Electron 主进程启动。主进程和渲染进程通过一个建立在[预加载脚本（preload script）][preload script]里的 IPC 进行通信。预加载脚本会在其他任何内容加载之前被注入到渲染进程中，拥有特权访问能力，并且可以通过 `contextBridge.exposeInMainWorld` 向渲染进程的 realm 暴露函数和数据。预加载脚本可以访问 [`ipcRenderer`]。

codex-web 通过提供 [shim.ts](./src/browser/shim.ts) 作为渲染进程中 electron 的替身（stand-in）来挂接预加载脚本，然后设置 preload 使其在渲染进程的 realm 中运行（参见 [vite.browser.config.ts](./vite.browser.config.ts)）。

接下来，我们对运行在主进程和渲染进程中的代码都施加了一系列补丁（patch）。这些补丁在 postinstall 时通过 [`prepare_asar`](./scripts/prepare_asar) 脚本应用。补丁位于 [./patches](./patches)，叠加在从上游应用中提取并美化（prettified）后的代码之上。这里特意选择在安装时打补丁，以避免重新分发原始代码。[./patches/webview-preload.patch](patches/webview-preload.patch) 将被 shim 过的预加载脚本连接到 index.html 入口。

我们力求让补丁尽可能小，因为它们是最让人头疼、最难改动的部分。如今的补丁大多围绕路由、URL、页面标题、PWA 和移动端行为。

为了把渲染进程的 IPC 连接到主进程，我们对大多数消息使用一个 websocket，同时直接拦截并处理少数几个消息（文件选择器、工作区选择器）。如今，shim 剩下的部分用于把内存中的 router 连接到浏览器历史记录，以及设置移动端的侧边栏行为。

IPC websocket 由 [main.ts](./src/server/main.ts) 托管。这个进程绑定一个端口并监听传入的 websocket 连接。它还会在加载 electron shell 入口之前对 electron 进行 shim（参见 `installModuleAliasHook`）。这些 shim 位于 [./src/server/electron](./src/server/electron)，专注于提供让应用工作所需的最小功能量。归结起来就是：一些通往外部世界的网络传输，以及挂接来自渲染进程的 IPC 管道。这部分是代码库中最潦草的部分，因为我把它丢给 codex 自己去琢磨、没怎么管。围绕 `__codexElectronIpcBridge` 的部分是与连接 IPC bridge 相关的重要内容。

[preload script]: https://www.electronjs.org/docs/latest/tutorial/tutorial-preload
[`ipcRenderer`]: https://www.electronjs.org/docs/latest/api/ipc-renderer
