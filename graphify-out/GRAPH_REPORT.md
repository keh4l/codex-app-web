# Graph Report - .  (2026-06-10)

## Corpus Check
- Corpus is ~9,384 words - fits in a single context window. You may not need a graph.

## Summary
- 286 nodes · 380 edges · 13 communities
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 14 edges (avg confidence: 0.85)
- Token cost: 111,911 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Browser Client & File Picker|Browser Client & File Picker]]
- [[_COMMUNITY_Electron Module Shims|Electron Module Shims]]
- [[_COMMUNITY_Architecture & Design Concepts|Architecture & Design Concepts]]
- [[_COMMUNITY_BrowserWindow API Surface|BrowserWindow API Surface]]
- [[_COMMUNITY_Package Manifest & Build Scripts|Package Manifest & Build Scripts]]
- [[_COMMUNITY_Server Entry & IPC Bridge|Server Entry & IPC Bridge]]
- [[_COMMUNITY_TypeScript Compiler Config|TypeScript Compiler Config]]
- [[_COMMUNITY_Runtime Dependencies|Runtime Dependencies]]
- [[_COMMUNITY_UI Components & Icons|UI Components & Icons]]
- [[_COMMUNITY_PWA Web Manifest|PWA Web Manifest]]
- [[_COMMUNITY_Update Fetcher (Sparkle)|Update Fetcher (Sparkle)]]
- [[_COMMUNITY_Vite Build Config|Vite Build Config]]
- [[_COMMUNITY_Brand Identity (Favicon)|Brand Identity (Favicon)]]

## God Nodes (most connected - your core abstractions)
1. `log()` - 27 edges
2. `BrowserWindow` - 19 edges
3. `compilerOptions` - 16 edges
4. `scripts` - 11 edges
5. `codex-web` - 10 edges
6. `Menu` - 9 edges
7. `run()` - 8 edges
8. `Upgrading codex-web Process` - 7 edges
9. `download_enclosure()` - 6 edges
10. `isRecord()` - 6 edges

## Surprising Connections (you probably didn't know these)
- `Generate Patches via diff Principle` --semantically_similar_to--> `Thin Wrapper / Minimal Patching Principle`  [INFERRED] [semantically similar]
  UPGRADING.md → ARCHITECTURE.md
- `codex-web` --references--> `codex-web Architecture`  [INFERRED]
  README.md → ARCHITECTURE.md
- `Browser Client` --conceptually_related_to--> `Electron Renderer Process`  [INFERRED]
  README.md → ARCHITECTURE.md
- `Desktop-side Bridge` --conceptually_related_to--> `IPC WebSocket Bridge`  [INFERRED]
  README.md → ARCHITECTURE.md
- `Upgrading codex-web Process` --references--> `Codex Desktop`  [INFERRED]
  UPGRADING.md → README.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **IPC Communication Flow (Renderer to Main via WebSocket)** — architecture_renderer_process, architecture_preload_script, architecture_ipc_websocket, architecture_main_ts, architecture_codex_electron_ipc_bridge [EXTRACTED 1.00]
- **Patch Application Pipeline at Postinstall** — architecture_prepare_asar, architecture_patches, architecture_webview_preload_patch, architecture_shim_ts [EXTRACTED 1.00]
- **Scratch Directory Upgrade Workflow** — upgrading_scratch_directory, upgrading_prepare_asar_task, upgrading_diff_patch_principle, architecture_patches [INFERRED 0.85]

## Communities (13 total, 0 thin omitted)

### Community 0 - "Browser Client & File Picker"
Cohesion: 0.06
Nodes (42): CodexFetchMessage, errorMessage(), handleLocalFilePickerMessage(), handleLocalFilePickerMessageInner(), isCodexFetchMessage(), isLocalFilePickerMessage(), openBrowserFilePicker(), parsePickFilesRequest() (+34 more)

### Community 1 - "Electron Module Shims"
Cohesion: 0.06
Nodes (33): app, appBase, autoUpdater, crashReporter, createEmitterStub(), createIpcMainStub(), createMessagePortStub(), createSessionStub() (+25 more)

### Community 2 - "Architecture & Design Concepts"
Cohesion: 0.08
Nodes (35): __codexElectronIpcBridge, contextBridge.exposeInMainWorld, Electron App, Server Electron Shims, installModuleAliasHook, ipcRenderer, IPC WebSocket Bridge, Electron Main Process (+27 more)

### Community 3 - "BrowserWindow API Surface"
Cohesion: 0.10
Nodes (5): BrowserWindow, log(), Menu, MenuItem, Notification

### Community 4 - "Package Manifest & Build Scripts"
Cohesion: 0.08
Nodes (23): author, bin, devDependencies, electron, http-server, @types/react, @types/react-dom, files (+15 more)

### Community 5 - "Server Entry & IPC Bridge"
Cohesion: 0.14
Nodes (17): compareWorkspaceDirectoryEntries(), ensureElectronLikeProcessContext(), getIpcMainBridgeState(), IpcMainBridgeState, main(), MainToRendererMessage, parsePort(), parseServerArgs() (+9 more)

### Community 6 - "TypeScript Compiler Config"
Cohesion: 0.12
Nodes (16): compilerOptions, declaration, declarationMap, exactOptionalPropertyTypes, isolatedModules, jsx, module, moduleDetection (+8 more)

### Community 7 - "Runtime Dependencies"
Cohesion: 0.12
Nodes (16): dependencies, better-sqlite3, @electron/asar, fastify, @fastify/multipart, @fastify/static, glob, prettier (+8 more)

### Community 8 - "UI Components & Icons"
Cohesion: 0.21
Nodes (10): ensureHost(), errorMessage(), openSelectWorkspaceRootDialog(), WorkspaceDirectoryEntries, WorkspaceDirectoryEntry, WorkspaceRootDialog(), WorkspaceRootDialogOptions, CloseIcon() (+2 more)

### Community 9 - "PWA Web Manifest"
Cohesion: 0.15
Nodes (12): background_color, display, icons, text, title, url, share_target, action (+4 more)

### Community 10 - "Update Fetcher (Sparkle)"
Cohesion: 0.35
Nodes (11): _Element, appcast_snapshot_path(), download_enclosure(), main(), process_item(), run(), safe_path_component(), sparkle_name() (+3 more)

### Community 11 - "Vite Build Config"
Cohesion: 0.33
Nodes (5): asarPackageJson, asarPackagePath, configDir, preloadEntryPath, webviewRoot

### Community 12 - "Brand Identity (Favicon)"
Cohesion: 0.67
Nodes (4): Codex Brand Identity, Code Glyph (Angle-Bracket / Chevron Mark), codex-web Favicon (Brand Icon), OpenAI Blossom / Rosette Motif

## Knowledge Gaps
- **130 isolated node(s):** `short_name`, `start_url`, `display`, `background_color`, `action` (+125 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `log()` connect `BrowserWindow API Surface` to `Electron Module Shims`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Why does `BrowserWindow` connect `BrowserWindow API Surface` to `Electron Module Shims`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Runtime Dependencies` to `Package Manifest & Build Scripts`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **What connects `short_name`, `start_url`, `display` to the rest of the system?**
  _131 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Browser Client & File Picker` be split into smaller, more focused modules?**
  _Cohesion score 0.05803921568627451 - nodes in this community are weakly interconnected._
- **Should `Electron Module Shims` be split into smaller, more focused modules?**
  _Cohesion score 0.05832147937411095 - nodes in this community are weakly interconnected._
- **Should `Architecture & Design Concepts` be split into smaller, more focused modules?**
  _Cohesion score 0.07899159663865546 - nodes in this community are weakly interconnected._