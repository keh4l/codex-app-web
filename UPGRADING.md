# 升级

将 codex-web 升级以指向上游 Codex Desktop 新版本的操作说明。

## 备份

我们首先生成一个 scratch 目录并对其进行备份。首先，运行以下命令将 `scratch` 目录恢复到一个已知状态

```bash
rm -rf scratch scratch-backup # 删除已有的旧 scratch 目录，从干净状态开始
DEV=1 nix develop --command yarn run prepare:asar 
mv scratch scratch-backup
```

`scratch-backup` 目录保存了已打补丁、可正常工作的 codex-web 版本。在将补丁迁移到新版本时，我们会用它来理解这些补丁原本是在什么上下文中被应用的。

## 更新 URL

接下来有几处需要更新。

1. default.nix 中的 `appVersion` 以及 `codexZip` 中的 `hash`。
2. ./scripts/prepare 中的 `APP_VERSION`

然后暂时注释掉 ./scripts/prepare_asar 中的补丁行，并运行

```bash
DEV=1 nix develop --command yarn run prepare:asar 
cp -r scratch scratch-new-version-unmodified
```

## 升级 codex-cli 版本

这一部分可以与升级流程的其余步骤并行进行。在做验证之前，请务必等待它完成。请在子智能体（subagent）中运行它。

运行以下命令以获取新版 codex-cli 的版本号

```bash
scratch/Codex.app/Contents/Resources/codex --version
```

然后更新 `nix/codex/default.nix` 文件中的 `version` 字段及哈希值，使其指向新版本。

## 迁移补丁

现在我们有几个文件夹

* `scratch-backup`：应用在旧版 Codex Desktop 之上的补丁
* `scratch-new-version-unmodified`：纯净解压出的新版 Codex Desktop
* `scratch`：我们将要修改的工作副本

现在仔细查看 `patches/` 中的补丁，以及它们在 `scratch-backup` 中是如何被应用的，并将这些改动迁移到 `scratch`。先直接在源码树（in-tree）中应用它们。暂时不必急于更新补丁本身。

## 更新补丁

一旦改动已在 `scratch` 中完成，将 `scratch` 中的改动与 `scratch-new-version-unmodified` 进行 diff，并更新 `patches/` 中的补丁。务必通过运行 `diff` 来生成补丁，始终避免手动编写补丁，因为很容易出错。

完成后，取消注释 `scripts/prepare_asar` 中的补丁行，并运行

```bash
mv scratch scratch-patched-inplace
rm -rf scratch
DEV=1 nix develop --command yarn run prepare:asar 
```

然后将 `./scratch-patched-inplace` 与生成的 `./scratch` 进行 diff，以验证补丁是否如预期那样被应用。

## 验证

为了验证一切仍然正常工作，我们将先验证服务端，再验证客户端。开始这一步之前，请务必等待 `升级 codex-cli 版本` 子智能体（subagent）完成。

要验证服务端，运行以下命令

```bash
nix develop --command yarn server
```

接下来，通过在浏览器窗口中打开 `http://localhost:8214` 来验证客户端，并确认页面上的内容能够正常显示。

查看控制台是否有报错。同时，留意屏幕上是否弹出了任何报错对话框。有时报错是静默发生的，表现为加载一直卡住（超过 1 分钟）。也要留意这种情况。

如果出现报错，请将其提交给用户注意，我们将共同决定如何处理。
