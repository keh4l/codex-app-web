#!/usr/bin/env python3
"""Apply hosted-browser semantic fixes to minified webview JS.

Unified diffs of these chunks are multi-megabyte (single ~1MB lines), so we
keep exact string replacements here instead of patches/*.patch. Each fix must
match exactly once; missing or ambiguous anchors fail the build so upgrades
cannot silently drop Statsig/Sentry/route silencing.
"""

from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "scratch" / "asar" / "webview" / "assets"

# (description, filename_glob_fragment, old, new)
#
# filename_glob_fragment is matched against asset basenames; prefer unique
# prefixes from the current vendored tree (hash suffixes change each upgrade).
FIXES: list[tuple[str, str, str, str]] = [
    (
        "statsig: silence telemetry + wire overrideAdapter",
        "app-initial-",
        "N9c={networkConfig:{api:O9c,logEventUrl:l5c,sdkExceptionUrl:k9c,networkOverrideFunc:a9c}}",
        "N9c={overrideAdapter:window.__ELECTRON_SHIM__.overrideAdapter,logLevel:0,disableLogging:!0,networkConfig:{api:O9c,logEventUrl:l5c,sdkExceptionUrl:k9c,networkOverrideFunc:a9c,preventAllNetworkTraffic:!0}}",
    ),
    (
        "sentry: disable Electron renderer SDK in browser host",
        "app-initial-",
        "ebr({beforeSend:Sen,dsn:e.dsn,",
        "ebr({enabled:!1,beforeSend:Sen,dsn:e.dsn,",
    ),
    (
        "router: seed memory history from shim initialRoute",
        "app-initial-",
        "a.current??=Uin({initialEntries:n,initialIndex:r,v5Compat:!0});let o=a.current,[s,c]=IC.useState({action:o.action,location:o.location}),l=IC.useCallback(e=>{i===!1?c(e):IC.startTransition(()=>c(e))},[i]);",
        "a.current??=Uin({initialEntries:n??[window.__ELECTRON_SHIM__.initialRoute],initialIndex:r,v5Compat:!0});let o=a.current,[s,c]=IC.useState({action:o.action,location:o.location}),l=IC.useCallback(e=>{window.__ELECTRON_SHIM__.onMemoryNavigationChanged(e);i===!1?c(e):IC.startTransition(()=>c(e))},[i]);",
    ),
    # Hosted single-window: canBroadcastPatchesToFollowers is false, so
    # applyFrameTextDeltas took the knownChangedItems short-circuit. That path
    # only pokes item:${entityKey} listeners; the timeline often subscribes as
    # item:turn:${turnId}, so agentMessage/reasoning deltas mutate state but
    # never re-render until a full thread reload (refresh). Force the
    # produceWithPatches path so setConversation runs the full subscriber walk.
    (
        "streaming: force full patch notifications for text deltas",
        "app-initial-",
        ",{knownHistoryInvalidation:r,knownChangedItems:a})}}}}));function Vun",
        ",{})}}}}));function Vun",
    ),
]


def resolve_target(fragment: str) -> Path:
    matches = sorted(ASSETS.glob(f"{fragment}*.js"))
    # Prefer the primary app-initial chunk over any sourcemap-adjacent noise.
    matches = [p for p in matches if ".map" not in p.name]
    if not matches:
        raise SystemExit(f"no asset matching {fragment!r} under {ASSETS}")
    if len(matches) > 1:
        # app-initial-* is unique in current trees; still be strict.
        raise SystemExit(
            f"ambiguous assets for {fragment!r}: {[p.name for p in matches]}"
        )
    return matches[0]


def apply_fix(path: Path, description: str, old: str, new: str) -> None:
    text = path.read_text(encoding="utf-8")
    count = text.count(old)
    if count == 0:
        if new in text or text.count(new) == 1:
            print(f"skip (already applied): {description} -> {path.name}")
            return
        raise SystemExit(f"anchor not found for {description} in {path.name}")
    if count != 1:
        raise SystemExit(
            f"anchor matched {count} times for {description} in {path.name}"
        )
    path.write_text(text.replace(old, new, 1), encoding="utf-8")
    print(f"applied: {description} -> {path.name}")


def main() -> int:
    if not ASSETS.is_dir():
        raise SystemExit(f"missing {ASSETS}; run setup:asar first")

    for description, fragment, old, new in FIXES:
        apply_fix(resolve_target(fragment), description, old, new)
    return 0


if __name__ == "__main__":
    sys.exit(main())
