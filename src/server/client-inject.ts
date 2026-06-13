// 浏览器端运行时补丁注入。
//
// 设计目标：在不改动 scratch/asar（官方打包的前端）的前提下，修正它在浏览器
// （非 Electron）环境下的个别「水土不服」。补丁以一段 inline <script> 的形式，
// 由 main.ts 在下发 index.html 时注入到 </head> 之前。因为补丁逻辑全部位于
// src/server，跟随官方版本升级时无需重写、asar 零改动。
//
// 补丁 1 —— 修复浏览器端「粘贴 / 拖拽图片、文件」无法变成附件的问题：
//   官方 preload 的 electron stub 把 webUtils.getPathForFile 实现为「抛异常」
//   （[electron-stub] ... is not implemented，还带个 debugger）。而前端处理粘贴 /
//   拖拽进来的图片、文件时，会调用 electronBridge.getPathForFile 去取本地文件
//   系统路径。这个异常会打断整条附件流程——连前端自带的上传兜底（拿不到本地
//   路径时改为把字节上传到临时目录）都没有机会执行，于是粘贴 / 拖拽静默失败，
//   只剩下输入框左下角「加号」上传可用（它走的是另一条独立的 IPC 上传链路）。
//   修法：把 getPathForFile 覆盖成返回 null。前端发现拿不到本地路径后，会自动
//   走上传兜底（persistImageFileToTemp，经 IPC 落地到临时目录），于是粘贴 / 拖拽
//   的图片、文件都能正常作为附件发送。浏览器里本就没有「本地文件路径」的概念，
//   返回 null 正是该环境下的正确语义。

const CLIENT_PATCH_SCRIPT = `
(function () {
  function patch(bridge) {
    if (bridge && typeof bridge.getPathForFile === "function") {
      try {
        bridge.getPathForFile = function () { return null; };
      } catch (err) {
        console.warn("[codex-web] override getPathForFile failed:", err);
      }
    }
    return bridge;
  }
  try {
    // 极少数情况下 electronBridge 已经存在（本脚本在 preload 之后才跑）：直接改。
    if (window.electronBridge) {
      patch(window.electronBridge);
      return;
    }
    // 正常路径：本脚本是 inline 普通 <script>，先于页面所有 defer module（含
    // preload.js）执行。提前用 getter/setter 占住 window.electronBridge，等
    // preload 通过 contextBridge 暴露它的那一刻就地改写 getPathForFile。
    var current;
    Object.defineProperty(window, "electronBridge", {
      configurable: true,
      enumerable: true,
      get: function () { return current; },
      set: function (value) { current = patch(value); },
    });
  } catch (err) {
    console.warn("[codex-web] install electronBridge paste fix failed:", err);
  }
})();
`;

/**
 * 把客户端补丁脚本注入到 index.html 的 </head> 之前。
 *
 * 作为 inline 普通 <script>（非 module），它会先于页面里所有 module 脚本（含
 * preload.js）执行，从而能在 electronBridge 被暴露的那一刻改写它。锚点优先用
 * </head>（标准 HTML 必有，对升级最稳）；找不到时退化到 <body 之前；再不行则
 * 直接前置到文档最前。
 */
export function injectClientPatches(html: string): string {
  const tag = `<script>${CLIENT_PATCH_SCRIPT}</script>`;
  if (html.includes("</head>")) {
    return html.replace("</head>", `${tag}\n  </head>`);
  }
  if (html.includes("<body")) {
    return html.replace("<body", `${tag}\n<body`);
  }
  return `${tag}\n${html}`;
}
