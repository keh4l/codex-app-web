import { s as e, t } from "./chunk-Cq_f4orQ.js";
import { n, t as r } from "./jsx-runtime-DXKlqYIQ.js";
import { R as i, o as a } from "./app-scope-DbsKKT7R.js";
import { Lr as o, p as s } from "./src-X9SEQR78.js";
import {
  Ao as c,
  Fo as l,
  Po as u,
  do as d,
} from "./app-server-manager-signals-DixsiAkQ.js";
import { t as f } from "./react-dom-D83Ueduu.js";
import { c as p, o as m } from "./lib-CUS32m6G.js";
import { t as h } from "./clsx-BJDJerUC.js";
import { t as g } from "./use-stable-callback-C7FPlBCA.js";
import { a as _, i as v, r as y } from "./format-skill-title-B3wdGnF9.js";
import { t as b } from "./send-open-file-request-CfMuCi0g.js";
import { f as x } from "./chunk-LFPYN7LY-DR8eRaIS.js";
import { n as S, t as C } from "./known-app-icon-Ds8uGpPN.js";
import { p as ee } from "./codex-api-C5QmrLxF.js";
import { c as w, x as T } from "./apps-queries-cqAHgSOA.js";
import { t as E } from "./connector-logo-DsPZV5PG.js";
import {
  a as D,
  i as O,
  n as k,
  o as A,
  t as j,
} from "./prompt-text-CVEbFToC.js";
import {
  a as M,
  c as N,
  d as P,
  f as F,
  h as te,
  l as ne,
  m as I,
  r as L,
  u as re,
  y as ie,
} from "./mention-item-aKflgYEg.js";
import { r as R, t as z } from "./rich-link-BE7yquBz.js";
import { t as ae } from "./apps-0Mj3G4jY.js";
import { y as oe } from "./use-plugins-DBCbdcYi.js";
import {
  c as se,
  o as ce,
  u as le,
} from "./use-native-apps.electron-D8uohXTu.js";
import { n as B, t as ue } from "./mention-icons-BUcTZ4fa.js";
import { t as V } from "./mcp-hSlSBxA7.js";
import { t as de } from "./get-skill-icon-DLTxHDHw.js";
import { t as fe } from "./openai-blossom-DaBgEl_G.js";
import { n as pe } from "./use-skills-Db5ylZcX.js";
import {
  a as me,
  i as he,
  n as ge,
  r as _e,
  s as ve,
  t as ye,
} from "./inline-mention-style-zaGQGrw0.js";
import { t as be } from "./globe-DsPFSJHZ.js";
import { t as xe } from "./sortBy-D5wE7XSi.js";
import { r as H } from "./composer-top-menu-chrome-B1lQNBPG.js";
import { t as Se } from "./connected-apps-D3l9PWb-.js";
import {
  a as Ce,
  i as we,
  n as Te,
} from "./use-composer-controller-Cf2JU8YY.js";
import {
  a as Ee,
  c as De,
  d as Oe,
  f as U,
  g as W,
  h as ke,
  i as Ae,
  l as je,
  m as Me,
  n as G,
  o as K,
  p as Ne,
  r as q,
  s as J,
  t as Pe,
  u as Fe,
} from "./dist-DmnHL4QQ.js";
import {
  a as Ie,
  c as Le,
  f as Re,
  i as ze,
  l as Be,
  o as Ve,
  r as He,
} from "./use-composer-top-menu-max-height-DKUWZxbf.js";
import { t as Ue } from "./score-query-match-D_FOCHby.js";
import { r as We } from "./format-skill-scope-qudUnjwK.js";
import { t as Y } from "./list-navigation-NX7NYbMJ.js";
var Ge = `above-composer-portal`,
  Ke = `above-composer-queue-portal`,
  qe = `data-above-composer-portal`,
  Je = `data-above-composer-queue-portal`;
function Ye(e) {
  return Ze({ attr: qe, fallbackId: Ge, conversationId: e });
}
function Xe(e) {
  return Ze({ attr: Je, fallbackId: Ke, conversationId: e });
}
function Ze({ attr: e, fallbackId: t, conversationId: n }) {
  if (typeof document > `u`) return null;
  if (n != null) {
    let r = !1;
    for (let t of document.querySelectorAll(`[${e}]`))
      if (
        ((r = !0), t.getAttribute(`data-above-composer-conversation-id`) === n)
      )
        return t;
    return r ? null : document.getElementById(t);
  }
  return document.getElementById(t);
}
var Qe = `Files`;
function $e(e) {
  if (e == null) return !1;
  if (Array.from(e.items ?? []).some((e) => e.kind === `file`)) return !0;
  let { types: t } = e;
  for (let e = 0; e < t.length; e += 1) if (t[e] === Qe) return !0;
  return !1;
}
function X(e) {
  return it(e)
    .filter(({ file: e, isDirectory: t }) => !t && s(e))
    .map(({ file: e }) => e);
}
function et(e) {
  let t = [],
    n = [];
  for (let { file: r, isDirectory: i } of it(e)) {
    if (i) {
      n.push(r);
      continue;
    }
    if (r.size !== 0) {
      if (s(r)) {
        t.push(r);
        continue;
      }
      n.push(r);
    }
  }
  return { imageFiles: t, otherFiles: n };
}
function tt(e, t) {
  let n = t?.(e);
  return n != null && n.length > 0
    ? n
    : `path` in e && typeof e.path == `string` && e.path.length > 0
      ? e.path
      : null;
}
async function nt(e, t, n, r) {
  let i = tt(e, t);
  if (i == null && n != null)
    try {
      i = await n({
        bytes: new Uint8Array(await e.arrayBuffer()),
        mimeType: e.type,
      });
    } catch {
      return null;
    }
  return i == null || r == null ? i : r(i).catch(() => null);
}
function rt(e, t, n) {
  let r = [],
    i = new Set();
  for (let e of Array.from(n?.items ?? [])) {
    if (e.kind !== `file` || e.webkitGetAsEntry?.()?.isDirectory !== !0)
      continue;
    let n = e.getAsFile();
    if (n == null) continue;
    let r = tt(n, t);
    r != null && i.add(u(r));
  }
  let a = new Set();
  for (let n of e) {
    let e = tt(n, t);
    if (e == null) continue;
    let o = l(e),
      s = u(o);
    a.has(s) ||
      (a.add(s),
      r.push({
        label: c(o) || n.name || o,
        path: i.has(s) && !o.endsWith(`/`) ? `${o}/` : o,
        fsPath: o,
      }));
  }
  return r;
}
function it(e) {
  if (e == null) return [];
  let t = Array.from(e.items ?? []).filter((e) => e.kind === `file`);
  return e.files.length > 0
    ? Array.from(e.files).map((e, n) => ({
        file: e,
        isDirectory: t[n]?.webkitGetAsEntry?.()?.isDirectory === !0,
      }))
    : t.flatMap((e) => {
        let t = e.getAsFile();
        return t == null
          ? []
          : [
              {
                file: t,
                isDirectory: e.webkitGetAsEntry?.()?.isDirectory === !0,
              },
            ];
      });
}
var at = i(),
  ot = e(n(), 1);
function st() {
  let e = a(A);
  return ct(e.value.kind === `local` ? e.value.conversationId : null);
}
function ct(e) {
  return ut(e, Ye);
}
function lt(e) {
  return ut(e, Xe);
}
function ut(e, t) {
  let n = (0, at.c)(6),
    r;
  n[0] !== e || n[1] !== t
    ? ((r = (n) => dt(e, t, n)), (n[0] = e), (n[1] = t), (n[2] = r))
    : (r = n[2]);
  let i = r,
    a;
  return (
    n[3] !== e || n[4] !== t
      ? ((a = () => t(e)), (n[3] = e), (n[4] = t), (n[5] = a))
      : (a = n[5]),
    (0, ot.useSyncExternalStore)(i, a)
  );
}
function dt(e, t, n) {
  if (typeof document > `u`) return () => {};
  let r = null,
    i = null,
    a = (e) => {
      r ||
        ((r = new MutationObserver(() => {
          n();
        })),
        r.observe(e, { childList: !0 }));
    },
    o = t(e);
  return (
    o
      ? a(o)
      : (i = window.setTimeout(() => {
          let r = t(e);
          r && (a(r), n());
        }, 0)),
    () => {
      (i != null && (window.clearTimeout(i), (i = null)), r && r.disconnect());
    }
  );
}
function ft(e) {
  let t = (0, at.c)(10),
    { placement: n, zIndexClassName: r, variant: i } = e,
    a = n === void 0 ? `top` : n,
    o = r === void 0 ? `z-50` : r,
    s = i === void 0 ? `default` : i,
    c = x(),
    l = ct(null),
    u;
  t[0] === c.pathname
    ? (u = t[1])
    : ((u = Re(c.pathname)), (t[0] = c.pathname), (t[1] = u));
  let d = u,
    f = s === `expandedTopTray` || s === `embeddedExpandedTopTray` || d,
    p = d ? l : null,
    m;
  t[2] !== a || t[3] !== f || t[4] !== o
    ? ((m = f
        ? `absolute bottom-0 z-40`
        : h(
            `absolute left-0 right-0`,
            a === `top` ? `bottom-full mb-2` : `top-full mt-2`,
            o,
          )),
      (t[2] = a),
      (t[3] = f),
      (t[4] = o),
      (t[5] = m))
    : (m = t[5]);
  let g;
  return (
    t[6] !== p || t[7] !== m || t[8] !== f
      ? ((g = {
          overlayPortalContainer: p,
          shellClassName: m,
          usesExpandedTopTray: f,
        }),
        (t[6] = p),
        (t[7] = m),
        (t[8] = f),
        (t[9] = g))
      : (g = t[9]),
    g
  );
}
for (
  var pt = {
      8: `Backspace`,
      9: `Tab`,
      10: `Enter`,
      12: `NumLock`,
      13: `Enter`,
      16: `Shift`,
      17: `Control`,
      18: `Alt`,
      20: `CapsLock`,
      27: `Escape`,
      32: ` `,
      33: `PageUp`,
      34: `PageDown`,
      35: `End`,
      36: `Home`,
      37: `ArrowLeft`,
      38: `ArrowUp`,
      39: `ArrowRight`,
      40: `ArrowDown`,
      44: `PrintScreen`,
      45: `Insert`,
      46: `Delete`,
      59: `;`,
      61: `=`,
      91: `Meta`,
      92: `Meta`,
      106: `*`,
      107: `+`,
      108: `,`,
      109: `-`,
      110: `.`,
      111: `/`,
      144: `NumLock`,
      145: `ScrollLock`,
      160: `Shift`,
      161: `Shift`,
      162: `Control`,
      163: `Control`,
      164: `Alt`,
      165: `Alt`,
      173: `-`,
      186: `;`,
      187: `=`,
      188: `,`,
      189: `-`,
      190: `.`,
      191: `/`,
      192: "`",
      219: `[`,
      220: `\\`,
      221: `]`,
      222: `'`,
    },
    mt = {
      48: `)`,
      49: `!`,
      50: `@`,
      51: `#`,
      52: `$`,
      53: `%`,
      54: `^`,
      55: `&`,
      56: `*`,
      57: `(`,
      59: `:`,
      61: `+`,
      173: `_`,
      186: `:`,
      187: `+`,
      188: `<`,
      189: `_`,
      190: `>`,
      191: `?`,
      192: `~`,
      219: `{`,
      220: `|`,
      221: `}`,
      222: `"`,
    },
    ht = typeof navigator < `u` && /Mac/.test(navigator.platform),
    gt =
      typeof navigator < `u` &&
      /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent),
    _t = 0;
  _t < 10;
  _t++
)
  pt[48 + _t] = pt[96 + _t] = String(_t);
for (var _t = 1; _t <= 24; _t++) pt[_t + 111] = `F` + _t;
for (var _t = 65; _t <= 90; _t++)
  ((pt[_t] = String.fromCharCode(_t + 32)), (mt[_t] = String.fromCharCode(_t)));
for (var vt in pt) mt.hasOwnProperty(vt) || (mt[vt] = pt[vt]);
function yt(e) {
  var t =
    (!(
      (ht && e.metaKey && e.shiftKey && !e.ctrlKey && !e.altKey) ||
      (gt && e.shiftKey && e.key && e.key.length == 1) ||
      e.key == `Unidentified`
    ) &&
      e.key) ||
    (e.shiftKey ? mt : pt)[e.keyCode] ||
    e.key ||
    `Unidentified`;
  return (
    t == `Esc` && (t = `Escape`),
    t == `Del` && (t = `Delete`),
    t == `Left` && (t = `ArrowLeft`),
    t == `Up` && (t = `ArrowUp`),
    t == `Right` && (t = `ArrowRight`),
    t == `Down` && (t = `ArrowDown`),
    t
  );
}
var bt =
    typeof navigator < `u` && /Mac|iP(hone|[oa]d)/.test(navigator.platform),
  xt = typeof navigator < `u` && /Win/.test(navigator.platform);
function St(e) {
  let t = e.split(/-(?!$)/),
    n = t[t.length - 1];
  n == `Space` && (n = ` `);
  let r, i, a, o;
  for (let e = 0; e < t.length - 1; e++) {
    let n = t[e];
    if (/^(cmd|meta|m)$/i.test(n)) o = !0;
    else if (/^a(lt)?$/i.test(n)) r = !0;
    else if (/^(c|ctrl|control)$/i.test(n)) i = !0;
    else if (/^s(hift)?$/i.test(n)) a = !0;
    else if (/^mod$/i.test(n)) bt ? (o = !0) : (i = !0);
    else throw Error(`Unrecognized modifier name: ` + n);
  }
  return (
    r && (n = `Alt-` + n),
    i && (n = `Ctrl-` + n),
    o && (n = `Meta-` + n),
    a && (n = `Shift-` + n),
    n
  );
}
function Ct(e) {
  let t = Object.create(null);
  for (let n in e) t[St(n)] = e[n];
  return t;
}
function wt(e, t, n = !0) {
  return (
    t.altKey && (e = `Alt-` + e),
    t.ctrlKey && (e = `Ctrl-` + e),
    t.metaKey && (e = `Meta-` + e),
    n && t.shiftKey && (e = `Shift-` + e),
    e
  );
}
function Tt(e) {
  return new Ae({ props: { handleKeyDown: Et(e) } });
}
function Et(e) {
  let t = Ct(e);
  return function (e, n) {
    let r = yt(n),
      i,
      a = t[wt(r, n)];
    if (a && a(e.state, e.dispatch, e)) return !0;
    if (r.length == 1 && r != ` `) {
      if (n.shiftKey) {
        let i = t[wt(r, n, !1)];
        if (i && i(e.state, e.dispatch, e)) return !0;
      }
      if (
        (n.altKey || n.metaKey || n.ctrlKey) &&
        !(xt && n.ctrlKey && n.altKey) &&
        (i = pt[n.keyCode]) &&
        i != r
      ) {
        let r = t[wt(i, n)];
        if (r && r(e.state, e.dispatch, e)) return !0;
      }
    }
    return !1;
  };
}
var Dt = {
  active: !1,
  anchorPos: null,
  query: ``,
  source: null,
  suppressedAnchorPos: null,
  suppressedQuery: ``,
  suppressedTrigger: null,
  trigger: null,
};
function Ot(e) {
  return {
    ...Dt,
    suppressedAnchorPos: e.anchorPos,
    suppressedQuery: e.query,
    suppressedTrigger: e.trigger,
  };
}
function kt(e, t) {
  return t == null || e.query.startsWith(t);
}
function At(e, t, n) {
  let { state: r } = e,
    i = t.getState(r);
  return i?.active !== !0 || !kt(i, n)
    ? !1
    : (e.dispatch(r.tr.setMeta(t, Ot(i))), !0);
}
var jt = 50;
function Mt(e, t) {
  let { $from: n } = e.selection,
    r = n.parent,
    i = n.parentOffset,
    a = r.textBetween(Math.max(0, i - jt), i, void 0, `￼`),
    o = t.exec(a);
  if (!o) return null;
  let s = i - o[2].length,
    c = n.start() + s;
  return { text: o[2], startPos: c };
}
function Nt(e) {
  let {
      key: t,
      trigger: n,
      wordPattern: r,
      onSubmit: i = () => {},
      onClose: a = () => {},
    } = e,
    o = Array.isArray(n) ? n : [n];
  return [
    new Ae({
      key: t,
      state: {
        init: () => Dt,
        apply(e, n, i, s) {
          let c = n;
          if (e.docChanged && c.suppressedAnchorPos != null) {
            let t = e.mapping.mapResult(c.suppressedAnchorPos);
            c = {
              ...c,
              suppressedAnchorPos: t.deleted ? null : t.pos,
              suppressedQuery: t.deleted ? `` : c.suppressedQuery,
              suppressedTrigger: t.deleted ? null : c.suppressedTrigger,
            };
          }
          let l = e.getMeta(t);
          if ((l && (c = { ...c, ...l }), e.selectionSet || e.docChanged)) {
            let e = Mt(s, r),
              t = e ? o.find((t) => e.text.startsWith(t)) : void 0;
            if (e && t != null) {
              let n = e.text.slice(t.length),
                r = e.startPos + t.length;
              c = Pt(c, r, n, t)
                ? {
                    ...c,
                    active: !1,
                    anchorPos: null,
                    query: ``,
                    source: null,
                    trigger: null,
                  }
                : {
                    ...Dt,
                    active: !0,
                    anchorPos: r,
                    query: n,
                    source: c.active && c.anchorPos === r ? c.source : null,
                    trigger: t,
                  };
            } else (c.active && a?.(), (c = Dt));
          }
          return c;
        },
      },
      props: {
        handleKeyDown(e, n) {
          return (
            !t.getState(e.state)?.active ||
              (n.key.length === 1 && /\w/.test(n.key)) ||
              n.key,
            !1
          );
        },
      },
    }),
    Tt({
      Escape: (e, n) =>
        t.getState(e)?.active && n !== void 0
          ? (n(e.tr.setMeta(t, Dt)), a(), !0)
          : !1,
    }),
    Tt({
      Tab: (e, n) =>
        t.getState(e)?.active && n !== void 0
          ? (n(e.tr.setMeta(t, Dt)), i(`complete-query`), !0)
          : !1,
      Enter: (e, n) =>
        t.getState(e)?.active && n !== void 0
          ? (n(e.tr.setMeta(t, Dt)), i(`insert-mention`), !0)
          : !1,
    }),
  ];
}
function Pt(e, t, n, r) {
  return (
    e.suppressedAnchorPos === t &&
    e.suppressedQuery.length > 0 &&
    e.suppressedTrigger === r &&
    n.startsWith(e.suppressedQuery)
  );
}
var Ft = new Ee(`mention-ui`);
function It(e = {}) {
  return Nt({ key: Ft, trigger: `@`, wordPattern: /(^|\s)(@[^@]*)$/, ...e });
}
var Lt = t((e) => {
    var t = n(),
      r = f();
    function i(e) {
      var t = `https://react.dev/errors/` + e;
      if (1 < arguments.length) {
        t += `?args[]=` + encodeURIComponent(arguments[1]);
        for (var n = 2; n < arguments.length; n++)
          t += `&args[]=` + encodeURIComponent(arguments[n]);
      }
      return (
        `Minified React error #` +
        e +
        `; visit ` +
        t +
        ` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`
      );
    }
    var a = Symbol.for(`react.transitional.element`),
      o = Symbol.for(`react.portal`),
      s = Symbol.for(`react.fragment`),
      c = Symbol.for(`react.strict_mode`),
      l = Symbol.for(`react.profiler`),
      u = Symbol.for(`react.consumer`),
      d = Symbol.for(`react.context`),
      p = Symbol.for(`react.forward_ref`),
      m = Symbol.for(`react.suspense`),
      h = Symbol.for(`react.suspense_list`),
      g = Symbol.for(`react.memo`),
      _ = Symbol.for(`react.lazy`),
      v = Symbol.for(`react.scope`),
      y = Symbol.for(`react.activity`),
      b = Symbol.for(`react.legacy_hidden`),
      x = Symbol.for(`react.memo_cache_sentinel`),
      S = Symbol.for(`react.view_transition`),
      C = Symbol.iterator;
    function ee(e) {
      return typeof e != `object` || !e
        ? null
        : ((e = (C && e[C]) || e[`@@iterator`]),
          typeof e == `function` ? e : null);
    }
    var w = Array.isArray;
    function T(e, t) {
      var n = e.length & 3,
        r = e.length - n,
        i = t;
      for (t = 0; t < r; ) {
        var a =
          (e.charCodeAt(t) & 255) |
          ((e.charCodeAt(++t) & 255) << 8) |
          ((e.charCodeAt(++t) & 255) << 16) |
          ((e.charCodeAt(++t) & 255) << 24);
        (++t,
          (a =
            (3432918353 * (a & 65535) +
              (((3432918353 * (a >>> 16)) & 65535) << 16)) &
            4294967295),
          (a = (a << 15) | (a >>> 17)),
          (a =
            (461845907 * (a & 65535) +
              (((461845907 * (a >>> 16)) & 65535) << 16)) &
            4294967295),
          (i ^= a),
          (i = (i << 13) | (i >>> 19)),
          (i =
            (5 * (i & 65535) + (((5 * (i >>> 16)) & 65535) << 16)) &
            4294967295),
          (i = (i & 65535) + 27492 + ((((i >>> 16) + 58964) & 65535) << 16)));
      }
      switch (((a = 0), n)) {
        case 3:
          a ^= (e.charCodeAt(t + 2) & 255) << 16;
        case 2:
          a ^= (e.charCodeAt(t + 1) & 255) << 8;
        case 1:
          ((a ^= e.charCodeAt(t) & 255),
            (a =
              (3432918353 * (a & 65535) +
                (((3432918353 * (a >>> 16)) & 65535) << 16)) &
              4294967295),
            (a = (a << 15) | (a >>> 17)),
            (i ^=
              (461845907 * (a & 65535) +
                (((461845907 * (a >>> 16)) & 65535) << 16)) &
              4294967295));
      }
      return (
        (i ^= e.length),
        (i ^= i >>> 16),
        (i =
          (2246822507 * (i & 65535) +
            (((2246822507 * (i >>> 16)) & 65535) << 16)) &
          4294967295),
        (i ^= i >>> 13),
        (i =
          (3266489909 * (i & 65535) +
            (((3266489909 * (i >>> 16)) & 65535) << 16)) &
          4294967295),
        (i ^ (i >>> 16)) >>> 0
      );
    }
    var E = Object.assign,
      D = Object.prototype.hasOwnProperty,
      O = RegExp(
        `^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`,
      ),
      k = {},
      A = {};
    function j(e) {
      return D.call(A, e)
        ? !0
        : D.call(k, e)
          ? !1
          : O.test(e)
            ? (A[e] = !0)
            : ((k[e] = !0), !1);
    }
    var M = new Set(
        `animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(
          ` `,
        ),
      ),
      N = new Map([
        [`acceptCharset`, `accept-charset`],
        [`htmlFor`, `for`],
        [`httpEquiv`, `http-equiv`],
        [`crossOrigin`, `crossorigin`],
        [`accentHeight`, `accent-height`],
        [`alignmentBaseline`, `alignment-baseline`],
        [`arabicForm`, `arabic-form`],
        [`baselineShift`, `baseline-shift`],
        [`capHeight`, `cap-height`],
        [`clipPath`, `clip-path`],
        [`clipRule`, `clip-rule`],
        [`colorInterpolation`, `color-interpolation`],
        [`colorInterpolationFilters`, `color-interpolation-filters`],
        [`colorProfile`, `color-profile`],
        [`colorRendering`, `color-rendering`],
        [`dominantBaseline`, `dominant-baseline`],
        [`enableBackground`, `enable-background`],
        [`fillOpacity`, `fill-opacity`],
        [`fillRule`, `fill-rule`],
        [`floodColor`, `flood-color`],
        [`floodOpacity`, `flood-opacity`],
        [`fontFamily`, `font-family`],
        [`fontSize`, `font-size`],
        [`fontSizeAdjust`, `font-size-adjust`],
        [`fontStretch`, `font-stretch`],
        [`fontStyle`, `font-style`],
        [`fontVariant`, `font-variant`],
        [`fontWeight`, `font-weight`],
        [`glyphName`, `glyph-name`],
        [`glyphOrientationHorizontal`, `glyph-orientation-horizontal`],
        [`glyphOrientationVertical`, `glyph-orientation-vertical`],
        [`horizAdvX`, `horiz-adv-x`],
        [`horizOriginX`, `horiz-origin-x`],
        [`imageRendering`, `image-rendering`],
        [`letterSpacing`, `letter-spacing`],
        [`lightingColor`, `lighting-color`],
        [`markerEnd`, `marker-end`],
        [`markerMid`, `marker-mid`],
        [`markerStart`, `marker-start`],
        [`overlinePosition`, `overline-position`],
        [`overlineThickness`, `overline-thickness`],
        [`paintOrder`, `paint-order`],
        [`panose-1`, `panose-1`],
        [`pointerEvents`, `pointer-events`],
        [`renderingIntent`, `rendering-intent`],
        [`shapeRendering`, `shape-rendering`],
        [`stopColor`, `stop-color`],
        [`stopOpacity`, `stop-opacity`],
        [`strikethroughPosition`, `strikethrough-position`],
        [`strikethroughThickness`, `strikethrough-thickness`],
        [`strokeDasharray`, `stroke-dasharray`],
        [`strokeDashoffset`, `stroke-dashoffset`],
        [`strokeLinecap`, `stroke-linecap`],
        [`strokeLinejoin`, `stroke-linejoin`],
        [`strokeMiterlimit`, `stroke-miterlimit`],
        [`strokeOpacity`, `stroke-opacity`],
        [`strokeWidth`, `stroke-width`],
        [`textAnchor`, `text-anchor`],
        [`textDecoration`, `text-decoration`],
        [`textRendering`, `text-rendering`],
        [`transformOrigin`, `transform-origin`],
        [`underlinePosition`, `underline-position`],
        [`underlineThickness`, `underline-thickness`],
        [`unicodeBidi`, `unicode-bidi`],
        [`unicodeRange`, `unicode-range`],
        [`unitsPerEm`, `units-per-em`],
        [`vAlphabetic`, `v-alphabetic`],
        [`vHanging`, `v-hanging`],
        [`vIdeographic`, `v-ideographic`],
        [`vMathematical`, `v-mathematical`],
        [`vectorEffect`, `vector-effect`],
        [`vertAdvY`, `vert-adv-y`],
        [`vertOriginX`, `vert-origin-x`],
        [`vertOriginY`, `vert-origin-y`],
        [`wordSpacing`, `word-spacing`],
        [`writingMode`, `writing-mode`],
        [`xmlnsXlink`, `xmlns:xlink`],
        [`xHeight`, `x-height`],
      ]),
      P = /["'&<>]/;
    function F(e) {
      if (typeof e == `boolean` || typeof e == `number` || typeof e == `bigint`)
        return `` + e;
      e = `` + e;
      var t = P.exec(e);
      if (t) {
        var n = ``,
          r,
          i = 0;
        for (r = t.index; r < e.length; r++) {
          switch (e.charCodeAt(r)) {
            case 34:
              t = `&quot;`;
              break;
            case 38:
              t = `&amp;`;
              break;
            case 39:
              t = `&#x27;`;
              break;
            case 60:
              t = `&lt;`;
              break;
            case 62:
              t = `&gt;`;
              break;
            default:
              continue;
          }
          (i !== r && (n += e.slice(i, r)), (i = r + 1), (n += t));
        }
        e = i === r ? n : n + e.slice(i, r);
      }
      return e;
    }
    var te = /([A-Z])/g,
      ne = /^ms-/,
      I =
        /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
    function L(e) {
      return I.test(`` + e)
        ? `javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`
        : e;
    }
    var re = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
      ie = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
      R = { pending: !1, data: null, method: null, action: null },
      z = ie.d;
    ie.d = { f: z.f, r: z.r, D: tt, C: nt, L: rt, m: it, X: ot, S: at, M: st };
    var ae = [],
      oe = null,
      se = /(<\/|<)(s)(cript)/gi;
    function ce(e, t, n, r) {
      return `` + t + (n === `s` ? `\\u0073` : `\\u0053`) + r;
    }
    function le(e, t, n, r, i) {
      return {
        idPrefix: e === void 0 ? `` : e,
        nextFormID: 0,
        streamingFormat: 0,
        bootstrapScriptContent: n,
        bootstrapScripts: r,
        bootstrapModules: i,
        instructions: 0,
        hasBody: !1,
        hasHtml: !1,
        unknownResources: {},
        dnsResources: {},
        connectResources: { default: {}, anonymous: {}, credentials: {} },
        imageResources: {},
        styleResources: {},
        scriptResources: {},
        moduleUnknownResources: {},
        moduleScriptResources: {},
      };
    }
    function B(e, t, n, r) {
      return {
        insertionMode: e,
        selectedValue: t,
        tagScope: n,
        viewTransition: r,
      };
    }
    function ue(e, t, n) {
      var r = e.tagScope & -25;
      switch (t) {
        case `noscript`:
          return B(2, null, r | 1, null);
        case `select`:
          return B(2, n.value == null ? n.defaultValue : n.value, r, null);
        case `svg`:
          return B(4, null, r, null);
        case `picture`:
          return B(2, null, r | 2, null);
        case `math`:
          return B(5, null, r, null);
        case `foreignObject`:
          return B(2, null, r, null);
        case `table`:
          return B(6, null, r, null);
        case `thead`:
        case `tbody`:
        case `tfoot`:
          return B(7, null, r, null);
        case `colgroup`:
          return B(9, null, r, null);
        case `tr`:
          return B(8, null, r, null);
        case `head`:
          if (2 > e.insertionMode) return B(3, null, r, null);
          break;
        case `html`:
          if (e.insertionMode === 0) return B(1, null, r, null);
      }
      return 6 <= e.insertionMode || 2 > e.insertionMode
        ? B(2, null, r, null)
        : e.tagScope === r
          ? e
          : B(e.insertionMode, e.selectedValue, r, null);
    }
    function V(e) {
      return e === null
        ? null
        : {
            update: e.update,
            enter: `none`,
            exit: `none`,
            share: e.update,
            name: e.autoName,
            autoName: e.autoName,
            nameIdx: 0,
          };
    }
    function de(e, t) {
      return (
        t.tagScope & 32 && (e.instructions |= 128),
        B(
          t.insertionMode,
          t.selectedValue,
          t.tagScope | 12,
          V(t.viewTransition),
        )
      );
    }
    function fe(e, t) {
      e = V(t.viewTransition);
      var n = t.tagScope | 16;
      return (
        e !== null && e.share !== `none` && (n |= 64),
        B(t.insertionMode, t.selectedValue, n, e)
      );
    }
    var pe = new Map();
    function me(e, t) {
      if (typeof t != `object`) throw Error(i(62));
      var n = !0,
        r;
      for (r in t)
        if (D.call(t, r)) {
          var a = t[r];
          if (a != null && typeof a != `boolean` && a !== ``) {
            if (r.indexOf(`--`) === 0) {
              var o = F(r);
              a = F((`` + a).trim());
            } else
              ((o = pe.get(r)),
                o === void 0 &&
                  ((o = F(
                    r.replace(te, `-$1`).toLowerCase().replace(ne, `-ms-`),
                  )),
                  pe.set(r, o)),
                (a =
                  typeof a == `number`
                    ? a === 0 || M.has(r)
                      ? `` + a
                      : a + `px`
                    : F((`` + a).trim())));
            n
              ? ((n = !1), e.push(` style="`, o, `:`, a))
              : e.push(`;`, o, `:`, a);
          }
        }
      n || e.push(`"`);
    }
    function he(e, t, n) {
      n &&
        typeof n != `function` &&
        typeof n != `symbol` &&
        e.push(` `, t, `=""`);
    }
    function ge(e, t, n) {
      typeof n != `function` &&
        typeof n != `symbol` &&
        typeof n != `boolean` &&
        e.push(` `, t, `="`, F(n), `"`);
    }
    var _e = F(
      `javascript:throw new Error('React form unexpectedly submitted.')`,
    );
    function ve(e, t) {
      (this.push(`<input type="hidden"`),
        ye(e),
        ge(this, `name`, t),
        ge(this, `value`, e),
        this.push(`/>`));
    }
    function ye(e) {
      if (typeof e != `string`) throw Error(i(480));
    }
    function be(e, t) {
      if (typeof t.$$FORM_ACTION == `function`) {
        var n = e.nextFormID++;
        e = e.idPrefix + n;
        try {
          var r = t.$$FORM_ACTION(e);
          return (r && r.data?.forEach(ye), r);
        } catch (e) {
          if (typeof e == `object` && e && typeof e.then == `function`) throw e;
        }
      }
      return null;
    }
    function xe(e, t, n, r, i, a, o, s) {
      var c = null;
      if (typeof r == `function`) {
        var l = be(t, r);
        l === null
          ? (e.push(` `, `formAction`, `="`, _e, `"`),
            (o = a = i = r = s = null),
            we(t, n))
          : ((s = l.name),
            (r = l.action || ``),
            (i = l.encType),
            (a = l.method),
            (o = l.target),
            (c = l.data));
      }
      return (
        s != null && H(e, `name`, s),
        r != null && H(e, `formAction`, r),
        i != null && H(e, `formEncType`, i),
        a != null && H(e, `formMethod`, a),
        o != null && H(e, `formTarget`, o),
        c
      );
    }
    function H(e, t, n) {
      switch (t) {
        case `className`:
          ge(e, `class`, n);
          break;
        case `tabIndex`:
          ge(e, `tabindex`, n);
          break;
        case `dir`:
        case `role`:
        case `viewBox`:
        case `width`:
        case `height`:
          ge(e, t, n);
          break;
        case `style`:
          me(e, n);
          break;
        case `src`:
        case `href`:
          if (n === ``) break;
        case `action`:
        case `formAction`:
          if (
            n == null ||
            typeof n == `function` ||
            typeof n == `symbol` ||
            typeof n == `boolean`
          )
            break;
          ((n = L(`` + n)), e.push(` `, t, `="`, F(n), `"`));
          break;
        case `defaultValue`:
        case `defaultChecked`:
        case `innerHTML`:
        case `suppressContentEditableWarning`:
        case `suppressHydrationWarning`:
        case `ref`:
          break;
        case `autoFocus`:
        case `multiple`:
        case `muted`:
          he(e, t.toLowerCase(), n);
          break;
        case `xlinkHref`:
          if (
            typeof n == `function` ||
            typeof n == `symbol` ||
            typeof n == `boolean`
          )
            break;
          ((n = L(`` + n)), e.push(` `, `xlink:href`, `="`, F(n), `"`));
          break;
        case `contentEditable`:
        case `spellCheck`:
        case `draggable`:
        case `value`:
        case `autoReverse`:
        case `externalResourcesRequired`:
        case `focusable`:
        case `preserveAlpha`:
          typeof n != `function` &&
            typeof n != `symbol` &&
            e.push(` `, t, `="`, F(n), `"`);
          break;
        case `inert`:
        case `allowFullScreen`:
        case `async`:
        case `autoPlay`:
        case `controls`:
        case `default`:
        case `defer`:
        case `disabled`:
        case `disablePictureInPicture`:
        case `disableRemotePlayback`:
        case `formNoValidate`:
        case `hidden`:
        case `loop`:
        case `noModule`:
        case `noValidate`:
        case `open`:
        case `playsInline`:
        case `readOnly`:
        case `required`:
        case `reversed`:
        case `scoped`:
        case `seamless`:
        case `itemScope`:
          n &&
            typeof n != `function` &&
            typeof n != `symbol` &&
            e.push(` `, t, `=""`);
          break;
        case `capture`:
        case `download`:
          !0 === n
            ? e.push(` `, t, `=""`)
            : !1 !== n &&
              typeof n != `function` &&
              typeof n != `symbol` &&
              e.push(` `, t, `="`, F(n), `"`);
          break;
        case `cols`:
        case `rows`:
        case `size`:
        case `span`:
          typeof n != `function` &&
            typeof n != `symbol` &&
            !isNaN(n) &&
            1 <= n &&
            e.push(` `, t, `="`, F(n), `"`);
          break;
        case `rowSpan`:
        case `start`:
          typeof n == `function` ||
            typeof n == `symbol` ||
            isNaN(n) ||
            e.push(` `, t, `="`, F(n), `"`);
          break;
        case `xlinkActuate`:
          ge(e, `xlink:actuate`, n);
          break;
        case `xlinkArcrole`:
          ge(e, `xlink:arcrole`, n);
          break;
        case `xlinkRole`:
          ge(e, `xlink:role`, n);
          break;
        case `xlinkShow`:
          ge(e, `xlink:show`, n);
          break;
        case `xlinkTitle`:
          ge(e, `xlink:title`, n);
          break;
        case `xlinkType`:
          ge(e, `xlink:type`, n);
          break;
        case `xmlBase`:
          ge(e, `xml:base`, n);
          break;
        case `xmlLang`:
          ge(e, `xml:lang`, n);
          break;
        case `xmlSpace`:
          ge(e, `xml:space`, n);
          break;
        default:
          if (
            (!(2 < t.length) ||
              (t[0] !== `o` && t[0] !== `O`) ||
              (t[1] !== `n` && t[1] !== `N`)) &&
            ((t = N.get(t) || t), j(t))
          ) {
            switch (typeof n) {
              case `function`:
              case `symbol`:
                return;
              case `boolean`:
                var r = t.toLowerCase().slice(0, 5);
                if (r !== `data-` && r !== `aria-`) return;
            }
            e.push(` `, t, `="`, F(n), `"`);
          }
      }
    }
    function Se(e, t, n) {
      if (t != null) {
        if (n != null) throw Error(i(60));
        if (typeof t != `object` || !(`__html` in t)) throw Error(i(61));
        ((t = t.__html), t != null && e.push(`` + t));
      }
    }
    function Ce(e) {
      var n = ``;
      return (
        t.Children.forEach(e, function (e) {
          e != null && (n += e);
        }),
        n
      );
    }
    function we(e, t) {
      if (!(e.instructions & 16)) {
        e.instructions |= 16;
        var n = t.preamble,
          r = t.bootstrapChunks;
        (n.htmlChunks || n.headChunks) && r.length === 0
          ? (r.push(t.startInlineScript),
            Qe(r, e),
            r.push(
              `>`,
              `addEventListener("submit",function(a){if(!a.defaultPrevented){var c=a.target,d=a.submitter,e=c.action,b=d;if(d){var f=d.getAttribute("formAction");null!=f&&(e=f,b=null)}"javascript:throw new Error('React form unexpectedly submitted.')"===e&&(a.preventDefault(),b?(a=document.createElement("input"),a.name=b.name,a.value=b.value,b.parentNode.insertBefore(a,b),b=new FormData(c),a.parentNode.removeChild(a)):b=new FormData(c),a=c.ownerDocument||c,(a.$$reactFormReplay=a.$$reactFormReplay||[]).push(c,d,b))}});`,
              `<\/script>`,
            ))
          : r.unshift(
              t.startInlineScript,
              `>`,
              `addEventListener("submit",function(a){if(!a.defaultPrevented){var c=a.target,d=a.submitter,e=c.action,b=d;if(d){var f=d.getAttribute("formAction");null!=f&&(e=f,b=null)}"javascript:throw new Error('React form unexpectedly submitted.')"===e&&(a.preventDefault(),b?(a=document.createElement("input"),a.name=b.name,a.value=b.value,b.parentNode.insertBefore(a,b),b=new FormData(c),a.parentNode.removeChild(a)):b=new FormData(c),a=c.ownerDocument||c,(a.$$reactFormReplay=a.$$reactFormReplay||[]).push(c,d,b))}});`,
              `<\/script>`,
            );
      }
    }
    function Te(e, t) {
      for (var n in (e.push(G(`link`)), t))
        if (D.call(t, n)) {
          var r = t[n];
          if (r != null)
            switch (n) {
              case `children`:
              case `dangerouslySetInnerHTML`:
                throw Error(i(399, `link`));
              default:
                H(e, n, r);
            }
        }
      return (e.push(`/>`), null);
    }
    var Ee = /(<\/|<)(s)(tyle)/gi;
    function De(e, t, n, r) {
      return `` + t + (n === `s` ? `\\73 ` : `\\53 `) + r;
    }
    function Oe(e, t, n) {
      for (var r in (e.push(G(n)), t))
        if (D.call(t, r)) {
          var a = t[r];
          if (a != null)
            switch (r) {
              case `children`:
              case `dangerouslySetInnerHTML`:
                throw Error(i(399, n));
              default:
                H(e, r, a);
            }
        }
      return (e.push(`/>`), null);
    }
    function U(e, t) {
      e.push(G(`title`));
      var n = null,
        r = null,
        i;
      for (i in t)
        if (D.call(t, i)) {
          var a = t[i];
          if (a != null)
            switch (i) {
              case `children`:
                n = a;
                break;
              case `dangerouslySetInnerHTML`:
                r = a;
                break;
              default:
                H(e, i, a);
            }
        }
      return (
        e.push(`>`),
        (t = Array.isArray(n) ? (2 > n.length ? n[0] : null) : n),
        typeof t != `function` &&
          typeof t != `symbol` &&
          t != null &&
          e.push(F(`` + t)),
        Se(e, r, n),
        e.push(q(`title`)),
        null
      );
    }
    function W(e, t) {
      e.push(G(`script`));
      var n = null,
        r = null,
        i;
      for (i in t)
        if (D.call(t, i)) {
          var a = t[i];
          if (a != null)
            switch (i) {
              case `children`:
                n = a;
                break;
              case `dangerouslySetInnerHTML`:
                r = a;
                break;
              default:
                H(e, i, a);
            }
        }
      return (
        e.push(`>`),
        Se(e, r, n),
        typeof n == `string` && e.push((`` + n).replace(se, ce)),
        e.push(q(`script`)),
        null
      );
    }
    function ke(e, t, n) {
      e.push(G(n));
      var r = (n = null),
        i;
      for (i in t)
        if (D.call(t, i)) {
          var a = t[i];
          if (a != null)
            switch (i) {
              case `children`:
                n = a;
                break;
              case `dangerouslySetInnerHTML`:
                r = a;
                break;
              default:
                H(e, i, a);
            }
        }
      return (e.push(`>`), Se(e, r, n), n);
    }
    function Ae(e, t, n) {
      e.push(G(n));
      var r = (n = null),
        i;
      for (i in t)
        if (D.call(t, i)) {
          var a = t[i];
          if (a != null)
            switch (i) {
              case `children`:
                n = a;
                break;
              case `dangerouslySetInnerHTML`:
                r = a;
                break;
              default:
                H(e, i, a);
            }
        }
      return (
        e.push(`>`),
        Se(e, r, n),
        typeof n == `string` ? (e.push(F(n)), null) : n
      );
    }
    var je = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/,
      Me = new Map();
    function G(e) {
      var t = Me.get(e);
      if (t === void 0) {
        if (!je.test(e)) throw Error(i(65, e));
        ((t = `<` + e), Me.set(e, t));
      }
      return t;
    }
    function K(e, t, n, r, a, o, s, c, l) {
      switch (t) {
        case `div`:
        case `span`:
        case `svg`:
        case `path`:
          break;
        case `a`:
          e.push(G(`a`));
          var u = null,
            d = null,
            f;
          for (f in n)
            if (D.call(n, f)) {
              var p = n[f];
              if (p != null)
                switch (f) {
                  case `children`:
                    u = p;
                    break;
                  case `dangerouslySetInnerHTML`:
                    d = p;
                    break;
                  case `href`:
                    p === `` ? ge(e, `href`, ``) : H(e, f, p);
                    break;
                  default:
                    H(e, f, p);
                }
            }
          if ((e.push(`>`), Se(e, d, u), typeof u == `string`)) {
            e.push(F(u));
            var m = null;
          } else m = u;
          return m;
        case `g`:
        case `p`:
        case `li`:
          break;
        case `select`:
          e.push(G(`select`));
          var h = null,
            g = null,
            _;
          for (_ in n)
            if (D.call(n, _)) {
              var v = n[_];
              if (v != null)
                switch (_) {
                  case `children`:
                    h = v;
                    break;
                  case `dangerouslySetInnerHTML`:
                    g = v;
                    break;
                  case `defaultValue`:
                  case `value`:
                    break;
                  default:
                    H(e, _, v);
                }
            }
          return (e.push(`>`), Se(e, g, h), h);
        case `option`:
          var y = c.selectedValue;
          e.push(G(`option`));
          var b = null,
            x = null,
            S = null,
            C = null,
            ee;
          for (ee in n)
            if (D.call(n, ee)) {
              var T = n[ee];
              if (T != null)
                switch (ee) {
                  case `children`:
                    b = T;
                    break;
                  case `selected`:
                    S = T;
                    break;
                  case `dangerouslySetInnerHTML`:
                    C = T;
                    break;
                  case `value`:
                    x = T;
                  default:
                    H(e, ee, T);
                }
            }
          if (y != null) {
            var O = x === null ? Ce(b) : `` + x;
            if (w(y)) {
              for (var k = 0; k < y.length; k++)
                if (`` + y[k] === O) {
                  e.push(` selected=""`);
                  break;
                }
            } else `` + y === O && e.push(` selected=""`);
          } else S && e.push(` selected=""`);
          return (e.push(`>`), Se(e, C, b), b);
        case `textarea`:
          e.push(G(`textarea`));
          var A = null,
            M = null,
            N = null,
            P;
          for (P in n)
            if (D.call(n, P)) {
              var te = n[P];
              if (te != null)
                switch (P) {
                  case `children`:
                    N = te;
                    break;
                  case `value`:
                    A = te;
                    break;
                  case `defaultValue`:
                    M = te;
                    break;
                  case `dangerouslySetInnerHTML`:
                    throw Error(i(91));
                  default:
                    H(e, P, te);
                }
            }
          if ((A === null && M !== null && (A = M), e.push(`>`), N != null)) {
            if (A != null) throw Error(i(92));
            if (w(N)) {
              if (1 < N.length) throw Error(i(93));
              A = `` + N[0];
            }
            A = `` + N;
          }
          return (
            typeof A == `string` &&
              A[0] ===
                `
` &&
              e.push(`
`),
            A !== null && e.push(F(`` + A)),
            null
          );
        case `input`:
          e.push(G(`input`));
          var ne = null,
            I = null,
            re = null,
            ie = null,
            R = null,
            z = null,
            oe = null,
            se = null,
            ce = null,
            le;
          for (le in n)
            if (D.call(n, le)) {
              var B = n[le];
              if (B != null)
                switch (le) {
                  case `children`:
                  case `dangerouslySetInnerHTML`:
                    throw Error(i(399, `input`));
                  case `name`:
                    ne = B;
                    break;
                  case `formAction`:
                    I = B;
                    break;
                  case `formEncType`:
                    re = B;
                    break;
                  case `formMethod`:
                    ie = B;
                    break;
                  case `formTarget`:
                    R = B;
                    break;
                  case `defaultChecked`:
                    ce = B;
                    break;
                  case `defaultValue`:
                    oe = B;
                    break;
                  case `checked`:
                    se = B;
                    break;
                  case `value`:
                    z = B;
                    break;
                  default:
                    H(e, le, B);
                }
            }
          var ue = xe(e, r, a, I, re, ie, R, ne);
          return (
            se === null
              ? ce !== null && he(e, `checked`, ce)
              : he(e, `checked`, se),
            z === null ? oe !== null && H(e, `value`, oe) : H(e, `value`, z),
            e.push(`/>`),
            ue?.forEach(ve, e),
            null
          );
        case `button`:
          e.push(G(`button`));
          var V = null,
            de = null,
            fe = null,
            pe = null,
            ye = null,
            je = null,
            Me = null,
            K;
          for (K in n)
            if (D.call(n, K)) {
              var Ne = n[K];
              if (Ne != null)
                switch (K) {
                  case `children`:
                    V = Ne;
                    break;
                  case `dangerouslySetInnerHTML`:
                    de = Ne;
                    break;
                  case `name`:
                    fe = Ne;
                    break;
                  case `formAction`:
                    pe = Ne;
                    break;
                  case `formEncType`:
                    ye = Ne;
                    break;
                  case `formMethod`:
                    je = Ne;
                    break;
                  case `formTarget`:
                    Me = Ne;
                    break;
                  default:
                    H(e, K, Ne);
                }
            }
          var J = xe(e, r, a, pe, ye, je, Me, fe);
          if (
            (e.push(`>`), J?.forEach(ve, e), Se(e, de, V), typeof V == `string`)
          ) {
            e.push(F(V));
            var Pe = null;
          } else Pe = V;
          return Pe;
        case `form`:
          e.push(G(`form`));
          var Fe = null,
            Ie = null,
            Le = null,
            Re = null,
            ze = null,
            Be = null,
            Ve;
          for (Ve in n)
            if (D.call(n, Ve)) {
              var He = n[Ve];
              if (He != null)
                switch (Ve) {
                  case `children`:
                    Fe = He;
                    break;
                  case `dangerouslySetInnerHTML`:
                    Ie = He;
                    break;
                  case `action`:
                    Le = He;
                    break;
                  case `encType`:
                    Re = He;
                    break;
                  case `method`:
                    ze = He;
                    break;
                  case `target`:
                    Be = He;
                    break;
                  default:
                    H(e, Ve, He);
                }
            }
          var Ue = null,
            We = null;
          if (typeof Le == `function`) {
            var Y = be(r, Le);
            Y === null
              ? (e.push(` `, `action`, `="`, _e, `"`),
                (Be = ze = Re = Le = null),
                we(r, a))
              : ((Le = Y.action || ``),
                (Re = Y.encType),
                (ze = Y.method),
                (Be = Y.target),
                (Ue = Y.data),
                (We = Y.name));
          }
          if (
            (Le != null && H(e, `action`, Le),
            Re != null && H(e, `encType`, Re),
            ze != null && H(e, `method`, ze),
            Be != null && H(e, `target`, Be),
            e.push(`>`),
            We !== null &&
              (e.push(`<input type="hidden"`),
              ge(e, `name`, We),
              e.push(`/>`),
              Ue?.forEach(ve, e)),
            Se(e, Ie, Fe),
            typeof Fe == `string`)
          ) {
            e.push(F(Fe));
            var Ge = null;
          } else Ge = Fe;
          return Ge;
        case `menuitem`:
          for (var Ke in (e.push(G(`menuitem`)), n))
            if (D.call(n, Ke)) {
              var qe = n[Ke];
              if (qe != null)
                switch (Ke) {
                  case `children`:
                  case `dangerouslySetInnerHTML`:
                    throw Error(i(400));
                  default:
                    H(e, Ke, qe);
                }
            }
          return (e.push(`>`), null);
        case `object`:
          e.push(G(`object`));
          var Je = null,
            Ye = null,
            Xe;
          for (Xe in n)
            if (D.call(n, Xe)) {
              var Ze = n[Xe];
              if (Ze != null)
                switch (Xe) {
                  case `children`:
                    Je = Ze;
                    break;
                  case `dangerouslySetInnerHTML`:
                    Ye = Ze;
                    break;
                  case `data`:
                    var Qe = L(`` + Ze);
                    if (Qe === ``) break;
                    e.push(` `, `data`, `="`, F(Qe), `"`);
                    break;
                  default:
                    H(e, Xe, Ze);
                }
            }
          if ((e.push(`>`), Se(e, Ye, Je), typeof Je == `string`)) {
            e.push(F(Je));
            var $e = null;
          } else $e = Je;
          return $e;
        case `title`:
          var X = c.tagScope & 1,
            et = c.tagScope & 4;
          if (c.insertionMode === 4 || X || n.itemProp != null)
            var tt = U(e, n);
          else et ? (tt = null) : (U(a.hoistableChunks, n), (tt = void 0));
          return tt;
        case `link`:
          var nt = c.tagScope & 1,
            rt = c.tagScope & 4,
            it = n.rel,
            at = n.href,
            ot = n.precedence;
          if (
            c.insertionMode === 4 ||
            nt ||
            n.itemProp != null ||
            typeof it != `string` ||
            typeof at != `string` ||
            at === ``
          ) {
            Te(e, n);
            var st = null;
          } else if (n.rel === `stylesheet`)
            if (
              typeof ot != `string` ||
              n.disabled != null ||
              n.onLoad ||
              n.onError
            )
              st = Te(e, n);
            else {
              var ut = a.styles.get(ot),
                dt = r.styleResources.hasOwnProperty(at)
                  ? r.styleResources[at]
                  : void 0;
              if (dt !== null) {
                ((r.styleResources[at] = null),
                  ut ||
                    ((ut = {
                      precedence: F(ot),
                      rules: [],
                      hrefs: [],
                      sheets: new Map(),
                    }),
                    a.styles.set(ot, ut)));
                var ft = {
                  state: 0,
                  props: E({}, n, {
                    "data-precedence": n.precedence,
                    precedence: null,
                  }),
                };
                if (dt) {
                  dt.length === 2 && ct(ft.props, dt);
                  var pt = a.preloads.stylesheets.get(at);
                  pt && 0 < pt.length ? (pt.length = 0) : (ft.state = 1);
                }
                (ut.sheets.set(at, ft), s && s.stylesheets.add(ft));
              } else if (ut) {
                var mt = ut.sheets.get(at);
                mt && s && s.stylesheets.add(mt);
              }
              (l && e.push(`<!-- -->`), (st = null));
            }
          else
            n.onLoad || n.onError
              ? (st = Te(e, n))
              : (l && e.push(`<!-- -->`),
                (st = rt ? null : Te(a.hoistableChunks, n)));
          return st;
        case `script`:
          var ht = c.tagScope & 1,
            gt = n.async;
          if (
            typeof n.src != `string` ||
            !n.src ||
            !gt ||
            typeof gt == `function` ||
            typeof gt == `symbol` ||
            n.onLoad ||
            n.onError ||
            c.insertionMode === 4 ||
            ht ||
            n.itemProp != null
          )
            var _t = W(e, n);
          else {
            var vt = n.src;
            if (n.type === `module`)
              var yt = r.moduleScriptResources,
                bt = a.preloads.moduleScripts;
            else ((yt = r.scriptResources), (bt = a.preloads.scripts));
            var xt = yt.hasOwnProperty(vt) ? yt[vt] : void 0;
            if (xt !== null) {
              yt[vt] = null;
              var St = n;
              if (xt) {
                xt.length === 2 && ((St = E({}, n)), ct(St, xt));
                var Ct = bt.get(vt);
                Ct && (Ct.length = 0);
              }
              var wt = [];
              (a.scripts.add(wt), W(wt, St));
            }
            (l && e.push(`<!-- -->`), (_t = null));
          }
          return _t;
        case `style`:
          var Tt = c.tagScope & 1,
            Et = n.precedence,
            Dt = n.href,
            Ot = n.nonce;
          if (
            c.insertionMode === 4 ||
            Tt ||
            n.itemProp != null ||
            typeof Et != `string` ||
            typeof Dt != `string` ||
            Dt === ``
          ) {
            e.push(G(`style`));
            var kt = null,
              At = null,
              jt;
            for (jt in n)
              if (D.call(n, jt)) {
                var Mt = n[jt];
                if (Mt != null)
                  switch (jt) {
                    case `children`:
                      kt = Mt;
                      break;
                    case `dangerouslySetInnerHTML`:
                      At = Mt;
                      break;
                    default:
                      H(e, jt, Mt);
                  }
              }
            e.push(`>`);
            var Nt = Array.isArray(kt) ? (2 > kt.length ? kt[0] : null) : kt;
            (typeof Nt != `function` &&
              typeof Nt != `symbol` &&
              Nt != null &&
              e.push((`` + Nt).replace(Ee, De)),
              Se(e, At, kt),
              e.push(q(`style`)));
            var Pt = null;
          } else {
            var Ft = a.styles.get(Et);
            if (
              (r.styleResources.hasOwnProperty(Dt)
                ? r.styleResources[Dt]
                : void 0) !== null
            ) {
              ((r.styleResources[Dt] = null),
                Ft ||
                  ((Ft = {
                    precedence: F(Et),
                    rules: [],
                    hrefs: [],
                    sheets: new Map(),
                  }),
                  a.styles.set(Et, Ft)));
              var It = a.nonce.style;
              if (!It || It === Ot) {
                Ft.hrefs.push(F(Dt));
                var Lt = Ft.rules,
                  Rt = null,
                  zt = null,
                  Bt;
                for (Bt in n)
                  if (D.call(n, Bt)) {
                    var Vt = n[Bt];
                    if (Vt != null)
                      switch (Bt) {
                        case `children`:
                          Rt = Vt;
                          break;
                        case `dangerouslySetInnerHTML`:
                          zt = Vt;
                      }
                  }
                var Ht = Array.isArray(Rt)
                  ? 2 > Rt.length
                    ? Rt[0]
                    : null
                  : Rt;
                (typeof Ht != `function` &&
                  typeof Ht != `symbol` &&
                  Ht != null &&
                  Lt.push((`` + Ht).replace(Ee, De)),
                  Se(Lt, zt, Rt));
              }
            }
            (Ft && s && s.styles.add(Ft),
              l && e.push(`<!-- -->`),
              (Pt = void 0));
          }
          return Pt;
        case `meta`:
          var Ut = c.tagScope & 1,
            Wt = c.tagScope & 4;
          if (c.insertionMode === 4 || Ut || n.itemProp != null)
            var Gt = Oe(e, n, `meta`);
          else
            (l && e.push(`<!-- -->`),
              (Gt = Wt
                ? null
                : typeof n.charSet == `string`
                  ? Oe(a.charsetChunks, n, `meta`)
                  : n.name === `viewport`
                    ? Oe(a.viewportChunks, n, `meta`)
                    : Oe(a.hoistableChunks, n, `meta`)));
          return Gt;
        case `listing`:
        case `pre`:
          e.push(G(t));
          var Kt = null,
            qt = null,
            Jt;
          for (Jt in n)
            if (D.call(n, Jt)) {
              var Yt = n[Jt];
              if (Yt != null)
                switch (Jt) {
                  case `children`:
                    Kt = Yt;
                    break;
                  case `dangerouslySetInnerHTML`:
                    qt = Yt;
                    break;
                  default:
                    H(e, Jt, Yt);
                }
            }
          if ((e.push(`>`), qt != null)) {
            if (Kt != null) throw Error(i(60));
            if (typeof qt != `object` || !(`__html` in qt)) throw Error(i(61));
            var Z = qt.__html;
            Z != null &&
              (typeof Z == `string` &&
              0 < Z.length &&
              Z[0] ===
                `
`
                ? e.push(
                    `
`,
                    Z,
                  )
                : e.push(`` + Z));
          }
          return (
            typeof Kt == `string` &&
              Kt[0] ===
                `
` &&
              e.push(`
`),
            Kt
          );
        case `img`:
          var Xt = c.tagScope & 3,
            Zt = n.src,
            Qt = n.srcSet;
          if (
            !(
              n.loading === `lazy` ||
              (!Zt && !Qt) ||
              (typeof Zt != `string` && Zt != null) ||
              (typeof Qt != `string` && Qt != null) ||
              n.fetchPriority === `low` ||
              Xt
            ) &&
            (typeof Zt != `string` ||
              Zt[4] !== `:` ||
              (Zt[0] !== `d` && Zt[0] !== `D`) ||
              (Zt[1] !== `a` && Zt[1] !== `A`) ||
              (Zt[2] !== `t` && Zt[2] !== `T`) ||
              (Zt[3] !== `a` && Zt[3] !== `A`)) &&
            (typeof Qt != `string` ||
              Qt[4] !== `:` ||
              (Qt[0] !== `d` && Qt[0] !== `D`) ||
              (Qt[1] !== `a` && Qt[1] !== `A`) ||
              (Qt[2] !== `t` && Qt[2] !== `T`) ||
              (Qt[3] !== `a` && Qt[3] !== `A`))
          ) {
            s !== null && c.tagScope & 64 && (s.suspenseyImages = !0);
            var $t = typeof n.sizes == `string` ? n.sizes : void 0,
              en = Qt
                ? Qt +
                  `
` +
                  ($t || ``)
                : Zt,
              Q = a.preloads.images,
              tn = Q.get(en);
            if (tn)
              (n.fetchPriority === `high` || 10 > a.highImagePreloads.size) &&
                (Q.delete(en), a.highImagePreloads.add(tn));
            else if (!r.imageResources.hasOwnProperty(en)) {
              r.imageResources[en] = ae;
              var nn = n.crossOrigin,
                rn =
                  typeof nn == `string`
                    ? nn === `use-credentials`
                      ? nn
                      : ``
                    : void 0,
                an = a.headers,
                on;
              an &&
              0 < an.remainingCapacity &&
              typeof n.srcSet != `string` &&
              (n.fetchPriority === `high` ||
                500 > an.highImagePreloads.length) &&
              ((on = lt(Zt, `image`, {
                imageSrcSet: n.srcSet,
                imageSizes: n.sizes,
                crossOrigin: rn,
                integrity: n.integrity,
                nonce: n.nonce,
                type: n.type,
                fetchPriority: n.fetchPriority,
                referrerPolicy: n.refererPolicy,
              })),
              0 <= (an.remainingCapacity -= on.length + 2))
                ? ((a.resets.image[en] = ae),
                  an.highImagePreloads && (an.highImagePreloads += `, `),
                  (an.highImagePreloads += on))
                : ((tn = []),
                  Te(tn, {
                    rel: `preload`,
                    as: `image`,
                    href: Qt ? void 0 : Zt,
                    imageSrcSet: Qt,
                    imageSizes: $t,
                    crossOrigin: rn,
                    integrity: n.integrity,
                    type: n.type,
                    fetchPriority: n.fetchPriority,
                    referrerPolicy: n.referrerPolicy,
                  }),
                  n.fetchPriority === `high` || 10 > a.highImagePreloads.size
                    ? a.highImagePreloads.add(tn)
                    : (a.bulkPreloads.add(tn), Q.set(en, tn)));
            }
          }
          return Oe(e, n, `img`);
        case `base`:
        case `area`:
        case `br`:
        case `col`:
        case `embed`:
        case `hr`:
        case `keygen`:
        case `param`:
        case `source`:
        case `track`:
        case `wbr`:
          return Oe(e, n, t);
        case `annotation-xml`:
        case `color-profile`:
        case `font-face`:
        case `font-face-src`:
        case `font-face-uri`:
        case `font-face-format`:
        case `font-face-name`:
        case `missing-glyph`:
          break;
        case `head`:
          if (2 > c.insertionMode) {
            var sn = o || a.preamble;
            if (sn.headChunks) throw Error(i(545, "`<head>`"));
            (o !== null && e.push(`<!--head-->`), (sn.headChunks = []));
            var cn = ke(sn.headChunks, n, `head`);
          } else cn = Ae(e, n, `head`);
          return cn;
        case `body`:
          if (2 > c.insertionMode) {
            var ln = o || a.preamble;
            if (ln.bodyChunks) throw Error(i(545, "`<body>`"));
            (o !== null && e.push(`<!--body-->`), (ln.bodyChunks = []));
            var un = ke(ln.bodyChunks, n, `body`);
          } else un = Ae(e, n, `body`);
          return un;
        case `html`:
          if (c.insertionMode === 0) {
            var dn = o || a.preamble;
            if (dn.htmlChunks) throw Error(i(545, "`<html>`"));
            (o !== null && e.push(`<!--html-->`), (dn.htmlChunks = [``]));
            var fn = ke(dn.htmlChunks, n, `html`);
          } else fn = Ae(e, n, `html`);
          return fn;
        default:
          if (t.indexOf(`-`) !== -1) {
            e.push(G(t));
            var pn = null,
              mn = null,
              hn;
            for (hn in n)
              if (D.call(n, hn)) {
                var gn = n[hn];
                if (gn != null) {
                  var _n = hn;
                  switch (hn) {
                    case `children`:
                      pn = gn;
                      break;
                    case `dangerouslySetInnerHTML`:
                      mn = gn;
                      break;
                    case `style`:
                      me(e, gn);
                      break;
                    case `suppressContentEditableWarning`:
                    case `suppressHydrationWarning`:
                    case `ref`:
                      break;
                    case `className`:
                      _n = `class`;
                    default:
                      if (
                        j(hn) &&
                        typeof gn != `function` &&
                        typeof gn != `symbol` &&
                        !1 !== gn
                      ) {
                        if (!0 === gn) gn = ``;
                        else if (typeof gn == `object`) continue;
                        e.push(` `, _n, `="`, F(gn), `"`);
                      }
                  }
                }
              }
            return (e.push(`>`), Se(e, mn, pn), pn);
          }
      }
      return Ae(e, n, t);
    }
    var Ne = new Map();
    function q(e) {
      var t = Ne.get(e);
      return (t === void 0 && ((t = `</` + e + `>`), Ne.set(e, t)), t);
    }
    function J(e, t) {
      ((e = e.preamble),
        e.htmlChunks === null && t.htmlChunks && (e.htmlChunks = t.htmlChunks),
        e.headChunks === null && t.headChunks && (e.headChunks = t.headChunks),
        e.bodyChunks === null && t.bodyChunks && (e.bodyChunks = t.bodyChunks));
    }
    function Pe(e, t) {
      t = t.bootstrapChunks;
      for (var n = 0; n < t.length - 1; n++) e.push(t[n]);
      return n < t.length ? ((n = t[n]), (t.length = 0), e.push(n)) : !0;
    }
    function Fe(e, t, n) {
      if ((e.push(`<!--$?--><template id="`), n === null)) throw Error(i(395));
      return (
        e.push(t.boundaryPrefix),
        (t = n.toString(16)),
        e.push(t),
        e.push(`"></template>`)
      );
    }
    function Ie(e, t, n, r) {
      switch (n.insertionMode) {
        case 0:
        case 1:
        case 3:
        case 2:
          return (
            e.push(`<div hidden id="`),
            e.push(t.segmentPrefix),
            (t = r.toString(16)),
            e.push(t),
            e.push(`">`)
          );
        case 4:
          return (
            e.push(`<svg aria-hidden="true" style="display:none" id="`),
            e.push(t.segmentPrefix),
            (t = r.toString(16)),
            e.push(t),
            e.push(`">`)
          );
        case 5:
          return (
            e.push(`<math aria-hidden="true" style="display:none" id="`),
            e.push(t.segmentPrefix),
            (t = r.toString(16)),
            e.push(t),
            e.push(`">`)
          );
        case 6:
          return (
            e.push(`<table hidden id="`),
            e.push(t.segmentPrefix),
            (t = r.toString(16)),
            e.push(t),
            e.push(`">`)
          );
        case 7:
          return (
            e.push(`<table hidden><tbody id="`),
            e.push(t.segmentPrefix),
            (t = r.toString(16)),
            e.push(t),
            e.push(`">`)
          );
        case 8:
          return (
            e.push(`<table hidden><tr id="`),
            e.push(t.segmentPrefix),
            (t = r.toString(16)),
            e.push(t),
            e.push(`">`)
          );
        case 9:
          return (
            e.push(`<table hidden><colgroup id="`),
            e.push(t.segmentPrefix),
            (t = r.toString(16)),
            e.push(t),
            e.push(`">`)
          );
        default:
          throw Error(i(397));
      }
    }
    function Le(e, t) {
      switch (t.insertionMode) {
        case 0:
        case 1:
        case 3:
        case 2:
          return e.push(`</div>`);
        case 4:
          return e.push(`</svg>`);
        case 5:
          return e.push(`</math>`);
        case 6:
          return e.push(`</table>`);
        case 7:
          return e.push(`</tbody></table>`);
        case 8:
          return e.push(`</tr></table>`);
        case 9:
          return e.push(`</colgroup></table>`);
        default:
          throw Error(i(397));
      }
    }
    var Re = /[<\u2028\u2029]/g;
    function ze(e) {
      return JSON.stringify(e).replace(Re, function (e) {
        switch (e) {
          case `<`:
            return `\\u003c`;
          case `\u2028`:
            return `\\u2028`;
          case `\u2029`:
            return `\\u2029`;
          default:
            throw Error(
              `escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React`,
            );
        }
      });
    }
    var Be = /[&><\u2028\u2029]/g;
    function Ve(e) {
      return JSON.stringify(e).replace(Be, function (e) {
        switch (e) {
          case `&`:
            return `\\u0026`;
          case `>`:
            return `\\u003e`;
          case `<`:
            return `\\u003c`;
          case `\u2028`:
            return `\\u2028`;
          case `\u2029`:
            return `\\u2029`;
          default:
            throw Error(
              `escapeJSObjectForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React`,
            );
        }
      });
    }
    var He = !1,
      Ue = !0;
    function We(e) {
      var t = e.rules,
        n = e.hrefs,
        r = 0;
      if (n.length) {
        for (
          this.push(oe.startInlineStyle),
            this.push(` media="not all" data-precedence="`),
            this.push(e.precedence),
            this.push(`" data-href="`);
          r < n.length - 1;
          r++
        )
          (this.push(n[r]), this.push(` `));
        for (this.push(n[r]), this.push(`">`), r = 0; r < t.length; r++)
          this.push(t[r]);
        ((Ue = this.push(`</style>`)),
          (He = !0),
          (t.length = 0),
          (n.length = 0));
      }
    }
    function Y(e) {
      return e.state === 2 ? !1 : (He = !0);
    }
    function Ge(e, t, n) {
      return (
        (He = !1),
        (Ue = !0),
        (oe = n),
        t.styles.forEach(We, e),
        (oe = null),
        t.stylesheets.forEach(Y),
        He && (n.stylesToHoist = !0),
        Ue
      );
    }
    function Ke(e) {
      for (var t = 0; t < e.length; t++) this.push(e[t]);
      e.length = 0;
    }
    var qe = [];
    function Je(e) {
      Te(qe, e.props);
      for (var t = 0; t < qe.length; t++) this.push(qe[t]);
      ((qe.length = 0), (e.state = 2));
    }
    function Ye(e) {
      var t = 0 < e.sheets.size;
      (e.sheets.forEach(Je, this), e.sheets.clear());
      var n = e.rules,
        r = e.hrefs;
      if (!t || r.length) {
        if (
          (this.push(oe.startInlineStyle),
          this.push(` data-precedence="`),
          this.push(e.precedence),
          (e = 0),
          r.length)
        ) {
          for (this.push(`" data-href="`); e < r.length - 1; e++)
            (this.push(r[e]), this.push(` `));
          this.push(r[e]);
        }
        for (this.push(`">`), e = 0; e < n.length; e++) this.push(n[e]);
        (this.push(`</style>`), (n.length = 0), (r.length = 0));
      }
    }
    function Xe(e) {
      if (e.state === 0) {
        e.state = 1;
        var t = e.props;
        for (
          Te(qe, {
            rel: `preload`,
            as: `style`,
            href: e.props.href,
            crossOrigin: t.crossOrigin,
            fetchPriority: t.fetchPriority,
            integrity: t.integrity,
            media: t.media,
            hrefLang: t.hrefLang,
            referrerPolicy: t.referrerPolicy,
          }),
            e = 0;
          e < qe.length;
          e++
        )
          this.push(qe[e]);
        qe.length = 0;
      }
    }
    function Ze(e) {
      (e.sheets.forEach(Xe, this), e.sheets.clear());
    }
    function Qe(e, t) {
      !(t.instructions & 32) &&
        ((t.instructions |= 32),
        e.push(` id="`, F(`_` + t.idPrefix + `R_`), `"`));
    }
    function $e(e, t) {
      e.push(`[`);
      var n = `[`;
      (t.stylesheets.forEach(function (t) {
        if (t.state !== 2)
          if (t.state === 3)
            (e.push(n),
              (t = Ve(`` + t.props.href)),
              e.push(t),
              e.push(`]`),
              (n = `,[`));
          else {
            e.push(n);
            var r = t.props[`data-precedence`],
              a = t.props,
              o = L(`` + t.props.href);
            for (var s in ((o = Ve(o)),
            e.push(o),
            (r = `` + r),
            e.push(`,`),
            (r = Ve(r)),
            e.push(r),
            a))
              if (D.call(a, s) && ((r = a[s]), r != null))
                switch (s) {
                  case `href`:
                  case `rel`:
                  case `precedence`:
                  case `data-precedence`:
                    break;
                  case `children`:
                  case `dangerouslySetInnerHTML`:
                    throw Error(i(399, `link`));
                  default:
                    X(e, s, r);
                }
            (e.push(`]`), (n = `,[`), (t.state = 3));
          }
      }),
        e.push(`]`));
    }
    function X(e, t, n) {
      var r = t.toLowerCase();
      switch (typeof n) {
        case `function`:
        case `symbol`:
          return;
      }
      switch (t) {
        case `innerHTML`:
        case `dangerouslySetInnerHTML`:
        case `suppressContentEditableWarning`:
        case `suppressHydrationWarning`:
        case `style`:
        case `ref`:
          return;
        case `className`:
          ((r = `class`), (t = `` + n));
          break;
        case `hidden`:
          if (!1 === n) return;
          t = ``;
          break;
        case `src`:
        case `href`:
          ((n = L(n)), (t = `` + n));
          break;
        default:
          if (
            (2 < t.length &&
              (t[0] === `o` || t[0] === `O`) &&
              (t[1] === `n` || t[1] === `N`)) ||
            !j(t)
          )
            return;
          t = `` + n;
      }
      (e.push(`,`),
        (r = Ve(r)),
        e.push(r),
        e.push(`,`),
        (r = Ve(t)),
        e.push(r));
    }
    function et() {
      return { styles: new Set(), stylesheets: new Set(), suspenseyImages: !1 };
    }
    function tt(e) {
      var t = Nn || null;
      if (t) {
        var n = t.resumableState,
          r = t.renderState;
        if (typeof e == `string` && e) {
          if (!n.dnsResources.hasOwnProperty(e)) {
            ((n.dnsResources[e] = null), (n = r.headers));
            var i, a;
            ((a = n && 0 < n.remainingCapacity) &&
              (a =
                ((i = `<` + (`` + e).replace(ut, dt) + `>; rel=dns-prefetch`),
                0 <= (n.remainingCapacity -= i.length + 2))),
              a
                ? ((r.resets.dns[e] = null),
                  n.preconnects && (n.preconnects += `, `),
                  (n.preconnects += i))
                : ((i = []),
                  Te(i, { href: e, rel: `dns-prefetch` }),
                  r.preconnects.add(i)));
          }
          Or(t);
        }
      } else z.D(e);
    }
    function nt(e, t) {
      var n = Nn || null;
      if (n) {
        var r = n.resumableState,
          i = n.renderState;
        if (typeof e == `string` && e) {
          var a =
            t === `use-credentials`
              ? `credentials`
              : typeof t == `string`
                ? `anonymous`
                : `default`;
          if (!r.connectResources[a].hasOwnProperty(e)) {
            ((r.connectResources[a][e] = null), (r = i.headers));
            var o, s;
            if ((s = r && 0 < r.remainingCapacity)) {
              if (
                ((s = `<` + (`` + e).replace(ut, dt) + `>; rel=preconnect`),
                typeof t == `string`)
              ) {
                var c = (`` + t).replace(ft, pt);
                s += `; crossorigin="` + c + `"`;
              }
              s = ((o = s), 0 <= (r.remainingCapacity -= o.length + 2));
            }
            s
              ? ((i.resets.connect[a][e] = null),
                r.preconnects && (r.preconnects += `, `),
                (r.preconnects += o))
              : ((a = []),
                Te(a, { rel: `preconnect`, href: e, crossOrigin: t }),
                i.preconnects.add(a));
          }
          Or(n);
        }
      } else z.C(e, t);
    }
    function rt(e, t, n) {
      var r = Nn || null;
      if (r) {
        var i = r.resumableState,
          a = r.renderState;
        if (t && e) {
          switch (t) {
            case `image`:
              if (n)
                var o = n.imageSrcSet,
                  s = n.imageSizes,
                  c = n.fetchPriority;
              var l = o
                ? o +
                  `
` +
                  (s || ``)
                : e;
              if (i.imageResources.hasOwnProperty(l)) return;
              ((i.imageResources[l] = ae), (i = a.headers));
              var u;
              i &&
              0 < i.remainingCapacity &&
              typeof o != `string` &&
              c === `high` &&
              ((u = lt(e, t, n)), 0 <= (i.remainingCapacity -= u.length + 2))
                ? ((a.resets.image[l] = ae),
                  i.highImagePreloads && (i.highImagePreloads += `, `),
                  (i.highImagePreloads += u))
                : ((i = []),
                  Te(i, E({ rel: `preload`, href: o ? void 0 : e, as: t }, n)),
                  c === `high`
                    ? a.highImagePreloads.add(i)
                    : (a.bulkPreloads.add(i), a.preloads.images.set(l, i)));
              break;
            case `style`:
              if (i.styleResources.hasOwnProperty(e)) return;
              ((o = []),
                Te(o, E({ rel: `preload`, href: e, as: t }, n)),
                (i.styleResources[e] =
                  !n ||
                  (typeof n.crossOrigin != `string` &&
                    typeof n.integrity != `string`)
                    ? ae
                    : [n.crossOrigin, n.integrity]),
                a.preloads.stylesheets.set(e, o),
                a.bulkPreloads.add(o));
              break;
            case `script`:
              if (i.scriptResources.hasOwnProperty(e)) return;
              ((o = []),
                a.preloads.scripts.set(e, o),
                a.bulkPreloads.add(o),
                Te(o, E({ rel: `preload`, href: e, as: t }, n)),
                (i.scriptResources[e] =
                  !n ||
                  (typeof n.crossOrigin != `string` &&
                    typeof n.integrity != `string`)
                    ? ae
                    : [n.crossOrigin, n.integrity]));
              break;
            default:
              if (i.unknownResources.hasOwnProperty(t)) {
                if (((o = i.unknownResources[t]), o.hasOwnProperty(e))) return;
              } else ((o = {}), (i.unknownResources[t] = o));
              if (
                ((o[e] = ae),
                (i = a.headers) &&
                  0 < i.remainingCapacity &&
                  t === `font` &&
                  ((l = lt(e, t, n)),
                  0 <= (i.remainingCapacity -= l.length + 2)))
              )
                ((a.resets.font[e] = ae),
                  i.fontPreloads && (i.fontPreloads += `, `),
                  (i.fontPreloads += l));
              else
                switch (
                  ((i = []),
                  (e = E({ rel: `preload`, href: e, as: t }, n)),
                  Te(i, e),
                  t)
                ) {
                  case `font`:
                    a.fontPreloads.add(i);
                    break;
                  default:
                    a.bulkPreloads.add(i);
                }
          }
          Or(r);
        }
      } else z.L(e, t, n);
    }
    function it(e, t) {
      var n = Nn || null;
      if (n) {
        var r = n.resumableState,
          i = n.renderState;
        if (e) {
          var a = t && typeof t.as == `string` ? t.as : `script`;
          switch (a) {
            case `script`:
              if (r.moduleScriptResources.hasOwnProperty(e)) return;
              ((a = []),
                (r.moduleScriptResources[e] =
                  !t ||
                  (typeof t.crossOrigin != `string` &&
                    typeof t.integrity != `string`)
                    ? ae
                    : [t.crossOrigin, t.integrity]),
                i.preloads.moduleScripts.set(e, a));
              break;
            default:
              if (r.moduleUnknownResources.hasOwnProperty(a)) {
                var o = r.unknownResources[a];
                if (o.hasOwnProperty(e)) return;
              } else ((o = {}), (r.moduleUnknownResources[a] = o));
              ((a = []), (o[e] = ae));
          }
          (Te(a, E({ rel: `modulepreload`, href: e }, t)),
            i.bulkPreloads.add(a),
            Or(n));
        }
      } else z.m(e, t);
    }
    function at(e, t, n) {
      var r = Nn || null;
      if (r) {
        var i = r.resumableState,
          a = r.renderState;
        if (e) {
          t ||= `default`;
          var o = a.styles.get(t),
            s = i.styleResources.hasOwnProperty(e)
              ? i.styleResources[e]
              : void 0;
          s !== null &&
            ((i.styleResources[e] = null),
            o ||
              ((o = {
                precedence: F(t),
                rules: [],
                hrefs: [],
                sheets: new Map(),
              }),
              a.styles.set(t, o)),
            (t = {
              state: 0,
              props: E({ rel: `stylesheet`, href: e, "data-precedence": t }, n),
            }),
            s &&
              (s.length === 2 && ct(t.props, s),
              (a = a.preloads.stylesheets.get(e)) && 0 < a.length
                ? (a.length = 0)
                : (t.state = 1)),
            o.sheets.set(e, t),
            Or(r));
        }
      } else z.S(e, t, n);
    }
    function ot(e, t) {
      var n = Nn || null;
      if (n) {
        var r = n.resumableState,
          i = n.renderState;
        if (e) {
          var a = r.scriptResources.hasOwnProperty(e)
            ? r.scriptResources[e]
            : void 0;
          a !== null &&
            ((r.scriptResources[e] = null),
            (t = E({ src: e, async: !0 }, t)),
            a &&
              (a.length === 2 && ct(t, a), (e = i.preloads.scripts.get(e))) &&
              (e.length = 0),
            (e = []),
            i.scripts.add(e),
            W(e, t),
            Or(n));
        }
      } else z.X(e, t);
    }
    function st(e, t) {
      var n = Nn || null;
      if (n) {
        var r = n.resumableState,
          i = n.renderState;
        if (e) {
          var a = r.moduleScriptResources.hasOwnProperty(e)
            ? r.moduleScriptResources[e]
            : void 0;
          a !== null &&
            ((r.moduleScriptResources[e] = null),
            (t = E({ src: e, type: `module`, async: !0 }, t)),
            a &&
              (a.length === 2 && ct(t, a),
              (e = i.preloads.moduleScripts.get(e))) &&
              (e.length = 0),
            (e = []),
            i.scripts.add(e),
            W(e, t),
            Or(n));
        }
      } else z.M(e, t);
    }
    function ct(e, t) {
      ((e.crossOrigin ??= t[0]), (e.integrity ??= t[1]));
    }
    function lt(e, t, n) {
      for (var r in ((e = (`` + e).replace(ut, dt)),
      (t = (`` + t).replace(ft, pt)),
      (t = `<` + e + `>; rel=preload; as="` + t + `"`),
      n))
        D.call(n, r) &&
          ((e = n[r]),
          typeof e == `string` &&
            (t +=
              `; ` + r.toLowerCase() + `="` + (`` + e).replace(ft, pt) + `"`));
      return t;
    }
    var ut = /[<>\r\n]/g;
    function dt(e) {
      switch (e) {
        case `<`:
          return `%3C`;
        case `>`:
          return `%3E`;
        case `
`:
          return `%0A`;
        case `\r`:
          return `%0D`;
        default:
          throw Error(
            `escapeLinkHrefForHeaderContextReplacer encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React`,
          );
      }
    }
    var ft = /["';,\r\n]/g;
    function pt(e) {
      switch (e) {
        case `"`:
          return `%22`;
        case `'`:
          return `%27`;
        case `;`:
          return `%3B`;
        case `,`:
          return `%2C`;
        case `
`:
          return `%0A`;
        case `\r`:
          return `%0D`;
        default:
          throw Error(
            `escapeStringForLinkHeaderQuotedParamValueContextReplacer encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React`,
          );
      }
    }
    function mt(e) {
      this.styles.add(e);
    }
    function ht(e) {
      this.stylesheets.add(e);
    }
    function gt(e, t) {
      (t.styles.forEach(mt, e),
        t.stylesheets.forEach(ht, e),
        t.suspenseyImages && (e.suspenseyImages = !0));
    }
    function _t(e, t) {
      var n = e.idPrefix,
        r = [],
        i = e.bootstrapScriptContent,
        a = e.bootstrapScripts,
        o = e.bootstrapModules;
      (i !== void 0 &&
        (r.push(`<script`),
        Qe(r, e),
        r.push(`>`, (`` + i).replace(se, ce), `<\/script>`)),
        (i = n + `P:`));
      var s = n + `S:`;
      n += `B:`;
      var c = new Set(),
        l = new Set(),
        u = new Set(),
        d = new Map(),
        f = new Set(),
        p = new Set(),
        m = new Set(),
        h = {
          images: new Map(),
          stylesheets: new Map(),
          scripts: new Map(),
          moduleScripts: new Map(),
        };
      if (a !== void 0)
        for (var g = 0; g < a.length; g++) {
          var _ = a[g],
            v,
            y = void 0,
            b = void 0,
            x = {
              rel: `preload`,
              as: `script`,
              fetchPriority: `low`,
              nonce: void 0,
            };
          (typeof _ == `string`
            ? (x.href = v = _)
            : ((x.href = v = _.src),
              (x.integrity = b =
                typeof _.integrity == `string` ? _.integrity : void 0),
              (x.crossOrigin = y =
                typeof _ == `string` || _.crossOrigin == null
                  ? void 0
                  : _.crossOrigin === `use-credentials`
                    ? `use-credentials`
                    : ``)),
            (_ = e));
          var S = v;
          ((_.scriptResources[S] = null),
            (_.moduleScriptResources[S] = null),
            (_ = []),
            Te(_, x),
            f.add(_),
            r.push(`<script src="`, F(v), `"`),
            typeof b == `string` && r.push(` integrity="`, F(b), `"`),
            typeof y == `string` && r.push(` crossorigin="`, F(y), `"`),
            Qe(r, e),
            r.push(` async=""><\/script>`));
        }
      if (o !== void 0)
        for (a = 0; a < o.length; a++)
          ((x = o[a]),
            (y = v = void 0),
            (b = { rel: `modulepreload`, fetchPriority: `low`, nonce: void 0 }),
            typeof x == `string`
              ? (b.href = g = x)
              : ((b.href = g = x.src),
                (b.integrity = y =
                  typeof x.integrity == `string` ? x.integrity : void 0),
                (b.crossOrigin = v =
                  typeof x == `string` || x.crossOrigin == null
                    ? void 0
                    : x.crossOrigin === `use-credentials`
                      ? `use-credentials`
                      : ``)),
            (x = e),
            (_ = g),
            (x.scriptResources[_] = null),
            (x.moduleScriptResources[_] = null),
            (x = []),
            Te(x, b),
            f.add(x),
            r.push(`<script type="module" src="`, F(g), `"`),
            typeof y == `string` && r.push(` integrity="`, F(y), `"`),
            typeof v == `string` && r.push(` crossorigin="`, F(v), `"`),
            Qe(r, e),
            r.push(` async=""><\/script>`));
      return {
        placeholderPrefix: i,
        segmentPrefix: s,
        boundaryPrefix: n,
        startInlineScript: `<script`,
        startInlineStyle: `<style`,
        preamble: { htmlChunks: null, headChunks: null, bodyChunks: null },
        externalRuntimeScript: null,
        bootstrapChunks: r,
        importMapChunks: [],
        onHeaders: void 0,
        headers: null,
        resets: {
          font: {},
          dns: {},
          connect: { default: {}, anonymous: {}, credentials: {} },
          image: {},
          style: {},
        },
        charsetChunks: [],
        viewportChunks: [],
        hoistableChunks: [],
        preconnects: c,
        fontPreloads: l,
        highImagePreloads: u,
        styles: d,
        bootstrapScripts: f,
        scripts: p,
        bulkPreloads: m,
        preloads: h,
        nonce: { script: void 0, style: void 0 },
        stylesToHoist: !1,
        generateStaticMarkup: t,
      };
    }
    function vt(e, t, n, r) {
      return n.generateStaticMarkup
        ? (e.push(F(t)), !1)
        : (t === ``
            ? (e = r)
            : (r && e.push(`<!-- -->`), e.push(F(t)), (e = !0)),
          e);
    }
    function yt(e, t, n, r) {
      t.generateStaticMarkup || (n && r && e.push(`<!-- -->`));
    }
    var bt = Function.prototype.bind,
      xt = Symbol.for(`react.client.reference`);
    function St(e) {
      if (e == null) return null;
      if (typeof e == `function`)
        return e.$$typeof === xt ? null : e.displayName || e.name || null;
      if (typeof e == `string`) return e;
      switch (e) {
        case s:
          return `Fragment`;
        case l:
          return `Profiler`;
        case c:
          return `StrictMode`;
        case m:
          return `Suspense`;
        case h:
          return `SuspenseList`;
        case y:
          return `Activity`;
      }
      if (typeof e == `object`)
        switch (e.$$typeof) {
          case o:
            return `Portal`;
          case d:
            return e.displayName || `Context`;
          case u:
            return (e._context.displayName || `Context`) + `.Consumer`;
          case p:
            var t = e.render;
            return (
              (e = e.displayName),
              (e ||=
                ((e = t.displayName || t.name || ``),
                e === `` ? `ForwardRef` : `ForwardRef(` + e + `)`)),
              e
            );
          case g:
            return (
              (t = e.displayName || null),
              t === null ? St(e.type) || `Memo` : t
            );
          case _:
            ((t = e._payload), (e = e._init));
            try {
              return St(e(t));
            } catch {}
        }
      return null;
    }
    var Ct = {},
      wt = null;
    function Tt(e, t) {
      if (e !== t) {
        ((e.context._currentValue2 = e.parentValue), (e = e.parent));
        var n = t.parent;
        if (e === null) {
          if (n !== null) throw Error(i(401));
        } else {
          if (n === null) throw Error(i(401));
          Tt(e, n);
        }
        t.context._currentValue2 = t.value;
      }
    }
    function Et(e) {
      ((e.context._currentValue2 = e.parentValue),
        (e = e.parent),
        e !== null && Et(e));
    }
    function Dt(e) {
      var t = e.parent;
      (t !== null && Dt(t), (e.context._currentValue2 = e.value));
    }
    function Ot(e, t) {
      if (
        ((e.context._currentValue2 = e.parentValue), (e = e.parent), e === null)
      )
        throw Error(i(402));
      e.depth === t.depth ? Tt(e, t) : Ot(e, t);
    }
    function kt(e, t) {
      var n = t.parent;
      if (n === null) throw Error(i(402));
      (e.depth === n.depth ? Tt(e, n) : kt(e, n),
        (t.context._currentValue2 = t.value));
    }
    function At(e) {
      var t = wt;
      t !== e &&
        (t === null
          ? Dt(e)
          : e === null
            ? Et(t)
            : t.depth === e.depth
              ? Tt(t, e)
              : t.depth > e.depth
                ? Ot(t, e)
                : kt(t, e),
        (wt = e));
    }
    var jt = {
        enqueueSetState: function (e, t) {
          ((e = e._reactInternals), e.queue !== null && e.queue.push(t));
        },
        enqueueReplaceState: function (e, t) {
          ((e = e._reactInternals), (e.replace = !0), (e.queue = [t]));
        },
        enqueueForceUpdate: function () {},
      },
      Mt = { id: 1, overflow: `` };
    function Nt(e, t, n) {
      var r = e.id;
      e = e.overflow;
      var i = 32 - Pt(r) - 1;
      ((r &= ~(1 << i)), (n += 1));
      var a = 32 - Pt(t) + i;
      if (30 < a) {
        var o = i - (i % 5);
        return (
          (a = (r & ((1 << o) - 1)).toString(32)),
          (r >>= o),
          (i -= o),
          { id: (1 << (32 - Pt(t) + i)) | (n << i) | r, overflow: a + e }
        );
      }
      return { id: (1 << a) | (n << i) | r, overflow: e };
    }
    var Pt = Math.clz32 ? Math.clz32 : Lt,
      Ft = Math.log,
      It = Math.LN2;
    function Lt(e) {
      return ((e >>>= 0), e === 0 ? 32 : (31 - ((Ft(e) / It) | 0)) | 0);
    }
    function Rt() {}
    var zt = Error(i(460));
    function Bt(e, t, n) {
      switch (
        ((n = e[n]),
        n === void 0 ? e.push(t) : n !== t && (t.then(Rt, Rt), (t = n)),
        t.status)
      ) {
        case `fulfilled`:
          return t.value;
        case `rejected`:
          throw t.reason;
        default:
          switch (
            (typeof t.status == `string`
              ? t.then(Rt, Rt)
              : ((e = t),
                (e.status = `pending`),
                e.then(
                  function (e) {
                    if (t.status === `pending`) {
                      var n = t;
                      ((n.status = `fulfilled`), (n.value = e));
                    }
                  },
                  function (e) {
                    if (t.status === `pending`) {
                      var n = t;
                      ((n.status = `rejected`), (n.reason = e));
                    }
                  },
                )),
            t.status)
          ) {
            case `fulfilled`:
              return t.value;
            case `rejected`:
              throw t.reason;
          }
          throw ((Vt = t), zt);
      }
    }
    var Vt = null;
    function Ht() {
      if (Vt === null) throw Error(i(459));
      var e = Vt;
      return ((Vt = null), e);
    }
    function Ut(e, t) {
      return (e === t && (e !== 0 || 1 / e == 1 / t)) || (e !== e && t !== t);
    }
    var Wt = typeof Object.is == `function` ? Object.is : Ut,
      Gt = null,
      Kt = null,
      qt = null,
      Jt = null,
      Yt = null,
      Z = null,
      Xt = !1,
      Zt = !1,
      Qt = 0,
      $t = 0,
      en = -1,
      Q = 0,
      tn = null,
      nn = null,
      rn = 0;
    function an() {
      if (Gt === null) throw Error(i(321));
      return Gt;
    }
    function on() {
      if (0 < rn) throw Error(i(312));
      return { memoizedState: null, queue: null, next: null };
    }
    function sn() {
      return (
        Z === null
          ? Yt === null
            ? ((Xt = !1), (Yt = Z = on()))
            : ((Xt = !0), (Z = Yt))
          : Z.next === null
            ? ((Xt = !1), (Z = Z.next = on()))
            : ((Xt = !0), (Z = Z.next)),
        Z
      );
    }
    function cn() {
      var e = tn;
      return ((tn = null), e);
    }
    function ln() {
      ((Jt = qt = Kt = Gt = null),
        (Zt = !1),
        (Yt = null),
        (rn = 0),
        (Z = nn = null));
    }
    function un(e, t) {
      return typeof t == `function` ? t(e) : t;
    }
    function dn(e, t, n) {
      if (((Gt = an()), (Z = sn()), Xt)) {
        var r = Z.queue;
        if (
          ((t = r.dispatch), nn !== null && ((n = nn.get(r)), n !== void 0))
        ) {
          (nn.delete(r), (r = Z.memoizedState));
          do ((r = e(r, n.action)), (n = n.next));
          while (n !== null);
          return ((Z.memoizedState = r), [r, t]);
        }
        return [Z.memoizedState, t];
      }
      return (
        (e =
          e === un
            ? typeof t == `function`
              ? t()
              : t
            : n === void 0
              ? t
              : n(t)),
        (Z.memoizedState = e),
        (e = Z.queue = { last: null, dispatch: null }),
        (e = e.dispatch = pn.bind(null, Gt, e)),
        [Z.memoizedState, e]
      );
    }
    function fn(e, t) {
      if (
        ((Gt = an()), (Z = sn()), (t = t === void 0 ? null : t), Z !== null)
      ) {
        var n = Z.memoizedState;
        if (n !== null && t !== null) {
          var r = n[1];
          a: if (r === null) r = !1;
          else {
            for (var i = 0; i < r.length && i < t.length; i++)
              if (!Wt(t[i], r[i])) {
                r = !1;
                break a;
              }
            r = !0;
          }
          if (r) return n[0];
        }
      }
      return ((e = e()), (Z.memoizedState = [e, t]), e);
    }
    function pn(e, t, n) {
      if (25 <= rn) throw Error(i(301));
      if (e === Gt)
        if (
          ((Zt = !0),
          (e = { action: n, next: null }),
          nn === null && (nn = new Map()),
          (n = nn.get(t)),
          n === void 0)
        )
          nn.set(t, e);
        else {
          for (t = n; t.next !== null; ) t = t.next;
          t.next = e;
        }
    }
    function mn() {
      throw Error(i(440));
    }
    function hn() {
      throw Error(i(394));
    }
    function gn() {
      throw Error(i(479));
    }
    function _n(e, t, n) {
      an();
      var r = $t++,
        i = qt;
      if (typeof e.$$FORM_ACTION == `function`) {
        var a = null,
          o = Jt;
        i = i.formState;
        var s = e.$$IS_SIGNATURE_EQUAL;
        if (i !== null && typeof s == `function`) {
          var c = i[1];
          s.call(e, i[2], i[3]) &&
            ((a =
              n === void 0
                ? `k` + T(JSON.stringify([o, null, r]), 0)
                : `p` + n),
            c === a && ((en = r), (t = i[0])));
        }
        var l = e.bind(null, t);
        return (
          (e = function (e) {
            l(e);
          }),
          typeof l.$$FORM_ACTION == `function` &&
            (e.$$FORM_ACTION = function (e) {
              ((e = l.$$FORM_ACTION(e)),
                n !== void 0 && ((n += ``), (e.action = n)));
              var t = e.data;
              return (
                t &&
                  (a === null &&
                    (a =
                      n === void 0
                        ? `k` + T(JSON.stringify([o, null, r]), 0)
                        : `p` + n),
                  t.append(`$ACTION_KEY`, a)),
                e
              );
            }),
          [t, e, !1]
        );
      }
      var u = e.bind(null, t);
      return [
        t,
        function (e) {
          u(e);
        },
        !1,
      ];
    }
    function vn(e) {
      var t = Q;
      return ((Q += 1), tn === null && (tn = []), Bt(tn, e, t));
    }
    function yn() {
      throw Error(i(393));
    }
    var bn = {
        readContext: function (e) {
          return e._currentValue2;
        },
        use: function (e) {
          if (typeof e == `object` && e) {
            if (typeof e.then == `function`) return vn(e);
            if (e.$$typeof === d) return e._currentValue2;
          }
          throw Error(i(438, String(e)));
        },
        useContext: function (e) {
          return (an(), e._currentValue2);
        },
        useMemo: fn,
        useReducer: dn,
        useRef: function (e) {
          ((Gt = an()), (Z = sn()));
          var t = Z.memoizedState;
          return t === null ? ((e = { current: e }), (Z.memoizedState = e)) : t;
        },
        useState: function (e) {
          return dn(un, e);
        },
        useInsertionEffect: Rt,
        useLayoutEffect: Rt,
        useCallback: function (e, t) {
          return fn(function () {
            return e;
          }, t);
        },
        useImperativeHandle: Rt,
        useEffect: Rt,
        useDebugValue: Rt,
        useDeferredValue: function (e, t) {
          return (an(), t === void 0 ? e : t);
        },
        useTransition: function () {
          return (an(), [!1, hn]);
        },
        useId: function () {
          var e = Kt.treeContext,
            t = e.overflow;
          ((e = e.id), (e = (e & ~(1 << (32 - Pt(e) - 1))).toString(32) + t));
          var n = xn;
          if (n === null) throw Error(i(404));
          return (
            (t = Qt++),
            (e = `_` + n.idPrefix + `R_` + e),
            0 < t && (e += `H` + t.toString(32)),
            e + `_`
          );
        },
        useSyncExternalStore: function (e, t, n) {
          if (n === void 0) throw Error(i(407));
          return n();
        },
        useOptimistic: function (e) {
          return (an(), [e, gn]);
        },
        useActionState: _n,
        useFormState: _n,
        useHostTransitionStatus: function () {
          return (an(), R);
        },
        useMemoCache: function (e) {
          for (var t = Array(e), n = 0; n < e; n++) t[n] = x;
          return t;
        },
        useCacheRefresh: function () {
          return yn;
        },
        useEffectEvent: function () {
          return mn;
        },
      },
      xn = null,
      Sn = {
        getCacheForType: function () {
          throw Error(i(248));
        },
        cacheSignal: function () {
          throw Error(i(248));
        },
      },
      Cn,
      wn;
    function Tn(e) {
      if (Cn === void 0)
        try {
          throw Error();
        } catch (e) {
          var t = e.stack.trim().match(/\n( *(at )?)/);
          ((Cn = (t && t[1]) || ``),
            (wn =
              -1 <
              e.stack.indexOf(`
    at`)
                ? ` (<anonymous>)`
                : -1 < e.stack.indexOf(`@`)
                  ? `@unknown:0:0`
                  : ``));
        }
      return (
        `
` +
        Cn +
        e +
        wn
      );
    }
    var En = !1;
    function Dn(e, t) {
      if (!e || En) return ``;
      En = !0;
      var n = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      try {
        var r = {
          DetermineComponentFrameRoot: function () {
            try {
              if (t) {
                var n = function () {
                  throw Error();
                };
                if (
                  (Object.defineProperty(n.prototype, `props`, {
                    set: function () {
                      throw Error();
                    },
                  }),
                  typeof Reflect == `object` && Reflect.construct)
                ) {
                  try {
                    Reflect.construct(n, []);
                  } catch (e) {
                    var r = e;
                  }
                  Reflect.construct(e, [], n);
                } else {
                  try {
                    n.call();
                  } catch (e) {
                    r = e;
                  }
                  e.call(n.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (e) {
                  r = e;
                }
                (n = e()) &&
                  typeof n.catch == `function` &&
                  n.catch(function () {});
              }
            } catch (e) {
              if (e && r && typeof e.stack == `string`)
                return [e.stack, r.stack];
            }
            return [null, null];
          },
        };
        r.DetermineComponentFrameRoot.displayName = `DetermineComponentFrameRoot`;
        var i = Object.getOwnPropertyDescriptor(
          r.DetermineComponentFrameRoot,
          `name`,
        );
        i &&
          i.configurable &&
          Object.defineProperty(r.DetermineComponentFrameRoot, `name`, {
            value: `DetermineComponentFrameRoot`,
          });
        var a = r.DetermineComponentFrameRoot(),
          o = a[0],
          s = a[1];
        if (o && s) {
          var c = o.split(`
`),
            l = s.split(`
`);
          for (
            i = r = 0;
            r < c.length && !c[r].includes(`DetermineComponentFrameRoot`);
          )
            r++;
          for (
            ;
            i < l.length && !l[i].includes(`DetermineComponentFrameRoot`);
          )
            i++;
          if (r === c.length || i === l.length)
            for (
              r = c.length - 1, i = l.length - 1;
              1 <= r && 0 <= i && c[r] !== l[i];
            )
              i--;
          for (; 1 <= r && 0 <= i; r--, i--)
            if (c[r] !== l[i]) {
              if (r !== 1 || i !== 1)
                do
                  if ((r--, i--, 0 > i || c[r] !== l[i])) {
                    var u =
                      `
` + c[r].replace(` at new `, ` at `);
                    return (
                      e.displayName &&
                        u.includes(`<anonymous>`) &&
                        (u = u.replace(`<anonymous>`, e.displayName)),
                      u
                    );
                  }
                while (1 <= r && 0 <= i);
              break;
            }
        }
      } finally {
        ((En = !1), (Error.prepareStackTrace = n));
      }
      return (n = e ? e.displayName || e.name : ``) ? Tn(n) : ``;
    }
    function On(e) {
      if (typeof e == `string`) return Tn(e);
      if (typeof e == `function`)
        return e.prototype && e.prototype.isReactComponent
          ? Dn(e, !0)
          : Dn(e, !1);
      if (typeof e == `object` && e) {
        switch (e.$$typeof) {
          case p:
            return Dn(e.render, !1);
          case g:
            return Dn(e.type, !1);
          case _:
            var t = e,
              n = t._payload;
            t = t._init;
            try {
              e = t(n);
            } catch {
              return Tn(`Lazy`);
            }
            return On(e);
        }
        if (typeof e.name == `string`) {
          a: {
            ((n = e.name), (t = e.env));
            var r = e.debugLocation;
            if (
              r != null &&
              ((e = Error.prepareStackTrace),
              (Error.prepareStackTrace = void 0),
              (r = r.stack),
              (Error.prepareStackTrace = e),
              r.startsWith(`Error: react-stack-top-frame
`) && (r = r.slice(29)),
              (e = r.indexOf(`
`)),
              e !== -1 && (r = r.slice(e + 1)),
              (e = r.indexOf(`react_stack_bottom_frame`)),
              e !== -1 &&
                (e = r.lastIndexOf(
                  `
`,
                  e,
                )),
              (e = e === -1 ? `` : (r = r.slice(0, e))),
              (r = e.lastIndexOf(`
`)),
              (e = r === -1 ? e : e.slice(r + 1)),
              e.indexOf(n) !== -1)
            ) {
              n =
                `
` + e;
              break a;
            }
            n = Tn(n + (t ? ` [` + t + `]` : ``));
          }
          return n;
        }
      }
      switch (e) {
        case h:
          return Tn(`SuspenseList`);
        case m:
          return Tn(`Suspense`);
      }
      return ``;
    }
    function kn(e, t) {
      return (500 < t.byteSize || !1) && t.contentPreamble === null;
    }
    function An(e) {
      if (typeof e == `object` && e && typeof e.environmentName == `string`) {
        var t = e.environmentName;
        ((e = [e].slice(0)),
          typeof e[0] == `string`
            ? e.splice(0, 1, `[%s] ` + e[0], ` ` + t + ` `)
            : e.splice(0, 0, `[%s]`, ` ` + t + ` `),
          e.unshift(console),
          (t = bt.apply(console.error, e)),
          t());
      } else console.error(e);
      return null;
    }
    function jn(e, t, n, r, i, a, o, s, c, l, u) {
      var d = new Set();
      ((this.destination = null),
        (this.flushScheduled = !1),
        (this.resumableState = e),
        (this.renderState = t),
        (this.rootFormatContext = n),
        (this.progressiveChunkSize = r === void 0 ? 12800 : r),
        (this.status = 10),
        (this.fatalError = null),
        (this.pendingRootTasks = this.allPendingTasks = this.nextSegmentId = 0),
        (this.completedPreambleSegments = this.completedRootSegment = null),
        (this.byteSize = 0),
        (this.abortableTasks = d),
        (this.pingedTasks = []),
        (this.clientRenderedBoundaries = []),
        (this.completedBoundaries = []),
        (this.partialBoundaries = []),
        (this.trackedPostpones = null),
        (this.onError = i === void 0 ? An : i),
        (this.onPostpone = l === void 0 ? Rt : l),
        (this.onAllReady = a === void 0 ? Rt : a),
        (this.onShellReady = o === void 0 ? Rt : o),
        (this.onShellError = s === void 0 ? Rt : s),
        (this.onFatalError = c === void 0 ? Rt : c),
        (this.formState = u === void 0 ? null : u));
    }
    function Mn(e, t, n, r, i, a, o, s, c, l, u, d) {
      return (
        (t = new jn(t, n, r, i, a, o, s, c, l, u, d)),
        (n = Rn(t, 0, null, r, !1, !1)),
        (n.parentFlushed = !0),
        (e = In(
          t,
          null,
          e,
          -1,
          null,
          n,
          null,
          null,
          t.abortableTasks,
          null,
          r,
          null,
          Mt,
          null,
          null,
        )),
        zn(e),
        t.pingedTasks.push(e),
        t
      );
    }
    var Nn = null;
    function Pn(e, t) {
      (e.pingedTasks.push(t),
        e.pingedTasks.length === 1 &&
          ((e.flushScheduled = e.destination !== null), gr(e)));
    }
    function Fn(e, t, n, r, i) {
      return (
        (n = {
          status: 0,
          rootSegmentID: -1,
          parentFlushed: !1,
          pendingTasks: 0,
          row: t,
          completedSegments: [],
          byteSize: 0,
          fallbackAbortableTasks: n,
          errorDigest: null,
          contentState: et(),
          fallbackState: et(),
          contentPreamble: r,
          fallbackPreamble: i,
          trackedContentKeyPath: null,
          trackedFallbackNode: null,
        }),
        t !== null &&
          (t.pendingTasks++,
          (r = t.boundaries),
          r !== null && (e.allPendingTasks++, n.pendingTasks++, r.push(n)),
          (e = t.inheritedHoistables),
          e !== null && gt(n.contentState, e)),
        n
      );
    }
    function In(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m) {
      (e.allPendingTasks++,
        i === null ? e.pendingRootTasks++ : i.pendingTasks++,
        p !== null && p.pendingTasks++);
      var h = {
        replay: null,
        node: n,
        childIndex: r,
        ping: function () {
          return Pn(e, h);
        },
        blockedBoundary: i,
        blockedSegment: a,
        blockedPreamble: o,
        hoistableState: s,
        abortSet: c,
        keyPath: l,
        formatContext: u,
        context: d,
        treeContext: f,
        row: p,
        componentStack: m,
        thenableState: t,
      };
      return (c.add(h), h);
    }
    function Ln(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
      (e.allPendingTasks++,
        a === null ? e.pendingRootTasks++ : a.pendingTasks++,
        f !== null && f.pendingTasks++,
        n.pendingTasks++);
      var m = {
        replay: n,
        node: r,
        childIndex: i,
        ping: function () {
          return Pn(e, m);
        },
        blockedBoundary: a,
        blockedSegment: null,
        blockedPreamble: null,
        hoistableState: o,
        abortSet: s,
        keyPath: c,
        formatContext: l,
        context: u,
        treeContext: d,
        row: f,
        componentStack: p,
        thenableState: t,
      };
      return (s.add(m), m);
    }
    function Rn(e, t, n, r, i, a) {
      return {
        status: 0,
        parentFlushed: !1,
        id: -1,
        index: t,
        chunks: [],
        children: [],
        preambleChildren: [],
        parentFormatContext: r,
        boundary: n,
        lastPushedText: i,
        textEmbedded: a,
      };
    }
    function zn(e) {
      var t = e.node;
      if (typeof t == `object` && t)
        switch (t.$$typeof) {
          case a:
            e.componentStack = { parent: e.componentStack, type: t.type };
        }
    }
    function Bn(e) {
      return e === null
        ? null
        : { parent: e.parent, type: `Suspense Fallback` };
    }
    function Vn(e) {
      var t = {};
      return (
        e &&
          Object.defineProperty(t, `componentStack`, {
            configurable: !0,
            enumerable: !0,
            get: function () {
              try {
                var n = ``,
                  r = e;
                do ((n += On(r.type)), (r = r.parent));
                while (r);
                var i = n;
              } catch (e) {
                i =
                  `
Error generating stack: ` +
                  e.message +
                  `
` +
                  e.stack;
              }
              return (
                Object.defineProperty(t, `componentStack`, { value: i }),
                i
              );
            },
          }),
        t
      );
    }
    function Hn(e, t, n) {
      if (((e = e.onError), (t = e(t, n)), t == null || typeof t == `string`))
        return t;
    }
    function Un(e, t) {
      var n = e.onShellError,
        r = e.onFatalError;
      (n(t),
        r(t),
        e.destination === null
          ? ((e.status = 13), (e.fatalError = t))
          : ((e.status = 14), e.destination.destroy(t)));
    }
    function Wn(e, t) {
      Gn(e, t.next, t.hoistables);
    }
    function Gn(e, t, n) {
      for (; t !== null; ) {
        n !== null && (gt(t.hoistables, n), (t.inheritedHoistables = n));
        var r = t.boundaries;
        if (r !== null) {
          t.boundaries = null;
          for (var i = 0; i < r.length; i++) {
            var a = r[i];
            (n !== null && gt(a.contentState, n), hr(e, a, null, null));
          }
        }
        if ((t.pendingTasks--, 0 < t.pendingTasks)) break;
        ((n = t.hoistables), (t = t.next));
      }
    }
    function Kn(e, t) {
      var n = t.boundaries;
      if (n !== null && t.pendingTasks === n.length) {
        for (var r = !0, i = 0; i < n.length; i++) {
          var a = n[i];
          if (a.pendingTasks !== 1 || a.parentFlushed || kn(e, a)) {
            r = !1;
            break;
          }
        }
        r && Gn(e, t, t.hoistables);
      }
    }
    function qn(e) {
      var t = {
        pendingTasks: 1,
        boundaries: null,
        hoistables: et(),
        inheritedHoistables: null,
        together: !1,
        next: null,
      };
      return (
        e !== null &&
          0 < e.pendingTasks &&
          (t.pendingTasks++, (t.boundaries = []), (e.next = t)),
        t
      );
    }
    function Jn(e, t, n, r, i) {
      var a = t.keyPath,
        o = t.treeContext,
        s = t.row;
      ((t.keyPath = n), (n = r.length));
      var c = null;
      if (t.replay !== null) {
        var l = t.replay.slots;
        if (typeof l == `object` && l)
          for (var u = 0; u < n; u++) {
            var d =
                i !== `backwards` && i !== `unstable_legacy-backwards`
                  ? u
                  : n - 1 - u,
              f = r[d];
            ((t.row = c = qn(c)), (t.treeContext = Nt(o, n, d)));
            var p = l[d];
            (typeof p == `number`
              ? (Qn(e, t, p, f, d), delete l[d])
              : sr(e, t, f, d),
              --c.pendingTasks === 0 && Wn(e, c));
          }
        else
          for (l = 0; l < n; l++)
            ((u =
              i !== `backwards` && i !== `unstable_legacy-backwards`
                ? l
                : n - 1 - l),
              (d = r[u]),
              (t.row = c = qn(c)),
              (t.treeContext = Nt(o, n, u)),
              sr(e, t, d, u),
              --c.pendingTasks === 0 && Wn(e, c));
      } else if (i !== `backwards` && i !== `unstable_legacy-backwards`)
        for (i = 0; i < n; i++)
          ((l = r[i]),
            (t.row = c = qn(c)),
            (t.treeContext = Nt(o, n, i)),
            sr(e, t, l, i),
            --c.pendingTasks === 0 && Wn(e, c));
      else {
        for (
          i = t.blockedSegment,
            l = i.children.length,
            u = i.chunks.length,
            d = n - 1;
          0 <= d;
          d--
        ) {
          ((f = r[d]),
            (t.row = c = qn(c)),
            (t.treeContext = Nt(o, n, d)),
            (p = Rn(
              e,
              u,
              null,
              t.formatContext,
              d === 0 ? i.lastPushedText : !0,
              !0,
            )),
            i.children.splice(l, 0, p),
            (t.blockedSegment = p));
          try {
            (sr(e, t, f, d),
              yt(p.chunks, e.renderState, p.lastPushedText, p.textEmbedded),
              (p.status = 1),
              --c.pendingTasks === 0 && Wn(e, c));
          } catch (t) {
            throw ((p.status = e.status === 12 ? 3 : 4), t);
          }
        }
        ((t.blockedSegment = i), (i.lastPushedText = !1));
      }
      (s !== null &&
        c !== null &&
        0 < c.pendingTasks &&
        (s.pendingTasks++, (c.next = s)),
        (t.treeContext = o),
        (t.row = s),
        (t.keyPath = a));
    }
    function Yn(e, t, n, r, i, a) {
      var o = t.thenableState;
      for (
        t.thenableState = null,
          Gt = {},
          Kt = t,
          qt = e,
          Jt = n,
          $t = Qt = 0,
          en = -1,
          Q = 0,
          tn = o,
          e = r(i, a);
        Zt;
      )
        ((Zt = !1),
          ($t = Qt = 0),
          (en = -1),
          (Q = 0),
          (rn += 1),
          (Z = null),
          (e = r(i, a)));
      return (ln(), e);
    }
    function Xn(e, t, n, r, i, a, o) {
      var s = !1;
      if (a !== 0 && e.formState !== null) {
        var c = t.blockedSegment;
        if (c !== null) {
          ((s = !0), (c = c.chunks));
          for (var l = 0; l < a; l++)
            l === o ? c.push(`<!--F!-->`) : c.push(`<!--F-->`);
        }
      }
      ((a = t.keyPath),
        (t.keyPath = n),
        i
          ? ((n = t.treeContext),
            (t.treeContext = Nt(n, 1, 0)),
            sr(e, t, r, -1),
            (t.treeContext = n))
          : s
            ? sr(e, t, r, -1)
            : $n(e, t, r, -1),
        (t.keyPath = a));
    }
    function Zn(e, t, n, r, a, o) {
      if (typeof r == `function`)
        if (r.prototype && r.prototype.isReactComponent) {
          var f = a;
          if (`ref` in a)
            for (var x in ((f = {}), a)) x !== `ref` && (f[x] = a[x]);
          var C = r.defaultProps;
          if (C)
            for (var T in (f === a && (f = E({}, f, a)), C))
              f[T] === void 0 && (f[T] = C[T]);
          ((a = f),
            (f = Ct),
            (C = r.contextType),
            typeof C == `object` && C && (f = C._currentValue2),
            (f = new r(a, f)));
          var D = f.state === void 0 ? null : f.state;
          if (
            ((f.updater = jt),
            (f.props = a),
            (f.state = D),
            (C = { queue: [], replace: !1 }),
            (f._reactInternals = C),
            (o = r.contextType),
            (f.context = typeof o == `object` && o ? o._currentValue2 : Ct),
            (o = r.getDerivedStateFromProps),
            typeof o == `function` &&
              ((o = o(a, D)), (D = o == null ? D : E({}, D, o)), (f.state = D)),
            typeof r.getDerivedStateFromProps != `function` &&
              typeof f.getSnapshotBeforeUpdate != `function` &&
              (typeof f.UNSAFE_componentWillMount == `function` ||
                typeof f.componentWillMount == `function`))
          )
            if (
              ((r = f.state),
              typeof f.componentWillMount == `function` &&
                f.componentWillMount(),
              typeof f.UNSAFE_componentWillMount == `function` &&
                f.UNSAFE_componentWillMount(),
              r !== f.state && jt.enqueueReplaceState(f, f.state, null),
              C.queue !== null && 0 < C.queue.length)
            )
              if (
                ((r = C.queue),
                (o = C.replace),
                (C.queue = null),
                (C.replace = !1),
                o && r.length === 1)
              )
                f.state = r[0];
              else {
                for (
                  C = o ? r[0] : f.state, D = !0, o = o ? 1 : 0;
                  o < r.length;
                  o++
                )
                  ((T = r[o]),
                    (T = typeof T == `function` ? T.call(f, C, a, void 0) : T),
                    T != null && (D ? ((D = !1), (C = E({}, C, T))) : E(C, T)));
                f.state = C;
              }
            else C.queue = null;
          if (((r = f.render()), e.status === 12)) throw null;
          ((a = t.keyPath), (t.keyPath = n), $n(e, t, r, -1), (t.keyPath = a));
        } else {
          if (((r = Yn(e, t, n, r, a, void 0)), e.status === 12)) throw null;
          Xn(e, t, n, r, Qt !== 0, $t, en);
        }
      else if (typeof r == `string`)
        if (((f = t.blockedSegment), f === null))
          ((f = a.children),
            (C = t.formatContext),
            (D = t.keyPath),
            (t.formatContext = ue(C, r, a)),
            (t.keyPath = n),
            sr(e, t, f, -1),
            (t.formatContext = C),
            (t.keyPath = D));
        else {
          if (
            ((D = K(
              f.chunks,
              r,
              a,
              e.resumableState,
              e.renderState,
              t.blockedPreamble,
              t.hoistableState,
              t.formatContext,
              f.lastPushedText,
            )),
            (f.lastPushedText = !1),
            (C = t.formatContext),
            (o = t.keyPath),
            (t.keyPath = n),
            (t.formatContext = ue(C, r, a)).insertionMode === 3)
          ) {
            ((n = Rn(e, 0, null, t.formatContext, !1, !1)),
              f.preambleChildren.push(n),
              (t.blockedSegment = n));
            try {
              ((n.status = 6),
                sr(e, t, D, -1),
                yt(n.chunks, e.renderState, n.lastPushedText, n.textEmbedded),
                (n.status = 1));
            } finally {
              t.blockedSegment = f;
            }
          } else sr(e, t, D, -1);
          ((t.formatContext = C), (t.keyPath = o));
          a: {
            switch (((t = f.chunks), (e = e.resumableState), r)) {
              case `title`:
              case `style`:
              case `script`:
              case `area`:
              case `base`:
              case `br`:
              case `col`:
              case `embed`:
              case `hr`:
              case `img`:
              case `input`:
              case `keygen`:
              case `link`:
              case `meta`:
              case `param`:
              case `source`:
              case `track`:
              case `wbr`:
                break a;
              case `body`:
                if (1 >= C.insertionMode) {
                  e.hasBody = !0;
                  break a;
                }
                break;
              case `html`:
                if (C.insertionMode === 0) {
                  e.hasHtml = !0;
                  break a;
                }
                break;
              case `head`:
                if (1 >= C.insertionMode) break a;
            }
            t.push(q(r));
          }
          f.lastPushedText = !1;
        }
      else {
        switch (r) {
          case b:
          case c:
          case l:
          case s:
            ((r = t.keyPath),
              (t.keyPath = n),
              $n(e, t, a.children, -1),
              (t.keyPath = r));
            return;
          case y:
            ((r = t.blockedSegment),
              r === null
                ? a.mode !== `hidden` &&
                  ((r = t.keyPath),
                  (t.keyPath = n),
                  sr(e, t, a.children, -1),
                  (t.keyPath = r))
                : a.mode !== `hidden` &&
                  (e.renderState.generateStaticMarkup ||
                    r.chunks.push(`<!--&-->`),
                  (r.lastPushedText = !1),
                  (f = t.keyPath),
                  (t.keyPath = n),
                  sr(e, t, a.children, -1),
                  (t.keyPath = f),
                  e.renderState.generateStaticMarkup ||
                    r.chunks.push(`<!--/&-->`),
                  (r.lastPushedText = !1)));
            return;
          case h:
            a: {
              if (
                ((r = a.children),
                (a = a.revealOrder),
                a === `forwards` ||
                  a === `backwards` ||
                  a === `unstable_legacy-backwards`)
              ) {
                if (w(r)) {
                  Jn(e, t, n, r, a);
                  break a;
                }
                if ((f = ee(r)) && (f = f.call(r))) {
                  if (((C = f.next()), !C.done)) {
                    do C = f.next();
                    while (!C.done);
                    Jn(e, t, n, r, a);
                  }
                  break a;
                }
              }
              a === `together`
                ? ((a = t.keyPath),
                  (f = t.row),
                  (C = t.row = qn(null)),
                  (C.boundaries = []),
                  (C.together = !0),
                  (t.keyPath = n),
                  $n(e, t, r, -1),
                  --C.pendingTasks === 0 && Wn(e, C),
                  (t.keyPath = a),
                  (t.row = f),
                  f !== null &&
                    0 < C.pendingTasks &&
                    (f.pendingTasks++, (C.next = f)))
                : ((a = t.keyPath),
                  (t.keyPath = n),
                  $n(e, t, r, -1),
                  (t.keyPath = a));
            }
            return;
          case S:
          case v:
            throw Error(i(343));
          case m:
            a: if (t.replay !== null) {
              ((r = t.keyPath),
                (f = t.formatContext),
                (C = t.row),
                (t.keyPath = n),
                (t.formatContext = fe(e.resumableState, f)),
                (t.row = null),
                (n = a.children));
              try {
                sr(e, t, n, -1);
              } finally {
                ((t.keyPath = r), (t.formatContext = f), (t.row = C));
              }
            } else {
              ((r = t.keyPath), (o = t.formatContext));
              var O = t.row,
                k = t.blockedBoundary;
              T = t.blockedPreamble;
              var A = t.hoistableState;
              x = t.blockedSegment;
              var j = a.fallback;
              a = a.children;
              var M = new Set(),
                N = Fn(e, t.row, M, null, null);
              e.trackedPostpones !== null && (N.trackedContentKeyPath = n);
              var P = Rn(e, x.chunks.length, N, t.formatContext, !1, !1);
              (x.children.push(P), (x.lastPushedText = !1));
              var F = Rn(e, 0, null, t.formatContext, !1, !1);
              if (((F.parentFlushed = !0), e.trackedPostpones !== null)) {
                ((f = t.componentStack),
                  (C = [n[0], `Suspense Fallback`, n[2]]),
                  (D = [C[1], C[2], [], null]),
                  e.trackedPostpones.workingMap.set(C, D),
                  (N.trackedFallbackNode = D),
                  (t.blockedSegment = P),
                  (t.blockedPreamble = N.fallbackPreamble),
                  (t.keyPath = C),
                  (t.formatContext = de(e.resumableState, o)),
                  (t.componentStack = Bn(f)),
                  (P.status = 6));
                try {
                  (sr(e, t, j, -1),
                    yt(
                      P.chunks,
                      e.renderState,
                      P.lastPushedText,
                      P.textEmbedded,
                    ),
                    (P.status = 1));
                } catch (t) {
                  throw ((P.status = e.status === 12 ? 3 : 4), t);
                } finally {
                  ((t.blockedSegment = x),
                    (t.blockedPreamble = T),
                    (t.keyPath = r),
                    (t.formatContext = o));
                }
                ((t = In(
                  e,
                  null,
                  a,
                  -1,
                  N,
                  F,
                  N.contentPreamble,
                  N.contentState,
                  t.abortSet,
                  n,
                  fe(e.resumableState, t.formatContext),
                  t.context,
                  t.treeContext,
                  null,
                  f,
                )),
                  zn(t),
                  e.pingedTasks.push(t));
              } else {
                ((t.blockedBoundary = N),
                  (t.blockedPreamble = N.contentPreamble),
                  (t.hoistableState = N.contentState),
                  (t.blockedSegment = F),
                  (t.keyPath = n),
                  (t.formatContext = fe(e.resumableState, o)),
                  (t.row = null),
                  (F.status = 6));
                try {
                  if (
                    (sr(e, t, a, -1),
                    yt(
                      F.chunks,
                      e.renderState,
                      F.lastPushedText,
                      F.textEmbedded,
                    ),
                    (F.status = 1),
                    mr(N, F),
                    N.pendingTasks === 0 && N.status === 0)
                  ) {
                    if (((N.status = 1), !kn(e, N))) {
                      (O !== null && --O.pendingTasks === 0 && Wn(e, O),
                        e.pendingRootTasks === 0 && t.blockedPreamble && yr(e));
                      break a;
                    }
                  } else O !== null && O.together && Kn(e, O);
                } catch (n) {
                  ((N.status = 4),
                    e.status === 12
                      ? ((F.status = 3), (f = e.fatalError))
                      : ((F.status = 4), (f = n)),
                    (C = Vn(t.componentStack)),
                    (D = Hn(e, f, C)),
                    (N.errorDigest = D),
                    ir(e, N));
                } finally {
                  ((t.blockedBoundary = k),
                    (t.blockedPreamble = T),
                    (t.hoistableState = A),
                    (t.blockedSegment = x),
                    (t.keyPath = r),
                    (t.formatContext = o),
                    (t.row = O));
                }
                ((t = In(
                  e,
                  null,
                  j,
                  -1,
                  k,
                  P,
                  N.fallbackPreamble,
                  N.fallbackState,
                  M,
                  [n[0], `Suspense Fallback`, n[2]],
                  de(e.resumableState, t.formatContext),
                  t.context,
                  t.treeContext,
                  t.row,
                  Bn(t.componentStack),
                )),
                  zn(t),
                  e.pingedTasks.push(t));
              }
            }
            return;
        }
        if (typeof r == `object` && r)
          switch (r.$$typeof) {
            case p:
              if (`ref` in a)
                for (j in ((f = {}), a)) j !== `ref` && (f[j] = a[j]);
              else f = a;
              ((r = Yn(e, t, n, r.render, f, o)),
                Xn(e, t, n, r, Qt !== 0, $t, en));
              return;
            case g:
              Zn(e, t, n, r.type, a, o);
              return;
            case d:
              if (
                ((C = a.children),
                (f = t.keyPath),
                (a = a.value),
                (D = r._currentValue2),
                (r._currentValue2 = a),
                (o = wt),
                (wt = r =
                  {
                    parent: o,
                    depth: o === null ? 0 : o.depth + 1,
                    context: r,
                    parentValue: D,
                    value: a,
                  }),
                (t.context = r),
                (t.keyPath = n),
                $n(e, t, C, -1),
                (e = wt),
                e === null)
              )
                throw Error(i(403));
              ((e.context._currentValue2 = e.parentValue),
                (e = wt = e.parent),
                (t.context = e),
                (t.keyPath = f));
              return;
            case u:
              ((a = a.children),
                (r = a(r._context._currentValue2)),
                (a = t.keyPath),
                (t.keyPath = n),
                $n(e, t, r, -1),
                (t.keyPath = a));
              return;
            case _:
              if (((f = r._init), (r = f(r._payload)), e.status === 12))
                throw null;
              Zn(e, t, n, r, a, o);
              return;
          }
        throw Error(i(130, r == null ? r : typeof r, ``));
      }
    }
    function Qn(e, t, n, r, i) {
      var a = t.replay,
        o = t.blockedBoundary,
        s = Rn(e, 0, null, t.formatContext, !1, !1);
      ((s.id = n), (s.parentFlushed = !0));
      try {
        ((t.replay = null),
          (t.blockedSegment = s),
          sr(e, t, r, i),
          (s.status = 1),
          o === null
            ? (e.completedRootSegment = s)
            : (mr(o, s), o.parentFlushed && e.partialBoundaries.push(o)));
      } finally {
        ((t.replay = a), (t.blockedSegment = null));
      }
    }
    function $n(e, t, n, r) {
      t.replay !== null && typeof t.replay.slots == `number`
        ? Qn(e, t, t.replay.slots, n, r)
        : ((t.node = n),
          (t.childIndex = r),
          (n = t.componentStack),
          zn(t),
          er(e, t),
          (t.componentStack = n));
    }
    function er(e, t) {
      var n = t.node,
        r = t.childIndex;
      if (n !== null) {
        if (typeof n == `object`) {
          switch (n.$$typeof) {
            case a:
              var s = n.type,
                c = n.key,
                l = n.props;
              n = l.ref;
              var u = n === void 0 ? null : n,
                f = St(s),
                p = c ?? (r === -1 ? 0 : r);
              if (((c = [t.keyPath, f, p]), t.replay !== null))
                a: {
                  var h = t.replay;
                  for (r = h.nodes, n = 0; n < r.length; n++) {
                    var g = r[n];
                    if (p === g[1]) {
                      if (g.length === 4) {
                        if (f !== null && f !== g[0])
                          throw Error(i(490, g[0], f));
                        var v = g[2];
                        ((f = g[3]),
                          (p = t.node),
                          (t.replay = { nodes: v, slots: f, pendingTasks: 1 }));
                        try {
                          if (
                            (Zn(e, t, c, s, l, u),
                            t.replay.pendingTasks === 1 &&
                              0 < t.replay.nodes.length)
                          )
                            throw Error(i(488));
                          t.replay.pendingTasks--;
                        } catch (i) {
                          if (
                            typeof i == `object` &&
                            i &&
                            (i === zt || typeof i.then == `function`)
                          )
                            throw (
                              t.node === p ? (t.replay = h) : r.splice(n, 1),
                              i
                            );
                          (t.replay.pendingTasks--,
                            (l = Vn(t.componentStack)),
                            (c = e),
                            (e = t.blockedBoundary),
                            (s = i),
                            (l = Hn(c, s, l)),
                            lr(c, e, v, f, s, l));
                        }
                        t.replay = h;
                      } else {
                        if (s !== m)
                          throw Error(i(490, `Suspense`, St(s) || `Unknown`));
                        b: {
                          ((h = void 0),
                            (s = g[5]),
                            (u = g[2]),
                            (f = g[3]),
                            (p = g[4] === null ? [] : g[4][2]),
                            (g = g[4] === null ? null : g[4][3]));
                          var y = t.keyPath,
                            b = t.formatContext,
                            x = t.row,
                            S = t.replay,
                            C = t.blockedBoundary,
                            T = t.hoistableState,
                            E = l.children,
                            D = l.fallback,
                            O = new Set();
                          ((l = Fn(e, t.row, O, null, null)),
                            (l.parentFlushed = !0),
                            (l.rootSegmentID = s),
                            (t.blockedBoundary = l),
                            (t.hoistableState = l.contentState),
                            (t.keyPath = c),
                            (t.formatContext = fe(e.resumableState, b)),
                            (t.row = null),
                            (t.replay = {
                              nodes: u,
                              slots: f,
                              pendingTasks: 1,
                            }));
                          try {
                            if (
                              (sr(e, t, E, -1),
                              t.replay.pendingTasks === 1 &&
                                0 < t.replay.nodes.length)
                            )
                              throw Error(i(488));
                            if (
                              (t.replay.pendingTasks--,
                              l.pendingTasks === 0 && l.status === 0)
                            ) {
                              ((l.status = 1), e.completedBoundaries.push(l));
                              break b;
                            }
                          } catch (n) {
                            ((l.status = 4),
                              (v = Vn(t.componentStack)),
                              (h = Hn(e, n, v)),
                              (l.errorDigest = h),
                              t.replay.pendingTasks--,
                              e.clientRenderedBoundaries.push(l));
                          } finally {
                            ((t.blockedBoundary = C),
                              (t.hoistableState = T),
                              (t.replay = S),
                              (t.keyPath = y),
                              (t.formatContext = b),
                              (t.row = x));
                          }
                          ((v = Ln(
                            e,
                            null,
                            { nodes: p, slots: g, pendingTasks: 0 },
                            D,
                            -1,
                            C,
                            l.fallbackState,
                            O,
                            [c[0], `Suspense Fallback`, c[2]],
                            de(e.resumableState, t.formatContext),
                            t.context,
                            t.treeContext,
                            t.row,
                            Bn(t.componentStack),
                          )),
                            zn(v),
                            e.pingedTasks.push(v));
                        }
                      }
                      r.splice(n, 1);
                      break a;
                    }
                  }
                }
              else Zn(e, t, c, s, l, u);
              return;
            case o:
              throw Error(i(257));
            case _:
              if (((v = n._init), (n = v(n._payload)), e.status === 12))
                throw null;
              $n(e, t, n, r);
              return;
          }
          if (w(n)) {
            tr(e, t, n, r);
            return;
          }
          if ((v = ee(n)) && (v = v.call(n))) {
            if (((n = v.next()), !n.done)) {
              l = [];
              do (l.push(n.value), (n = v.next()));
              while (!n.done);
              tr(e, t, l, r);
            }
            return;
          }
          if (typeof n.then == `function`)
            return ((t.thenableState = null), $n(e, t, vn(n), r));
          if (n.$$typeof === d) return $n(e, t, n._currentValue2, r);
          throw (
            (r = Object.prototype.toString.call(n)),
            Error(
              i(
                31,
                r === `[object Object]`
                  ? `object with keys {` + Object.keys(n).join(`, `) + `}`
                  : r,
              ),
            )
          );
        }
        typeof n == `string`
          ? ((r = t.blockedSegment),
            r !== null &&
              (r.lastPushedText = vt(
                r.chunks,
                n,
                e.renderState,
                r.lastPushedText,
              )))
          : (typeof n == `number` || typeof n == `bigint`) &&
            ((r = t.blockedSegment),
            r !== null &&
              (r.lastPushedText = vt(
                r.chunks,
                `` + n,
                e.renderState,
                r.lastPushedText,
              )));
      }
    }
    function tr(e, t, n, r) {
      var a = t.keyPath;
      if (
        r !== -1 &&
        ((t.keyPath = [t.keyPath, `Fragment`, r]), t.replay !== null)
      ) {
        for (var o = t.replay, s = o.nodes, c = 0; c < s.length; c++) {
          var l = s[c];
          if (l[1] === r) {
            ((r = l[2]),
              (l = l[3]),
              (t.replay = { nodes: r, slots: l, pendingTasks: 1 }));
            try {
              if (
                (tr(e, t, n, -1),
                t.replay.pendingTasks === 1 && 0 < t.replay.nodes.length)
              )
                throw Error(i(488));
              t.replay.pendingTasks--;
            } catch (i) {
              if (
                typeof i == `object` &&
                i &&
                (i === zt || typeof i.then == `function`)
              )
                throw i;
              (t.replay.pendingTasks--, (n = Vn(t.componentStack)));
              var u = t.blockedBoundary,
                d = i;
              ((n = Hn(e, d, n)), lr(e, u, r, l, d, n));
            }
            ((t.replay = o), s.splice(c, 1));
            break;
          }
        }
        t.keyPath = a;
        return;
      }
      if (
        ((o = t.treeContext),
        (s = n.length),
        t.replay !== null && ((c = t.replay.slots), typeof c == `object` && c))
      ) {
        for (r = 0; r < s; r++)
          ((l = n[r]),
            (t.treeContext = Nt(o, s, r)),
            (u = c[r]),
            typeof u == `number`
              ? (Qn(e, t, u, l, r), delete c[r])
              : sr(e, t, l, r));
        ((t.treeContext = o), (t.keyPath = a));
        return;
      }
      for (c = 0; c < s; c++)
        ((r = n[c]), (t.treeContext = Nt(o, s, c)), sr(e, t, r, c));
      ((t.treeContext = o), (t.keyPath = a));
    }
    function nr(e, t, n) {
      if (
        ((n.status = 5),
        (n.rootSegmentID = e.nextSegmentId++),
        (e = n.trackedContentKeyPath),
        e === null)
      )
        throw Error(i(486));
      var r = n.trackedFallbackNode,
        a = [],
        o = t.workingMap.get(e);
      return o === void 0
        ? ((n = [e[1], e[2], a, null, r, n.rootSegmentID]),
          t.workingMap.set(e, n),
          jr(n, e[0], t),
          n)
        : ((o[4] = r), (o[5] = n.rootSegmentID), o);
    }
    function rr(e, t, n, r) {
      r.status = 5;
      var a = n.keyPath,
        o = n.blockedBoundary;
      if (o === null)
        ((r.id = e.nextSegmentId++),
          (t.rootSlots = r.id),
          e.completedRootSegment !== null &&
            (e.completedRootSegment.status = 5));
      else {
        if (o !== null && o.status === 0) {
          var s = nr(e, t, o);
          if (o.trackedContentKeyPath === a && n.childIndex === -1) {
            (r.id === -1 &&
              (r.id = r.parentFlushed ? o.rootSegmentID : e.nextSegmentId++),
              (s[3] = r.id));
            return;
          }
        }
        if (
          (r.id === -1 &&
            (r.id =
              r.parentFlushed && o !== null
                ? o.rootSegmentID
                : e.nextSegmentId++),
          n.childIndex === -1)
        )
          a === null
            ? (t.rootSlots = r.id)
            : ((n = t.workingMap.get(a)),
              n === void 0
                ? ((n = [a[1], a[2], [], r.id]), jr(n, a[0], t))
                : (n[3] = r.id));
        else {
          if (a === null) {
            if (((e = t.rootSlots), e === null)) e = t.rootSlots = {};
            else if (typeof e == `number`) throw Error(i(491));
          } else if (((o = t.workingMap), (s = o.get(a)), s === void 0))
            ((e = {}), (s = [a[1], a[2], [], e]), o.set(a, s), jr(s, a[0], t));
          else if (((e = s[3]), e === null)) e = s[3] = {};
          else if (typeof e == `number`) throw Error(i(491));
          e[n.childIndex] = r.id;
        }
      }
    }
    function ir(e, t) {
      ((e = e.trackedPostpones),
        e !== null &&
          ((t = t.trackedContentKeyPath),
          t !== null &&
            ((t = e.workingMap.get(t)),
            t !== void 0 && ((t.length = 4), (t[2] = []), (t[3] = null)))));
    }
    function ar(e, t, n) {
      return Ln(
        e,
        n,
        t.replay,
        t.node,
        t.childIndex,
        t.blockedBoundary,
        t.hoistableState,
        t.abortSet,
        t.keyPath,
        t.formatContext,
        t.context,
        t.treeContext,
        t.row,
        t.componentStack,
      );
    }
    function or(e, t, n) {
      var r = t.blockedSegment,
        i = Rn(e, r.chunks.length, null, t.formatContext, r.lastPushedText, !0);
      return (
        r.children.push(i),
        (r.lastPushedText = !1),
        In(
          e,
          n,
          t.node,
          t.childIndex,
          t.blockedBoundary,
          i,
          t.blockedPreamble,
          t.hoistableState,
          t.abortSet,
          t.keyPath,
          t.formatContext,
          t.context,
          t.treeContext,
          t.row,
          t.componentStack,
        )
      );
    }
    function sr(e, t, n, r) {
      var i = t.formatContext,
        a = t.context,
        o = t.keyPath,
        s = t.treeContext,
        c = t.componentStack,
        l = t.blockedSegment;
      if (l === null) {
        l = t.replay;
        try {
          return $n(e, t, n, r);
        } catch (u) {
          if (
            (ln(),
            (n = u === zt ? Ht() : u),
            e.status !== 12 && typeof n == `object` && n)
          ) {
            if (typeof n.then == `function`) {
              ((r = u === zt ? cn() : null),
                (e = ar(e, t, r).ping),
                n.then(e, e),
                (t.formatContext = i),
                (t.context = a),
                (t.keyPath = o),
                (t.treeContext = s),
                (t.componentStack = c),
                (t.replay = l),
                At(a));
              return;
            }
            if (n.message === `Maximum call stack size exceeded`) {
              ((n = u === zt ? cn() : null),
                (n = ar(e, t, n)),
                e.pingedTasks.push(n),
                (t.formatContext = i),
                (t.context = a),
                (t.keyPath = o),
                (t.treeContext = s),
                (t.componentStack = c),
                (t.replay = l),
                At(a));
              return;
            }
          }
        }
      } else {
        var u = l.children.length,
          d = l.chunks.length;
        try {
          return $n(e, t, n, r);
        } catch (r) {
          if (
            (ln(),
            (l.children.length = u),
            (l.chunks.length = d),
            (n = r === zt ? Ht() : r),
            e.status !== 12 && typeof n == `object` && n)
          ) {
            if (typeof n.then == `function`) {
              ((l = n),
                (n = r === zt ? cn() : null),
                (e = or(e, t, n).ping),
                l.then(e, e),
                (t.formatContext = i),
                (t.context = a),
                (t.keyPath = o),
                (t.treeContext = s),
                (t.componentStack = c),
                At(a));
              return;
            }
            if (n.message === `Maximum call stack size exceeded`) {
              ((l = r === zt ? cn() : null),
                (l = or(e, t, l)),
                e.pingedTasks.push(l),
                (t.formatContext = i),
                (t.context = a),
                (t.keyPath = o),
                (t.treeContext = s),
                (t.componentStack = c),
                At(a));
              return;
            }
          }
        }
      }
      throw (
        (t.formatContext = i),
        (t.context = a),
        (t.keyPath = o),
        (t.treeContext = s),
        At(a),
        n
      );
    }
    function cr(e) {
      var t = e.blockedBoundary,
        n = e.blockedSegment;
      n !== null && ((n.status = 3), hr(this, t, e.row, n));
    }
    function lr(e, t, n, r, a, o) {
      for (var s = 0; s < n.length; s++) {
        var c = n[s];
        if (c.length === 4) lr(e, t, c[2], c[3], a, o);
        else {
          c = c[5];
          var l = e,
            u = o,
            d = Fn(l, null, new Set(), null, null);
          ((d.parentFlushed = !0),
            (d.rootSegmentID = c),
            (d.status = 4),
            (d.errorDigest = u),
            d.parentFlushed && l.clientRenderedBoundaries.push(d));
        }
      }
      if (((n.length = 0), r !== null)) {
        if (t === null) throw Error(i(487));
        if (
          (t.status !== 4 &&
            ((t.status = 4),
            (t.errorDigest = o),
            t.parentFlushed && e.clientRenderedBoundaries.push(t)),
          typeof r == `object`)
        )
          for (var f in r) delete r[f];
      }
    }
    function ur(e, t, n) {
      var r = e.blockedBoundary,
        i = e.blockedSegment;
      if (i !== null) {
        if (i.status === 6) return;
        i.status = 3;
      }
      var a = Vn(e.componentStack);
      if (r === null) {
        if (t.status !== 13 && t.status !== 14) {
          if (((r = e.replay), r === null)) {
            t.trackedPostpones !== null && i !== null
              ? ((r = t.trackedPostpones),
                Hn(t, n, a),
                rr(t, r, e, i),
                hr(t, null, e.row, i))
              : (Hn(t, n, a), Un(t, n));
            return;
          }
          (r.pendingTasks--,
            r.pendingTasks === 0 &&
              0 < r.nodes.length &&
              ((i = Hn(t, n, a)), lr(t, null, r.nodes, r.slots, n, i)),
            t.pendingRootTasks--,
            t.pendingRootTasks === 0 && fr(t));
        }
      } else {
        var o = t.trackedPostpones;
        if (r.status !== 4) {
          if (o !== null && i !== null)
            return (
              Hn(t, n, a),
              rr(t, o, e, i),
              r.fallbackAbortableTasks.forEach(function (e) {
                return ur(e, t, n);
              }),
              r.fallbackAbortableTasks.clear(),
              hr(t, r, e.row, i)
            );
          ((r.status = 4),
            (i = Hn(t, n, a)),
            (r.status = 4),
            (r.errorDigest = i),
            ir(t, r),
            r.parentFlushed && t.clientRenderedBoundaries.push(r));
        }
        (r.pendingTasks--,
          (i = r.row),
          i !== null && --i.pendingTasks === 0 && Wn(t, i),
          r.fallbackAbortableTasks.forEach(function (e) {
            return ur(e, t, n);
          }),
          r.fallbackAbortableTasks.clear());
      }
      ((e = e.row),
        e !== null && --e.pendingTasks === 0 && Wn(t, e),
        t.allPendingTasks--,
        t.allPendingTasks === 0 && pr(t));
    }
    function dr(e, t) {
      try {
        var n = e.renderState,
          r = n.onHeaders;
        if (r) {
          var i = n.headers;
          if (i) {
            n.headers = null;
            var a = i.preconnects;
            if (
              (i.fontPreloads && (a && (a += `, `), (a += i.fontPreloads)),
              i.highImagePreloads &&
                (a && (a += `, `), (a += i.highImagePreloads)),
              !t)
            ) {
              var o = n.styles.values(),
                s = o.next();
              b: for (; 0 < i.remainingCapacity && !s.done; s = o.next())
                for (
                  var c = s.value.sheets.values(), l = c.next();
                  0 < i.remainingCapacity && !l.done;
                  l = c.next()
                ) {
                  var u = l.value,
                    d = u.props,
                    f = d.href,
                    p = u.props,
                    m = lt(p.href, `style`, {
                      crossOrigin: p.crossOrigin,
                      integrity: p.integrity,
                      nonce: p.nonce,
                      type: p.type,
                      fetchPriority: p.fetchPriority,
                      referrerPolicy: p.referrerPolicy,
                      media: p.media,
                    });
                  if (0 <= (i.remainingCapacity -= m.length + 2))
                    ((n.resets.style[f] = ae),
                      a && (a += `, `),
                      (a += m),
                      (n.resets.style[f] =
                        typeof d.crossOrigin == `string` ||
                        typeof d.integrity == `string`
                          ? [d.crossOrigin, d.integrity]
                          : ae));
                  else break b;
                }
            }
            r(a ? { Link: a } : {});
          }
        }
      } catch (t) {
        Hn(e, t, {});
      }
    }
    function fr(e) {
      (e.trackedPostpones === null && dr(e, !0),
        e.trackedPostpones === null && yr(e),
        (e.onShellError = Rt),
        (e = e.onShellReady),
        e());
    }
    function pr(e) {
      (dr(
        e,
        e.trackedPostpones === null
          ? !0
          : e.completedRootSegment === null ||
              e.completedRootSegment.status !== 5,
      ),
        yr(e),
        (e = e.onAllReady),
        e());
    }
    function mr(e, t) {
      if (
        t.chunks.length === 0 &&
        t.children.length === 1 &&
        t.children[0].boundary === null &&
        t.children[0].id === -1
      ) {
        var n = t.children[0];
        ((n.id = t.id),
          (n.parentFlushed = !0),
          (n.status !== 1 && n.status !== 3 && n.status !== 4) || mr(e, n));
      } else e.completedSegments.push(t);
    }
    function hr(e, t, n, r) {
      if (
        (n !== null &&
          (--n.pendingTasks === 0 ? Wn(e, n) : n.together && Kn(e, n)),
        e.allPendingTasks--,
        t === null)
      ) {
        if (r !== null && r.parentFlushed) {
          if (e.completedRootSegment !== null) throw Error(i(389));
          e.completedRootSegment = r;
        }
        (e.pendingRootTasks--, e.pendingRootTasks === 0 && fr(e));
      } else if ((t.pendingTasks--, t.status !== 4))
        if (t.pendingTasks === 0) {
          if (
            (t.status === 0 && (t.status = 1),
            r !== null &&
              r.parentFlushed &&
              (r.status === 1 || r.status === 3) &&
              mr(t, r),
            t.parentFlushed && e.completedBoundaries.push(t),
            t.status === 1)
          )
            ((n = t.row),
              n !== null && gt(n.hoistables, t.contentState),
              kn(e, t) ||
                (t.fallbackAbortableTasks.forEach(cr, e),
                t.fallbackAbortableTasks.clear(),
                n !== null && --n.pendingTasks === 0 && Wn(e, n)),
              e.pendingRootTasks === 0 &&
                e.trackedPostpones === null &&
                t.contentPreamble !== null &&
                yr(e));
          else if (t.status === 5 && ((t = t.row), t !== null)) {
            if (e.trackedPostpones !== null) {
              n = e.trackedPostpones;
              var a = t.next;
              if (a !== null && ((r = a.boundaries), r !== null))
                for (a.boundaries = null, a = 0; a < r.length; a++) {
                  var o = r[a];
                  (nr(e, n, o), hr(e, o, null, null));
                }
            }
            --t.pendingTasks === 0 && Wn(e, t);
          }
        } else
          (r === null ||
            !r.parentFlushed ||
            (r.status !== 1 && r.status !== 3) ||
            (mr(t, r),
            t.completedSegments.length === 1 &&
              t.parentFlushed &&
              e.partialBoundaries.push(t)),
            (t = t.row),
            t !== null && t.together && Kn(e, t));
      e.allPendingTasks === 0 && pr(e);
    }
    function gr(e) {
      if (e.status !== 14 && e.status !== 13) {
        var t = wt,
          n = re.H;
        re.H = bn;
        var r = re.A;
        re.A = Sn;
        var a = Nn;
        Nn = e;
        var o = xn;
        xn = e.resumableState;
        try {
          var s = e.pingedTasks,
            c;
          for (c = 0; c < s.length; c++) {
            var l = s[c],
              u = e,
              d = l.blockedSegment;
            if (d === null) {
              var f = u;
              if (l.replay.pendingTasks !== 0) {
                At(l.context);
                try {
                  if (
                    (typeof l.replay.slots == `number`
                      ? Qn(f, l, l.replay.slots, l.node, l.childIndex)
                      : er(f, l),
                    l.replay.pendingTasks === 1 && 0 < l.replay.nodes.length)
                  )
                    throw Error(i(488));
                  (l.replay.pendingTasks--,
                    l.abortSet.delete(l),
                    hr(f, l.blockedBoundary, l.row, null));
                } catch (e) {
                  ln();
                  var p = e === zt ? Ht() : e;
                  if (
                    typeof p == `object` &&
                    p &&
                    typeof p.then == `function`
                  ) {
                    var m = l.ping;
                    (p.then(m, m), (l.thenableState = e === zt ? cn() : null));
                  } else {
                    (l.replay.pendingTasks--, l.abortSet.delete(l));
                    var h = Vn(l.componentStack);
                    u = void 0;
                    var g = f,
                      _ = l.blockedBoundary,
                      v = f.status === 12 ? f.fatalError : p,
                      y = l.replay.nodes,
                      b = l.replay.slots;
                    ((u = Hn(g, v, h)),
                      lr(g, _, y, b, v, u),
                      f.pendingRootTasks--,
                      f.pendingRootTasks === 0 && fr(f),
                      f.allPendingTasks--,
                      f.allPendingTasks === 0 && pr(f));
                  }
                }
              }
            } else if (((f = void 0), (g = d), g.status === 0)) {
              ((g.status = 6), At(l.context));
              var x = g.children.length,
                S = g.chunks.length;
              try {
                (er(u, l),
                  yt(g.chunks, u.renderState, g.lastPushedText, g.textEmbedded),
                  l.abortSet.delete(l),
                  (g.status = 1),
                  hr(u, l.blockedBoundary, l.row, g));
              } catch (e) {
                (ln(), (g.children.length = x), (g.chunks.length = S));
                var C = e === zt ? Ht() : u.status === 12 ? u.fatalError : e;
                if (u.status === 12 && u.trackedPostpones !== null) {
                  var ee = u.trackedPostpones,
                    w = Vn(l.componentStack);
                  (l.abortSet.delete(l),
                    Hn(u, C, w),
                    rr(u, ee, l, g),
                    hr(u, l.blockedBoundary, l.row, g));
                } else if (
                  typeof C == `object` &&
                  C &&
                  typeof C.then == `function`
                ) {
                  ((g.status = 0), (l.thenableState = e === zt ? cn() : null));
                  var T = l.ping;
                  C.then(T, T);
                } else {
                  var E = Vn(l.componentStack);
                  (l.abortSet.delete(l), (g.status = 4));
                  var D = l.blockedBoundary,
                    O = l.row;
                  if (
                    (O !== null && --O.pendingTasks === 0 && Wn(u, O),
                    u.allPendingTasks--,
                    (f = Hn(u, C, E)),
                    D === null)
                  )
                    Un(u, C);
                  else if ((D.pendingTasks--, D.status !== 4)) {
                    ((D.status = 4), (D.errorDigest = f), ir(u, D));
                    var k = D.row;
                    (k !== null && --k.pendingTasks === 0 && Wn(u, k),
                      D.parentFlushed && u.clientRenderedBoundaries.push(D),
                      u.pendingRootTasks === 0 &&
                        u.trackedPostpones === null &&
                        D.contentPreamble !== null &&
                        yr(u));
                  }
                  u.allPendingTasks === 0 && pr(u);
                }
              }
            }
          }
          (s.splice(0, c), e.destination !== null && Dr(e, e.destination));
        } catch (t) {
          (Hn(e, t, {}), Un(e, t));
        } finally {
          ((xn = o), (re.H = n), (re.A = r), n === bn && At(t), (Nn = a));
        }
      }
    }
    function _r(e, t, n) {
      t.preambleChildren.length && n.push(t.preambleChildren);
      for (var r = !1, i = 0; i < t.children.length; i++)
        r = vr(e, t.children[i], n) || r;
      return r;
    }
    function vr(e, t, n) {
      var r = t.boundary;
      if (r === null) return _r(e, t, n);
      var a = r.contentPreamble,
        o = r.fallbackPreamble;
      if (a === null || o === null) return !1;
      switch (r.status) {
        case 1:
          if (
            (J(e.renderState, a),
            (e.byteSize += r.byteSize),
            (t = r.completedSegments[0]),
            !t)
          )
            throw Error(i(391));
          return _r(e, t, n);
        case 5:
          if (e.trackedPostpones !== null) return !0;
        case 4:
          if (t.status === 1) return (J(e.renderState, o), _r(e, t, n));
        default:
          return !0;
      }
    }
    function yr(e) {
      if (e.completedRootSegment && e.completedPreambleSegments === null) {
        var t = [],
          n = e.byteSize,
          r = vr(e, e.completedRootSegment, t),
          i = e.renderState.preamble;
        !1 === r || (i.headChunks && i.bodyChunks)
          ? (e.completedPreambleSegments = t)
          : (e.byteSize = n);
      }
    }
    function br(e, t, n, r) {
      switch (((n.parentFlushed = !0), n.status)) {
        case 0:
          n.id = e.nextSegmentId++;
        case 5:
          return (
            (r = n.id),
            (n.lastPushedText = !1),
            (n.textEmbedded = !1),
            (e = e.renderState),
            t.push(`<template id="`),
            t.push(e.placeholderPrefix),
            (e = r.toString(16)),
            t.push(e),
            t.push(`"></template>`)
          );
        case 1:
          n.status = 2;
          var a = !0,
            o = n.chunks,
            s = 0;
          n = n.children;
          for (var c = 0; c < n.length; c++) {
            for (a = n[c]; s < a.index; s++) t.push(o[s]);
            a = Sr(e, t, a, r);
          }
          for (; s < o.length - 1; s++) t.push(o[s]);
          return (s < o.length && (a = t.push(o[s])), a);
        case 3:
          return !0;
        default:
          throw Error(i(390));
      }
    }
    var xr = 0;
    function Sr(e, t, n, r) {
      var a = n.boundary;
      if (a === null) return br(e, t, n, r);
      if (((a.parentFlushed = !0), a.status === 4)) {
        var o = a.row;
        return (
          o !== null && --o.pendingTasks === 0 && Wn(e, o),
          e.renderState.generateStaticMarkup ||
            ((a = a.errorDigest),
            t.push(`<!--$!-->`),
            t.push(`<template`),
            a && (t.push(` data-dgst="`), (a = F(a)), t.push(a), t.push(`"`)),
            t.push(`></template>`)),
          br(e, t, n, r),
          (e = e.renderState.generateStaticMarkup ? !0 : t.push(`<!--/$-->`)),
          e
        );
      }
      if (a.status !== 1)
        return (
          a.status === 0 && (a.rootSegmentID = e.nextSegmentId++),
          0 < a.completedSegments.length && e.partialBoundaries.push(a),
          Fe(t, e.renderState, a.rootSegmentID),
          r && gt(r, a.fallbackState),
          br(e, t, n, r),
          t.push(`<!--/$-->`)
        );
      if (!Er && kn(e, a) && xr + a.byteSize > e.progressiveChunkSize)
        return (
          (a.rootSegmentID = e.nextSegmentId++),
          e.completedBoundaries.push(a),
          Fe(t, e.renderState, a.rootSegmentID),
          br(e, t, n, r),
          t.push(`<!--/$-->`)
        );
      if (
        ((xr += a.byteSize),
        r && gt(r, a.contentState),
        (n = a.row),
        n !== null && kn(e, a) && --n.pendingTasks === 0 && Wn(e, n),
        e.renderState.generateStaticMarkup || t.push(`<!--$-->`),
        (n = a.completedSegments),
        n.length !== 1)
      )
        throw Error(i(391));
      return (
        Sr(e, t, n[0], r),
        (e = e.renderState.generateStaticMarkup ? !0 : t.push(`<!--/$-->`)),
        e
      );
    }
    function Cr(e, t, n, r) {
      return (
        Ie(t, e.renderState, n.parentFormatContext, n.id),
        Sr(e, t, n, r),
        Le(t, n.parentFormatContext)
      );
    }
    function wr(e, t, n) {
      xr = n.byteSize;
      for (var r = n.completedSegments, i = 0; i < r.length; i++)
        Tr(e, t, n, r[i]);
      ((r.length = 0),
        (r = n.row),
        r !== null && kn(e, n) && --r.pendingTasks === 0 && Wn(e, r),
        Ge(t, n.contentState, e.renderState),
        (r = e.resumableState),
        (e = e.renderState),
        (i = n.rootSegmentID),
        (n = n.contentState));
      var a = e.stylesToHoist;
      return (
        (e.stylesToHoist = !1),
        t.push(e.startInlineScript),
        t.push(`>`),
        a
          ? (!(r.instructions & 4) &&
              ((r.instructions |= 4),
              t.push(
                `$RX=function(b,c,d,e,f){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),f&&(a.cstck=f),b._reactRetry&&b._reactRetry())};`,
              )),
            !(r.instructions & 2) &&
              ((r.instructions |= 2),
              t.push(`$RB=[];$RV=function(a){$RT=performance.now();for(var b=0;b<a.length;b+=2){var c=a[b],e=a[b+1];null!==e.parentNode&&e.parentNode.removeChild(e);var f=c.parentNode;if(f){var g=c.previousSibling,h=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d||"/&"===d)if(0===h)break;else h--;else"$"!==d&&"$?"!==d&&"$~"!==d&&"$!"!==d&&"&"!==d||h++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;e.firstChild;)f.insertBefore(e.firstChild,c);g.data="$";g._reactRetry&&requestAnimationFrame(g._reactRetry)}}a.length=0};
$RC=function(a,b){if(b=document.getElementById(b))(a=document.getElementById(a))?(a.previousSibling.data="$~",$RB.push(a,b),2===$RB.length&&("number"!==typeof $RT?requestAnimationFrame($RV.bind(null,$RB)):(a=performance.now(),setTimeout($RV.bind(null,$RB),2300>a&&2E3<a?2300-a:$RT+300-a)))):b.parentNode.removeChild(b)};`)),
            r.instructions & 8
              ? t.push(`$RR("`)
              : ((r.instructions |= 8),
                t.push(`$RM=new Map;$RR=function(n,w,p){function u(q){this._p=null;q()}for(var r=new Map,t=document,h,b,e=t.querySelectorAll("link[data-precedence],style[data-precedence]"),v=[],k=0;b=e[k++];)"not all"===b.getAttribute("media")?v.push(b):("LINK"===b.tagName&&$RM.set(b.getAttribute("href"),b),r.set(b.dataset.precedence,h=b));e=0;b=[];var l,a;for(k=!0;;){if(k){var f=p[e++];if(!f){k=!1;e=0;continue}var c=!1,m=0;var d=f[m++];if(a=$RM.get(d)){var g=a._p;c=!0}else{a=t.createElement("link");a.href=d;a.rel=
"stylesheet";for(a.dataset.precedence=l=f[m++];g=f[m++];)a.setAttribute(g,f[m++]);g=a._p=new Promise(function(q,x){a.onload=u.bind(a,q);a.onerror=u.bind(a,x)});$RM.set(d,a)}d=a.getAttribute("media");!g||d&&!matchMedia(d).matches||b.push(g);if(c)continue}else{a=v[e++];if(!a)break;l=a.getAttribute("data-precedence");a.removeAttribute("media")}c=r.get(l)||h;c===h&&(h=a);r.set(l,a);c?c.parentNode.insertBefore(a,c.nextSibling):(c=t.head,c.insertBefore(a,c.firstChild))}if(p=document.getElementById(n))p.previousSibling.data=
"$~";Promise.all(b).then($RC.bind(null,n,w),$RX.bind(null,n,"CSS failed to load"))};$RR("`)))
          : (!(r.instructions & 2) &&
              ((r.instructions |= 2),
              t.push(`$RB=[];$RV=function(a){$RT=performance.now();for(var b=0;b<a.length;b+=2){var c=a[b],e=a[b+1];null!==e.parentNode&&e.parentNode.removeChild(e);var f=c.parentNode;if(f){var g=c.previousSibling,h=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d||"/&"===d)if(0===h)break;else h--;else"$"!==d&&"$?"!==d&&"$~"!==d&&"$!"!==d&&"&"!==d||h++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;e.firstChild;)f.insertBefore(e.firstChild,c);g.data="$";g._reactRetry&&requestAnimationFrame(g._reactRetry)}}a.length=0};
$RC=function(a,b){if(b=document.getElementById(b))(a=document.getElementById(a))?(a.previousSibling.data="$~",$RB.push(a,b),2===$RB.length&&("number"!==typeof $RT?requestAnimationFrame($RV.bind(null,$RB)):(a=performance.now(),setTimeout($RV.bind(null,$RB),2300>a&&2E3<a?2300-a:$RT+300-a)))):b.parentNode.removeChild(b)};`)),
            t.push(`$RC("`)),
        (r = i.toString(16)),
        t.push(e.boundaryPrefix),
        t.push(r),
        t.push(`","`),
        t.push(e.segmentPrefix),
        t.push(r),
        a ? (t.push(`",`), $e(t, n)) : t.push(`"`),
        (n = t.push(`)<\/script>`)),
        Pe(t, e) && n
      );
    }
    function Tr(e, t, n, r) {
      if (r.status === 2) return !0;
      var a = n.contentState,
        o = r.id;
      if (o === -1) {
        if ((r.id = n.rootSegmentID) === -1) throw Error(i(392));
        return Cr(e, t, r, a);
      }
      return o === n.rootSegmentID
        ? Cr(e, t, r, a)
        : (Cr(e, t, r, a),
          (n = e.resumableState),
          (e = e.renderState),
          t.push(e.startInlineScript),
          t.push(`>`),
          n.instructions & 1
            ? t.push(`$RS("`)
            : ((n.instructions |= 1),
              t.push(
                `$RS=function(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS("`,
              )),
          t.push(e.segmentPrefix),
          (o = o.toString(16)),
          t.push(o),
          t.push(`","`),
          t.push(e.placeholderPrefix),
          t.push(o),
          (t = t.push(`")<\/script>`)),
          t);
    }
    var Er = !1;
    function Dr(e, t) {
      try {
        if (!(0 < e.pendingRootTasks)) {
          var n,
            r = e.completedRootSegment;
          if (r !== null) {
            if (r.status === 5) return;
            var i = e.completedPreambleSegments;
            if (i === null) return;
            xr = e.byteSize;
            var a = e.resumableState,
              o = e.renderState,
              s = o.preamble,
              c = s.htmlChunks,
              l = s.headChunks,
              u;
            if (c) {
              for (u = 0; u < c.length; u++) t.push(c[u]);
              if (l) for (u = 0; u < l.length; u++) t.push(l[u]);
              else {
                var d = G(`head`);
                (t.push(d), t.push(`>`));
              }
            } else if (l) for (u = 0; u < l.length; u++) t.push(l[u]);
            var f = o.charsetChunks;
            for (u = 0; u < f.length; u++) t.push(f[u]);
            ((f.length = 0),
              o.preconnects.forEach(Ke, t),
              o.preconnects.clear());
            var p = o.viewportChunks;
            for (u = 0; u < p.length; u++) t.push(p[u]);
            ((p.length = 0),
              o.fontPreloads.forEach(Ke, t),
              o.fontPreloads.clear(),
              o.highImagePreloads.forEach(Ke, t),
              o.highImagePreloads.clear(),
              (oe = o),
              o.styles.forEach(Ye, t),
              (oe = null));
            var m = o.importMapChunks;
            for (u = 0; u < m.length; u++) t.push(m[u]);
            ((m.length = 0),
              o.bootstrapScripts.forEach(Ke, t),
              o.scripts.forEach(Ke, t),
              o.scripts.clear(),
              o.bulkPreloads.forEach(Ke, t),
              o.bulkPreloads.clear(),
              (a.instructions |= 32));
            var h = o.hoistableChunks;
            for (u = 0; u < h.length; u++) t.push(h[u]);
            for (a = h.length = 0; a < i.length; a++) {
              var g = i[a];
              for (o = 0; o < g.length; o++) Sr(e, t, g[o], null);
            }
            var _ = e.renderState.preamble,
              v = _.headChunks;
            if (_.htmlChunks || v) {
              var y = q(`head`);
              t.push(y);
            }
            var b = _.bodyChunks;
            if (b) for (i = 0; i < b.length; i++) t.push(b[i]);
            (Sr(e, t, r, null), (e.completedRootSegment = null));
            var x = e.renderState;
            if (
              e.allPendingTasks !== 0 ||
              e.clientRenderedBoundaries.length !== 0 ||
              e.completedBoundaries.length !== 0 ||
              (e.trackedPostpones !== null &&
                (e.trackedPostpones.rootNodes.length !== 0 ||
                  e.trackedPostpones.rootSlots !== null))
            ) {
              var S = e.resumableState;
              if (!(S.instructions & 64)) {
                if (
                  ((S.instructions |= 64),
                  t.push(x.startInlineScript),
                  !(S.instructions & 32))
                ) {
                  S.instructions |= 32;
                  var C = `_` + S.idPrefix + `R_`;
                  t.push(` id="`);
                  var ee = F(C);
                  (t.push(ee), t.push(`"`));
                }
                (t.push(`>`),
                  t.push(
                    `requestAnimationFrame(function(){$RT=performance.now()});`,
                  ),
                  t.push(`<\/script>`));
              }
            }
            Pe(t, x);
          }
          var w = e.renderState;
          r = 0;
          var T = w.viewportChunks;
          for (r = 0; r < T.length; r++) t.push(T[r]);
          ((T.length = 0),
            w.preconnects.forEach(Ke, t),
            w.preconnects.clear(),
            w.fontPreloads.forEach(Ke, t),
            w.fontPreloads.clear(),
            w.highImagePreloads.forEach(Ke, t),
            w.highImagePreloads.clear(),
            w.styles.forEach(Ze, t),
            w.scripts.forEach(Ke, t),
            w.scripts.clear(),
            w.bulkPreloads.forEach(Ke, t),
            w.bulkPreloads.clear());
          var E = w.hoistableChunks;
          for (r = 0; r < E.length; r++) t.push(E[r]);
          E.length = 0;
          var D = e.clientRenderedBoundaries;
          for (n = 0; n < D.length; n++) {
            var O = D[n];
            w = t;
            var k = e.resumableState,
              A = e.renderState,
              j = O.rootSegmentID,
              M = O.errorDigest;
            (w.push(A.startInlineScript),
              w.push(`>`),
              k.instructions & 4
                ? w.push(`$RX("`)
                : ((k.instructions |= 4),
                  w.push(
                    `$RX=function(b,c,d,e,f){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),f&&(a.cstck=f),b._reactRetry&&b._reactRetry())};;$RX("`,
                  )),
              w.push(A.boundaryPrefix));
            var N = j.toString(16);
            if ((w.push(N), w.push(`"`), M)) {
              w.push(`,`);
              var P = ze(M || ``);
              w.push(P);
            }
            var te = w.push(`)<\/script>`);
            if (!te) {
              ((e.destination = null), n++, D.splice(0, n));
              return;
            }
          }
          D.splice(0, n);
          var ne = e.completedBoundaries;
          for (n = 0; n < ne.length; n++)
            if (!wr(e, t, ne[n])) {
              ((e.destination = null), n++, ne.splice(0, n));
              return;
            }
          (ne.splice(0, n), (Er = !0));
          var I = e.partialBoundaries;
          for (n = 0; n < I.length; n++) {
            var L = I[n];
            a: {
              ((D = e), (O = t), (xr = L.byteSize));
              var re = L.completedSegments;
              for (te = 0; te < re.length; te++)
                if (!Tr(D, O, L, re[te])) {
                  (te++, re.splice(0, te));
                  var ie = !1;
                  break a;
                }
              re.splice(0, te);
              var R = L.row;
              (R !== null &&
                R.together &&
                L.pendingTasks === 1 &&
                (R.pendingTasks === 1
                  ? Gn(D, R, R.hoistables)
                  : R.pendingTasks--),
                (ie = Ge(O, L.contentState, D.renderState)));
            }
            if (!ie) {
              ((e.destination = null), n++, I.splice(0, n));
              return;
            }
          }
          (I.splice(0, n), (Er = !1));
          var z = e.completedBoundaries;
          for (n = 0; n < z.length; n++)
            if (!wr(e, t, z[n])) {
              ((e.destination = null), n++, z.splice(0, n));
              return;
            }
          z.splice(0, n);
        }
      } finally {
        ((Er = !1),
          e.allPendingTasks === 0 &&
            e.clientRenderedBoundaries.length === 0 &&
            e.completedBoundaries.length === 0 &&
            ((e.flushScheduled = !1),
            (n = e.resumableState),
            n.hasBody && ((I = q(`body`)), t.push(I)),
            n.hasHtml && ((n = q(`html`)), t.push(n)),
            (e.status = 14),
            t.push(null),
            (e.destination = null)));
      }
    }
    function Or(e) {
      if (
        !1 === e.flushScheduled &&
        e.pingedTasks.length === 0 &&
        e.destination !== null
      ) {
        e.flushScheduled = !0;
        var t = e.destination;
        t ? Dr(e, t) : (e.flushScheduled = !1);
      }
    }
    function kr(e, t) {
      if (e.status === 13) ((e.status = 14), t.destroy(e.fatalError));
      else if (e.status !== 14 && e.destination === null) {
        e.destination = t;
        try {
          Dr(e, t);
        } catch (t) {
          (Hn(e, t, {}), Un(e, t));
        }
      }
    }
    function Ar(e, t) {
      (e.status === 11 || e.status === 10) && (e.status = 12);
      try {
        var n = e.abortableTasks;
        if (0 < n.size) {
          var r =
            t === void 0
              ? Error(i(432))
              : typeof t == `object` && t && typeof t.then == `function`
                ? Error(i(530))
                : t;
          ((e.fatalError = r),
            n.forEach(function (t) {
              return ur(t, e, r);
            }),
            n.clear());
        }
        e.destination !== null && Dr(e, e.destination);
      } catch (t) {
        (Hn(e, t, {}), Un(e, t));
      }
    }
    function jr(e, t, n) {
      if (t === null) n.rootNodes.push(e);
      else {
        var r = n.workingMap,
          i = r.get(t);
        (i === void 0 &&
          ((i = [t[1], t[2], [], null]), r.set(t, i), jr(i, t[0], n)),
          i[2].push(e));
      }
    }
    function Mr() {}
    function Nr(e, t, n, r) {
      var a = !1,
        o = null,
        s = ``,
        c = !1;
      if (
        ((t = le(t ? t.identifierPrefix : void 0)),
        (e = Mn(
          e,
          t,
          _t(t, n),
          B(0, null, 0, null),
          1 / 0,
          Mr,
          void 0,
          function () {
            c = !0;
          },
          void 0,
          void 0,
          void 0,
        )),
        (e.flushScheduled = e.destination !== null),
        gr(e),
        e.status === 10 && (e.status = 11),
        e.trackedPostpones === null && dr(e, e.pendingRootTasks === 0),
        Ar(e, r),
        kr(e, {
          push: function (e) {
            return (e !== null && (s += e), !0);
          },
          destroy: function (e) {
            ((a = !0), (o = e));
          },
        }),
        a && o !== r)
      )
        throw o;
      if (!c) throw Error(i(426));
      return s;
    }
    ((e.renderToStaticMarkup = function (e, t) {
      return Nr(
        e,
        t,
        !0,
        `The server used "renderToStaticMarkup" which does not support Suspense. If you intended to have the server wait for the suspended component please switch to "renderToReadableStream" which supports Suspense on the server`,
      );
    }),
      (e.renderToString = function (e, t) {
        return Nr(
          e,
          t,
          !1,
          `The server used "renderToString" which does not support Suspense. If you intended for this Suspense boundary to render the fallback content on the server consider throwing an Error somewhere within the Suspense boundary. If you intended to have the server wait for the suspended component please switch to "renderToReadableStream" which supports Suspense on the server`,
        );
      }),
      (e.version = `19.2.5`));
  }),
  Rt = t((e) => {
    var t = n(),
      r = f();
    function i(e) {
      var t = `https://react.dev/errors/` + e;
      if (1 < arguments.length) {
        t += `?args[]=` + encodeURIComponent(arguments[1]);
        for (var n = 2; n < arguments.length; n++)
          t += `&args[]=` + encodeURIComponent(arguments[n]);
      }
      return (
        `Minified React error #` +
        e +
        `; visit ` +
        t +
        ` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`
      );
    }
    var a = Symbol.for(`react.transitional.element`),
      o = Symbol.for(`react.portal`),
      s = Symbol.for(`react.fragment`),
      c = Symbol.for(`react.strict_mode`),
      l = Symbol.for(`react.profiler`),
      u = Symbol.for(`react.consumer`),
      d = Symbol.for(`react.context`),
      p = Symbol.for(`react.forward_ref`),
      m = Symbol.for(`react.suspense`),
      h = Symbol.for(`react.suspense_list`),
      g = Symbol.for(`react.memo`),
      _ = Symbol.for(`react.lazy`),
      v = Symbol.for(`react.scope`),
      y = Symbol.for(`react.activity`),
      b = Symbol.for(`react.legacy_hidden`),
      x = Symbol.for(`react.memo_cache_sentinel`),
      S = Symbol.for(`react.view_transition`),
      C = Symbol.iterator;
    function ee(e) {
      return typeof e != `object` || !e
        ? null
        : ((e = (C && e[C]) || e[`@@iterator`]),
          typeof e == `function` ? e : null);
    }
    var w = Array.isArray;
    function T(e, t) {
      var n = e.length & 3,
        r = e.length - n,
        i = t;
      for (t = 0; t < r; ) {
        var a =
          (e.charCodeAt(t) & 255) |
          ((e.charCodeAt(++t) & 255) << 8) |
          ((e.charCodeAt(++t) & 255) << 16) |
          ((e.charCodeAt(++t) & 255) << 24);
        (++t,
          (a =
            (3432918353 * (a & 65535) +
              (((3432918353 * (a >>> 16)) & 65535) << 16)) &
            4294967295),
          (a = (a << 15) | (a >>> 17)),
          (a =
            (461845907 * (a & 65535) +
              (((461845907 * (a >>> 16)) & 65535) << 16)) &
            4294967295),
          (i ^= a),
          (i = (i << 13) | (i >>> 19)),
          (i =
            (5 * (i & 65535) + (((5 * (i >>> 16)) & 65535) << 16)) &
            4294967295),
          (i = (i & 65535) + 27492 + ((((i >>> 16) + 58964) & 65535) << 16)));
      }
      switch (((a = 0), n)) {
        case 3:
          a ^= (e.charCodeAt(t + 2) & 255) << 16;
        case 2:
          a ^= (e.charCodeAt(t + 1) & 255) << 8;
        case 1:
          ((a ^= e.charCodeAt(t) & 255),
            (a =
              (3432918353 * (a & 65535) +
                (((3432918353 * (a >>> 16)) & 65535) << 16)) &
              4294967295),
            (a = (a << 15) | (a >>> 17)),
            (i ^=
              (461845907 * (a & 65535) +
                (((461845907 * (a >>> 16)) & 65535) << 16)) &
              4294967295));
      }
      return (
        (i ^= e.length),
        (i ^= i >>> 16),
        (i =
          (2246822507 * (i & 65535) +
            (((2246822507 * (i >>> 16)) & 65535) << 16)) &
          4294967295),
        (i ^= i >>> 13),
        (i =
          (3266489909 * (i & 65535) +
            (((3266489909 * (i >>> 16)) & 65535) << 16)) &
          4294967295),
        (i ^ (i >>> 16)) >>> 0
      );
    }
    var E = new MessageChannel(),
      D = [];
    E.port1.onmessage = function () {
      var e = D.shift();
      e && e();
    };
    function O(e) {
      (D.push(e), E.port2.postMessage(null));
    }
    function k(e) {
      setTimeout(function () {
        throw e;
      });
    }
    var A = Promise,
      j =
        typeof queueMicrotask == `function`
          ? queueMicrotask
          : function (e) {
              A.resolve(null).then(e).catch(k);
            },
      M = null,
      N = 0;
    function P(e, t) {
      if (t.byteLength !== 0)
        if (2048 < t.byteLength)
          (0 < N &&
            (e.enqueue(new Uint8Array(M.buffer, 0, N)),
            (M = new Uint8Array(2048)),
            (N = 0)),
            e.enqueue(t));
        else {
          var n = M.length - N;
          (n < t.byteLength &&
            (n === 0
              ? e.enqueue(M)
              : (M.set(t.subarray(0, n), N), e.enqueue(M), (t = t.subarray(n))),
            (M = new Uint8Array(2048)),
            (N = 0)),
            M.set(t, N),
            (N += t.byteLength));
        }
    }
    function F(e, t) {
      return (P(e, t), !0);
    }
    function te(e) {
      M &&
        0 < N &&
        (e.enqueue(new Uint8Array(M.buffer, 0, N)), (M = null), (N = 0));
    }
    var ne = new TextEncoder();
    function I(e) {
      return ne.encode(e);
    }
    function L(e) {
      return ne.encode(e);
    }
    function re(e) {
      return e.byteLength;
    }
    function ie(e, t) {
      typeof e.error == `function` ? e.error(t) : e.close();
    }
    var R = Object.assign,
      z = Object.prototype.hasOwnProperty,
      ae = RegExp(
        `^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`,
      ),
      oe = {},
      se = {};
    function ce(e) {
      return z.call(se, e)
        ? !0
        : z.call(oe, e)
          ? !1
          : ae.test(e)
            ? (se[e] = !0)
            : ((oe[e] = !0), !1);
    }
    var le = new Set(
        `animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(
          ` `,
        ),
      ),
      B = new Map([
        [`acceptCharset`, `accept-charset`],
        [`htmlFor`, `for`],
        [`httpEquiv`, `http-equiv`],
        [`crossOrigin`, `crossorigin`],
        [`accentHeight`, `accent-height`],
        [`alignmentBaseline`, `alignment-baseline`],
        [`arabicForm`, `arabic-form`],
        [`baselineShift`, `baseline-shift`],
        [`capHeight`, `cap-height`],
        [`clipPath`, `clip-path`],
        [`clipRule`, `clip-rule`],
        [`colorInterpolation`, `color-interpolation`],
        [`colorInterpolationFilters`, `color-interpolation-filters`],
        [`colorProfile`, `color-profile`],
        [`colorRendering`, `color-rendering`],
        [`dominantBaseline`, `dominant-baseline`],
        [`enableBackground`, `enable-background`],
        [`fillOpacity`, `fill-opacity`],
        [`fillRule`, `fill-rule`],
        [`floodColor`, `flood-color`],
        [`floodOpacity`, `flood-opacity`],
        [`fontFamily`, `font-family`],
        [`fontSize`, `font-size`],
        [`fontSizeAdjust`, `font-size-adjust`],
        [`fontStretch`, `font-stretch`],
        [`fontStyle`, `font-style`],
        [`fontVariant`, `font-variant`],
        [`fontWeight`, `font-weight`],
        [`glyphName`, `glyph-name`],
        [`glyphOrientationHorizontal`, `glyph-orientation-horizontal`],
        [`glyphOrientationVertical`, `glyph-orientation-vertical`],
        [`horizAdvX`, `horiz-adv-x`],
        [`horizOriginX`, `horiz-origin-x`],
        [`imageRendering`, `image-rendering`],
        [`letterSpacing`, `letter-spacing`],
        [`lightingColor`, `lighting-color`],
        [`markerEnd`, `marker-end`],
        [`markerMid`, `marker-mid`],
        [`markerStart`, `marker-start`],
        [`overlinePosition`, `overline-position`],
        [`overlineThickness`, `overline-thickness`],
        [`paintOrder`, `paint-order`],
        [`panose-1`, `panose-1`],
        [`pointerEvents`, `pointer-events`],
        [`renderingIntent`, `rendering-intent`],
        [`shapeRendering`, `shape-rendering`],
        [`stopColor`, `stop-color`],
        [`stopOpacity`, `stop-opacity`],
        [`strikethroughPosition`, `strikethrough-position`],
        [`strikethroughThickness`, `strikethrough-thickness`],
        [`strokeDasharray`, `stroke-dasharray`],
        [`strokeDashoffset`, `stroke-dashoffset`],
        [`strokeLinecap`, `stroke-linecap`],
        [`strokeLinejoin`, `stroke-linejoin`],
        [`strokeMiterlimit`, `stroke-miterlimit`],
        [`strokeOpacity`, `stroke-opacity`],
        [`strokeWidth`, `stroke-width`],
        [`textAnchor`, `text-anchor`],
        [`textDecoration`, `text-decoration`],
        [`textRendering`, `text-rendering`],
        [`transformOrigin`, `transform-origin`],
        [`underlinePosition`, `underline-position`],
        [`underlineThickness`, `underline-thickness`],
        [`unicodeBidi`, `unicode-bidi`],
        [`unicodeRange`, `unicode-range`],
        [`unitsPerEm`, `units-per-em`],
        [`vAlphabetic`, `v-alphabetic`],
        [`vHanging`, `v-hanging`],
        [`vIdeographic`, `v-ideographic`],
        [`vMathematical`, `v-mathematical`],
        [`vectorEffect`, `vector-effect`],
        [`vertAdvY`, `vert-adv-y`],
        [`vertOriginX`, `vert-origin-x`],
        [`vertOriginY`, `vert-origin-y`],
        [`wordSpacing`, `word-spacing`],
        [`writingMode`, `writing-mode`],
        [`xmlnsXlink`, `xmlns:xlink`],
        [`xHeight`, `x-height`],
      ]),
      ue = /["'&<>]/;
    function V(e) {
      if (typeof e == `boolean` || typeof e == `number` || typeof e == `bigint`)
        return `` + e;
      e = `` + e;
      var t = ue.exec(e);
      if (t) {
        var n = ``,
          r,
          i = 0;
        for (r = t.index; r < e.length; r++) {
          switch (e.charCodeAt(r)) {
            case 34:
              t = `&quot;`;
              break;
            case 38:
              t = `&amp;`;
              break;
            case 39:
              t = `&#x27;`;
              break;
            case 60:
              t = `&lt;`;
              break;
            case 62:
              t = `&gt;`;
              break;
            default:
              continue;
          }
          (i !== r && (n += e.slice(i, r)), (i = r + 1), (n += t));
        }
        e = i === r ? n : n + e.slice(i, r);
      }
      return e;
    }
    var de = /([A-Z])/g,
      fe = /^ms-/,
      pe =
        /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
    function me(e) {
      return pe.test(`` + e)
        ? `javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`
        : e;
    }
    var he = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
      ge = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
      _e = { pending: !1, data: null, method: null, action: null },
      ve = ge.d;
    ge.d = {
      f: ve.f,
      r: ve.r,
      D: ur,
      C: dr,
      L: fr,
      m: pr,
      X: hr,
      S: mr,
      M: gr,
    };
    var ye = [],
      be = null;
    L(`"></template>`);
    var xe = L(`<script`),
      H = L(`<\/script>`),
      Se = L(`<script src="`),
      Ce = L(`<script type="module" src="`),
      we = L(` nonce="`),
      Te = L(` integrity="`),
      Ee = L(` crossorigin="`),
      De = L(` async=""><\/script>`),
      Oe = L(`<style`),
      U = /(<\/|<)(s)(cript)/gi;
    function W(e, t, n, r) {
      return `` + t + (n === `s` ? `\\u0073` : `\\u0053`) + r;
    }
    var ke = L(`<script type="importmap">`),
      Ae = L(`<\/script>`);
    function je(e, t, n, r, i, a) {
      n = typeof t == `string` ? t : t && t.script;
      var o = n === void 0 ? xe : L(`<script nonce="` + V(n) + `"`),
        s = typeof t == `string` ? void 0 : t && t.style,
        c = s === void 0 ? Oe : L(`<style nonce="` + V(s) + `"`),
        l = e.idPrefix,
        u = [],
        d = e.bootstrapScriptContent,
        f = e.bootstrapScripts,
        p = e.bootstrapModules;
      if (
        (d !== void 0 &&
          (u.push(o), nr(u, e), u.push(et, I((`` + d).replace(U, W)), H)),
        (d = []),
        r !== void 0 &&
          (d.push(ke),
          d.push(I((`` + JSON.stringify(r)).replace(U, W))),
          d.push(Ae)),
        (r = i
          ? {
              preconnects: ``,
              fontPreloads: ``,
              highImagePreloads: ``,
              remainingCapacity: 2 + (typeof a == `number` ? a : 2e3),
            }
          : null),
        (i = {
          placeholderPrefix: L(l + `P:`),
          segmentPrefix: L(l + `S:`),
          boundaryPrefix: L(l + `B:`),
          startInlineScript: o,
          startInlineStyle: c,
          preamble: G(),
          externalRuntimeScript: null,
          bootstrapChunks: u,
          importMapChunks: d,
          onHeaders: i,
          headers: r,
          resets: {
            font: {},
            dns: {},
            connect: { default: {}, anonymous: {}, credentials: {} },
            image: {},
            style: {},
          },
          charsetChunks: [],
          viewportChunks: [],
          hoistableChunks: [],
          preconnects: new Set(),
          fontPreloads: new Set(),
          highImagePreloads: new Set(),
          styles: new Map(),
          bootstrapScripts: new Set(),
          scripts: new Set(),
          bulkPreloads: new Set(),
          preloads: {
            images: new Map(),
            stylesheets: new Map(),
            scripts: new Map(),
            moduleScripts: new Map(),
          },
          nonce: { script: n, style: s },
          hoistableState: null,
          stylesToHoist: !1,
        }),
        f !== void 0)
      )
        for (r = 0; r < f.length; r++)
          ((l = f[r]),
            (s = o = void 0),
            (c = {
              rel: `preload`,
              as: `script`,
              fetchPriority: `low`,
              nonce: t,
            }),
            typeof l == `string`
              ? (c.href = a = l)
              : ((c.href = a = l.src),
                (c.integrity = s =
                  typeof l.integrity == `string` ? l.integrity : void 0),
                (c.crossOrigin = o =
                  typeof l == `string` || l.crossOrigin == null
                    ? void 0
                    : l.crossOrigin === `use-credentials`
                      ? `use-credentials`
                      : ``)),
            (l = e),
            (d = a),
            (l.scriptResources[d] = null),
            (l.moduleScriptResources[d] = null),
            (l = []),
            lt(l, c),
            i.bootstrapScripts.add(l),
            u.push(Se, I(V(a)), Y),
            n && u.push(we, I(V(n)), Y),
            typeof s == `string` && u.push(Te, I(V(s)), Y),
            typeof o == `string` && u.push(Ee, I(V(o)), Y),
            nr(u, e),
            u.push(De));
      if (p !== void 0)
        for (t = 0; t < p.length; t++)
          ((s = p[t]),
            (a = r = void 0),
            (o = { rel: `modulepreload`, fetchPriority: `low`, nonce: n }),
            typeof s == `string`
              ? (o.href = f = s)
              : ((o.href = f = s.src),
                (o.integrity = a =
                  typeof s.integrity == `string` ? s.integrity : void 0),
                (o.crossOrigin = r =
                  typeof s == `string` || s.crossOrigin == null
                    ? void 0
                    : s.crossOrigin === `use-credentials`
                      ? `use-credentials`
                      : ``)),
            (s = e),
            (c = f),
            (s.scriptResources[c] = null),
            (s.moduleScriptResources[c] = null),
            (s = []),
            lt(s, o),
            i.bootstrapScripts.add(s),
            u.push(Ce, I(V(f)), Y),
            n && u.push(we, I(V(n)), Y),
            typeof a == `string` && u.push(Te, I(V(a)), Y),
            typeof r == `string` && u.push(Ee, I(V(r)), Y),
            nr(u, e),
            u.push(De));
      return i;
    }
    function Me(e, t, n, r, i) {
      return {
        idPrefix: e === void 0 ? `` : e,
        nextFormID: 0,
        streamingFormat: 0,
        bootstrapScriptContent: n,
        bootstrapScripts: r,
        bootstrapModules: i,
        instructions: 0,
        hasBody: !1,
        hasHtml: !1,
        unknownResources: {},
        dnsResources: {},
        connectResources: { default: {}, anonymous: {}, credentials: {} },
        imageResources: {},
        styleResources: {},
        scriptResources: {},
        moduleUnknownResources: {},
        moduleScriptResources: {},
      };
    }
    function G() {
      return { htmlChunks: null, headChunks: null, bodyChunks: null };
    }
    function K(e, t, n, r) {
      return {
        insertionMode: e,
        selectedValue: t,
        tagScope: n,
        viewTransition: r,
      };
    }
    function Ne(e) {
      return K(
        e === `http://www.w3.org/2000/svg`
          ? 4
          : e === `http://www.w3.org/1998/Math/MathML`
            ? 5
            : 0,
        null,
        0,
        null,
      );
    }
    function q(e, t, n) {
      var r = e.tagScope & -25;
      switch (t) {
        case `noscript`:
          return K(2, null, r | 1, null);
        case `select`:
          return K(2, n.value == null ? n.defaultValue : n.value, r, null);
        case `svg`:
          return K(4, null, r, null);
        case `picture`:
          return K(2, null, r | 2, null);
        case `math`:
          return K(5, null, r, null);
        case `foreignObject`:
          return K(2, null, r, null);
        case `table`:
          return K(6, null, r, null);
        case `thead`:
        case `tbody`:
        case `tfoot`:
          return K(7, null, r, null);
        case `colgroup`:
          return K(9, null, r, null);
        case `tr`:
          return K(8, null, r, null);
        case `head`:
          if (2 > e.insertionMode) return K(3, null, r, null);
          break;
        case `html`:
          if (e.insertionMode === 0) return K(1, null, r, null);
      }
      return 6 <= e.insertionMode || 2 > e.insertionMode
        ? K(2, null, r, null)
        : e.tagScope === r
          ? e
          : K(e.insertionMode, e.selectedValue, r, null);
    }
    function J(e) {
      return e === null
        ? null
        : {
            update: e.update,
            enter: `none`,
            exit: `none`,
            share: e.update,
            name: e.autoName,
            autoName: e.autoName,
            nameIdx: 0,
          };
    }
    function Pe(e, t) {
      return (
        t.tagScope & 32 && (e.instructions |= 128),
        K(
          t.insertionMode,
          t.selectedValue,
          t.tagScope | 12,
          J(t.viewTransition),
        )
      );
    }
    function Fe(e, t) {
      e = J(t.viewTransition);
      var n = t.tagScope | 16;
      return (
        e !== null && e.share !== `none` && (n |= 64),
        K(t.insertionMode, t.selectedValue, n, e)
      );
    }
    var Ie = L(`<!-- -->`);
    function Le(e, t, n, r) {
      return t === `` ? r : (r && e.push(Ie), e.push(I(V(t))), !0);
    }
    var Re = new Map(),
      ze = L(` style="`),
      Be = L(`:`),
      Ve = L(`;`);
    function He(e, t) {
      if (typeof t != `object`) throw Error(i(62));
      var n = !0,
        r;
      for (r in t)
        if (z.call(t, r)) {
          var a = t[r];
          if (a != null && typeof a != `boolean` && a !== ``) {
            if (r.indexOf(`--`) === 0) {
              var o = I(V(r));
              a = I(V((`` + a).trim()));
            } else
              ((o = Re.get(r)),
                o === void 0 &&
                  ((o = L(
                    V(r.replace(de, `-$1`).toLowerCase().replace(fe, `-ms-`)),
                  )),
                  Re.set(r, o)),
                (a =
                  typeof a == `number`
                    ? a === 0 || le.has(r)
                      ? I(`` + a)
                      : I(a + `px`)
                    : I(V((`` + a).trim()))));
            n ? ((n = !1), e.push(ze, o, Be, a)) : e.push(Ve, o, Be, a);
          }
        }
      n || e.push(Y);
    }
    var Ue = L(` `),
      We = L(`="`),
      Y = L(`"`),
      Ge = L(`=""`);
    function Ke(e, t, n) {
      n &&
        typeof n != `function` &&
        typeof n != `symbol` &&
        e.push(Ue, I(t), Ge);
    }
    function qe(e, t, n) {
      typeof n != `function` &&
        typeof n != `symbol` &&
        typeof n != `boolean` &&
        e.push(Ue, I(t), We, I(V(n)), Y);
    }
    var Je = L(
        V(`javascript:throw new Error('React form unexpectedly submitted.')`),
      ),
      Ye = L(`<input type="hidden"`);
    function Xe(e, t) {
      (this.push(Ye),
        Ze(e),
        qe(this, `name`, t),
        qe(this, `value`, e),
        this.push(tt));
    }
    function Ze(e) {
      if (typeof e != `string`) throw Error(i(480));
    }
    function Qe(e, t) {
      if (typeof t.$$FORM_ACTION == `function`) {
        var n = e.nextFormID++;
        e = e.idPrefix + n;
        try {
          var r = t.$$FORM_ACTION(e);
          return (r && r.data?.forEach(Ze), r);
        } catch (e) {
          if (typeof e == `object` && e && typeof e.then == `function`) throw e;
        }
      }
      return null;
    }
    function $e(e, t, n, r, i, a, o, s) {
      var c = null;
      if (typeof r == `function`) {
        var l = Qe(t, r);
        l === null
          ? (e.push(Ue, I(`formAction`), We, Je, Y),
            (o = a = i = r = s = null),
            ot(t, n))
          : ((s = l.name),
            (r = l.action || ``),
            (i = l.encType),
            (a = l.method),
            (o = l.target),
            (c = l.data));
      }
      return (
        s != null && X(e, `name`, s),
        r != null && X(e, `formAction`, r),
        i != null && X(e, `formEncType`, i),
        a != null && X(e, `formMethod`, a),
        o != null && X(e, `formTarget`, o),
        c
      );
    }
    function X(e, t, n) {
      switch (t) {
        case `className`:
          qe(e, `class`, n);
          break;
        case `tabIndex`:
          qe(e, `tabindex`, n);
          break;
        case `dir`:
        case `role`:
        case `viewBox`:
        case `width`:
        case `height`:
          qe(e, t, n);
          break;
        case `style`:
          He(e, n);
          break;
        case `src`:
        case `href`:
          if (n === ``) break;
        case `action`:
        case `formAction`:
          if (
            n == null ||
            typeof n == `function` ||
            typeof n == `symbol` ||
            typeof n == `boolean`
          )
            break;
          ((n = me(`` + n)), e.push(Ue, I(t), We, I(V(n)), Y));
          break;
        case `defaultValue`:
        case `defaultChecked`:
        case `innerHTML`:
        case `suppressContentEditableWarning`:
        case `suppressHydrationWarning`:
        case `ref`:
          break;
        case `autoFocus`:
        case `multiple`:
        case `muted`:
          Ke(e, t.toLowerCase(), n);
          break;
        case `xlinkHref`:
          if (
            typeof n == `function` ||
            typeof n == `symbol` ||
            typeof n == `boolean`
          )
            break;
          ((n = me(`` + n)), e.push(Ue, I(`xlink:href`), We, I(V(n)), Y));
          break;
        case `contentEditable`:
        case `spellCheck`:
        case `draggable`:
        case `value`:
        case `autoReverse`:
        case `externalResourcesRequired`:
        case `focusable`:
        case `preserveAlpha`:
          typeof n != `function` &&
            typeof n != `symbol` &&
            e.push(Ue, I(t), We, I(V(n)), Y);
          break;
        case `inert`:
        case `allowFullScreen`:
        case `async`:
        case `autoPlay`:
        case `controls`:
        case `default`:
        case `defer`:
        case `disabled`:
        case `disablePictureInPicture`:
        case `disableRemotePlayback`:
        case `formNoValidate`:
        case `hidden`:
        case `loop`:
        case `noModule`:
        case `noValidate`:
        case `open`:
        case `playsInline`:
        case `readOnly`:
        case `required`:
        case `reversed`:
        case `scoped`:
        case `seamless`:
        case `itemScope`:
          n &&
            typeof n != `function` &&
            typeof n != `symbol` &&
            e.push(Ue, I(t), Ge);
          break;
        case `capture`:
        case `download`:
          !0 === n
            ? e.push(Ue, I(t), Ge)
            : !1 !== n &&
              typeof n != `function` &&
              typeof n != `symbol` &&
              e.push(Ue, I(t), We, I(V(n)), Y);
          break;
        case `cols`:
        case `rows`:
        case `size`:
        case `span`:
          typeof n != `function` &&
            typeof n != `symbol` &&
            !isNaN(n) &&
            1 <= n &&
            e.push(Ue, I(t), We, I(V(n)), Y);
          break;
        case `rowSpan`:
        case `start`:
          typeof n == `function` ||
            typeof n == `symbol` ||
            isNaN(n) ||
            e.push(Ue, I(t), We, I(V(n)), Y);
          break;
        case `xlinkActuate`:
          qe(e, `xlink:actuate`, n);
          break;
        case `xlinkArcrole`:
          qe(e, `xlink:arcrole`, n);
          break;
        case `xlinkRole`:
          qe(e, `xlink:role`, n);
          break;
        case `xlinkShow`:
          qe(e, `xlink:show`, n);
          break;
        case `xlinkTitle`:
          qe(e, `xlink:title`, n);
          break;
        case `xlinkType`:
          qe(e, `xlink:type`, n);
          break;
        case `xmlBase`:
          qe(e, `xml:base`, n);
          break;
        case `xmlLang`:
          qe(e, `xml:lang`, n);
          break;
        case `xmlSpace`:
          qe(e, `xml:space`, n);
          break;
        default:
          if (
            (!(2 < t.length) ||
              (t[0] !== `o` && t[0] !== `O`) ||
              (t[1] !== `n` && t[1] !== `N`)) &&
            ((t = B.get(t) || t), ce(t))
          ) {
            switch (typeof n) {
              case `function`:
              case `symbol`:
                return;
              case `boolean`:
                var r = t.toLowerCase().slice(0, 5);
                if (r !== `data-` && r !== `aria-`) return;
            }
            e.push(Ue, I(t), We, I(V(n)), Y);
          }
      }
    }
    var et = L(`>`),
      tt = L(`/>`);
    function nt(e, t, n) {
      if (t != null) {
        if (n != null) throw Error(i(60));
        if (typeof t != `object` || !(`__html` in t)) throw Error(i(61));
        ((t = t.__html), t != null && e.push(I(`` + t)));
      }
    }
    function rt(e) {
      var n = ``;
      return (
        t.Children.forEach(e, function (e) {
          e != null && (n += e);
        }),
        n
      );
    }
    var it = L(` selected=""`),
      at = L(
        `addEventListener("submit",function(a){if(!a.defaultPrevented){var c=a.target,d=a.submitter,e=c.action,b=d;if(d){var f=d.getAttribute("formAction");null!=f&&(e=f,b=null)}"javascript:throw new Error('React form unexpectedly submitted.')"===e&&(a.preventDefault(),b?(a=document.createElement("input"),a.name=b.name,a.value=b.value,b.parentNode.insertBefore(a,b),b=new FormData(c),a.parentNode.removeChild(a)):b=new FormData(c),a=c.ownerDocument||c,(a.$$reactFormReplay=a.$$reactFormReplay||[]).push(c,d,b))}});`,
      );
    function ot(e, t) {
      if (!(e.instructions & 16)) {
        e.instructions |= 16;
        var n = t.preamble,
          r = t.bootstrapChunks;
        (n.htmlChunks || n.headChunks) && r.length === 0
          ? (r.push(t.startInlineScript), nr(r, e), r.push(et, at, H))
          : r.unshift(t.startInlineScript, et, at, H);
      }
    }
    var st = L(`<!--F!-->`),
      ct = L(`<!--F-->`);
    function lt(e, t) {
      for (var n in (e.push(Ct(`link`)), t))
        if (z.call(t, n)) {
          var r = t[n];
          if (r != null)
            switch (n) {
              case `children`:
              case `dangerouslySetInnerHTML`:
                throw Error(i(399, `link`));
              default:
                X(e, n, r);
            }
        }
      return (e.push(tt), null);
    }
    var ut = /(<\/|<)(s)(tyle)/gi;
    function dt(e, t, n, r) {
      return `` + t + (n === `s` ? `\\73 ` : `\\53 `) + r;
    }
    function ft(e, t, n) {
      for (var r in (e.push(Ct(n)), t))
        if (z.call(t, r)) {
          var a = t[r];
          if (a != null)
            switch (r) {
              case `children`:
              case `dangerouslySetInnerHTML`:
                throw Error(i(399, n));
              default:
                X(e, r, a);
            }
        }
      return (e.push(tt), null);
    }
    function pt(e, t) {
      e.push(Ct(`title`));
      var n = null,
        r = null,
        i;
      for (i in t)
        if (z.call(t, i)) {
          var a = t[i];
          if (a != null)
            switch (i) {
              case `children`:
                n = a;
                break;
              case `dangerouslySetInnerHTML`:
                r = a;
                break;
              default:
                X(e, i, a);
            }
        }
      return (
        e.push(et),
        (t = Array.isArray(n) ? (2 > n.length ? n[0] : null) : n),
        typeof t != `function` &&
          typeof t != `symbol` &&
          t != null &&
          e.push(I(V(`` + t))),
        nt(e, r, n),
        e.push(Dt(`title`)),
        null
      );
    }
    var mt = L(`<!--head-->`),
      ht = L(`<!--body-->`),
      gt = L(`<!--html-->`);
    function _t(e, t) {
      e.push(Ct(`script`));
      var n = null,
        r = null,
        i;
      for (i in t)
        if (z.call(t, i)) {
          var a = t[i];
          if (a != null)
            switch (i) {
              case `children`:
                n = a;
                break;
              case `dangerouslySetInnerHTML`:
                r = a;
                break;
              default:
                X(e, i, a);
            }
        }
      return (
        e.push(et),
        nt(e, r, n),
        typeof n == `string` && e.push(I((`` + n).replace(U, W))),
        e.push(Dt(`script`)),
        null
      );
    }
    function vt(e, t, n) {
      e.push(Ct(n));
      var r = (n = null),
        i;
      for (i in t)
        if (z.call(t, i)) {
          var a = t[i];
          if (a != null)
            switch (i) {
              case `children`:
                n = a;
                break;
              case `dangerouslySetInnerHTML`:
                r = a;
                break;
              default:
                X(e, i, a);
            }
        }
      return (e.push(et), nt(e, r, n), n);
    }
    function yt(e, t, n) {
      e.push(Ct(n));
      var r = (n = null),
        i;
      for (i in t)
        if (z.call(t, i)) {
          var a = t[i];
          if (a != null)
            switch (i) {
              case `children`:
                n = a;
                break;
              case `dangerouslySetInnerHTML`:
                r = a;
                break;
              default:
                X(e, i, a);
            }
        }
      return (
        e.push(et),
        nt(e, r, n),
        typeof n == `string` ? (e.push(I(V(n))), null) : n
      );
    }
    var bt = L(`
`),
      xt = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/,
      St = new Map();
    function Ct(e) {
      var t = St.get(e);
      if (t === void 0) {
        if (!xt.test(e)) throw Error(i(65, e));
        ((t = L(`<` + e)), St.set(e, t));
      }
      return t;
    }
    var wt = L(`<!DOCTYPE html>`);
    function Tt(e, t, n, r, a, o, s, c, l) {
      switch (t) {
        case `div`:
        case `span`:
        case `svg`:
        case `path`:
          break;
        case `a`:
          e.push(Ct(`a`));
          var u = null,
            d = null,
            f;
          for (f in n)
            if (z.call(n, f)) {
              var p = n[f];
              if (p != null)
                switch (f) {
                  case `children`:
                    u = p;
                    break;
                  case `dangerouslySetInnerHTML`:
                    d = p;
                    break;
                  case `href`:
                    p === `` ? qe(e, `href`, ``) : X(e, f, p);
                    break;
                  default:
                    X(e, f, p);
                }
            }
          if ((e.push(et), nt(e, d, u), typeof u == `string`)) {
            e.push(I(V(u)));
            var m = null;
          } else m = u;
          return m;
        case `g`:
        case `p`:
        case `li`:
          break;
        case `select`:
          e.push(Ct(`select`));
          var h = null,
            g = null,
            _;
          for (_ in n)
            if (z.call(n, _)) {
              var v = n[_];
              if (v != null)
                switch (_) {
                  case `children`:
                    h = v;
                    break;
                  case `dangerouslySetInnerHTML`:
                    g = v;
                    break;
                  case `defaultValue`:
                  case `value`:
                    break;
                  default:
                    X(e, _, v);
                }
            }
          return (e.push(et), nt(e, g, h), h);
        case `option`:
          var y = c.selectedValue;
          e.push(Ct(`option`));
          var b = null,
            x = null,
            S = null,
            C = null,
            ee;
          for (ee in n)
            if (z.call(n, ee)) {
              var T = n[ee];
              if (T != null)
                switch (ee) {
                  case `children`:
                    b = T;
                    break;
                  case `selected`:
                    S = T;
                    break;
                  case `dangerouslySetInnerHTML`:
                    C = T;
                    break;
                  case `value`:
                    x = T;
                  default:
                    X(e, ee, T);
                }
            }
          if (y != null) {
            var E = x === null ? rt(b) : `` + x;
            if (w(y)) {
              for (var D = 0; D < y.length; D++)
                if (`` + y[D] === E) {
                  e.push(it);
                  break;
                }
            } else `` + y === E && e.push(it);
          } else S && e.push(it);
          return (e.push(et), nt(e, C, b), b);
        case `textarea`:
          e.push(Ct(`textarea`));
          var O = null,
            k = null,
            A = null,
            j;
          for (j in n)
            if (z.call(n, j)) {
              var M = n[j];
              if (M != null)
                switch (j) {
                  case `children`:
                    A = M;
                    break;
                  case `value`:
                    O = M;
                    break;
                  case `defaultValue`:
                    k = M;
                    break;
                  case `dangerouslySetInnerHTML`:
                    throw Error(i(91));
                  default:
                    X(e, j, M);
                }
            }
          if ((O === null && k !== null && (O = k), e.push(et), A != null)) {
            if (O != null) throw Error(i(92));
            if (w(A)) {
              if (1 < A.length) throw Error(i(93));
              O = `` + A[0];
            }
            O = `` + A;
          }
          return (
            typeof O == `string` &&
              O[0] ===
                `
` &&
              e.push(bt),
            O !== null && e.push(I(V(`` + O))),
            null
          );
        case `input`:
          e.push(Ct(`input`));
          var N = null,
            P = null,
            F = null,
            te = null,
            ne = null,
            L = null,
            re = null,
            ie = null,
            ae = null,
            oe;
          for (oe in n)
            if (z.call(n, oe)) {
              var se = n[oe];
              if (se != null)
                switch (oe) {
                  case `children`:
                  case `dangerouslySetInnerHTML`:
                    throw Error(i(399, `input`));
                  case `name`:
                    N = se;
                    break;
                  case `formAction`:
                    P = se;
                    break;
                  case `formEncType`:
                    F = se;
                    break;
                  case `formMethod`:
                    te = se;
                    break;
                  case `formTarget`:
                    ne = se;
                    break;
                  case `defaultChecked`:
                    ae = se;
                    break;
                  case `defaultValue`:
                    re = se;
                    break;
                  case `checked`:
                    ie = se;
                    break;
                  case `value`:
                    L = se;
                    break;
                  default:
                    X(e, oe, se);
                }
            }
          var le = $e(e, r, a, P, F, te, ne, N);
          return (
            ie === null
              ? ae !== null && Ke(e, `checked`, ae)
              : Ke(e, `checked`, ie),
            L === null ? re !== null && X(e, `value`, re) : X(e, `value`, L),
            e.push(tt),
            le?.forEach(Xe, e),
            null
          );
        case `button`:
          e.push(Ct(`button`));
          var B = null,
            ue = null,
            de = null,
            fe = null,
            pe = null,
            he = null,
            ge = null,
            _e;
          for (_e in n)
            if (z.call(n, _e)) {
              var ve = n[_e];
              if (ve != null)
                switch (_e) {
                  case `children`:
                    B = ve;
                    break;
                  case `dangerouslySetInnerHTML`:
                    ue = ve;
                    break;
                  case `name`:
                    de = ve;
                    break;
                  case `formAction`:
                    fe = ve;
                    break;
                  case `formEncType`:
                    pe = ve;
                    break;
                  case `formMethod`:
                    he = ve;
                    break;
                  case `formTarget`:
                    ge = ve;
                    break;
                  default:
                    X(e, _e, ve);
                }
            }
          var be = $e(e, r, a, fe, pe, he, ge, de);
          if (
            (e.push(et), be?.forEach(Xe, e), nt(e, ue, B), typeof B == `string`)
          ) {
            e.push(I(V(B)));
            var xe = null;
          } else xe = B;
          return xe;
        case `form`:
          e.push(Ct(`form`));
          var H = null,
            Se = null,
            Ce = null,
            we = null,
            Te = null,
            Ee = null,
            De;
          for (De in n)
            if (z.call(n, De)) {
              var Oe = n[De];
              if (Oe != null)
                switch (De) {
                  case `children`:
                    H = Oe;
                    break;
                  case `dangerouslySetInnerHTML`:
                    Se = Oe;
                    break;
                  case `action`:
                    Ce = Oe;
                    break;
                  case `encType`:
                    we = Oe;
                    break;
                  case `method`:
                    Te = Oe;
                    break;
                  case `target`:
                    Ee = Oe;
                    break;
                  default:
                    X(e, De, Oe);
                }
            }
          var U = null,
            W = null;
          if (typeof Ce == `function`) {
            var ke = Qe(r, Ce);
            ke === null
              ? (e.push(Ue, I(`action`), We, Je, Y),
                (Ee = Te = we = Ce = null),
                ot(r, a))
              : ((Ce = ke.action || ``),
                (we = ke.encType),
                (Te = ke.method),
                (Ee = ke.target),
                (U = ke.data),
                (W = ke.name));
          }
          if (
            (Ce != null && X(e, `action`, Ce),
            we != null && X(e, `encType`, we),
            Te != null && X(e, `method`, Te),
            Ee != null && X(e, `target`, Ee),
            e.push(et),
            W !== null &&
              (e.push(Ye), qe(e, `name`, W), e.push(tt), U?.forEach(Xe, e)),
            nt(e, Se, H),
            typeof H == `string`)
          ) {
            e.push(I(V(H)));
            var Ae = null;
          } else Ae = H;
          return Ae;
        case `menuitem`:
          for (var je in (e.push(Ct(`menuitem`)), n))
            if (z.call(n, je)) {
              var Me = n[je];
              if (Me != null)
                switch (je) {
                  case `children`:
                  case `dangerouslySetInnerHTML`:
                    throw Error(i(400));
                  default:
                    X(e, je, Me);
                }
            }
          return (e.push(et), null);
        case `object`:
          e.push(Ct(`object`));
          var G = null,
            K = null,
            Ne;
          for (Ne in n)
            if (z.call(n, Ne)) {
              var q = n[Ne];
              if (q != null)
                switch (Ne) {
                  case `children`:
                    G = q;
                    break;
                  case `dangerouslySetInnerHTML`:
                    K = q;
                    break;
                  case `data`:
                    var J = me(`` + q);
                    if (J === ``) break;
                    e.push(Ue, I(`data`), We, I(V(J)), Y);
                    break;
                  default:
                    X(e, Ne, q);
                }
            }
          if ((e.push(et), nt(e, K, G), typeof G == `string`)) {
            e.push(I(V(G)));
            var Pe = null;
          } else Pe = G;
          return Pe;
        case `title`:
          var Fe = c.tagScope & 1,
            Le = c.tagScope & 4;
          if (c.insertionMode === 4 || Fe || n.itemProp != null)
            var Re = pt(e, n);
          else Le ? (Re = null) : (pt(a.hoistableChunks, n), (Re = void 0));
          return Re;
        case `link`:
          var ze = c.tagScope & 1,
            Be = c.tagScope & 4,
            Ve = n.rel,
            Ge = n.href,
            Ze = n.precedence;
          if (
            c.insertionMode === 4 ||
            ze ||
            n.itemProp != null ||
            typeof Ve != `string` ||
            typeof Ge != `string` ||
            Ge === ``
          ) {
            lt(e, n);
            var at = null;
          } else if (n.rel === `stylesheet`)
            if (
              typeof Ze != `string` ||
              n.disabled != null ||
              n.onLoad ||
              n.onError
            )
              at = lt(e, n);
            else {
              var st = a.styles.get(Ze),
                ct = r.styleResources.hasOwnProperty(Ge)
                  ? r.styleResources[Ge]
                  : void 0;
              if (ct !== null) {
                ((r.styleResources[Ge] = null),
                  st ||
                    ((st = {
                      precedence: I(V(Ze)),
                      rules: [],
                      hrefs: [],
                      sheets: new Map(),
                    }),
                    a.styles.set(Ze, st)));
                var xt = {
                  state: 0,
                  props: R({}, n, {
                    "data-precedence": n.precedence,
                    precedence: null,
                  }),
                };
                if (ct) {
                  ct.length === 2 && _r(xt.props, ct);
                  var St = a.preloads.stylesheets.get(Ge);
                  St && 0 < St.length ? (St.length = 0) : (xt.state = 1);
                }
                (st.sheets.set(Ge, xt), s && s.stylesheets.add(xt));
              } else if (st) {
                var Tt = st.sheets.get(Ge);
                Tt && s && s.stylesheets.add(Tt);
              }
              (l && e.push(Ie), (at = null));
            }
          else
            n.onLoad || n.onError
              ? (at = lt(e, n))
              : (l && e.push(Ie), (at = Be ? null : lt(a.hoistableChunks, n)));
          return at;
        case `script`:
          var Et = c.tagScope & 1,
            Ot = n.async;
          if (
            typeof n.src != `string` ||
            !n.src ||
            !Ot ||
            typeof Ot == `function` ||
            typeof Ot == `symbol` ||
            n.onLoad ||
            n.onError ||
            c.insertionMode === 4 ||
            Et ||
            n.itemProp != null
          )
            var kt = _t(e, n);
          else {
            var At = n.src;
            if (n.type === `module`)
              var jt = r.moduleScriptResources,
                Mt = a.preloads.moduleScripts;
            else ((jt = r.scriptResources), (Mt = a.preloads.scripts));
            var Nt = jt.hasOwnProperty(At) ? jt[At] : void 0;
            if (Nt !== null) {
              jt[At] = null;
              var Pt = n;
              if (Nt) {
                Nt.length === 2 && ((Pt = R({}, n)), _r(Pt, Nt));
                var Ft = Mt.get(At);
                Ft && (Ft.length = 0);
              }
              var It = [];
              (a.scripts.add(It), _t(It, Pt));
            }
            (l && e.push(Ie), (kt = null));
          }
          return kt;
        case `style`:
          var Lt = c.tagScope & 1,
            Rt = n.precedence,
            zt = n.href,
            Bt = n.nonce;
          if (
            c.insertionMode === 4 ||
            Lt ||
            n.itemProp != null ||
            typeof Rt != `string` ||
            typeof zt != `string` ||
            zt === ``
          ) {
            e.push(Ct(`style`));
            var Vt = null,
              Ht = null,
              Ut;
            for (Ut in n)
              if (z.call(n, Ut)) {
                var Wt = n[Ut];
                if (Wt != null)
                  switch (Ut) {
                    case `children`:
                      Vt = Wt;
                      break;
                    case `dangerouslySetInnerHTML`:
                      Ht = Wt;
                      break;
                    default:
                      X(e, Ut, Wt);
                  }
              }
            e.push(et);
            var Gt = Array.isArray(Vt) ? (2 > Vt.length ? Vt[0] : null) : Vt;
            (typeof Gt != `function` &&
              typeof Gt != `symbol` &&
              Gt != null &&
              e.push(I((`` + Gt).replace(ut, dt))),
              nt(e, Ht, Vt),
              e.push(Dt(`style`)));
            var Kt = null;
          } else {
            var qt = a.styles.get(Rt);
            if (
              (r.styleResources.hasOwnProperty(zt)
                ? r.styleResources[zt]
                : void 0) !== null
            ) {
              ((r.styleResources[zt] = null),
                qt ||
                  ((qt = {
                    precedence: I(V(Rt)),
                    rules: [],
                    hrefs: [],
                    sheets: new Map(),
                  }),
                  a.styles.set(Rt, qt)));
              var Jt = a.nonce.style;
              if (!Jt || Jt === Bt) {
                qt.hrefs.push(I(V(zt)));
                var Yt = qt.rules,
                  Z = null,
                  Xt = null,
                  Zt;
                for (Zt in n)
                  if (z.call(n, Zt)) {
                    var Qt = n[Zt];
                    if (Qt != null)
                      switch (Zt) {
                        case `children`:
                          Z = Qt;
                          break;
                        case `dangerouslySetInnerHTML`:
                          Xt = Qt;
                      }
                  }
                var $t = Array.isArray(Z) ? (2 > Z.length ? Z[0] : null) : Z;
                (typeof $t != `function` &&
                  typeof $t != `symbol` &&
                  $t != null &&
                  Yt.push(I((`` + $t).replace(ut, dt))),
                  nt(Yt, Xt, Z));
              }
            }
            (qt && s && s.styles.add(qt), l && e.push(Ie), (Kt = void 0));
          }
          return Kt;
        case `meta`:
          var en = c.tagScope & 1,
            Q = c.tagScope & 4;
          if (c.insertionMode === 4 || en || n.itemProp != null)
            var tn = ft(e, n, `meta`);
          else
            (l && e.push(Ie),
              (tn = Q
                ? null
                : typeof n.charSet == `string`
                  ? ft(a.charsetChunks, n, `meta`)
                  : n.name === `viewport`
                    ? ft(a.viewportChunks, n, `meta`)
                    : ft(a.hoistableChunks, n, `meta`)));
          return tn;
        case `listing`:
        case `pre`:
          e.push(Ct(t));
          var nn = null,
            rn = null,
            an;
          for (an in n)
            if (z.call(n, an)) {
              var on = n[an];
              if (on != null)
                switch (an) {
                  case `children`:
                    nn = on;
                    break;
                  case `dangerouslySetInnerHTML`:
                    rn = on;
                    break;
                  default:
                    X(e, an, on);
                }
            }
          if ((e.push(et), rn != null)) {
            if (nn != null) throw Error(i(60));
            if (typeof rn != `object` || !(`__html` in rn)) throw Error(i(61));
            var sn = rn.__html;
            sn != null &&
              (typeof sn == `string` &&
              0 < sn.length &&
              sn[0] ===
                `
`
                ? e.push(bt, I(sn))
                : e.push(I(`` + sn)));
          }
          return (
            typeof nn == `string` &&
              nn[0] ===
                `
` &&
              e.push(bt),
            nn
          );
        case `img`:
          var cn = c.tagScope & 3,
            ln = n.src,
            un = n.srcSet;
          if (
            !(
              n.loading === `lazy` ||
              (!ln && !un) ||
              (typeof ln != `string` && ln != null) ||
              (typeof un != `string` && un != null) ||
              n.fetchPriority === `low` ||
              cn
            ) &&
            (typeof ln != `string` ||
              ln[4] !== `:` ||
              (ln[0] !== `d` && ln[0] !== `D`) ||
              (ln[1] !== `a` && ln[1] !== `A`) ||
              (ln[2] !== `t` && ln[2] !== `T`) ||
              (ln[3] !== `a` && ln[3] !== `A`)) &&
            (typeof un != `string` ||
              un[4] !== `:` ||
              (un[0] !== `d` && un[0] !== `D`) ||
              (un[1] !== `a` && un[1] !== `A`) ||
              (un[2] !== `t` && un[2] !== `T`) ||
              (un[3] !== `a` && un[3] !== `A`))
          ) {
            s !== null && c.tagScope & 64 && (s.suspenseyImages = !0);
            var dn = typeof n.sizes == `string` ? n.sizes : void 0,
              fn = un
                ? un +
                  `
` +
                  (dn || ``)
                : ln,
              pn = a.preloads.images,
              mn = pn.get(fn);
            if (mn)
              (n.fetchPriority === `high` || 10 > a.highImagePreloads.size) &&
                (pn.delete(fn), a.highImagePreloads.add(mn));
            else if (!r.imageResources.hasOwnProperty(fn)) {
              r.imageResources[fn] = ye;
              var hn = n.crossOrigin,
                gn =
                  typeof hn == `string`
                    ? hn === `use-credentials`
                      ? hn
                      : ``
                    : void 0,
                _n = a.headers,
                vn;
              _n &&
              0 < _n.remainingCapacity &&
              typeof n.srcSet != `string` &&
              (n.fetchPriority === `high` ||
                500 > _n.highImagePreloads.length) &&
              ((vn = vr(ln, `image`, {
                imageSrcSet: n.srcSet,
                imageSizes: n.sizes,
                crossOrigin: gn,
                integrity: n.integrity,
                nonce: n.nonce,
                type: n.type,
                fetchPriority: n.fetchPriority,
                referrerPolicy: n.refererPolicy,
              })),
              0 <= (_n.remainingCapacity -= vn.length + 2))
                ? ((a.resets.image[fn] = ye),
                  _n.highImagePreloads && (_n.highImagePreloads += `, `),
                  (_n.highImagePreloads += vn))
                : ((mn = []),
                  lt(mn, {
                    rel: `preload`,
                    as: `image`,
                    href: un ? void 0 : ln,
                    imageSrcSet: un,
                    imageSizes: dn,
                    crossOrigin: gn,
                    integrity: n.integrity,
                    type: n.type,
                    fetchPriority: n.fetchPriority,
                    referrerPolicy: n.referrerPolicy,
                  }),
                  n.fetchPriority === `high` || 10 > a.highImagePreloads.size
                    ? a.highImagePreloads.add(mn)
                    : (a.bulkPreloads.add(mn), pn.set(fn, mn)));
            }
          }
          return ft(e, n, `img`);
        case `base`:
        case `area`:
        case `br`:
        case `col`:
        case `embed`:
        case `hr`:
        case `keygen`:
        case `param`:
        case `source`:
        case `track`:
        case `wbr`:
          return ft(e, n, t);
        case `annotation-xml`:
        case `color-profile`:
        case `font-face`:
        case `font-face-src`:
        case `font-face-uri`:
        case `font-face-format`:
        case `font-face-name`:
        case `missing-glyph`:
          break;
        case `head`:
          if (2 > c.insertionMode) {
            var yn = o || a.preamble;
            if (yn.headChunks) throw Error(i(545, "`<head>`"));
            (o !== null && e.push(mt), (yn.headChunks = []));
            var bn = vt(yn.headChunks, n, `head`);
          } else bn = yt(e, n, `head`);
          return bn;
        case `body`:
          if (2 > c.insertionMode) {
            var xn = o || a.preamble;
            if (xn.bodyChunks) throw Error(i(545, "`<body>`"));
            (o !== null && e.push(ht), (xn.bodyChunks = []));
            var Sn = vt(xn.bodyChunks, n, `body`);
          } else Sn = yt(e, n, `body`);
          return Sn;
        case `html`:
          if (c.insertionMode === 0) {
            var Cn = o || a.preamble;
            if (Cn.htmlChunks) throw Error(i(545, "`<html>`"));
            (o !== null && e.push(gt), (Cn.htmlChunks = [wt]));
            var wn = vt(Cn.htmlChunks, n, `html`);
          } else wn = yt(e, n, `html`);
          return wn;
        default:
          if (t.indexOf(`-`) !== -1) {
            e.push(Ct(t));
            var Tn = null,
              En = null,
              Dn;
            for (Dn in n)
              if (z.call(n, Dn)) {
                var On = n[Dn];
                if (On != null) {
                  var kn = Dn;
                  switch (Dn) {
                    case `children`:
                      Tn = On;
                      break;
                    case `dangerouslySetInnerHTML`:
                      En = On;
                      break;
                    case `style`:
                      He(e, On);
                      break;
                    case `suppressContentEditableWarning`:
                    case `suppressHydrationWarning`:
                    case `ref`:
                      break;
                    case `className`:
                      kn = `class`;
                    default:
                      if (
                        ce(Dn) &&
                        typeof On != `function` &&
                        typeof On != `symbol` &&
                        !1 !== On
                      ) {
                        if (!0 === On) On = ``;
                        else if (typeof On == `object`) continue;
                        e.push(Ue, I(kn), We, I(V(On)), Y);
                      }
                  }
                }
              }
            return (e.push(et), nt(e, En, Tn), Tn);
          }
      }
      return yt(e, n, t);
    }
    var Et = new Map();
    function Dt(e) {
      var t = Et.get(e);
      return (t === void 0 && ((t = L(`</` + e + `>`)), Et.set(e, t)), t);
    }
    function Ot(e, t) {
      ((e = e.preamble),
        e.htmlChunks === null && t.htmlChunks && (e.htmlChunks = t.htmlChunks),
        e.headChunks === null && t.headChunks && (e.headChunks = t.headChunks),
        e.bodyChunks === null && t.bodyChunks && (e.bodyChunks = t.bodyChunks));
    }
    function kt(e, t) {
      t = t.bootstrapChunks;
      for (var n = 0; n < t.length - 1; n++) P(e, t[n]);
      return n < t.length ? ((n = t[n]), (t.length = 0), F(e, n)) : !0;
    }
    var At = L(`requestAnimationFrame(function(){$RT=performance.now()});`),
      jt = L(`<template id="`),
      Mt = L(`"></template>`),
      Nt = L(`<!--&-->`),
      Pt = L(`<!--/&-->`),
      Ft = L(`<!--$-->`),
      It = L(`<!--$?--><template id="`),
      Lt = L(`"></template>`),
      Rt = L(`<!--$!-->`),
      zt = L(`<!--/$-->`),
      Bt = L(`<template`),
      Vt = L(`"`),
      Ht = L(` data-dgst="`);
    (L(` data-msg="`), L(` data-stck="`), L(` data-cstck="`));
    var Ut = L(`></template>`);
    function Wt(e, t, n) {
      if ((P(e, It), n === null)) throw Error(i(395));
      return (P(e, t.boundaryPrefix), P(e, I(n.toString(16))), F(e, Lt));
    }
    var Gt = L(`<div hidden id="`),
      Kt = L(`">`),
      qt = L(`</div>`),
      Jt = L(`<svg aria-hidden="true" style="display:none" id="`),
      Yt = L(`">`),
      Z = L(`</svg>`),
      Xt = L(`<math aria-hidden="true" style="display:none" id="`),
      Zt = L(`">`),
      Qt = L(`</math>`),
      $t = L(`<table hidden id="`),
      en = L(`">`),
      Q = L(`</table>`),
      tn = L(`<table hidden><tbody id="`),
      nn = L(`">`),
      rn = L(`</tbody></table>`),
      an = L(`<table hidden><tr id="`),
      on = L(`">`),
      sn = L(`</tr></table>`),
      cn = L(`<table hidden><colgroup id="`),
      ln = L(`">`),
      un = L(`</colgroup></table>`);
    function dn(e, t, n, r) {
      switch (n.insertionMode) {
        case 0:
        case 1:
        case 3:
        case 2:
          return (
            P(e, Gt),
            P(e, t.segmentPrefix),
            P(e, I(r.toString(16))),
            F(e, Kt)
          );
        case 4:
          return (
            P(e, Jt),
            P(e, t.segmentPrefix),
            P(e, I(r.toString(16))),
            F(e, Yt)
          );
        case 5:
          return (
            P(e, Xt),
            P(e, t.segmentPrefix),
            P(e, I(r.toString(16))),
            F(e, Zt)
          );
        case 6:
          return (
            P(e, $t),
            P(e, t.segmentPrefix),
            P(e, I(r.toString(16))),
            F(e, en)
          );
        case 7:
          return (
            P(e, tn),
            P(e, t.segmentPrefix),
            P(e, I(r.toString(16))),
            F(e, nn)
          );
        case 8:
          return (
            P(e, an),
            P(e, t.segmentPrefix),
            P(e, I(r.toString(16))),
            F(e, on)
          );
        case 9:
          return (
            P(e, cn),
            P(e, t.segmentPrefix),
            P(e, I(r.toString(16))),
            F(e, ln)
          );
        default:
          throw Error(i(397));
      }
    }
    function fn(e, t) {
      switch (t.insertionMode) {
        case 0:
        case 1:
        case 3:
        case 2:
          return F(e, qt);
        case 4:
          return F(e, Z);
        case 5:
          return F(e, Qt);
        case 6:
          return F(e, Q);
        case 7:
          return F(e, rn);
        case 8:
          return F(e, sn);
        case 9:
          return F(e, un);
        default:
          throw Error(i(397));
      }
    }
    var pn = L(
        `$RS=function(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS("`,
      ),
      mn = L(`$RS("`),
      hn = L(`","`),
      gn = L(`")<\/script>`);
    (L(`<template data-rsi="" data-sid="`), L(`" data-pid="`));
    var _n =
      L(`$RB=[];$RV=function(a){$RT=performance.now();for(var b=0;b<a.length;b+=2){var c=a[b],e=a[b+1];null!==e.parentNode&&e.parentNode.removeChild(e);var f=c.parentNode;if(f){var g=c.previousSibling,h=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d||"/&"===d)if(0===h)break;else h--;else"$"!==d&&"$?"!==d&&"$~"!==d&&"$!"!==d&&"&"!==d||h++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;e.firstChild;)f.insertBefore(e.firstChild,c);g.data="$";g._reactRetry&&requestAnimationFrame(g._reactRetry)}}a.length=0};
$RC=function(a,b){if(b=document.getElementById(b))(a=document.getElementById(a))?(a.previousSibling.data="$~",$RB.push(a,b),2===$RB.length&&("number"!==typeof $RT?requestAnimationFrame($RV.bind(null,$RB)):(a=performance.now(),setTimeout($RV.bind(null,$RB),2300>a&&2E3<a?2300-a:$RT+300-a)))):b.parentNode.removeChild(b)};`);
    I(`$RV=function(A,g){function k(a,b){var e=a.getAttribute(b);e&&(b=a.style,l.push(a,b.viewTransitionName,b.viewTransitionClass),"auto"!==e&&(b.viewTransitionClass=e),(a=a.getAttribute("vt-name"))||(a="_T_"+K++ +"_"),b.viewTransitionName=a,B=!0)}var B=!1,K=0,l=[];try{var f=document.__reactViewTransition;if(f){f.finished.finally($RV.bind(null,g));return}var m=new Map;for(f=1;f<g.length;f+=2)for(var h=g[f].querySelectorAll("[vt-share]"),d=0;d<h.length;d++){var c=h[d];m.set(c.getAttribute("vt-name"),c)}var u=[];for(h=0;h<g.length;h+=2){var C=g[h],x=C.parentNode;if(x){var v=x.getBoundingClientRect();if(v.left||v.top||v.width||v.height){c=C;for(f=0;c;){if(8===c.nodeType){var r=c.data;if("/$"===r)if(0===f)break;else f--;else"$"!==r&&"$?"!==r&&"$~"!==r&&"$!"!==r||f++}else if(1===c.nodeType){d=c;var D=d.getAttribute("vt-name"),y=m.get(D);k(d,y?"vt-share":"vt-exit");y&&(k(y,"vt-share"),m.set(D,null));var E=d.querySelectorAll("[vt-share]");for(d=0;d<E.length;d++){var F=E[d],G=F.getAttribute("vt-name"),
H=m.get(G);H&&(k(F,"vt-share"),k(H,"vt-share"),m.set(G,null))}}c=c.nextSibling}for(var I=g[h+1],t=I.firstElementChild;t;)null!==m.get(t.getAttribute("vt-name"))&&k(t,"vt-enter"),t=t.nextElementSibling;c=x;do for(var n=c.firstElementChild;n;){var J=n.getAttribute("vt-update");J&&"none"!==J&&!l.includes(n)&&k(n,"vt-update");n=n.nextElementSibling}while((c=c.parentNode)&&1===c.nodeType&&"none"!==c.getAttribute("vt-update"));u.push.apply(u,I.querySelectorAll('img[src]:not([loading="lazy"])'))}}}if(B){var z=
document.__reactViewTransition=document.startViewTransition({update:function(){A(g);for(var a=[document.documentElement.clientHeight,document.fonts.ready],b={},e=0;e<u.length;b={g:b.g},e++)if(b.g=u[e],!b.g.complete){var p=b.g.getBoundingClientRect();0<p.bottom&&0<p.right&&p.top<window.innerHeight&&p.left<window.innerWidth&&(p=new Promise(function(w){return function(q){w.g.addEventListener("load",q);w.g.addEventListener("error",q)}}(b)),a.push(p))}return Promise.race([Promise.all(a),new Promise(function(w){var q=
performance.now();setTimeout(w,2300>q&&2E3<q?2300-q:500)})])},types:[]});z.ready.finally(function(){for(var a=l.length-3;0<=a;a-=3){var b=l[a],e=b.style;e.viewTransitionName=l[a+1];e.viewTransitionClass=l[a+1];""===b.getAttribute("style")&&b.removeAttribute("style")}});z.finished.finally(function(){document.__reactViewTransition===z&&(document.__reactViewTransition=null)});$RB=[];return}}catch(a){}A(g)}.bind(null,$RV);`);
    var vn = L(`$RC("`),
      yn =
        L(`$RM=new Map;$RR=function(n,w,p){function u(q){this._p=null;q()}for(var r=new Map,t=document,h,b,e=t.querySelectorAll("link[data-precedence],style[data-precedence]"),v=[],k=0;b=e[k++];)"not all"===b.getAttribute("media")?v.push(b):("LINK"===b.tagName&&$RM.set(b.getAttribute("href"),b),r.set(b.dataset.precedence,h=b));e=0;b=[];var l,a;for(k=!0;;){if(k){var f=p[e++];if(!f){k=!1;e=0;continue}var c=!1,m=0;var d=f[m++];if(a=$RM.get(d)){var g=a._p;c=!0}else{a=t.createElement("link");a.href=d;a.rel=
"stylesheet";for(a.dataset.precedence=l=f[m++];g=f[m++];)a.setAttribute(g,f[m++]);g=a._p=new Promise(function(q,x){a.onload=u.bind(a,q);a.onerror=u.bind(a,x)});$RM.set(d,a)}d=a.getAttribute("media");!g||d&&!matchMedia(d).matches||b.push(g);if(c)continue}else{a=v[e++];if(!a)break;l=a.getAttribute("data-precedence");a.removeAttribute("media")}c=r.get(l)||h;c===h&&(h=a);r.set(l,a);c?c.parentNode.insertBefore(a,c.nextSibling):(c=t.head,c.insertBefore(a,c.firstChild))}if(p=document.getElementById(n))p.previousSibling.data=
"$~";Promise.all(b).then($RC.bind(null,n,w),$RX.bind(null,n,"CSS failed to load"))};$RR("`),
      bn = L(`$RR("`),
      xn = L(`","`),
      Sn = L(`",`),
      Cn = L(`"`),
      wn = L(`)<\/script>`);
    (L(`<template data-rci="" data-bid="`),
      L(`<template data-rri="" data-bid="`),
      L(`" data-sid="`),
      L(`" data-sty="`));
    var Tn = L(
        `$RX=function(b,c,d,e,f){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),f&&(a.cstck=f),b._reactRetry&&b._reactRetry())};`,
      ),
      En = L(
        `$RX=function(b,c,d,e,f){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),f&&(a.cstck=f),b._reactRetry&&b._reactRetry())};;$RX("`,
      ),
      Dn = L(`$RX("`),
      On = L(`"`),
      kn = L(`,`),
      An = L(`)<\/script>`);
    (L(`<template data-rxi="" data-bid="`),
      L(`" data-dgst="`),
      L(`" data-msg="`),
      L(`" data-stck="`),
      L(`" data-cstck="`));
    var jn = /[<\u2028\u2029]/g;
    function Mn(e) {
      return JSON.stringify(e).replace(jn, function (e) {
        switch (e) {
          case `<`:
            return `\\u003c`;
          case `\u2028`:
            return `\\u2028`;
          case `\u2029`:
            return `\\u2029`;
          default:
            throw Error(
              `escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React`,
            );
        }
      });
    }
    var Nn = /[&><\u2028\u2029]/g;
    function Pn(e) {
      return JSON.stringify(e).replace(Nn, function (e) {
        switch (e) {
          case `&`:
            return `\\u0026`;
          case `>`:
            return `\\u003e`;
          case `<`:
            return `\\u003c`;
          case `\u2028`:
            return `\\u2028`;
          case `\u2029`:
            return `\\u2029`;
          default:
            throw Error(
              `escapeJSObjectForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React`,
            );
        }
      });
    }
    var Fn = L(` media="not all" data-precedence="`),
      In = L(`" data-href="`),
      Ln = L(`">`),
      Rn = L(`</style>`),
      zn = !1,
      Bn = !0;
    function Vn(e) {
      var t = e.rules,
        n = e.hrefs,
        r = 0;
      if (n.length) {
        for (
          P(this, be.startInlineStyle),
            P(this, Fn),
            P(this, e.precedence),
            P(this, In);
          r < n.length - 1;
          r++
        )
          (P(this, n[r]), P(this, Yn));
        for (P(this, n[r]), P(this, Ln), r = 0; r < t.length; r++)
          P(this, t[r]);
        ((Bn = F(this, Rn)), (zn = !0), (t.length = 0), (n.length = 0));
      }
    }
    function Hn(e) {
      return e.state === 2 ? !1 : (zn = !0);
    }
    function Un(e, t, n) {
      return (
        (zn = !1),
        (Bn = !0),
        (be = n),
        t.styles.forEach(Vn, e),
        (be = null),
        t.stylesheets.forEach(Hn),
        zn && (n.stylesToHoist = !0),
        Bn
      );
    }
    function Wn(e) {
      for (var t = 0; t < e.length; t++) P(this, e[t]);
      e.length = 0;
    }
    var Gn = [];
    function Kn(e) {
      lt(Gn, e.props);
      for (var t = 0; t < Gn.length; t++) P(this, Gn[t]);
      ((Gn.length = 0), (e.state = 2));
    }
    var qn = L(` data-precedence="`),
      Jn = L(`" data-href="`),
      Yn = L(` `),
      Xn = L(`">`),
      Zn = L(`</style>`);
    function Qn(e) {
      var t = 0 < e.sheets.size;
      (e.sheets.forEach(Kn, this), e.sheets.clear());
      var n = e.rules,
        r = e.hrefs;
      if (!t || r.length) {
        if (
          (P(this, be.startInlineStyle),
          P(this, qn),
          P(this, e.precedence),
          (e = 0),
          r.length)
        ) {
          for (P(this, Jn); e < r.length - 1; e++) (P(this, r[e]), P(this, Yn));
          P(this, r[e]);
        }
        for (P(this, Xn), e = 0; e < n.length; e++) P(this, n[e]);
        (P(this, Zn), (n.length = 0), (r.length = 0));
      }
    }
    function $n(e) {
      if (e.state === 0) {
        e.state = 1;
        var t = e.props;
        for (
          lt(Gn, {
            rel: `preload`,
            as: `style`,
            href: e.props.href,
            crossOrigin: t.crossOrigin,
            fetchPriority: t.fetchPriority,
            integrity: t.integrity,
            media: t.media,
            hrefLang: t.hrefLang,
            referrerPolicy: t.referrerPolicy,
          }),
            e = 0;
          e < Gn.length;
          e++
        )
          P(this, Gn[e]);
        Gn.length = 0;
      }
    }
    function er(e) {
      (e.sheets.forEach($n, this), e.sheets.clear());
    }
    (L(`<link rel="expect" href="#`), L(`" blocking="render"/>`));
    var tr = L(` id="`);
    function nr(e, t) {
      !(t.instructions & 32) &&
        ((t.instructions |= 32), e.push(tr, I(V(`_` + t.idPrefix + `R_`)), Y));
    }
    var rr = L(`[`),
      ir = L(`,[`),
      ar = L(`,`),
      or = L(`]`);
    function sr(e, t) {
      P(e, rr);
      var n = rr;
      (t.stylesheets.forEach(function (t) {
        if (t.state !== 2)
          if (t.state === 3)
            (P(e, n), P(e, I(Pn(`` + t.props.href))), P(e, or), (n = ir));
          else {
            P(e, n);
            var r = t.props[`data-precedence`],
              a = t.props;
            for (var o in (P(e, I(Pn(me(`` + t.props.href)))),
            (r = `` + r),
            P(e, ar),
            P(e, I(Pn(r))),
            a))
              if (z.call(a, o) && ((r = a[o]), r != null))
                switch (o) {
                  case `href`:
                  case `rel`:
                  case `precedence`:
                  case `data-precedence`:
                    break;
                  case `children`:
                  case `dangerouslySetInnerHTML`:
                    throw Error(i(399, `link`));
                  default:
                    cr(e, o, r);
                }
            (P(e, or), (n = ir), (t.state = 3));
          }
      }),
        P(e, or));
    }
    function cr(e, t, n) {
      var r = t.toLowerCase();
      switch (typeof n) {
        case `function`:
        case `symbol`:
          return;
      }
      switch (t) {
        case `innerHTML`:
        case `dangerouslySetInnerHTML`:
        case `suppressContentEditableWarning`:
        case `suppressHydrationWarning`:
        case `style`:
        case `ref`:
          return;
        case `className`:
          ((r = `class`), (t = `` + n));
          break;
        case `hidden`:
          if (!1 === n) return;
          t = ``;
          break;
        case `src`:
        case `href`:
          ((n = me(n)), (t = `` + n));
          break;
        default:
          if (
            (2 < t.length &&
              (t[0] === `o` || t[0] === `O`) &&
              (t[1] === `n` || t[1] === `N`)) ||
            !ce(t)
          )
            return;
          t = `` + n;
      }
      (P(e, ar), P(e, I(Pn(r))), P(e, ar), P(e, I(Pn(t))));
    }
    function lr() {
      return { styles: new Set(), stylesheets: new Set(), suspenseyImages: !1 };
    }
    function ur(e) {
      var t = Ui || null;
      if (t) {
        var n = t.resumableState,
          r = t.renderState;
        if (typeof e == `string` && e) {
          if (!n.dnsResources.hasOwnProperty(e)) {
            ((n.dnsResources[e] = null), (n = r.headers));
            var i, a;
            ((a = n && 0 < n.remainingCapacity) &&
              (a =
                ((i = `<` + (`` + e).replace(yr, br) + `>; rel=dns-prefetch`),
                0 <= (n.remainingCapacity -= i.length + 2))),
              a
                ? ((r.resets.dns[e] = null),
                  n.preconnects && (n.preconnects += `, `),
                  (n.preconnects += i))
                : ((i = []),
                  lt(i, { href: e, rel: `dns-prefetch` }),
                  r.preconnects.add(i)));
          }
          Ba(t);
        }
      } else ve.D(e);
    }
    function dr(e, t) {
      var n = Ui || null;
      if (n) {
        var r = n.resumableState,
          i = n.renderState;
        if (typeof e == `string` && e) {
          var a =
            t === `use-credentials`
              ? `credentials`
              : typeof t == `string`
                ? `anonymous`
                : `default`;
          if (!r.connectResources[a].hasOwnProperty(e)) {
            ((r.connectResources[a][e] = null), (r = i.headers));
            var o, s;
            if ((s = r && 0 < r.remainingCapacity)) {
              if (
                ((s = `<` + (`` + e).replace(yr, br) + `>; rel=preconnect`),
                typeof t == `string`)
              ) {
                var c = (`` + t).replace(xr, Sr);
                s += `; crossorigin="` + c + `"`;
              }
              s = ((o = s), 0 <= (r.remainingCapacity -= o.length + 2));
            }
            s
              ? ((i.resets.connect[a][e] = null),
                r.preconnects && (r.preconnects += `, `),
                (r.preconnects += o))
              : ((a = []),
                lt(a, { rel: `preconnect`, href: e, crossOrigin: t }),
                i.preconnects.add(a));
          }
          Ba(n);
        }
      } else ve.C(e, t);
    }
    function fr(e, t, n) {
      var r = Ui || null;
      if (r) {
        var i = r.resumableState,
          a = r.renderState;
        if (t && e) {
          switch (t) {
            case `image`:
              if (n)
                var o = n.imageSrcSet,
                  s = n.imageSizes,
                  c = n.fetchPriority;
              var l = o
                ? o +
                  `
` +
                  (s || ``)
                : e;
              if (i.imageResources.hasOwnProperty(l)) return;
              ((i.imageResources[l] = ye), (i = a.headers));
              var u;
              i &&
              0 < i.remainingCapacity &&
              typeof o != `string` &&
              c === `high` &&
              ((u = vr(e, t, n)), 0 <= (i.remainingCapacity -= u.length + 2))
                ? ((a.resets.image[l] = ye),
                  i.highImagePreloads && (i.highImagePreloads += `, `),
                  (i.highImagePreloads += u))
                : ((i = []),
                  lt(i, R({ rel: `preload`, href: o ? void 0 : e, as: t }, n)),
                  c === `high`
                    ? a.highImagePreloads.add(i)
                    : (a.bulkPreloads.add(i), a.preloads.images.set(l, i)));
              break;
            case `style`:
              if (i.styleResources.hasOwnProperty(e)) return;
              ((o = []),
                lt(o, R({ rel: `preload`, href: e, as: t }, n)),
                (i.styleResources[e] =
                  !n ||
                  (typeof n.crossOrigin != `string` &&
                    typeof n.integrity != `string`)
                    ? ye
                    : [n.crossOrigin, n.integrity]),
                a.preloads.stylesheets.set(e, o),
                a.bulkPreloads.add(o));
              break;
            case `script`:
              if (i.scriptResources.hasOwnProperty(e)) return;
              ((o = []),
                a.preloads.scripts.set(e, o),
                a.bulkPreloads.add(o),
                lt(o, R({ rel: `preload`, href: e, as: t }, n)),
                (i.scriptResources[e] =
                  !n ||
                  (typeof n.crossOrigin != `string` &&
                    typeof n.integrity != `string`)
                    ? ye
                    : [n.crossOrigin, n.integrity]));
              break;
            default:
              if (i.unknownResources.hasOwnProperty(t)) {
                if (((o = i.unknownResources[t]), o.hasOwnProperty(e))) return;
              } else ((o = {}), (i.unknownResources[t] = o));
              if (
                ((o[e] = ye),
                (i = a.headers) &&
                  0 < i.remainingCapacity &&
                  t === `font` &&
                  ((l = vr(e, t, n)),
                  0 <= (i.remainingCapacity -= l.length + 2)))
              )
                ((a.resets.font[e] = ye),
                  i.fontPreloads && (i.fontPreloads += `, `),
                  (i.fontPreloads += l));
              else
                switch (
                  ((i = []),
                  (e = R({ rel: `preload`, href: e, as: t }, n)),
                  lt(i, e),
                  t)
                ) {
                  case `font`:
                    a.fontPreloads.add(i);
                    break;
                  default:
                    a.bulkPreloads.add(i);
                }
          }
          Ba(r);
        }
      } else ve.L(e, t, n);
    }
    function pr(e, t) {
      var n = Ui || null;
      if (n) {
        var r = n.resumableState,
          i = n.renderState;
        if (e) {
          var a = t && typeof t.as == `string` ? t.as : `script`;
          switch (a) {
            case `script`:
              if (r.moduleScriptResources.hasOwnProperty(e)) return;
              ((a = []),
                (r.moduleScriptResources[e] =
                  !t ||
                  (typeof t.crossOrigin != `string` &&
                    typeof t.integrity != `string`)
                    ? ye
                    : [t.crossOrigin, t.integrity]),
                i.preloads.moduleScripts.set(e, a));
              break;
            default:
              if (r.moduleUnknownResources.hasOwnProperty(a)) {
                var o = r.unknownResources[a];
                if (o.hasOwnProperty(e)) return;
              } else ((o = {}), (r.moduleUnknownResources[a] = o));
              ((a = []), (o[e] = ye));
          }
          (lt(a, R({ rel: `modulepreload`, href: e }, t)),
            i.bulkPreloads.add(a),
            Ba(n));
        }
      } else ve.m(e, t);
    }
    function mr(e, t, n) {
      var r = Ui || null;
      if (r) {
        var i = r.resumableState,
          a = r.renderState;
        if (e) {
          t ||= `default`;
          var o = a.styles.get(t),
            s = i.styleResources.hasOwnProperty(e)
              ? i.styleResources[e]
              : void 0;
          s !== null &&
            ((i.styleResources[e] = null),
            o ||
              ((o = {
                precedence: I(V(t)),
                rules: [],
                hrefs: [],
                sheets: new Map(),
              }),
              a.styles.set(t, o)),
            (t = {
              state: 0,
              props: R({ rel: `stylesheet`, href: e, "data-precedence": t }, n),
            }),
            s &&
              (s.length === 2 && _r(t.props, s),
              (a = a.preloads.stylesheets.get(e)) && 0 < a.length
                ? (a.length = 0)
                : (t.state = 1)),
            o.sheets.set(e, t),
            Ba(r));
        }
      } else ve.S(e, t, n);
    }
    function hr(e, t) {
      var n = Ui || null;
      if (n) {
        var r = n.resumableState,
          i = n.renderState;
        if (e) {
          var a = r.scriptResources.hasOwnProperty(e)
            ? r.scriptResources[e]
            : void 0;
          a !== null &&
            ((r.scriptResources[e] = null),
            (t = R({ src: e, async: !0 }, t)),
            a &&
              (a.length === 2 && _r(t, a), (e = i.preloads.scripts.get(e))) &&
              (e.length = 0),
            (e = []),
            i.scripts.add(e),
            _t(e, t),
            Ba(n));
        }
      } else ve.X(e, t);
    }
    function gr(e, t) {
      var n = Ui || null;
      if (n) {
        var r = n.resumableState,
          i = n.renderState;
        if (e) {
          var a = r.moduleScriptResources.hasOwnProperty(e)
            ? r.moduleScriptResources[e]
            : void 0;
          a !== null &&
            ((r.moduleScriptResources[e] = null),
            (t = R({ src: e, type: `module`, async: !0 }, t)),
            a &&
              (a.length === 2 && _r(t, a),
              (e = i.preloads.moduleScripts.get(e))) &&
              (e.length = 0),
            (e = []),
            i.scripts.add(e),
            _t(e, t),
            Ba(n));
        }
      } else ve.M(e, t);
    }
    function _r(e, t) {
      ((e.crossOrigin ??= t[0]), (e.integrity ??= t[1]));
    }
    function vr(e, t, n) {
      for (var r in ((e = (`` + e).replace(yr, br)),
      (t = (`` + t).replace(xr, Sr)),
      (t = `<` + e + `>; rel=preload; as="` + t + `"`),
      n))
        z.call(n, r) &&
          ((e = n[r]),
          typeof e == `string` &&
            (t +=
              `; ` + r.toLowerCase() + `="` + (`` + e).replace(xr, Sr) + `"`));
      return t;
    }
    var yr = /[<>\r\n]/g;
    function br(e) {
      switch (e) {
        case `<`:
          return `%3C`;
        case `>`:
          return `%3E`;
        case `
`:
          return `%0A`;
        case `\r`:
          return `%0D`;
        default:
          throw Error(
            `escapeLinkHrefForHeaderContextReplacer encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React`,
          );
      }
    }
    var xr = /["';,\r\n]/g;
    function Sr(e) {
      switch (e) {
        case `"`:
          return `%22`;
        case `'`:
          return `%27`;
        case `;`:
          return `%3B`;
        case `,`:
          return `%2C`;
        case `
`:
          return `%0A`;
        case `\r`:
          return `%0D`;
        default:
          throw Error(
            `escapeStringForLinkHeaderQuotedParamValueContextReplacer encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React`,
          );
      }
    }
    function Cr(e) {
      this.styles.add(e);
    }
    function wr(e) {
      this.stylesheets.add(e);
    }
    function Tr(e, t) {
      (t.styles.forEach(Cr, e),
        t.stylesheets.forEach(wr, e),
        t.suspenseyImages && (e.suspenseyImages = !0));
    }
    function Er(e) {
      return 0 < e.stylesheets.size || e.suspenseyImages;
    }
    var Dr = Function.prototype.bind,
      Or = Symbol.for(`react.client.reference`);
    function kr(e) {
      if (e == null) return null;
      if (typeof e == `function`)
        return e.$$typeof === Or ? null : e.displayName || e.name || null;
      if (typeof e == `string`) return e;
      switch (e) {
        case s:
          return `Fragment`;
        case l:
          return `Profiler`;
        case c:
          return `StrictMode`;
        case m:
          return `Suspense`;
        case h:
          return `SuspenseList`;
        case y:
          return `Activity`;
      }
      if (typeof e == `object`)
        switch (e.$$typeof) {
          case o:
            return `Portal`;
          case d:
            return e.displayName || `Context`;
          case u:
            return (e._context.displayName || `Context`) + `.Consumer`;
          case p:
            var t = e.render;
            return (
              (e = e.displayName),
              (e ||=
                ((e = t.displayName || t.name || ``),
                e === `` ? `ForwardRef` : `ForwardRef(` + e + `)`)),
              e
            );
          case g:
            return (
              (t = e.displayName || null),
              t === null ? kr(e.type) || `Memo` : t
            );
          case _:
            ((t = e._payload), (e = e._init));
            try {
              return kr(e(t));
            } catch {}
        }
      return null;
    }
    var Ar = {},
      jr = null;
    function Mr(e, t) {
      if (e !== t) {
        ((e.context._currentValue = e.parentValue), (e = e.parent));
        var n = t.parent;
        if (e === null) {
          if (n !== null) throw Error(i(401));
        } else {
          if (n === null) throw Error(i(401));
          Mr(e, n);
        }
        t.context._currentValue = t.value;
      }
    }
    function Nr(e) {
      ((e.context._currentValue = e.parentValue),
        (e = e.parent),
        e !== null && Nr(e));
    }
    function Pr(e) {
      var t = e.parent;
      (t !== null && Pr(t), (e.context._currentValue = e.value));
    }
    function Fr(e, t) {
      if (
        ((e.context._currentValue = e.parentValue), (e = e.parent), e === null)
      )
        throw Error(i(402));
      e.depth === t.depth ? Mr(e, t) : Fr(e, t);
    }
    function Ir(e, t) {
      var n = t.parent;
      if (n === null) throw Error(i(402));
      (e.depth === n.depth ? Mr(e, n) : Ir(e, n),
        (t.context._currentValue = t.value));
    }
    function Lr(e) {
      var t = jr;
      t !== e &&
        (t === null
          ? Pr(e)
          : e === null
            ? Nr(t)
            : t.depth === e.depth
              ? Mr(t, e)
              : t.depth > e.depth
                ? Fr(t, e)
                : Ir(t, e),
        (jr = e));
    }
    var Rr = {
        enqueueSetState: function (e, t) {
          ((e = e._reactInternals), e.queue !== null && e.queue.push(t));
        },
        enqueueReplaceState: function (e, t) {
          ((e = e._reactInternals), (e.replace = !0), (e.queue = [t]));
        },
        enqueueForceUpdate: function () {},
      },
      zr = { id: 1, overflow: `` };
    function Br(e, t, n) {
      var r = e.id;
      e = e.overflow;
      var i = 32 - Vr(r) - 1;
      ((r &= ~(1 << i)), (n += 1));
      var a = 32 - Vr(t) + i;
      if (30 < a) {
        var o = i - (i % 5);
        return (
          (a = (r & ((1 << o) - 1)).toString(32)),
          (r >>= o),
          (i -= o),
          { id: (1 << (32 - Vr(t) + i)) | (n << i) | r, overflow: a + e }
        );
      }
      return { id: (1 << a) | (n << i) | r, overflow: e };
    }
    var Vr = Math.clz32 ? Math.clz32 : Wr,
      Hr = Math.log,
      Ur = Math.LN2;
    function Wr(e) {
      return ((e >>>= 0), e === 0 ? 32 : (31 - ((Hr(e) / Ur) | 0)) | 0);
    }
    function Gr() {}
    var Kr = Error(i(460));
    function qr(e, t, n) {
      switch (
        ((n = e[n]),
        n === void 0 ? e.push(t) : n !== t && (t.then(Gr, Gr), (t = n)),
        t.status)
      ) {
        case `fulfilled`:
          return t.value;
        case `rejected`:
          throw t.reason;
        default:
          switch (
            (typeof t.status == `string`
              ? t.then(Gr, Gr)
              : ((e = t),
                (e.status = `pending`),
                e.then(
                  function (e) {
                    if (t.status === `pending`) {
                      var n = t;
                      ((n.status = `fulfilled`), (n.value = e));
                    }
                  },
                  function (e) {
                    if (t.status === `pending`) {
                      var n = t;
                      ((n.status = `rejected`), (n.reason = e));
                    }
                  },
                )),
            t.status)
          ) {
            case `fulfilled`:
              return t.value;
            case `rejected`:
              throw t.reason;
          }
          throw ((Jr = t), Kr);
      }
    }
    var Jr = null;
    function Yr() {
      if (Jr === null) throw Error(i(459));
      var e = Jr;
      return ((Jr = null), e);
    }
    function Xr(e, t) {
      return (e === t && (e !== 0 || 1 / e == 1 / t)) || (e !== e && t !== t);
    }
    var Zr = typeof Object.is == `function` ? Object.is : Xr,
      Qr = null,
      $r = null,
      ei = null,
      ti = null,
      ni = null,
      $ = null,
      ri = !1,
      ii = !1,
      ai = 0,
      oi = 0,
      si = -1,
      ci = 0,
      li = null,
      ui = null,
      di = 0;
    function fi() {
      if (Qr === null) throw Error(i(321));
      return Qr;
    }
    function pi() {
      if (0 < di) throw Error(i(312));
      return { memoizedState: null, queue: null, next: null };
    }
    function mi() {
      return (
        $ === null
          ? ni === null
            ? ((ri = !1), (ni = $ = pi()))
            : ((ri = !0), ($ = ni))
          : $.next === null
            ? ((ri = !1), ($ = $.next = pi()))
            : ((ri = !0), ($ = $.next)),
        $
      );
    }
    function hi() {
      var e = li;
      return ((li = null), e);
    }
    function gi() {
      ((ti = ei = $r = Qr = null),
        (ii = !1),
        (ni = null),
        (di = 0),
        ($ = ui = null));
    }
    function _i(e, t) {
      return typeof t == `function` ? t(e) : t;
    }
    function vi(e, t, n) {
      if (((Qr = fi()), ($ = mi()), ri)) {
        var r = $.queue;
        if (
          ((t = r.dispatch), ui !== null && ((n = ui.get(r)), n !== void 0))
        ) {
          (ui.delete(r), (r = $.memoizedState));
          do ((r = e(r, n.action)), (n = n.next));
          while (n !== null);
          return (($.memoizedState = r), [r, t]);
        }
        return [$.memoizedState, t];
      }
      return (
        (e =
          e === _i
            ? typeof t == `function`
              ? t()
              : t
            : n === void 0
              ? t
              : n(t)),
        ($.memoizedState = e),
        (e = $.queue = { last: null, dispatch: null }),
        (e = e.dispatch = bi.bind(null, Qr, e)),
        [$.memoizedState, e]
      );
    }
    function yi(e, t) {
      if (
        ((Qr = fi()), ($ = mi()), (t = t === void 0 ? null : t), $ !== null)
      ) {
        var n = $.memoizedState;
        if (n !== null && t !== null) {
          var r = n[1];
          a: if (r === null) r = !1;
          else {
            for (var i = 0; i < r.length && i < t.length; i++)
              if (!Zr(t[i], r[i])) {
                r = !1;
                break a;
              }
            r = !0;
          }
          if (r) return n[0];
        }
      }
      return ((e = e()), ($.memoizedState = [e, t]), e);
    }
    function bi(e, t, n) {
      if (25 <= di) throw Error(i(301));
      if (e === Qr)
        if (
          ((ii = !0),
          (e = { action: n, next: null }),
          ui === null && (ui = new Map()),
          (n = ui.get(t)),
          n === void 0)
        )
          ui.set(t, e);
        else {
          for (t = n; t.next !== null; ) t = t.next;
          t.next = e;
        }
    }
    function xi() {
      throw Error(i(440));
    }
    function Si() {
      throw Error(i(394));
    }
    function Ci() {
      throw Error(i(479));
    }
    function wi(e, t, n) {
      fi();
      var r = oi++,
        i = ei;
      if (typeof e.$$FORM_ACTION == `function`) {
        var a = null,
          o = ti;
        i = i.formState;
        var s = e.$$IS_SIGNATURE_EQUAL;
        if (i !== null && typeof s == `function`) {
          var c = i[1];
          s.call(e, i[2], i[3]) &&
            ((a =
              n === void 0
                ? `k` + T(JSON.stringify([o, null, r]), 0)
                : `p` + n),
            c === a && ((si = r), (t = i[0])));
        }
        var l = e.bind(null, t);
        return (
          (e = function (e) {
            l(e);
          }),
          typeof l.$$FORM_ACTION == `function` &&
            (e.$$FORM_ACTION = function (e) {
              ((e = l.$$FORM_ACTION(e)),
                n !== void 0 && ((n += ``), (e.action = n)));
              var t = e.data;
              return (
                t &&
                  (a === null &&
                    (a =
                      n === void 0
                        ? `k` + T(JSON.stringify([o, null, r]), 0)
                        : `p` + n),
                  t.append(`$ACTION_KEY`, a)),
                e
              );
            }),
          [t, e, !1]
        );
      }
      var u = e.bind(null, t);
      return [
        t,
        function (e) {
          u(e);
        },
        !1,
      ];
    }
    function Ti(e) {
      var t = ci;
      return ((ci += 1), li === null && (li = []), qr(li, e, t));
    }
    function Ei() {
      throw Error(i(393));
    }
    var Di = {
        readContext: function (e) {
          return e._currentValue;
        },
        use: function (e) {
          if (typeof e == `object` && e) {
            if (typeof e.then == `function`) return Ti(e);
            if (e.$$typeof === d) return e._currentValue;
          }
          throw Error(i(438, String(e)));
        },
        useContext: function (e) {
          return (fi(), e._currentValue);
        },
        useMemo: yi,
        useReducer: vi,
        useRef: function (e) {
          ((Qr = fi()), ($ = mi()));
          var t = $.memoizedState;
          return t === null ? ((e = { current: e }), ($.memoizedState = e)) : t;
        },
        useState: function (e) {
          return vi(_i, e);
        },
        useInsertionEffect: Gr,
        useLayoutEffect: Gr,
        useCallback: function (e, t) {
          return yi(function () {
            return e;
          }, t);
        },
        useImperativeHandle: Gr,
        useEffect: Gr,
        useDebugValue: Gr,
        useDeferredValue: function (e, t) {
          return (fi(), t === void 0 ? e : t);
        },
        useTransition: function () {
          return (fi(), [!1, Si]);
        },
        useId: function () {
          var e = $r.treeContext,
            t = e.overflow;
          ((e = e.id), (e = (e & ~(1 << (32 - Vr(e) - 1))).toString(32) + t));
          var n = Oi;
          if (n === null) throw Error(i(404));
          return (
            (t = ai++),
            (e = `_` + n.idPrefix + `R_` + e),
            0 < t && (e += `H` + t.toString(32)),
            e + `_`
          );
        },
        useSyncExternalStore: function (e, t, n) {
          if (n === void 0) throw Error(i(407));
          return n();
        },
        useOptimistic: function (e) {
          return (fi(), [e, Ci]);
        },
        useActionState: wi,
        useFormState: wi,
        useHostTransitionStatus: function () {
          return (fi(), _e);
        },
        useMemoCache: function (e) {
          for (var t = Array(e), n = 0; n < e; n++) t[n] = x;
          return t;
        },
        useCacheRefresh: function () {
          return Ei;
        },
        useEffectEvent: function () {
          return xi;
        },
      },
      Oi = null,
      ki = {
        getCacheForType: function () {
          throw Error(i(248));
        },
        cacheSignal: function () {
          throw Error(i(248));
        },
      },
      Ai,
      ji;
    function Mi(e) {
      if (Ai === void 0)
        try {
          throw Error();
        } catch (e) {
          var t = e.stack.trim().match(/\n( *(at )?)/);
          ((Ai = (t && t[1]) || ``),
            (ji =
              -1 <
              e.stack.indexOf(`
    at`)
                ? ` (<anonymous>)`
                : -1 < e.stack.indexOf(`@`)
                  ? `@unknown:0:0`
                  : ``));
        }
      return (
        `
` +
        Ai +
        e +
        ji
      );
    }
    var Ni = !1;
    function Pi(e, t) {
      if (!e || Ni) return ``;
      Ni = !0;
      var n = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      try {
        var r = {
          DetermineComponentFrameRoot: function () {
            try {
              if (t) {
                var n = function () {
                  throw Error();
                };
                if (
                  (Object.defineProperty(n.prototype, `props`, {
                    set: function () {
                      throw Error();
                    },
                  }),
                  typeof Reflect == `object` && Reflect.construct)
                ) {
                  try {
                    Reflect.construct(n, []);
                  } catch (e) {
                    var r = e;
                  }
                  Reflect.construct(e, [], n);
                } else {
                  try {
                    n.call();
                  } catch (e) {
                    r = e;
                  }
                  e.call(n.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (e) {
                  r = e;
                }
                (n = e()) &&
                  typeof n.catch == `function` &&
                  n.catch(function () {});
              }
            } catch (e) {
              if (e && r && typeof e.stack == `string`)
                return [e.stack, r.stack];
            }
            return [null, null];
          },
        };
        r.DetermineComponentFrameRoot.displayName = `DetermineComponentFrameRoot`;
        var i = Object.getOwnPropertyDescriptor(
          r.DetermineComponentFrameRoot,
          `name`,
        );
        i &&
          i.configurable &&
          Object.defineProperty(r.DetermineComponentFrameRoot, `name`, {
            value: `DetermineComponentFrameRoot`,
          });
        var a = r.DetermineComponentFrameRoot(),
          o = a[0],
          s = a[1];
        if (o && s) {
          var c = o.split(`
`),
            l = s.split(`
`);
          for (
            i = r = 0;
            r < c.length && !c[r].includes(`DetermineComponentFrameRoot`);
          )
            r++;
          for (
            ;
            i < l.length && !l[i].includes(`DetermineComponentFrameRoot`);
          )
            i++;
          if (r === c.length || i === l.length)
            for (
              r = c.length - 1, i = l.length - 1;
              1 <= r && 0 <= i && c[r] !== l[i];
            )
              i--;
          for (; 1 <= r && 0 <= i; r--, i--)
            if (c[r] !== l[i]) {
              if (r !== 1 || i !== 1)
                do
                  if ((r--, i--, 0 > i || c[r] !== l[i])) {
                    var u =
                      `
` + c[r].replace(` at new `, ` at `);
                    return (
                      e.displayName &&
                        u.includes(`<anonymous>`) &&
                        (u = u.replace(`<anonymous>`, e.displayName)),
                      u
                    );
                  }
                while (1 <= r && 0 <= i);
              break;
            }
        }
      } finally {
        ((Ni = !1), (Error.prepareStackTrace = n));
      }
      return (n = e ? e.displayName || e.name : ``) ? Mi(n) : ``;
    }
    function Fi(e) {
      if (typeof e == `string`) return Mi(e);
      if (typeof e == `function`)
        return e.prototype && e.prototype.isReactComponent
          ? Pi(e, !0)
          : Pi(e, !1);
      if (typeof e == `object` && e) {
        switch (e.$$typeof) {
          case p:
            return Pi(e.render, !1);
          case g:
            return Pi(e.type, !1);
          case _:
            var t = e,
              n = t._payload;
            t = t._init;
            try {
              e = t(n);
            } catch {
              return Mi(`Lazy`);
            }
            return Fi(e);
        }
        if (typeof e.name == `string`) {
          a: {
            ((n = e.name), (t = e.env));
            var r = e.debugLocation;
            if (
              r != null &&
              ((e = Error.prepareStackTrace),
              (Error.prepareStackTrace = void 0),
              (r = r.stack),
              (Error.prepareStackTrace = e),
              r.startsWith(`Error: react-stack-top-frame
`) && (r = r.slice(29)),
              (e = r.indexOf(`
`)),
              e !== -1 && (r = r.slice(e + 1)),
              (e = r.indexOf(`react_stack_bottom_frame`)),
              e !== -1 &&
                (e = r.lastIndexOf(
                  `
`,
                  e,
                )),
              (e = e === -1 ? `` : (r = r.slice(0, e))),
              (r = e.lastIndexOf(`
`)),
              (e = r === -1 ? e : e.slice(r + 1)),
              e.indexOf(n) !== -1)
            ) {
              n =
                `
` + e;
              break a;
            }
            n = Mi(n + (t ? ` [` + t + `]` : ``));
          }
          return n;
        }
      }
      switch (e) {
        case h:
          return Mi(`SuspenseList`);
        case m:
          return Mi(`Suspense`);
      }
      return ``;
    }
    function Ii(e, t) {
      return (
        (500 < t.byteSize || Er(t.contentState)) && t.contentPreamble === null
      );
    }
    function Li(e) {
      if (typeof e == `object` && e && typeof e.environmentName == `string`) {
        var t = e.environmentName;
        ((e = [e].slice(0)),
          typeof e[0] == `string`
            ? e.splice(
                0,
                1,
                `%c%s%c ` + e[0],
                `background: #e6e6e6;background: light-dark(rgba(0,0,0,0.1), rgba(255,255,255,0.25));color: #000000;color: light-dark(#000000, #ffffff);border-radius: 2px`,
                ` ` + t + ` `,
                ``,
              )
            : e.splice(
                0,
                0,
                `%c%s%c`,
                `background: #e6e6e6;background: light-dark(rgba(0,0,0,0.1), rgba(255,255,255,0.25));color: #000000;color: light-dark(#000000, #ffffff);border-radius: 2px`,
                ` ` + t + ` `,
                ``,
              ),
          e.unshift(console),
          (t = Dr.apply(console.error, e)),
          t());
      } else console.error(e);
      return null;
    }
    function Ri(e, t, n, r, i, a, o, s, c, l, u) {
      var d = new Set();
      ((this.destination = null),
        (this.flushScheduled = !1),
        (this.resumableState = e),
        (this.renderState = t),
        (this.rootFormatContext = n),
        (this.progressiveChunkSize = r === void 0 ? 12800 : r),
        (this.status = 10),
        (this.fatalError = null),
        (this.pendingRootTasks = this.allPendingTasks = this.nextSegmentId = 0),
        (this.completedPreambleSegments = this.completedRootSegment = null),
        (this.byteSize = 0),
        (this.abortableTasks = d),
        (this.pingedTasks = []),
        (this.clientRenderedBoundaries = []),
        (this.completedBoundaries = []),
        (this.partialBoundaries = []),
        (this.trackedPostpones = null),
        (this.onError = i === void 0 ? Li : i),
        (this.onPostpone = l === void 0 ? Gr : l),
        (this.onAllReady = a === void 0 ? Gr : a),
        (this.onShellReady = o === void 0 ? Gr : o),
        (this.onShellError = s === void 0 ? Gr : s),
        (this.onFatalError = c === void 0 ? Gr : c),
        (this.formState = u === void 0 ? null : u));
    }
    function zi(e, t, n, r, i, a, o, s, c, l, u, d) {
      return (
        (t = new Ri(t, n, r, i, a, o, s, c, l, u, d)),
        (n = Ji(t, 0, null, r, !1, !1)),
        (n.parentFlushed = !0),
        (e = Ki(
          t,
          null,
          e,
          -1,
          null,
          n,
          null,
          null,
          t.abortableTasks,
          null,
          r,
          null,
          zr,
          null,
          null,
        )),
        Yi(e),
        t.pingedTasks.push(e),
        t
      );
    }
    function Bi(e, t, n, r, i, a, o, s, c, l, u) {
      return (
        (e = zi(e, t, n, r, i, a, o, s, c, l, u, void 0)),
        (e.trackedPostpones = {
          workingMap: new Map(),
          rootNodes: [],
          rootSlots: null,
        }),
        e
      );
    }
    function Vi(e, t, n, r, i, a, o, s, c) {
      return (
        (n = new Ri(
          t.resumableState,
          n,
          t.rootFormatContext,
          t.progressiveChunkSize,
          r,
          i,
          a,
          o,
          s,
          c,
          null,
        )),
        (n.nextSegmentId = t.nextSegmentId),
        typeof t.replaySlots == `number`
          ? ((r = Ji(n, 0, null, t.rootFormatContext, !1, !1)),
            (r.parentFlushed = !0),
            (e = Ki(
              n,
              null,
              e,
              -1,
              null,
              r,
              null,
              null,
              n.abortableTasks,
              null,
              t.rootFormatContext,
              null,
              zr,
              null,
              null,
            )),
            Yi(e),
            n.pingedTasks.push(e),
            n)
          : ((e = qi(
              n,
              null,
              { nodes: t.replayNodes, slots: t.replaySlots, pendingTasks: 0 },
              e,
              -1,
              null,
              null,
              n.abortableTasks,
              null,
              t.rootFormatContext,
              null,
              zr,
              null,
              null,
            )),
            Yi(e),
            n.pingedTasks.push(e),
            n)
      );
    }
    function Hi(e, t, n, r, i, a, o, s, c) {
      return (
        (e = Vi(e, t, n, r, i, a, o, s, c)),
        (e.trackedPostpones = {
          workingMap: new Map(),
          rootNodes: [],
          rootSlots: null,
        }),
        e
      );
    }
    var Ui = null;
    function Wi(e, t) {
      (e.pingedTasks.push(t),
        e.pingedTasks.length === 1 &&
          ((e.flushScheduled = e.destination !== null),
          e.trackedPostpones !== null || e.status === 10
            ? j(function () {
                return Da(e);
              })
            : O(function () {
                return Da(e);
              })));
    }
    function Gi(e, t, n, r, i) {
      return (
        (n = {
          status: 0,
          rootSegmentID: -1,
          parentFlushed: !1,
          pendingTasks: 0,
          row: t,
          completedSegments: [],
          byteSize: 0,
          fallbackAbortableTasks: n,
          errorDigest: null,
          contentState: lr(),
          fallbackState: lr(),
          contentPreamble: r,
          fallbackPreamble: i,
          trackedContentKeyPath: null,
          trackedFallbackNode: null,
        }),
        t !== null &&
          (t.pendingTasks++,
          (r = t.boundaries),
          r !== null && (e.allPendingTasks++, n.pendingTasks++, r.push(n)),
          (e = t.inheritedHoistables),
          e !== null && Tr(n.contentState, e)),
        n
      );
    }
    function Ki(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m) {
      (e.allPendingTasks++,
        i === null ? e.pendingRootTasks++ : i.pendingTasks++,
        p !== null && p.pendingTasks++);
      var h = {
        replay: null,
        node: n,
        childIndex: r,
        ping: function () {
          return Wi(e, h);
        },
        blockedBoundary: i,
        blockedSegment: a,
        blockedPreamble: o,
        hoistableState: s,
        abortSet: c,
        keyPath: l,
        formatContext: u,
        context: d,
        treeContext: f,
        row: p,
        componentStack: m,
        thenableState: t,
      };
      return (c.add(h), h);
    }
    function qi(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
      (e.allPendingTasks++,
        a === null ? e.pendingRootTasks++ : a.pendingTasks++,
        f !== null && f.pendingTasks++,
        n.pendingTasks++);
      var m = {
        replay: n,
        node: r,
        childIndex: i,
        ping: function () {
          return Wi(e, m);
        },
        blockedBoundary: a,
        blockedSegment: null,
        blockedPreamble: null,
        hoistableState: o,
        abortSet: s,
        keyPath: c,
        formatContext: l,
        context: u,
        treeContext: d,
        row: f,
        componentStack: p,
        thenableState: t,
      };
      return (s.add(m), m);
    }
    function Ji(e, t, n, r, i, a) {
      return {
        status: 0,
        parentFlushed: !1,
        id: -1,
        index: t,
        chunks: [],
        children: [],
        preambleChildren: [],
        parentFormatContext: r,
        boundary: n,
        lastPushedText: i,
        textEmbedded: a,
      };
    }
    function Yi(e) {
      var t = e.node;
      if (typeof t == `object` && t)
        switch (t.$$typeof) {
          case a:
            e.componentStack = { parent: e.componentStack, type: t.type };
        }
    }
    function Xi(e) {
      return e === null
        ? null
        : { parent: e.parent, type: `Suspense Fallback` };
    }
    function Zi(e) {
      var t = {};
      return (
        e &&
          Object.defineProperty(t, `componentStack`, {
            configurable: !0,
            enumerable: !0,
            get: function () {
              try {
                var n = ``,
                  r = e;
                do ((n += Fi(r.type)), (r = r.parent));
                while (r);
                var i = n;
              } catch (e) {
                i =
                  `
Error generating stack: ` +
                  e.message +
                  `
` +
                  e.stack;
              }
              return (
                Object.defineProperty(t, `componentStack`, { value: i }),
                i
              );
            },
          }),
        t
      );
    }
    function Qi(e, t, n) {
      if (((e = e.onError), (t = e(t, n)), t == null || typeof t == `string`))
        return t;
    }
    function $i(e, t) {
      var n = e.onShellError,
        r = e.onFatalError;
      (n(t),
        r(t),
        e.destination === null
          ? ((e.status = 13), (e.fatalError = t))
          : ((e.status = 14), ie(e.destination, t)));
    }
    function ea(e, t) {
      ta(e, t.next, t.hoistables);
    }
    function ta(e, t, n) {
      for (; t !== null; ) {
        n !== null && (Tr(t.hoistables, n), (t.inheritedHoistables = n));
        var r = t.boundaries;
        if (r !== null) {
          t.boundaries = null;
          for (var i = 0; i < r.length; i++) {
            var a = r[i];
            (n !== null && Tr(a.contentState, n), Ea(e, a, null, null));
          }
        }
        if ((t.pendingTasks--, 0 < t.pendingTasks)) break;
        ((n = t.hoistables), (t = t.next));
      }
    }
    function na(e, t) {
      var n = t.boundaries;
      if (n !== null && t.pendingTasks === n.length) {
        for (var r = !0, i = 0; i < n.length; i++) {
          var a = n[i];
          if (a.pendingTasks !== 1 || a.parentFlushed || Ii(e, a)) {
            r = !1;
            break;
          }
        }
        r && ta(e, t, t.hoistables);
      }
    }
    function ra(e) {
      var t = {
        pendingTasks: 1,
        boundaries: null,
        hoistables: lr(),
        inheritedHoistables: null,
        together: !1,
        next: null,
      };
      return (
        e !== null &&
          0 < e.pendingTasks &&
          (t.pendingTasks++, (t.boundaries = []), (e.next = t)),
        t
      );
    }
    function ia(e, t, n, r, i) {
      var a = t.keyPath,
        o = t.treeContext,
        s = t.row;
      ((t.keyPath = n), (n = r.length));
      var c = null;
      if (t.replay !== null) {
        var l = t.replay.slots;
        if (typeof l == `object` && l)
          for (var u = 0; u < n; u++) {
            var d =
                i !== `backwards` && i !== `unstable_legacy-backwards`
                  ? u
                  : n - 1 - u,
              f = r[d];
            ((t.row = c = ra(c)), (t.treeContext = Br(o, n, d)));
            var p = l[d];
            (typeof p == `number`
              ? (ca(e, t, p, f, d), delete l[d])
              : _a(e, t, f, d),
              --c.pendingTasks === 0 && ea(e, c));
          }
        else
          for (l = 0; l < n; l++)
            ((u =
              i !== `backwards` && i !== `unstable_legacy-backwards`
                ? l
                : n - 1 - l),
              (d = r[u]),
              (t.row = c = ra(c)),
              (t.treeContext = Br(o, n, u)),
              _a(e, t, d, u),
              --c.pendingTasks === 0 && ea(e, c));
      } else if (i !== `backwards` && i !== `unstable_legacy-backwards`)
        for (i = 0; i < n; i++)
          ((l = r[i]),
            (t.row = c = ra(c)),
            (t.treeContext = Br(o, n, i)),
            _a(e, t, l, i),
            --c.pendingTasks === 0 && ea(e, c));
      else {
        for (
          i = t.blockedSegment,
            l = i.children.length,
            u = i.chunks.length,
            d = n - 1;
          0 <= d;
          d--
        ) {
          ((f = r[d]),
            (t.row = c = ra(c)),
            (t.treeContext = Br(o, n, d)),
            (p = Ji(
              e,
              u,
              null,
              t.formatContext,
              d === 0 ? i.lastPushedText : !0,
              !0,
            )),
            i.children.splice(l, 0, p),
            (t.blockedSegment = p));
          try {
            (_a(e, t, f, d),
              p.lastPushedText && p.textEmbedded && p.chunks.push(Ie),
              (p.status = 1),
              Ta(e, t.blockedBoundary, p),
              --c.pendingTasks === 0 && ea(e, c));
          } catch (t) {
            throw ((p.status = e.status === 12 ? 3 : 4), t);
          }
        }
        ((t.blockedSegment = i), (i.lastPushedText = !1));
      }
      (s !== null &&
        c !== null &&
        0 < c.pendingTasks &&
        (s.pendingTasks++, (c.next = s)),
        (t.treeContext = o),
        (t.row = s),
        (t.keyPath = a));
    }
    function aa(e, t, n, r, i, a) {
      var o = t.thenableState;
      for (
        t.thenableState = null,
          Qr = {},
          $r = t,
          ei = e,
          ti = n,
          oi = ai = 0,
          si = -1,
          ci = 0,
          li = o,
          e = r(i, a);
        ii;
      )
        ((ii = !1),
          (oi = ai = 0),
          (si = -1),
          (ci = 0),
          (di += 1),
          ($ = null),
          (e = r(i, a)));
      return (gi(), e);
    }
    function oa(e, t, n, r, i, a, o) {
      var s = !1;
      if (a !== 0 && e.formState !== null) {
        var c = t.blockedSegment;
        if (c !== null) {
          ((s = !0), (c = c.chunks));
          for (var l = 0; l < a; l++) l === o ? c.push(st) : c.push(ct);
        }
      }
      ((a = t.keyPath),
        (t.keyPath = n),
        i
          ? ((n = t.treeContext),
            (t.treeContext = Br(n, 1, 0)),
            _a(e, t, r, -1),
            (t.treeContext = n))
          : s
            ? _a(e, t, r, -1)
            : la(e, t, r, -1),
        (t.keyPath = a));
    }
    function sa(e, t, n, r, a, o) {
      if (typeof r == `function`)
        if (r.prototype && r.prototype.isReactComponent) {
          var f = a;
          if (`ref` in a)
            for (var x in ((f = {}), a)) x !== `ref` && (f[x] = a[x]);
          var C = r.defaultProps;
          if (C)
            for (var T in (f === a && (f = R({}, f, a)), C))
              f[T] === void 0 && (f[T] = C[T]);
          ((a = f),
            (f = Ar),
            (C = r.contextType),
            typeof C == `object` && C && (f = C._currentValue),
            (f = new r(a, f)));
          var E = f.state === void 0 ? null : f.state;
          if (
            ((f.updater = Rr),
            (f.props = a),
            (f.state = E),
            (C = { queue: [], replace: !1 }),
            (f._reactInternals = C),
            (o = r.contextType),
            (f.context = typeof o == `object` && o ? o._currentValue : Ar),
            (o = r.getDerivedStateFromProps),
            typeof o == `function` &&
              ((o = o(a, E)), (E = o == null ? E : R({}, E, o)), (f.state = E)),
            typeof r.getDerivedStateFromProps != `function` &&
              typeof f.getSnapshotBeforeUpdate != `function` &&
              (typeof f.UNSAFE_componentWillMount == `function` ||
                typeof f.componentWillMount == `function`))
          )
            if (
              ((r = f.state),
              typeof f.componentWillMount == `function` &&
                f.componentWillMount(),
              typeof f.UNSAFE_componentWillMount == `function` &&
                f.UNSAFE_componentWillMount(),
              r !== f.state && Rr.enqueueReplaceState(f, f.state, null),
              C.queue !== null && 0 < C.queue.length)
            )
              if (
                ((r = C.queue),
                (o = C.replace),
                (C.queue = null),
                (C.replace = !1),
                o && r.length === 1)
              )
                f.state = r[0];
              else {
                for (
                  C = o ? r[0] : f.state, E = !0, o = o ? 1 : 0;
                  o < r.length;
                  o++
                )
                  ((T = r[o]),
                    (T = typeof T == `function` ? T.call(f, C, a, void 0) : T),
                    T != null && (E ? ((E = !1), (C = R({}, C, T))) : R(C, T)));
                f.state = C;
              }
            else C.queue = null;
          if (((r = f.render()), e.status === 12)) throw null;
          ((a = t.keyPath), (t.keyPath = n), la(e, t, r, -1), (t.keyPath = a));
        } else {
          if (((r = aa(e, t, n, r, a, void 0)), e.status === 12)) throw null;
          oa(e, t, n, r, ai !== 0, oi, si);
        }
      else if (typeof r == `string`)
        if (((f = t.blockedSegment), f === null))
          ((f = a.children),
            (C = t.formatContext),
            (E = t.keyPath),
            (t.formatContext = q(C, r, a)),
            (t.keyPath = n),
            _a(e, t, f, -1),
            (t.formatContext = C),
            (t.keyPath = E));
        else {
          if (
            ((E = Tt(
              f.chunks,
              r,
              a,
              e.resumableState,
              e.renderState,
              t.blockedPreamble,
              t.hoistableState,
              t.formatContext,
              f.lastPushedText,
            )),
            (f.lastPushedText = !1),
            (C = t.formatContext),
            (o = t.keyPath),
            (t.keyPath = n),
            (t.formatContext = q(C, r, a)).insertionMode === 3)
          ) {
            ((n = Ji(e, 0, null, t.formatContext, !1, !1)),
              f.preambleChildren.push(n),
              (t.blockedSegment = n));
            try {
              ((n.status = 6),
                _a(e, t, E, -1),
                n.lastPushedText && n.textEmbedded && n.chunks.push(Ie),
                (n.status = 1),
                Ta(e, t.blockedBoundary, n));
            } finally {
              t.blockedSegment = f;
            }
          } else _a(e, t, E, -1);
          ((t.formatContext = C), (t.keyPath = o));
          a: {
            switch (((t = f.chunks), (e = e.resumableState), r)) {
              case `title`:
              case `style`:
              case `script`:
              case `area`:
              case `base`:
              case `br`:
              case `col`:
              case `embed`:
              case `hr`:
              case `img`:
              case `input`:
              case `keygen`:
              case `link`:
              case `meta`:
              case `param`:
              case `source`:
              case `track`:
              case `wbr`:
                break a;
              case `body`:
                if (1 >= C.insertionMode) {
                  e.hasBody = !0;
                  break a;
                }
                break;
              case `html`:
                if (C.insertionMode === 0) {
                  e.hasHtml = !0;
                  break a;
                }
                break;
              case `head`:
                if (1 >= C.insertionMode) break a;
            }
            t.push(Dt(r));
          }
          f.lastPushedText = !1;
        }
      else {
        switch (r) {
          case b:
          case c:
          case l:
          case s:
            ((r = t.keyPath),
              (t.keyPath = n),
              la(e, t, a.children, -1),
              (t.keyPath = r));
            return;
          case y:
            ((r = t.blockedSegment),
              r === null
                ? a.mode !== `hidden` &&
                  ((r = t.keyPath),
                  (t.keyPath = n),
                  _a(e, t, a.children, -1),
                  (t.keyPath = r))
                : a.mode !== `hidden` &&
                  (r.chunks.push(Nt),
                  (r.lastPushedText = !1),
                  (f = t.keyPath),
                  (t.keyPath = n),
                  _a(e, t, a.children, -1),
                  (t.keyPath = f),
                  r.chunks.push(Pt),
                  (r.lastPushedText = !1)));
            return;
          case h:
            a: {
              if (
                ((r = a.children),
                (a = a.revealOrder),
                a === `forwards` ||
                  a === `backwards` ||
                  a === `unstable_legacy-backwards`)
              ) {
                if (w(r)) {
                  ia(e, t, n, r, a);
                  break a;
                }
                if ((f = ee(r)) && (f = f.call(r))) {
                  if (((C = f.next()), !C.done)) {
                    do C = f.next();
                    while (!C.done);
                    ia(e, t, n, r, a);
                  }
                  break a;
                }
              }
              a === `together`
                ? ((a = t.keyPath),
                  (f = t.row),
                  (C = t.row = ra(null)),
                  (C.boundaries = []),
                  (C.together = !0),
                  (t.keyPath = n),
                  la(e, t, r, -1),
                  --C.pendingTasks === 0 && ea(e, C),
                  (t.keyPath = a),
                  (t.row = f),
                  f !== null &&
                    0 < C.pendingTasks &&
                    (f.pendingTasks++, (C.next = f)))
                : ((a = t.keyPath),
                  (t.keyPath = n),
                  la(e, t, r, -1),
                  (t.keyPath = a));
            }
            return;
          case S:
          case v:
            throw Error(i(343));
          case m:
            a: if (t.replay !== null) {
              ((r = t.keyPath),
                (f = t.formatContext),
                (C = t.row),
                (t.keyPath = n),
                (t.formatContext = Fe(e.resumableState, f)),
                (t.row = null),
                (n = a.children));
              try {
                _a(e, t, n, -1);
              } finally {
                ((t.keyPath = r), (t.formatContext = f), (t.row = C));
              }
            } else {
              ((r = t.keyPath), (o = t.formatContext));
              var D = t.row;
              ((T = t.blockedBoundary), (x = t.blockedPreamble));
              var O = t.hoistableState,
                k = t.blockedSegment,
                A = a.fallback;
              a = a.children;
              var j = new Set(),
                M =
                  2 > t.formatContext.insertionMode
                    ? Gi(e, t.row, j, G(), G())
                    : Gi(e, t.row, j, null, null);
              e.trackedPostpones !== null && (M.trackedContentKeyPath = n);
              var N = Ji(e, k.chunks.length, M, t.formatContext, !1, !1);
              (k.children.push(N), (k.lastPushedText = !1));
              var P = Ji(e, 0, null, t.formatContext, !1, !1);
              if (((P.parentFlushed = !0), e.trackedPostpones !== null)) {
                ((f = t.componentStack),
                  (C = [n[0], `Suspense Fallback`, n[2]]),
                  (E = [C[1], C[2], [], null]),
                  e.trackedPostpones.workingMap.set(C, E),
                  (M.trackedFallbackNode = E),
                  (t.blockedSegment = N),
                  (t.blockedPreamble = M.fallbackPreamble),
                  (t.keyPath = C),
                  (t.formatContext = Pe(e.resumableState, o)),
                  (t.componentStack = Xi(f)),
                  (N.status = 6));
                try {
                  (_a(e, t, A, -1),
                    N.lastPushedText && N.textEmbedded && N.chunks.push(Ie),
                    (N.status = 1),
                    Ta(e, T, N));
                } catch (t) {
                  throw ((N.status = e.status === 12 ? 3 : 4), t);
                } finally {
                  ((t.blockedSegment = k),
                    (t.blockedPreamble = x),
                    (t.keyPath = r),
                    (t.formatContext = o));
                }
                ((t = Ki(
                  e,
                  null,
                  a,
                  -1,
                  M,
                  P,
                  M.contentPreamble,
                  M.contentState,
                  t.abortSet,
                  n,
                  Fe(e.resumableState, t.formatContext),
                  t.context,
                  t.treeContext,
                  null,
                  f,
                )),
                  Yi(t),
                  e.pingedTasks.push(t));
              } else {
                ((t.blockedBoundary = M),
                  (t.blockedPreamble = M.contentPreamble),
                  (t.hoistableState = M.contentState),
                  (t.blockedSegment = P),
                  (t.keyPath = n),
                  (t.formatContext = Fe(e.resumableState, o)),
                  (t.row = null),
                  (P.status = 6));
                try {
                  if (
                    (_a(e, t, a, -1),
                    P.lastPushedText && P.textEmbedded && P.chunks.push(Ie),
                    (P.status = 1),
                    Ta(e, M, P),
                    wa(M, P),
                    M.pendingTasks === 0 && M.status === 0)
                  ) {
                    if (((M.status = 1), !Ii(e, M))) {
                      (D !== null && --D.pendingTasks === 0 && ea(e, D),
                        e.pendingRootTasks === 0 && t.blockedPreamble && Aa(e));
                      break a;
                    }
                  } else D !== null && D.together && na(e, D);
                } catch (n) {
                  ((M.status = 4),
                    e.status === 12
                      ? ((P.status = 3), (f = e.fatalError))
                      : ((P.status = 4), (f = n)),
                    (C = Zi(t.componentStack)),
                    (E = Qi(e, f, C)),
                    (M.errorDigest = E),
                    ma(e, M));
                } finally {
                  ((t.blockedBoundary = T),
                    (t.blockedPreamble = x),
                    (t.hoistableState = O),
                    (t.blockedSegment = k),
                    (t.keyPath = r),
                    (t.formatContext = o),
                    (t.row = D));
                }
                ((t = Ki(
                  e,
                  null,
                  A,
                  -1,
                  T,
                  N,
                  M.fallbackPreamble,
                  M.fallbackState,
                  j,
                  [n[0], `Suspense Fallback`, n[2]],
                  Pe(e.resumableState, t.formatContext),
                  t.context,
                  t.treeContext,
                  t.row,
                  Xi(t.componentStack),
                )),
                  Yi(t),
                  e.pingedTasks.push(t));
              }
            }
            return;
        }
        if (typeof r == `object` && r)
          switch (r.$$typeof) {
            case p:
              if (`ref` in a)
                for (k in ((f = {}), a)) k !== `ref` && (f[k] = a[k]);
              else f = a;
              ((r = aa(e, t, n, r.render, f, o)),
                oa(e, t, n, r, ai !== 0, oi, si));
              return;
            case g:
              sa(e, t, n, r.type, a, o);
              return;
            case d:
              if (
                ((C = a.children),
                (f = t.keyPath),
                (a = a.value),
                (E = r._currentValue),
                (r._currentValue = a),
                (o = jr),
                (jr = r =
                  {
                    parent: o,
                    depth: o === null ? 0 : o.depth + 1,
                    context: r,
                    parentValue: E,
                    value: a,
                  }),
                (t.context = r),
                (t.keyPath = n),
                la(e, t, C, -1),
                (e = jr),
                e === null)
              )
                throw Error(i(403));
              ((e.context._currentValue = e.parentValue),
                (e = jr = e.parent),
                (t.context = e),
                (t.keyPath = f));
              return;
            case u:
              ((a = a.children),
                (r = a(r._context._currentValue)),
                (a = t.keyPath),
                (t.keyPath = n),
                la(e, t, r, -1),
                (t.keyPath = a));
              return;
            case _:
              if (((f = r._init), (r = f(r._payload)), e.status === 12))
                throw null;
              sa(e, t, n, r, a, o);
              return;
          }
        throw Error(i(130, r == null ? r : typeof r, ``));
      }
    }
    function ca(e, t, n, r, i) {
      var a = t.replay,
        o = t.blockedBoundary,
        s = Ji(e, 0, null, t.formatContext, !1, !1);
      ((s.id = n), (s.parentFlushed = !0));
      try {
        ((t.replay = null),
          (t.blockedSegment = s),
          _a(e, t, r, i),
          (s.status = 1),
          Ta(e, o, s),
          o === null
            ? (e.completedRootSegment = s)
            : (wa(o, s), o.parentFlushed && e.partialBoundaries.push(o)));
      } finally {
        ((t.replay = a), (t.blockedSegment = null));
      }
    }
    function la(e, t, n, r) {
      t.replay !== null && typeof t.replay.slots == `number`
        ? ca(e, t, t.replay.slots, n, r)
        : ((t.node = n),
          (t.childIndex = r),
          (n = t.componentStack),
          Yi(t),
          ua(e, t),
          (t.componentStack = n));
    }
    function ua(e, t) {
      var n = t.node,
        r = t.childIndex;
      if (n !== null) {
        if (typeof n == `object`) {
          switch (n.$$typeof) {
            case a:
              var s = n.type,
                c = n.key,
                l = n.props;
              n = l.ref;
              var u = n === void 0 ? null : n,
                f = kr(s),
                p = c ?? (r === -1 ? 0 : r);
              if (((c = [t.keyPath, f, p]), t.replay !== null))
                a: {
                  var h = t.replay;
                  for (r = h.nodes, n = 0; n < r.length; n++) {
                    var g = r[n];
                    if (p === g[1]) {
                      if (g.length === 4) {
                        if (f !== null && f !== g[0])
                          throw Error(i(490, g[0], f));
                        var v = g[2];
                        ((f = g[3]),
                          (p = t.node),
                          (t.replay = { nodes: v, slots: f, pendingTasks: 1 }));
                        try {
                          if (
                            (sa(e, t, c, s, l, u),
                            t.replay.pendingTasks === 1 &&
                              0 < t.replay.nodes.length)
                          )
                            throw Error(i(488));
                          t.replay.pendingTasks--;
                        } catch (i) {
                          if (
                            typeof i == `object` &&
                            i &&
                            (i === Kr || typeof i.then == `function`)
                          )
                            throw (
                              t.node === p ? (t.replay = h) : r.splice(n, 1),
                              i
                            );
                          (t.replay.pendingTasks--,
                            (l = Zi(t.componentStack)),
                            (c = e),
                            (e = t.blockedBoundary),
                            (s = i),
                            (l = Qi(c, s, l)),
                            ya(c, e, v, f, s, l));
                        }
                        t.replay = h;
                      } else {
                        if (s !== m)
                          throw Error(i(490, `Suspense`, kr(s) || `Unknown`));
                        b: {
                          ((h = void 0),
                            (s = g[5]),
                            (u = g[2]),
                            (f = g[3]),
                            (p = g[4] === null ? [] : g[4][2]),
                            (g = g[4] === null ? null : g[4][3]));
                          var y = t.keyPath,
                            b = t.formatContext,
                            x = t.row,
                            S = t.replay,
                            C = t.blockedBoundary,
                            T = t.hoistableState,
                            E = l.children,
                            D = l.fallback,
                            O = new Set();
                          ((l =
                            2 > t.formatContext.insertionMode
                              ? Gi(e, t.row, O, G(), G())
                              : Gi(e, t.row, O, null, null)),
                            (l.parentFlushed = !0),
                            (l.rootSegmentID = s),
                            (t.blockedBoundary = l),
                            (t.hoistableState = l.contentState),
                            (t.keyPath = c),
                            (t.formatContext = Fe(e.resumableState, b)),
                            (t.row = null),
                            (t.replay = {
                              nodes: u,
                              slots: f,
                              pendingTasks: 1,
                            }));
                          try {
                            if (
                              (_a(e, t, E, -1),
                              t.replay.pendingTasks === 1 &&
                                0 < t.replay.nodes.length)
                            )
                              throw Error(i(488));
                            if (
                              (t.replay.pendingTasks--,
                              l.pendingTasks === 0 && l.status === 0)
                            ) {
                              ((l.status = 1), e.completedBoundaries.push(l));
                              break b;
                            }
                          } catch (n) {
                            ((l.status = 4),
                              (v = Zi(t.componentStack)),
                              (h = Qi(e, n, v)),
                              (l.errorDigest = h),
                              t.replay.pendingTasks--,
                              e.clientRenderedBoundaries.push(l));
                          } finally {
                            ((t.blockedBoundary = C),
                              (t.hoistableState = T),
                              (t.replay = S),
                              (t.keyPath = y),
                              (t.formatContext = b),
                              (t.row = x));
                          }
                          ((v = qi(
                            e,
                            null,
                            { nodes: p, slots: g, pendingTasks: 0 },
                            D,
                            -1,
                            C,
                            l.fallbackState,
                            O,
                            [c[0], `Suspense Fallback`, c[2]],
                            Pe(e.resumableState, t.formatContext),
                            t.context,
                            t.treeContext,
                            t.row,
                            Xi(t.componentStack),
                          )),
                            Yi(v),
                            e.pingedTasks.push(v));
                        }
                      }
                      r.splice(n, 1);
                      break a;
                    }
                  }
                }
              else sa(e, t, c, s, l, u);
              return;
            case o:
              throw Error(i(257));
            case _:
              if (((v = n._init), (n = v(n._payload)), e.status === 12))
                throw null;
              la(e, t, n, r);
              return;
          }
          if (w(n)) {
            da(e, t, n, r);
            return;
          }
          if ((v = ee(n)) && (v = v.call(n))) {
            if (((n = v.next()), !n.done)) {
              l = [];
              do (l.push(n.value), (n = v.next()));
              while (!n.done);
              da(e, t, l, r);
            }
            return;
          }
          if (typeof n.then == `function`)
            return ((t.thenableState = null), la(e, t, Ti(n), r));
          if (n.$$typeof === d) return la(e, t, n._currentValue, r);
          throw (
            (r = Object.prototype.toString.call(n)),
            Error(
              i(
                31,
                r === `[object Object]`
                  ? `object with keys {` + Object.keys(n).join(`, `) + `}`
                  : r,
              ),
            )
          );
        }
        typeof n == `string`
          ? ((r = t.blockedSegment),
            r !== null &&
              (r.lastPushedText = Le(
                r.chunks,
                n,
                e.renderState,
                r.lastPushedText,
              )))
          : (typeof n == `number` || typeof n == `bigint`) &&
            ((r = t.blockedSegment),
            r !== null &&
              (r.lastPushedText = Le(
                r.chunks,
                `` + n,
                e.renderState,
                r.lastPushedText,
              )));
      }
    }
    function da(e, t, n, r) {
      var a = t.keyPath;
      if (
        r !== -1 &&
        ((t.keyPath = [t.keyPath, `Fragment`, r]), t.replay !== null)
      ) {
        for (var o = t.replay, s = o.nodes, c = 0; c < s.length; c++) {
          var l = s[c];
          if (l[1] === r) {
            ((r = l[2]),
              (l = l[3]),
              (t.replay = { nodes: r, slots: l, pendingTasks: 1 }));
            try {
              if (
                (da(e, t, n, -1),
                t.replay.pendingTasks === 1 && 0 < t.replay.nodes.length)
              )
                throw Error(i(488));
              t.replay.pendingTasks--;
            } catch (i) {
              if (
                typeof i == `object` &&
                i &&
                (i === Kr || typeof i.then == `function`)
              )
                throw i;
              (t.replay.pendingTasks--, (n = Zi(t.componentStack)));
              var u = t.blockedBoundary,
                d = i;
              ((n = Qi(e, d, n)), ya(e, u, r, l, d, n));
            }
            ((t.replay = o), s.splice(c, 1));
            break;
          }
        }
        t.keyPath = a;
        return;
      }
      if (
        ((o = t.treeContext),
        (s = n.length),
        t.replay !== null && ((c = t.replay.slots), typeof c == `object` && c))
      ) {
        for (r = 0; r < s; r++)
          ((l = n[r]),
            (t.treeContext = Br(o, s, r)),
            (u = c[r]),
            typeof u == `number`
              ? (ca(e, t, u, l, r), delete c[r])
              : _a(e, t, l, r));
        ((t.treeContext = o), (t.keyPath = a));
        return;
      }
      for (c = 0; c < s; c++)
        ((r = n[c]), (t.treeContext = Br(o, s, c)), _a(e, t, r, c));
      ((t.treeContext = o), (t.keyPath = a));
    }
    function fa(e, t, n) {
      if (
        ((n.status = 5),
        (n.rootSegmentID = e.nextSegmentId++),
        (e = n.trackedContentKeyPath),
        e === null)
      )
        throw Error(i(486));
      var r = n.trackedFallbackNode,
        a = [],
        o = t.workingMap.get(e);
      return o === void 0
        ? ((n = [e[1], e[2], a, null, r, n.rootSegmentID]),
          t.workingMap.set(e, n),
          Ua(n, e[0], t),
          n)
        : ((o[4] = r), (o[5] = n.rootSegmentID), o);
    }
    function pa(e, t, n, r) {
      r.status = 5;
      var a = n.keyPath,
        o = n.blockedBoundary;
      if (o === null)
        ((r.id = e.nextSegmentId++),
          (t.rootSlots = r.id),
          e.completedRootSegment !== null &&
            (e.completedRootSegment.status = 5));
      else {
        if (o !== null && o.status === 0) {
          var s = fa(e, t, o);
          if (o.trackedContentKeyPath === a && n.childIndex === -1) {
            (r.id === -1 &&
              (r.id = r.parentFlushed ? o.rootSegmentID : e.nextSegmentId++),
              (s[3] = r.id));
            return;
          }
        }
        if (
          (r.id === -1 &&
            (r.id =
              r.parentFlushed && o !== null
                ? o.rootSegmentID
                : e.nextSegmentId++),
          n.childIndex === -1)
        )
          a === null
            ? (t.rootSlots = r.id)
            : ((n = t.workingMap.get(a)),
              n === void 0
                ? ((n = [a[1], a[2], [], r.id]), Ua(n, a[0], t))
                : (n[3] = r.id));
        else {
          if (a === null) {
            if (((e = t.rootSlots), e === null)) e = t.rootSlots = {};
            else if (typeof e == `number`) throw Error(i(491));
          } else if (((o = t.workingMap), (s = o.get(a)), s === void 0))
            ((e = {}), (s = [a[1], a[2], [], e]), o.set(a, s), Ua(s, a[0], t));
          else if (((e = s[3]), e === null)) e = s[3] = {};
          else if (typeof e == `number`) throw Error(i(491));
          e[n.childIndex] = r.id;
        }
      }
    }
    function ma(e, t) {
      ((e = e.trackedPostpones),
        e !== null &&
          ((t = t.trackedContentKeyPath),
          t !== null &&
            ((t = e.workingMap.get(t)),
            t !== void 0 && ((t.length = 4), (t[2] = []), (t[3] = null)))));
    }
    function ha(e, t, n) {
      return qi(
        e,
        n,
        t.replay,
        t.node,
        t.childIndex,
        t.blockedBoundary,
        t.hoistableState,
        t.abortSet,
        t.keyPath,
        t.formatContext,
        t.context,
        t.treeContext,
        t.row,
        t.componentStack,
      );
    }
    function ga(e, t, n) {
      var r = t.blockedSegment,
        i = Ji(e, r.chunks.length, null, t.formatContext, r.lastPushedText, !0);
      return (
        r.children.push(i),
        (r.lastPushedText = !1),
        Ki(
          e,
          n,
          t.node,
          t.childIndex,
          t.blockedBoundary,
          i,
          t.blockedPreamble,
          t.hoistableState,
          t.abortSet,
          t.keyPath,
          t.formatContext,
          t.context,
          t.treeContext,
          t.row,
          t.componentStack,
        )
      );
    }
    function _a(e, t, n, r) {
      var i = t.formatContext,
        a = t.context,
        o = t.keyPath,
        s = t.treeContext,
        c = t.componentStack,
        l = t.blockedSegment;
      if (l === null) {
        l = t.replay;
        try {
          return la(e, t, n, r);
        } catch (u) {
          if (
            (gi(),
            (n = u === Kr ? Yr() : u),
            e.status !== 12 && typeof n == `object` && n)
          ) {
            if (typeof n.then == `function`) {
              ((r = u === Kr ? hi() : null),
                (e = ha(e, t, r).ping),
                n.then(e, e),
                (t.formatContext = i),
                (t.context = a),
                (t.keyPath = o),
                (t.treeContext = s),
                (t.componentStack = c),
                (t.replay = l),
                Lr(a));
              return;
            }
            if (n.message === `Maximum call stack size exceeded`) {
              ((n = u === Kr ? hi() : null),
                (n = ha(e, t, n)),
                e.pingedTasks.push(n),
                (t.formatContext = i),
                (t.context = a),
                (t.keyPath = o),
                (t.treeContext = s),
                (t.componentStack = c),
                (t.replay = l),
                Lr(a));
              return;
            }
          }
        }
      } else {
        var u = l.children.length,
          d = l.chunks.length;
        try {
          return la(e, t, n, r);
        } catch (r) {
          if (
            (gi(),
            (l.children.length = u),
            (l.chunks.length = d),
            (n = r === Kr ? Yr() : r),
            e.status !== 12 && typeof n == `object` && n)
          ) {
            if (typeof n.then == `function`) {
              ((l = n),
                (n = r === Kr ? hi() : null),
                (e = ga(e, t, n).ping),
                l.then(e, e),
                (t.formatContext = i),
                (t.context = a),
                (t.keyPath = o),
                (t.treeContext = s),
                (t.componentStack = c),
                Lr(a));
              return;
            }
            if (n.message === `Maximum call stack size exceeded`) {
              ((l = r === Kr ? hi() : null),
                (l = ga(e, t, l)),
                e.pingedTasks.push(l),
                (t.formatContext = i),
                (t.context = a),
                (t.keyPath = o),
                (t.treeContext = s),
                (t.componentStack = c),
                Lr(a));
              return;
            }
          }
        }
      }
      throw (
        (t.formatContext = i),
        (t.context = a),
        (t.keyPath = o),
        (t.treeContext = s),
        Lr(a),
        n
      );
    }
    function va(e) {
      var t = e.blockedBoundary,
        n = e.blockedSegment;
      n !== null && ((n.status = 3), Ea(this, t, e.row, n));
    }
    function ya(e, t, n, r, a, o) {
      for (var s = 0; s < n.length; s++) {
        var c = n[s];
        if (c.length === 4) ya(e, t, c[2], c[3], a, o);
        else {
          c = c[5];
          var l = e,
            u = o,
            d = Gi(l, null, new Set(), null, null);
          ((d.parentFlushed = !0),
            (d.rootSegmentID = c),
            (d.status = 4),
            (d.errorDigest = u),
            d.parentFlushed && l.clientRenderedBoundaries.push(d));
        }
      }
      if (((n.length = 0), r !== null)) {
        if (t === null) throw Error(i(487));
        if (
          (t.status !== 4 &&
            ((t.status = 4),
            (t.errorDigest = o),
            t.parentFlushed && e.clientRenderedBoundaries.push(t)),
          typeof r == `object`)
        )
          for (var f in r) delete r[f];
      }
    }
    function ba(e, t, n) {
      var r = e.blockedBoundary,
        i = e.blockedSegment;
      if (i !== null) {
        if (i.status === 6) return;
        i.status = 3;
      }
      var a = Zi(e.componentStack);
      if (r === null) {
        if (t.status !== 13 && t.status !== 14) {
          if (((r = e.replay), r === null)) {
            t.trackedPostpones !== null && i !== null
              ? ((r = t.trackedPostpones),
                Qi(t, n, a),
                pa(t, r, e, i),
                Ea(t, null, e.row, i))
              : (Qi(t, n, a), $i(t, n));
            return;
          }
          (r.pendingTasks--,
            r.pendingTasks === 0 &&
              0 < r.nodes.length &&
              ((i = Qi(t, n, a)), ya(t, null, r.nodes, r.slots, n, i)),
            t.pendingRootTasks--,
            t.pendingRootTasks === 0 && Sa(t));
        }
      } else {
        var o = t.trackedPostpones;
        if (r.status !== 4) {
          if (o !== null && i !== null)
            return (
              Qi(t, n, a),
              pa(t, o, e, i),
              r.fallbackAbortableTasks.forEach(function (e) {
                return ba(e, t, n);
              }),
              r.fallbackAbortableTasks.clear(),
              Ea(t, r, e.row, i)
            );
          ((r.status = 4),
            (i = Qi(t, n, a)),
            (r.status = 4),
            (r.errorDigest = i),
            ma(t, r),
            r.parentFlushed && t.clientRenderedBoundaries.push(r));
        }
        (r.pendingTasks--,
          (i = r.row),
          i !== null && --i.pendingTasks === 0 && ea(t, i),
          r.fallbackAbortableTasks.forEach(function (e) {
            return ba(e, t, n);
          }),
          r.fallbackAbortableTasks.clear());
      }
      ((e = e.row),
        e !== null && --e.pendingTasks === 0 && ea(t, e),
        t.allPendingTasks--,
        t.allPendingTasks === 0 && Ca(t));
    }
    function xa(e, t) {
      try {
        var n = e.renderState,
          r = n.onHeaders;
        if (r) {
          var i = n.headers;
          if (i) {
            n.headers = null;
            var a = i.preconnects;
            if (
              (i.fontPreloads && (a && (a += `, `), (a += i.fontPreloads)),
              i.highImagePreloads &&
                (a && (a += `, `), (a += i.highImagePreloads)),
              !t)
            ) {
              var o = n.styles.values(),
                s = o.next();
              b: for (; 0 < i.remainingCapacity && !s.done; s = o.next())
                for (
                  var c = s.value.sheets.values(), l = c.next();
                  0 < i.remainingCapacity && !l.done;
                  l = c.next()
                ) {
                  var u = l.value,
                    d = u.props,
                    f = d.href,
                    p = u.props,
                    m = vr(p.href, `style`, {
                      crossOrigin: p.crossOrigin,
                      integrity: p.integrity,
                      nonce: p.nonce,
                      type: p.type,
                      fetchPriority: p.fetchPriority,
                      referrerPolicy: p.referrerPolicy,
                      media: p.media,
                    });
                  if (0 <= (i.remainingCapacity -= m.length + 2))
                    ((n.resets.style[f] = ye),
                      a && (a += `, `),
                      (a += m),
                      (n.resets.style[f] =
                        typeof d.crossOrigin == `string` ||
                        typeof d.integrity == `string`
                          ? [d.crossOrigin, d.integrity]
                          : ye));
                  else break b;
                }
            }
            r(a ? { Link: a } : {});
          }
        }
      } catch (t) {
        Qi(e, t, {});
      }
    }
    function Sa(e) {
      (e.trackedPostpones === null && xa(e, !0),
        e.trackedPostpones === null && Aa(e),
        (e.onShellError = Gr),
        (e = e.onShellReady),
        e());
    }
    function Ca(e) {
      (xa(
        e,
        e.trackedPostpones === null
          ? !0
          : e.completedRootSegment === null ||
              e.completedRootSegment.status !== 5,
      ),
        Aa(e),
        (e = e.onAllReady),
        e());
    }
    function wa(e, t) {
      if (
        t.chunks.length === 0 &&
        t.children.length === 1 &&
        t.children[0].boundary === null &&
        t.children[0].id === -1
      ) {
        var n = t.children[0];
        ((n.id = t.id),
          (n.parentFlushed = !0),
          (n.status !== 1 && n.status !== 3 && n.status !== 4) || wa(e, n));
      } else e.completedSegments.push(t);
    }
    function Ta(e, t, n) {
      if (re !== null) {
        n = n.chunks;
        for (var r = 0, i = 0; i < n.length; i++) r += n[i].byteLength;
        t === null ? (e.byteSize += r) : (t.byteSize += r);
      }
    }
    function Ea(e, t, n, r) {
      if (
        (n !== null &&
          (--n.pendingTasks === 0 ? ea(e, n) : n.together && na(e, n)),
        e.allPendingTasks--,
        t === null)
      ) {
        if (r !== null && r.parentFlushed) {
          if (e.completedRootSegment !== null) throw Error(i(389));
          e.completedRootSegment = r;
        }
        (e.pendingRootTasks--, e.pendingRootTasks === 0 && Sa(e));
      } else if ((t.pendingTasks--, t.status !== 4))
        if (t.pendingTasks === 0) {
          if (
            (t.status === 0 && (t.status = 1),
            r !== null &&
              r.parentFlushed &&
              (r.status === 1 || r.status === 3) &&
              wa(t, r),
            t.parentFlushed && e.completedBoundaries.push(t),
            t.status === 1)
          )
            ((n = t.row),
              n !== null && Tr(n.hoistables, t.contentState),
              Ii(e, t) ||
                (t.fallbackAbortableTasks.forEach(va, e),
                t.fallbackAbortableTasks.clear(),
                n !== null && --n.pendingTasks === 0 && ea(e, n)),
              e.pendingRootTasks === 0 &&
                e.trackedPostpones === null &&
                t.contentPreamble !== null &&
                Aa(e));
          else if (t.status === 5 && ((t = t.row), t !== null)) {
            if (e.trackedPostpones !== null) {
              n = e.trackedPostpones;
              var a = t.next;
              if (a !== null && ((r = a.boundaries), r !== null))
                for (a.boundaries = null, a = 0; a < r.length; a++) {
                  var o = r[a];
                  (fa(e, n, o), Ea(e, o, null, null));
                }
            }
            --t.pendingTasks === 0 && ea(e, t);
          }
        } else
          (r === null ||
            !r.parentFlushed ||
            (r.status !== 1 && r.status !== 3) ||
            (wa(t, r),
            t.completedSegments.length === 1 &&
              t.parentFlushed &&
              e.partialBoundaries.push(t)),
            (t = t.row),
            t !== null && t.together && na(e, t));
      e.allPendingTasks === 0 && Ca(e);
    }
    function Da(e) {
      if (e.status !== 14 && e.status !== 13) {
        var t = jr,
          n = he.H;
        he.H = Di;
        var r = he.A;
        he.A = ki;
        var a = Ui;
        Ui = e;
        var o = Oi;
        Oi = e.resumableState;
        try {
          var s = e.pingedTasks,
            c;
          for (c = 0; c < s.length; c++) {
            var l = s[c],
              u = e,
              d = l.blockedSegment;
            if (d === null) {
              var f = u;
              if (l.replay.pendingTasks !== 0) {
                Lr(l.context);
                try {
                  if (
                    (typeof l.replay.slots == `number`
                      ? ca(f, l, l.replay.slots, l.node, l.childIndex)
                      : ua(f, l),
                    l.replay.pendingTasks === 1 && 0 < l.replay.nodes.length)
                  )
                    throw Error(i(488));
                  (l.replay.pendingTasks--,
                    l.abortSet.delete(l),
                    Ea(f, l.blockedBoundary, l.row, null));
                } catch (e) {
                  gi();
                  var p = e === Kr ? Yr() : e;
                  if (
                    typeof p == `object` &&
                    p &&
                    typeof p.then == `function`
                  ) {
                    var m = l.ping;
                    (p.then(m, m), (l.thenableState = e === Kr ? hi() : null));
                  } else {
                    (l.replay.pendingTasks--, l.abortSet.delete(l));
                    var h = Zi(l.componentStack);
                    u = void 0;
                    var g = f,
                      _ = l.blockedBoundary,
                      v = f.status === 12 ? f.fatalError : p,
                      y = l.replay.nodes,
                      b = l.replay.slots;
                    ((u = Qi(g, v, h)),
                      ya(g, _, y, b, v, u),
                      f.pendingRootTasks--,
                      f.pendingRootTasks === 0 && Sa(f),
                      f.allPendingTasks--,
                      f.allPendingTasks === 0 && Ca(f));
                  }
                }
              }
            } else if (((f = void 0), (g = d), g.status === 0)) {
              ((g.status = 6), Lr(l.context));
              var x = g.children.length,
                S = g.chunks.length;
              try {
                (ua(u, l),
                  g.lastPushedText && g.textEmbedded && g.chunks.push(Ie),
                  l.abortSet.delete(l),
                  (g.status = 1),
                  Ta(u, l.blockedBoundary, g),
                  Ea(u, l.blockedBoundary, l.row, g));
              } catch (e) {
                (gi(), (g.children.length = x), (g.chunks.length = S));
                var C = e === Kr ? Yr() : u.status === 12 ? u.fatalError : e;
                if (u.status === 12 && u.trackedPostpones !== null) {
                  var ee = u.trackedPostpones,
                    w = Zi(l.componentStack);
                  (l.abortSet.delete(l),
                    Qi(u, C, w),
                    pa(u, ee, l, g),
                    Ea(u, l.blockedBoundary, l.row, g));
                } else if (
                  typeof C == `object` &&
                  C &&
                  typeof C.then == `function`
                ) {
                  ((g.status = 0), (l.thenableState = e === Kr ? hi() : null));
                  var T = l.ping;
                  C.then(T, T);
                } else {
                  var E = Zi(l.componentStack);
                  (l.abortSet.delete(l), (g.status = 4));
                  var D = l.blockedBoundary,
                    O = l.row;
                  if (
                    (O !== null && --O.pendingTasks === 0 && ea(u, O),
                    u.allPendingTasks--,
                    (f = Qi(u, C, E)),
                    D === null)
                  )
                    $i(u, C);
                  else if ((D.pendingTasks--, D.status !== 4)) {
                    ((D.status = 4), (D.errorDigest = f), ma(u, D));
                    var k = D.row;
                    (k !== null && --k.pendingTasks === 0 && ea(u, k),
                      D.parentFlushed && u.clientRenderedBoundaries.push(D),
                      u.pendingRootTasks === 0 &&
                        u.trackedPostpones === null &&
                        D.contentPreamble !== null &&
                        Aa(u));
                  }
                  u.allPendingTasks === 0 && Ca(u);
                }
              }
            }
          }
          (s.splice(0, c), e.destination !== null && Ra(e, e.destination));
        } catch (t) {
          (Qi(e, t, {}), $i(e, t));
        } finally {
          ((Oi = o), (he.H = n), (he.A = r), n === Di && Lr(t), (Ui = a));
        }
      }
    }
    function Oa(e, t, n) {
      t.preambleChildren.length && n.push(t.preambleChildren);
      for (var r = !1, i = 0; i < t.children.length; i++)
        r = ka(e, t.children[i], n) || r;
      return r;
    }
    function ka(e, t, n) {
      var r = t.boundary;
      if (r === null) return Oa(e, t, n);
      var a = r.contentPreamble,
        o = r.fallbackPreamble;
      if (a === null || o === null) return !1;
      switch (r.status) {
        case 1:
          if (
            (Ot(e.renderState, a),
            (e.byteSize += r.byteSize),
            (t = r.completedSegments[0]),
            !t)
          )
            throw Error(i(391));
          return Oa(e, t, n);
        case 5:
          if (e.trackedPostpones !== null) return !0;
        case 4:
          if (t.status === 1) return (Ot(e.renderState, o), Oa(e, t, n));
        default:
          return !0;
      }
    }
    function Aa(e) {
      if (e.completedRootSegment && e.completedPreambleSegments === null) {
        var t = [],
          n = e.byteSize,
          r = ka(e, e.completedRootSegment, t),
          i = e.renderState.preamble;
        !1 === r || (i.headChunks && i.bodyChunks)
          ? (e.completedPreambleSegments = t)
          : (e.byteSize = n);
      }
    }
    function ja(e, t, n, r) {
      switch (((n.parentFlushed = !0), n.status)) {
        case 0:
          n.id = e.nextSegmentId++;
        case 5:
          return (
            (r = n.id),
            (n.lastPushedText = !1),
            (n.textEmbedded = !1),
            (e = e.renderState),
            P(t, jt),
            P(t, e.placeholderPrefix),
            (e = I(r.toString(16))),
            P(t, e),
            F(t, Mt)
          );
        case 1:
          n.status = 2;
          var a = !0,
            o = n.chunks,
            s = 0;
          n = n.children;
          for (var c = 0; c < n.length; c++) {
            for (a = n[c]; s < a.index; s++) P(t, o[s]);
            a = Na(e, t, a, r);
          }
          for (; s < o.length - 1; s++) P(t, o[s]);
          return (s < o.length && (a = F(t, o[s])), a);
        case 3:
          return !0;
        default:
          throw Error(i(390));
      }
    }
    var Ma = 0;
    function Na(e, t, n, r) {
      var a = n.boundary;
      if (a === null) return ja(e, t, n, r);
      if (((a.parentFlushed = !0), a.status === 4)) {
        var o = a.row;
        (o !== null && --o.pendingTasks === 0 && ea(e, o),
          (a = a.errorDigest),
          F(t, Rt),
          P(t, Bt),
          a && (P(t, Ht), P(t, I(V(a))), P(t, Vt)),
          F(t, Ut),
          ja(e, t, n, r));
      } else if (a.status !== 1)
        (a.status === 0 && (a.rootSegmentID = e.nextSegmentId++),
          0 < a.completedSegments.length && e.partialBoundaries.push(a),
          Wt(t, e.renderState, a.rootSegmentID),
          r && Tr(r, a.fallbackState),
          ja(e, t, n, r));
      else if (
        !La &&
        Ii(e, a) &&
        (Ma + a.byteSize > e.progressiveChunkSize || Er(a.contentState))
      )
        ((a.rootSegmentID = e.nextSegmentId++),
          e.completedBoundaries.push(a),
          Wt(t, e.renderState, a.rootSegmentID),
          ja(e, t, n, r));
      else {
        if (
          ((Ma += a.byteSize),
          r && Tr(r, a.contentState),
          (n = a.row),
          n !== null && Ii(e, a) && --n.pendingTasks === 0 && ea(e, n),
          F(t, Ft),
          (n = a.completedSegments),
          n.length !== 1)
        )
          throw Error(i(391));
        Na(e, t, n[0], r);
      }
      return F(t, zt);
    }
    function Pa(e, t, n, r) {
      return (
        dn(t, e.renderState, n.parentFormatContext, n.id),
        Na(e, t, n, r),
        fn(t, n.parentFormatContext)
      );
    }
    function Fa(e, t, n) {
      Ma = n.byteSize;
      for (var r = n.completedSegments, i = 0; i < r.length; i++)
        Ia(e, t, n, r[i]);
      ((r.length = 0),
        (r = n.row),
        r !== null && Ii(e, n) && --r.pendingTasks === 0 && ea(e, r),
        Un(t, n.contentState, e.renderState),
        (r = e.resumableState),
        (e = e.renderState),
        (i = n.rootSegmentID),
        (n = n.contentState));
      var a = e.stylesToHoist;
      return (
        (e.stylesToHoist = !1),
        P(t, e.startInlineScript),
        P(t, et),
        a
          ? (!(r.instructions & 4) && ((r.instructions |= 4), P(t, Tn)),
            !(r.instructions & 2) && ((r.instructions |= 2), P(t, _n)),
            r.instructions & 8 ? P(t, bn) : ((r.instructions |= 8), P(t, yn)))
          : (!(r.instructions & 2) && ((r.instructions |= 2), P(t, _n)),
            P(t, vn)),
        (r = I(i.toString(16))),
        P(t, e.boundaryPrefix),
        P(t, r),
        P(t, xn),
        P(t, e.segmentPrefix),
        P(t, r),
        a ? (P(t, Sn), sr(t, n)) : P(t, Cn),
        (n = F(t, wn)),
        kt(t, e) && n
      );
    }
    function Ia(e, t, n, r) {
      if (r.status === 2) return !0;
      var a = n.contentState,
        o = r.id;
      if (o === -1) {
        if ((r.id = n.rootSegmentID) === -1) throw Error(i(392));
        return Pa(e, t, r, a);
      }
      return o === n.rootSegmentID
        ? Pa(e, t, r, a)
        : (Pa(e, t, r, a),
          (n = e.resumableState),
          (e = e.renderState),
          P(t, e.startInlineScript),
          P(t, et),
          n.instructions & 1 ? P(t, mn) : ((n.instructions |= 1), P(t, pn)),
          P(t, e.segmentPrefix),
          (o = I(o.toString(16))),
          P(t, o),
          P(t, hn),
          P(t, e.placeholderPrefix),
          P(t, o),
          (t = F(t, gn)),
          t);
    }
    var La = !1;
    function Ra(e, t) {
      ((M = new Uint8Array(2048)), (N = 0));
      try {
        if (!(0 < e.pendingRootTasks)) {
          var n,
            r = e.completedRootSegment;
          if (r !== null) {
            if (r.status === 5) return;
            var i = e.completedPreambleSegments;
            if (i === null) return;
            Ma = e.byteSize;
            var a = e.resumableState,
              o = e.renderState,
              s = o.preamble,
              c = s.htmlChunks,
              l = s.headChunks,
              u;
            if (c) {
              for (u = 0; u < c.length; u++) P(t, c[u]);
              if (l) for (u = 0; u < l.length; u++) P(t, l[u]);
              else (P(t, Ct(`head`)), P(t, et));
            } else if (l) for (u = 0; u < l.length; u++) P(t, l[u]);
            var d = o.charsetChunks;
            for (u = 0; u < d.length; u++) P(t, d[u]);
            ((d.length = 0),
              o.preconnects.forEach(Wn, t),
              o.preconnects.clear());
            var f = o.viewportChunks;
            for (u = 0; u < f.length; u++) P(t, f[u]);
            ((f.length = 0),
              o.fontPreloads.forEach(Wn, t),
              o.fontPreloads.clear(),
              o.highImagePreloads.forEach(Wn, t),
              o.highImagePreloads.clear(),
              (be = o),
              o.styles.forEach(Qn, t),
              (be = null));
            var p = o.importMapChunks;
            for (u = 0; u < p.length; u++) P(t, p[u]);
            ((p.length = 0),
              o.bootstrapScripts.forEach(Wn, t),
              o.scripts.forEach(Wn, t),
              o.scripts.clear(),
              o.bulkPreloads.forEach(Wn, t),
              o.bulkPreloads.clear(),
              c || l || (a.instructions |= 32));
            var m = o.hoistableChunks;
            for (u = 0; u < m.length; u++) P(t, m[u]);
            for (a = m.length = 0; a < i.length; a++) {
              var h = i[a];
              for (o = 0; o < h.length; o++) Na(e, t, h[o], null);
            }
            var g = e.renderState.preamble,
              _ = g.headChunks;
            (g.htmlChunks || _) && P(t, Dt(`head`));
            var v = g.bodyChunks;
            if (v) for (i = 0; i < v.length; i++) P(t, v[i]);
            (Na(e, t, r, null), (e.completedRootSegment = null));
            var y = e.renderState;
            if (
              e.allPendingTasks !== 0 ||
              e.clientRenderedBoundaries.length !== 0 ||
              e.completedBoundaries.length !== 0 ||
              (e.trackedPostpones !== null &&
                (e.trackedPostpones.rootNodes.length !== 0 ||
                  e.trackedPostpones.rootSlots !== null))
            ) {
              var b = e.resumableState;
              if (!(b.instructions & 64)) {
                if (
                  ((b.instructions |= 64),
                  P(t, y.startInlineScript),
                  !(b.instructions & 32))
                ) {
                  b.instructions |= 32;
                  var x = `_` + b.idPrefix + `R_`;
                  (P(t, tr), P(t, I(V(x))), P(t, Y));
                }
                (P(t, et), P(t, At), F(t, H));
              }
            }
            kt(t, y);
          }
          var S = e.renderState;
          r = 0;
          var C = S.viewportChunks;
          for (r = 0; r < C.length; r++) P(t, C[r]);
          ((C.length = 0),
            S.preconnects.forEach(Wn, t),
            S.preconnects.clear(),
            S.fontPreloads.forEach(Wn, t),
            S.fontPreloads.clear(),
            S.highImagePreloads.forEach(Wn, t),
            S.highImagePreloads.clear(),
            S.styles.forEach(er, t),
            S.scripts.forEach(Wn, t),
            S.scripts.clear(),
            S.bulkPreloads.forEach(Wn, t),
            S.bulkPreloads.clear());
          var ee = S.hoistableChunks;
          for (r = 0; r < ee.length; r++) P(t, ee[r]);
          ee.length = 0;
          var w = e.clientRenderedBoundaries;
          for (n = 0; n < w.length; n++) {
            var T = w[n];
            S = t;
            var E = e.resumableState,
              D = e.renderState,
              O = T.rootSegmentID,
              k = T.errorDigest;
            (P(S, D.startInlineScript),
              P(S, et),
              E.instructions & 4 ? P(S, Dn) : ((E.instructions |= 4), P(S, En)),
              P(S, D.boundaryPrefix),
              P(S, I(O.toString(16))),
              P(S, On),
              k && (P(S, kn), P(S, I(Mn(k || ``)))));
            var A = F(S, An);
            if (!A) {
              ((e.destination = null), n++, w.splice(0, n));
              return;
            }
          }
          w.splice(0, n);
          var j = e.completedBoundaries;
          for (n = 0; n < j.length; n++)
            if (!Fa(e, t, j[n])) {
              ((e.destination = null), n++, j.splice(0, n));
              return;
            }
          (j.splice(0, n),
            te(t),
            (M = new Uint8Array(2048)),
            (N = 0),
            (La = !0));
          var ne = e.partialBoundaries;
          for (n = 0; n < ne.length; n++) {
            var L = ne[n];
            a: {
              ((w = e), (T = t), (Ma = L.byteSize));
              var re = L.completedSegments;
              for (A = 0; A < re.length; A++)
                if (!Ia(w, T, L, re[A])) {
                  (A++, re.splice(0, A));
                  var ie = !1;
                  break a;
                }
              re.splice(0, A);
              var R = L.row;
              (R !== null &&
                R.together &&
                L.pendingTasks === 1 &&
                (R.pendingTasks === 1
                  ? ta(w, R, R.hoistables)
                  : R.pendingTasks--),
                (ie = Un(T, L.contentState, w.renderState)));
            }
            if (!ie) {
              ((e.destination = null), n++, ne.splice(0, n));
              return;
            }
          }
          (ne.splice(0, n), (La = !1));
          var z = e.completedBoundaries;
          for (n = 0; n < z.length; n++)
            if (!Fa(e, t, z[n])) {
              ((e.destination = null), n++, z.splice(0, n));
              return;
            }
          z.splice(0, n);
        }
      } finally {
        ((La = !1),
          e.allPendingTasks === 0 &&
          e.clientRenderedBoundaries.length === 0 &&
          e.completedBoundaries.length === 0
            ? ((e.flushScheduled = !1),
              (n = e.resumableState),
              n.hasBody && P(t, Dt(`body`)),
              n.hasHtml && P(t, Dt(`html`)),
              te(t),
              (e.status = 14),
              t.close(),
              (e.destination = null))
            : te(t));
      }
    }
    function za(e) {
      ((e.flushScheduled = e.destination !== null),
        j(function () {
          return Da(e);
        }),
        O(function () {
          (e.status === 10 && (e.status = 11),
            e.trackedPostpones === null && xa(e, e.pendingRootTasks === 0));
        }));
    }
    function Ba(e) {
      !1 === e.flushScheduled &&
        e.pingedTasks.length === 0 &&
        e.destination !== null &&
        ((e.flushScheduled = !0),
        O(function () {
          var t = e.destination;
          t ? Ra(e, t) : (e.flushScheduled = !1);
        }));
    }
    function Va(e, t) {
      if (e.status === 13) ((e.status = 14), ie(t, e.fatalError));
      else if (e.status !== 14 && e.destination === null) {
        e.destination = t;
        try {
          Ra(e, t);
        } catch (t) {
          (Qi(e, t, {}), $i(e, t));
        }
      }
    }
    function Ha(e, t) {
      (e.status === 11 || e.status === 10) && (e.status = 12);
      try {
        var n = e.abortableTasks;
        if (0 < n.size) {
          var r =
            t === void 0
              ? Error(i(432))
              : typeof t == `object` && t && typeof t.then == `function`
                ? Error(i(530))
                : t;
          ((e.fatalError = r),
            n.forEach(function (t) {
              return ba(t, e, r);
            }),
            n.clear());
        }
        e.destination !== null && Ra(e, e.destination);
      } catch (t) {
        (Qi(e, t, {}), $i(e, t));
      }
    }
    function Ua(e, t, n) {
      if (t === null) n.rootNodes.push(e);
      else {
        var r = n.workingMap,
          i = r.get(t);
        (i === void 0 &&
          ((i = [t[1], t[2], [], null]), r.set(t, i), Ua(i, t[0], n)),
          i[2].push(e));
      }
    }
    function Wa(e) {
      var t = e.trackedPostpones;
      if (t === null || (t.rootNodes.length === 0 && t.rootSlots === null))
        return (e.trackedPostpones = null);
      if (
        e.completedRootSegment === null ||
        (e.completedRootSegment.status !== 5 &&
          e.completedPreambleSegments !== null)
      ) {
        var n = e.nextSegmentId,
          r = t.rootSlots,
          i = e.resumableState;
        ((i.bootstrapScriptContent = void 0),
          (i.bootstrapScripts = void 0),
          (i.bootstrapModules = void 0));
      } else {
        ((n = 0), (r = -1), (i = e.resumableState));
        var a = e.renderState;
        ((i.nextFormID = 0),
          (i.hasBody = !1),
          (i.hasHtml = !1),
          (i.unknownResources = { font: a.resets.font }),
          (i.dnsResources = a.resets.dns),
          (i.connectResources = a.resets.connect),
          (i.imageResources = a.resets.image),
          (i.styleResources = a.resets.style),
          (i.scriptResources = {}),
          (i.moduleUnknownResources = {}),
          (i.moduleScriptResources = {}),
          (i.instructions = 0));
      }
      return {
        nextSegmentId: n,
        rootFormatContext: e.rootFormatContext,
        progressiveChunkSize: e.progressiveChunkSize,
        resumableState: e.resumableState,
        replayNodes: t.rootNodes,
        replaySlots: r,
      };
    }
    function Ga() {
      var e = t.version;
      if (e !== `19.2.5`) throw Error(i(527, e, `19.2.5`));
    }
    (Ga(),
      Ga(),
      (e.prerender = function (e, t) {
        return new Promise(function (n, r) {
          var i = t ? t.onHeaders : void 0,
            a;
          i &&
            (a = function (e) {
              i(new Headers(e));
            });
          var o = Me(
              t ? t.identifierPrefix : void 0,
              t ? t.unstable_externalRuntimeSrc : void 0,
              t ? t.bootstrapScriptContent : void 0,
              t ? t.bootstrapScripts : void 0,
              t ? t.bootstrapModules : void 0,
            ),
            s = Bi(
              e,
              o,
              je(
                o,
                void 0,
                t ? t.unstable_externalRuntimeSrc : void 0,
                t ? t.importMap : void 0,
                a,
                t ? t.maxHeadersLength : void 0,
              ),
              Ne(t ? t.namespaceURI : void 0),
              t ? t.progressiveChunkSize : void 0,
              t ? t.onError : void 0,
              function () {
                var e = new ReadableStream(
                  {
                    type: `bytes`,
                    pull: function (e) {
                      Va(s, e);
                    },
                    cancel: function (e) {
                      ((s.destination = null), Ha(s, e));
                    },
                  },
                  { highWaterMark: 0 },
                );
                ((e = { postponed: Wa(s), prelude: e }), n(e));
              },
              void 0,
              void 0,
              r,
              t ? t.onPostpone : void 0,
            );
          if (t && t.signal) {
            var c = t.signal;
            if (c.aborted) Ha(s, c.reason);
            else {
              var l = function () {
                (Ha(s, c.reason), c.removeEventListener(`abort`, l));
              };
              c.addEventListener(`abort`, l);
            }
          }
          za(s);
        });
      }),
      (e.renderToReadableStream = function (e, t) {
        return new Promise(function (n, r) {
          var i,
            a,
            o = new Promise(function (e, t) {
              ((a = e), (i = t));
            }),
            s = t ? t.onHeaders : void 0,
            c;
          s &&
            (c = function (e) {
              s(new Headers(e));
            });
          var l = Me(
              t ? t.identifierPrefix : void 0,
              t ? t.unstable_externalRuntimeSrc : void 0,
              t ? t.bootstrapScriptContent : void 0,
              t ? t.bootstrapScripts : void 0,
              t ? t.bootstrapModules : void 0,
            ),
            u = zi(
              e,
              l,
              je(
                l,
                t ? t.nonce : void 0,
                t ? t.unstable_externalRuntimeSrc : void 0,
                t ? t.importMap : void 0,
                c,
                t ? t.maxHeadersLength : void 0,
              ),
              Ne(t ? t.namespaceURI : void 0),
              t ? t.progressiveChunkSize : void 0,
              t ? t.onError : void 0,
              a,
              function () {
                var e = new ReadableStream(
                  {
                    type: `bytes`,
                    pull: function (e) {
                      Va(u, e);
                    },
                    cancel: function (e) {
                      ((u.destination = null), Ha(u, e));
                    },
                  },
                  { highWaterMark: 0 },
                );
                ((e.allReady = o), n(e));
              },
              function (e) {
                (o.catch(function () {}), r(e));
              },
              i,
              t ? t.onPostpone : void 0,
              t ? t.formState : void 0,
            );
          if (t && t.signal) {
            var d = t.signal;
            if (d.aborted) Ha(u, d.reason);
            else {
              var f = function () {
                (Ha(u, d.reason), d.removeEventListener(`abort`, f));
              };
              d.addEventListener(`abort`, f);
            }
          }
          za(u);
        });
      }),
      (e.resume = function (e, t, n) {
        return new Promise(function (r, i) {
          var a,
            o,
            s = new Promise(function (e, t) {
              ((o = e), (a = t));
            }),
            c = Vi(
              e,
              t,
              je(
                t.resumableState,
                n ? n.nonce : void 0,
                void 0,
                void 0,
                void 0,
                void 0,
              ),
              n ? n.onError : void 0,
              o,
              function () {
                var e = new ReadableStream(
                  {
                    type: `bytes`,
                    pull: function (e) {
                      Va(c, e);
                    },
                    cancel: function (e) {
                      ((c.destination = null), Ha(c, e));
                    },
                  },
                  { highWaterMark: 0 },
                );
                ((e.allReady = s), r(e));
              },
              function (e) {
                (s.catch(function () {}), i(e));
              },
              a,
              n ? n.onPostpone : void 0,
            );
          if (n && n.signal) {
            var l = n.signal;
            if (l.aborted) Ha(c, l.reason);
            else {
              var u = function () {
                (Ha(c, l.reason), l.removeEventListener(`abort`, u));
              };
              l.addEventListener(`abort`, u);
            }
          }
          za(c);
        });
      }),
      (e.resumeAndPrerender = function (e, t, n) {
        return new Promise(function (r, i) {
          var a = Hi(
            e,
            t,
            je(t.resumableState, void 0, void 0, void 0, void 0, void 0),
            n ? n.onError : void 0,
            function () {
              var e = new ReadableStream(
                {
                  type: `bytes`,
                  pull: function (e) {
                    Va(a, e);
                  },
                  cancel: function (e) {
                    ((a.destination = null), Ha(a, e));
                  },
                },
                { highWaterMark: 0 },
              );
              ((e = { postponed: Wa(a), prelude: e }), r(e));
            },
            void 0,
            void 0,
            i,
            n ? n.onPostpone : void 0,
          );
          if (n && n.signal) {
            var o = n.signal;
            if (o.aborted) Ha(a, o.reason);
            else {
              var s = function () {
                (Ha(a, o.reason), o.removeEventListener(`abort`, s));
              };
              o.addEventListener(`abort`, s);
            }
          }
          za(a);
        });
      }),
      (e.version = `19.2.5`));
  }),
  zt = t((e) => {
    var t = Lt(),
      n = Rt();
    ((e.version = t.version),
      (e.renderToString = t.renderToString),
      (e.renderToStaticMarkup = t.renderToStaticMarkup),
      (e.renderToReadableStream = n.renderToReadableStream),
      (e.resume = n.resume));
  })();
function Bt({
  brandColor: e,
  className: t,
  dataAttributes: n,
  icon: r,
  interactive: i = !1,
  style: a,
  text: o,
  textClassName: s,
  tooltipText: c,
}) {
  let l =
      r == null
        ? null
        : (0, ot.isValidElement)(r)
          ? (0, ot.cloneElement)(r, { className: h(he, r.props.className) })
          : (0, ot.createElement)(r, { className: he }),
    u = (0, zt.renderToStaticMarkup)(
      (0, ot.createElement)(
        `span`,
        {
          className: h(ge, ve, _e, i ? `cursor-interaction` : void 0, t),
          style: ye({ brandColor: e, style: a }),
          title: typeof c == `string` && c.length > 0 ? c : void 0,
          ...n,
        },
        l == null ? null : (0, ot.createElement)(`span`, { className: me }, l),
        (0, ot.createElement)(
          `span`,
          { className: h(`min-w-0 break-words`, s) },
          o,
        ),
      ),
    ),
    d = document.createElement(`span`);
  d.innerHTML = u;
  let f = d.firstElementChild;
  for (; f?.tagName === `LINK`; ) f = f.nextElementSibling;
  return f ?? d;
}
var Vt = new Ee(`skill-mention-ui`);
function Ht(e) {
  let t = `${e}-name`,
    n = `${e}-display-name`,
    r = `${e}-path`,
    i = `${e}-icon`,
    a = `${e}-brand-color`,
    o = ae;
  switch (e) {
    case `skill-mention`:
      o = B();
      break;
    case `app-mention`:
      o = Se;
      break;
    case `plugin-mention`:
      break;
  }
  return {
    attrs: {
      name: { validate: `string` },
      displayName: { validate: `string`, default: `` },
      path: { validate: `string` },
      description: { validate: `string` },
      iconSmall: { validate: `string`, default: `` },
      brandColor: { validate: `string`, default: `` },
    },
    inline: !0,
    group: `inline`,
    draggable: !1,
    selectable: !1,
    toDOM: (s) => {
      let c = s.attrs.displayName || s.attrs.name,
        l = s.attrs.path.length === 0,
        u =
          e === `app-mention` && T(s.attrs.iconSmall) != null
            ? ``
            : s.attrs.iconSmall;
      return Bt({
        text: c,
        icon:
          e === `skill-mention`
            ? o
            : de(null, {
                iconSmall: u,
                basePath: s.attrs.path,
                smallOnly: !0,
                alt: c,
                fallbackName: s.attrs.name,
                fallbackIcon: o,
              }),
        brandColor:
          typeof s.attrs.brandColor == `string` && s.attrs.brandColor.length > 0
            ? s.attrs.brandColor
            : void 0,
        interactive: !0,
        className: l
          ? `bg-token-foreground/5 text-token-description-foreground opacity-60 hover:bg-token-foreground/5`
          : void 0,
        dataAttributes: {
          [t]: s.attrs.name,
          [n]: c,
          [r]: s.attrs.path,
          [i]: s.attrs.iconSmall,
          [a]: s.attrs.brandColor,
        },
      });
    },
    parseDOM: [
      {
        tag: `span[${t}][${r}]`,
        getAttrs: (e) => {
          let o = e.getAttribute(t);
          return {
            name: o,
            displayName: e.getAttribute(n) ?? o,
            path: e.getAttribute(r),
            description: e.getAttribute(`title`) ?? ``,
            iconSmall: e.getAttribute(i) ?? ``,
            brandColor: e.getAttribute(a) ?? ``,
          };
        },
      },
    ],
  };
}
var Ut = Ht(`skill-mention`),
  Wt = Ht(`app-mention`),
  Gt = Ht(`plugin-mention`);
function Kt(e = {}) {
  return Nt({ key: Vt, trigger: `$`, wordPattern: /(^|\s)(\$[^$]*)$/, ...e });
}
var qt = new Ee(`slash-command-ui`),
  Jt = /(^|\s)(\/(?:(?<=^\/)[^/]*|[^\s/]*))$/,
  Yt = /(^|\s)([/@][^\s/@]*)$/;
function Z({ triggers: e = [`/`], ...t } = {}) {
  return Nt({
    key: qt,
    trigger: e,
    wordPattern: e.length === 1 && e[0] === `/` ? Jt : Yt,
    ...t,
  });
}
var Xt = new Ee(`customKeymapPlugin`),
  Zt = 0;
function Qt(e) {
  let t = {};
  for (let n of Object.values(e))
    if (n) for (let [e, r] of Object.entries(n)) r && (t[e] = r);
  return t;
}
function $t(e, t) {
  let n = `custom-keymap-subscription-${Zt}`;
  ((Zt += 1),
    e.dispatch(
      e.state.tr.setMeta(Xt, {
        handlers: t,
        subscriptionId: n,
        type: `addHandlers`,
      }),
    ));
  let r = !0;
  return () => {
    r &&
      ((r = !1),
      Xt.getState(e.state)?.handlerSubscriptions[n] &&
        e.dispatch(
          e.state.tr.setMeta(Xt, { subscriptionId: n, type: `removeHandlers` }),
        ));
  };
}
function en(e = {}) {
  return new Ae({
    key: Xt,
    state: {
      init() {
        return { handlerSubscriptions: {}, handlers: {}, ...e };
      },
      apply(e, t) {
        let n = e.getMeta(Xt);
        if (n?.type === `addHandlers`) {
          let e = { ...t.handlerSubscriptions, [n.subscriptionId]: n.handlers };
          return { handlerSubscriptions: e, handlers: Qt(e) };
        }
        if (n?.type === `removeHandlers`) {
          if (!t.handlerSubscriptions[n.subscriptionId]) return t;
          let { [n.subscriptionId]: e, ...r } = t.handlerSubscriptions;
          return { handlerSubscriptions: r, handlers: Qt(r) };
        }
        return t;
      },
    },
    props: {
      handleKeyDown(e, t) {
        let n = Xt.getState(e.state).handlers[t.key];
        return n ? n(t) : !1;
      },
    },
  });
}
var Q = r();
function tn({
  composerController: e,
  placeholder: t,
  ariaLabel: n,
  minHeight: r,
  disableAutoFocus: i = !1,
  isFocusComposerTarget: a = !1,
  singleLine: o = !1,
  onSubmit: s,
  onMentionHandler: c,
  onSkillMentionHandler: l,
  onCompositionStateChange: u,
  className: d,
}) {
  let f = (0, ot.useRef)(null),
    p = (0, ot.useRef)(!1),
    m = g((e) => {
      ((p.current = e), u?.(e));
    });
  return (
    (0, ot.useEffect)(() => {
      let t = f.current;
      if (t == null) throw Error(`RichTextInput rootRef is not mounted`);
      let n = e.view.dom;
      return (
        t.appendChild(n),
        (e.view.dom.dataset.virtualkeyboard = `true`),
        (n.style.fontSize = `var(--codex-chat-font-size)`),
        (n.style.height = `auto`),
        (n.style.resize = `none`),
        () => {
          (p.current && m(!1),
            n.blur(),
            n.parentElement === t && t.removeChild(n));
        }
      );
    }, [e, m]),
    (0, ot.useEffect)(() => {
      if (a) {
        e.view.dom.dataset.codexComposer = `true`;
        return;
      }
      delete e.view.dom.dataset.codexComposer;
    }, [e, a]),
    (0, ot.useEffect)(() => {
      i ||
        requestAnimationFrame(() => {
          e.focus();
        });
    }, [e, i]),
    (0, ot.useEffect)(() => {
      let t = e.view.dom;
      if (n) {
        t.setAttribute(`aria-label`, n);
        return;
      }
      t.removeAttribute(`aria-label`);
    }, [n, e]),
    (0, ot.useEffect)(() => {
      e.view.dom.style.minHeight = r ?? `2.5rem`;
    }, [e, r]),
    (0, ot.useEffect)(() => {
      e.setPlaceholder(t);
    }, [t, e]),
    (0, ot.useEffect)(() => {
      let t = (e) => {
          c?.(e === `complete-query` ? `complete-query` : `insert-mention`);
        },
        n = () => c?.(`close`),
        r = () => l?.(`submit`),
        i = () => l?.(`close`);
      e.addSubmitHandler(s);
      let a = c != null;
      a &&
        (e.eventEmitter.addListener(`mention-ui-submit`, t),
        e.eventEmitter.addListener(`mention-ui-close`, n));
      let o = l != null;
      return (
        o &&
          (e.eventEmitter.addListener(`skill-mention-ui-submit`, r),
          e.eventEmitter.addListener(`skill-mention-ui-close`, i)),
        () => {
          (e.removeSubmitHandler(s),
            a &&
              (e.eventEmitter.removeListener(`mention-ui-submit`, t),
              e.eventEmitter.removeListener(`mention-ui-close`, n)),
            o &&
              (e.eventEmitter.removeListener(`skill-mention-ui-submit`, r),
              e.eventEmitter.removeListener(`skill-mention-ui-close`, i)));
        }
      );
    }, [s, e, c, l]),
    (0, Q.jsx)(`div`, {
      ref: f,
      onMouseDown: (t) => {
        let n = e.view.dom;
        t.target instanceof Node &&
          (n.contains(t.target) || (t.preventDefault(), n.focus()));
      },
      onClick: (e) => {
        if (!(e.target instanceof Element)) return;
        let t = e.target.closest(`[at-mention-fs-path], [at-mention-path]`);
        if (t == null) return;
        let n =
          t.getAttribute(`at-mention-fs-path`) ||
          t.getAttribute(`at-mention-path`);
        n &&
          (e.preventDefault(), e.stopPropagation(), b({ path: n, cwd: null }));
      },
      onCompositionStart: () => m(!0),
      onCompositionEnd: () => m(!1),
      className: h(
        `text-size-chat`,
        `[&_.ProseMirror]:focus-visible:outline-none`,
        `text-token-foreground`,
        o
          ? `flex h-9 max-h-none items-center overflow-hidden [&_.ProseMirror]:!h-5 [&_.ProseMirror]:!min-h-5`
          : `h-auto max-h-[25dvh] overflow-y-auto [&_.ProseMirror]:h-auto [&_.ProseMirror]:min-h-[2rem]`,
        `[&_.ProseMirror]:resize-none`,
        `[&_.ProseMirror_p]:m-0`,
        o &&
          `[&_.ProseMirror]:min-w-0 [&_.ProseMirror]:flex-1 [&_.ProseMirror]:overflow-hidden [&_.ProseMirror]:whitespace-nowrap [&_.ProseMirror_p]:overflow-hidden [&_.ProseMirror_p]:text-ellipsis [&_.ProseMirror_p]:whitespace-nowrap`,
        d,
      ),
    })
  );
}
var nn = e(xe(), 1),
  rn = e(d(), 1);
function an(e) {
  let t = (0, at.c)(21),
    {
      className: n,
      query: r,
      onUpdateSelectedMention: i,
      onAddMention: a,
      onRequestClose: o,
      cwd: s,
      roots: c,
      hostId: l,
      chromeVariant: u,
      keyboardEventTarget: d,
    } = e,
    f = u === void 0 ? `default` : u,
    g = p(),
    { data: _ } = ee(),
    v;
  t[0] === l ? (v = t[1]) : ((v = { hostId: l }), (t[0] = l), (t[1] = v));
  let y = w(v),
    b = y.data == null ? null : y.data.filter(cn),
    { skills: x, isLoading: C } = pe(c ?? s, l),
    T = oe(),
    D;
  t[2] !== s || t[3] !== c
    ? ((D = c ?? (s ? [s] : [])), (t[2] = s), (t[3] = c), (t[4] = D))
    : (D = t[4]);
  let O = D,
    k = g.formatMessage({
      id: `composer.skillMentionList.app`,
      defaultMessage: `App`,
      description: `Label shown on the right side of app entries in the skill/app mention list`,
    }),
    A;
  t[5] !== _?.name || t[6] !== g || t[7] !== O
    ? ((A = (e) => {
        let t = I(e);
        return {
          ...t,
          key: t.path,
          scopeLabel: We({
            skill: e,
            intl: g,
            roots: O,
            adminLabel: _?.name ?? void 0,
          }),
          Icon: B(),
        };
      }),
      (t[5] = _?.name),
      (t[6] = g),
      (t[7] = O),
      (t[8] = A))
    : (A = t[8]);
  let j = ln(
      [
        ...(0, rn.default)(x.filter((e) => e.enabled && Be(e, T)).map(A), sn),
        ...(b == null
          ? []
          : b.map((e) => {
              let t = F(e);
              return {
                ...t,
                key: t.path,
                scopeLabel: k,
                appLogoUrl: e.logoUrl,
                appLogoDarkUrl: e.logoUrlDark,
                Icon: S(e) ?? void 0,
              };
            })),
      ],
      r,
    ),
    M = j.map(on),
    N = j.length === 0 && (C || (b == null && y.isLoading)),
    P = f === `default` ? `both` : `bottom`;
  Le({ isLoading: N, onRequestClose: o, query: r, resultCount: j.length });
  let {
      highlightedIndex: te,
      listRef: ne,
      getItemProps: L,
    } = Y({
      items: M,
      isActive: j.length > 0,
      captureWindowKeydown: !0,
      keyboardEventTarget: d,
      onSelect: (e, t) => {
        let n = j[t];
        n != null && (i(n), a(n));
      },
      onHighlight: (e, t) => {
        i(t >= 0 ? j[t] : null);
      },
    }),
    re = He,
    ie;
  t[9] === n
    ? (ie = t[10])
    : ((ie = h(`max-h-[240px] electron:text-base`, n)),
      (t[9] = n),
      (t[10] = ie));
  let R = Ve,
    z = N
      ? (0, Q.jsx)(ze, {
          children: (0, Q.jsx)(m, {
            id: `composer.skillMentionList.loading`,
            defaultMessage: `Loading skills and apps…`,
            description: `Shown while skill and app mentions are loading`,
          }),
        })
      : j.length === 0
        ? (0, Q.jsx)(ze, {
            children: (0, Q.jsx)(m, {
              id: `composer.skillMentionList.noResults`,
              defaultMessage: `No skills or apps found`,
              description: `Shown when no skill or app mentions match the query`,
            }),
          })
        : j.map((e, t) => {
            let n = B();
            return (0, Q.jsx)(
              Ie,
              {
                getItemProps: L,
                highlighted: t === te,
                itemIndex: t,
                children: (0, Q.jsxs)(`div`, {
                  className: `flex w-full min-w-0 items-center gap-2`,
                  children: [
                    e.kind === `app` && e.Icon != null
                      ? (0, Q.jsx)(e.Icon, { className: `icon-xs shrink-0` })
                      : e.kind === `app`
                        ? (0, Q.jsx)(E, {
                            alt: g.formatMessage(
                              {
                                id: `composer.skillMentionList.appLogoAlt`,
                                defaultMessage: `{name} logo`,
                                description: `Alt text for app logos in the skill/app mention list`,
                              },
                              { name: e.displayName },
                            ),
                            className: `icon-xs shrink-0 object-contain`,
                            logoUrl: e.appLogoUrl,
                            logoDarkUrl: e.appLogoDarkUrl,
                            fallback: (0, Q.jsx)(n, {
                              className: `icon-xs shrink-0`,
                            }),
                          })
                        : e.Icon
                          ? (0, Q.jsx)(e.Icon, {
                              className: `icon-xs shrink-0`,
                            })
                          : (0, Q.jsx)(n, { className: `icon-xs shrink-0` }),
                    (0, Q.jsx)(`span`, {
                      className: `flex-shrink-0 truncate`,
                      children: e.displayName,
                    }),
                    (0, Q.jsx)(`span`, {
                      className: `flex-1 truncate text-token-description-foreground`,
                      children: e.description,
                    }),
                    (0, Q.jsx)(`span`, {
                      className: h(
                        `ml-auto text-token-description-foreground shrink-0`,
                      ),
                      children: e.scopeLabel,
                    }),
                  ],
                }),
              },
              e.key,
            );
          }),
    ae;
  t[11] !== R || t[12] !== P || t[13] !== ne || t[14] !== z
    ? ((ae = (0, Q.jsx)(R, { fadeMaskVariant: P, listRef: ne, children: z })),
      (t[11] = R),
      (t[12] = P),
      (t[13] = ne),
      (t[14] = z),
      (t[15] = ae))
    : (ae = t[15]);
  let se;
  return (
    t[16] !== re || t[17] !== f || t[18] !== ie || t[19] !== ae
      ? ((se = (0, Q.jsx)(re, {
          chromeVariant: f,
          className: ie,
          children: ae,
        })),
        (t[16] = re),
        (t[17] = f),
        (t[18] = ie),
        (t[19] = ae),
        (t[20] = se))
      : (se = t[20]),
    se
  );
}
function on(e) {
  return e.key;
}
function sn(e) {
  return e.path;
}
function cn(e) {
  return e.isAccessible && e.isEnabled;
}
function ln(e, t) {
  let n = t.trim();
  return n.length === 0
    ? e
    : (0, nn.default)(
        e.map((e, t) => ({ item: e, score: un(e, n), index: t })),
        [(e) => -e.score, (e) => e.item.displayName, (e) => e.index],
      )
        .filter((e) => e.score > 0)
        .map((e) => e.item);
}
function un(e, t) {
  return Math.max(Ue(e.name, t), Ue(e.displayName, t), Ue(e.path, t));
}
var dn = e(f(), 1),
  fn = 360,
  pn = 12,
  mn = 8;
function hn(e) {
  let t = (0, at.c)(57),
    {
      autocomplete: n,
      cwd: r,
      roots: i,
      hostId: a,
      composerController: o,
      anchorRef: s,
      placement: c,
      portalRoot: l,
      listClassName: u,
      zIndexClassName: d,
      chromeVariant: f,
    } = e,
    p = c === void 0 ? `top` : c,
    m = l === void 0 ? `dialog` : l,
    g = d === void 0 ? `z-50` : d,
    _ = f === void 0 ? `default` : f,
    v = !!n.ui?.active,
    y;
  t[0] !== _ || t[1] !== p || t[2] !== g
    ? ((y = { placement: p, zIndexClassName: g, variant: _ }),
      (t[0] = _),
      (t[1] = p),
      (t[2] = g),
      (t[3] = y))
    : (y = t[3]);
  let {
      overlayPortalContainer: b,
      shellClassName: x,
      usesExpandedTopTray: S,
    } = ft(y),
    C;
  t[4] !== s || t[5] !== o || t[6] !== v || t[7] !== b
    ? ((C = (e) =>
        !v || b != null || (s == null && o == null) || typeof window > `u`
          ? gn
          : (window.addEventListener(`resize`, e),
            window.addEventListener(`scroll`, e, !0),
            () => {
              (window.removeEventListener(`resize`, e),
                window.removeEventListener(`scroll`, e, !0));
            })),
      (t[4] = s),
      (t[5] = o),
      (t[6] = v),
      (t[7] = b),
      (t[8] = C))
    : (C = t[8]);
  let ee = C,
    w;
  t[9] !== s || t[10] !== n.ui || t[11] !== o || t[12] !== p || t[13] !== m
    ? ((w = () => {
        let e = _n({
          composerController: o,
          mentionUiState: n.ui,
          anchorRef: s,
          placement: p,
          portalRoot: m,
        });
        return e == null
          ? null
          : `${e.fixedPosition}:${e.left}:${e.top}:${e.width}`;
      }),
      (t[9] = s),
      (t[10] = n.ui),
      (t[11] = o),
      (t[12] = p),
      (t[13] = m),
      (t[14] = w))
    : (w = t[14]);
  let T = (0, ot.useSyncExternalStore)(ee, w),
    E;
  bb0: {
    if (T == null) {
      E = null;
      break bb0;
    }
    let e;
    (t[15] !== s || t[16] !== n.ui || t[17] !== o || t[18] !== p || t[19] !== m
      ? ((e = _n({
          composerController: o,
          mentionUiState: n.ui,
          anchorRef: s,
          placement: p,
          portalRoot: m,
        })),
        (t[15] = s),
        (t[16] = n.ui),
        (t[17] = o),
        (t[18] = p),
        (t[19] = m),
        (t[20] = e))
      : (e = t[20]),
      (E = e));
  }
  let D = E;
  if (!v) return null;
  let O = n.ui?.query ?? ``,
    k;
  t[21] !== n.addMention ||
  t[22] !== n.closeAutocomplete ||
  t[23] !== n.setSelectedMention ||
  t[24] !== _ ||
  t[25] !== r ||
  t[26] !== a ||
  t[27] !== u ||
  t[28] !== i ||
  t[29] !== O
    ? ((k = (0, Q.jsx)(an, {
        className: u,
        query: O,
        onUpdateSelectedMention: n.setSelectedMention,
        onAddMention: n.addMention,
        onRequestClose: n.closeAutocomplete,
        cwd: r,
        roots: i,
        hostId: a,
        chromeVariant: _,
      })),
      (t[21] = n.addMention),
      (t[22] = n.closeAutocomplete),
      (t[23] = n.setSelectedMention),
      (t[24] = _),
      (t[25] = r),
      (t[26] = a),
      (t[27] = u),
      (t[28] = i),
      (t[29] = O),
      (t[30] = k))
    : (k = t[30]);
  let A = k;
  if (b != null) {
    let e;
    t[31] !== A || t[32] !== x || t[33] !== S
      ? ((e = (0, Q.jsx)(H, {
          "data-composer-overlay-floating-ui": !0,
          expandedTopTray: S,
          className: x,
          children: A,
        })),
        (t[31] = A),
        (t[32] = x),
        (t[33] = S),
        (t[34] = e))
      : (e = t[34]);
    let n;
    return (
      t[35] !== b || t[36] !== e
        ? ((n = (0, dn.createPortal)(e, b)),
          (t[35] = b),
          (t[36] = e),
          (t[37] = n))
        : (n = t[37]),
      n
    );
  }
  if (D != null) {
    let e = D.fixedPosition ? `fixed` : `absolute`,
      n = D.renderAbove && `-translate-y-full`,
      r;
    t[38] !== e || t[39] !== n || t[40] !== g
      ? ((r = h(e, n, g)), (t[38] = e), (t[39] = n), (t[40] = g), (t[41] = r))
      : (r = t[41]);
    let i;
    t[42] !== D.left || t[43] !== D.top || t[44] !== D.width
      ? ((i = { left: D.left, top: D.top, width: D.width }),
        (t[42] = D.left),
        (t[43] = D.top),
        (t[44] = D.width),
        (t[45] = i))
      : (i = t[45]);
    let a;
    t[46] !== A || t[47] !== r || t[48] !== i
      ? ((a = (0, Q.jsx)(`div`, {
          "data-composer-overlay-floating-ui": !0,
          className: r,
          style: i,
          children: A,
        })),
        (t[46] = A),
        (t[47] = r),
        (t[48] = i),
        (t[49] = a))
      : (a = t[49]);
    let o;
    return (
      t[50] !== D.portalContainer || t[51] !== a
        ? ((o = (0, dn.createPortal)(a, D.portalContainer)),
          (t[50] = D.portalContainer),
          (t[51] = a),
          (t[52] = o))
        : (o = t[52]),
      o
    );
  }
  let j;
  return (
    t[53] !== A || t[54] !== x || t[55] !== S
      ? ((j = (0, Q.jsx)(H, {
          "data-composer-overlay-floating-ui": !0,
          expandedTopTray: S,
          className: x,
          children: A,
        })),
        (t[53] = A),
        (t[54] = x),
        (t[55] = S),
        (t[56] = j))
      : (j = t[56]),
    j
  );
}
function gn() {}
function _n({
  composerController: e,
  mentionUiState: t,
  anchorRef: n,
  placement: r,
  portalRoot: i,
}) {
  if (typeof document > `u`) return null;
  let a = vn({
    composerController: e,
    mentionUiState: t,
    placement: r,
    portalRoot: i,
  });
  if (a != null) return a;
  if (n == null) return null;
  let o = n.current;
  if (o == null) return null;
  let s = yn({ anchorElement: o, portalRoot: i }),
    c = o.getBoundingClientRect(),
    l = s === document.body ? { left: 0, top: 0 } : s.getBoundingClientRect();
  return {
    portalContainer: s,
    left: c.left - l.left,
    top: (r === `top` ? c.top - 8 : c.bottom + 8) - l.top,
    width: c.width,
    fixedPosition: s === document.body,
    renderAbove: r === `top`,
  };
}
function vn({
  composerController: e,
  mentionUiState: t,
  placement: n,
  portalRoot: r,
}) {
  let i = t?.anchorPos;
  if (e == null || i == null) return null;
  let a = e.view.dom,
    o = yn({ anchorElement: a, portalRoot: r }),
    s =
      o === document.body
        ? {
            left: 0,
            top: 0,
            bottom: window.innerHeight,
            width: window.innerWidth,
            height: window.innerHeight,
          }
        : o.getBoundingClientRect(),
    c = e.view.coordsAtPos(i),
    l = Math.max(s.width - pn * 2, 0),
    u = Math.min(fn, l),
    d = bn(c.left - s.left, pn, s.width - u - pn),
    f = c.bottom - s.top + mn;
  return {
    portalContainer: o,
    left: d,
    top: n === `top` ? c.top - s.top - mn : f,
    width: u,
    fixedPosition: o === document.body,
    renderAbove: n === `top`,
  };
}
function yn({ anchorElement: e, portalRoot: t }) {
  return t === `body`
    ? document.body
    : (e.closest(`.codex-dialog`) ?? document.body);
}
function bn(e, t, n) {
  return n < t ? t : Math.min(Math.max(e, t), n);
}
function xn(e) {
  let t = (0, at.c)(15),
    n = Te(e, Sn),
    r = (0, ot.useRef)(null),
    i;
  t[0] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((i = (e) => {
        r.current = e;
      }),
      (t[0] = i))
    : (i = t[0]);
  let a = i,
    o;
  t[1] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((o = () => {
        r.current = null;
      }),
      (t[1] = o))
    : (o = t[1]);
  let s = o,
    c;
  t[2] !== e || t[3] !== n
    ? ((c = (t) => {
        n && t.insertMention({ composerController: e, mentionState: n });
      }),
      (t[2] = e),
      (t[3] = n),
      (t[4] = c))
    : (c = t[4]);
  let l = c,
    u;
  t[5] === e
    ? (u = t[6])
    : ((u = (t) => {
        At(e.view, Ft, t) && (r.current = null);
      }),
      (t[5] = e),
      (t[6] = u));
  let d = u,
    f;
  t[7] !== e || t[8] !== n
    ? ((f = (t) => {
        bb13: switch (t) {
          case `complete-query`:
            if (n && r.current) {
              let t = r.current;
              if (t.completeQuery != null) {
                t.completeQuery({ composerController: e, mentionState: n });
                break bb13;
              }
              t.insertMention({ composerController: e, mentionState: n });
            }
            s();
            break bb13;
          case `insert-mention`:
            (n &&
              r.current &&
              r.current.insertMention({
                composerController: e,
                mentionState: n,
              }),
              s());
            break bb13;
          case `close`:
            s();
        }
      }),
      (t[7] = e),
      (t[8] = n),
      (t[9] = f))
    : (f = t[9]);
  let p = f,
    m;
  return (
    t[10] !== l || t[11] !== d || t[12] !== p || t[13] !== n
      ? ((m = {
          ui: n,
          addMention: l,
          closeAutocomplete: d,
          setSelectedMention: a,
          handleMentionEvent: p,
        }),
        (t[10] = l),
        (t[11] = d),
        (t[12] = p),
        (t[13] = n),
        (t[14] = m))
      : (m = t[14]),
    m
  );
}
function Sn(e) {
  return Ft.getState(e.view.state);
}
function Cn(e) {
  let t = (0, at.c)(14),
    n = Te(e, wn),
    r = (0, ot.useRef)(null),
    i;
  t[0] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((i = (e) => {
        r.current = e;
      }),
      (t[0] = i))
    : (i = t[0]);
  let a = i,
    o;
  t[1] !== e || t[2] !== n
    ? ((o = (t) => {
        n && e.insertMention(t, n);
      }),
      (t[1] = e),
      (t[2] = n),
      (t[3] = o))
    : (o = t[3]);
  let s = o,
    c;
  t[4] === e
    ? (c = t[5])
    : ((c = (t) => {
        At(e.view, Vt, t) && (r.current = null);
      }),
      (t[4] = e),
      (t[5] = c));
  let l = c,
    u;
  t[6] !== e || t[7] !== n
    ? ((u = (t) => {
        if (t === `submit`) {
          let t = r.current;
          n && t != null && e.insertMention(t, n);
        }
        r.current = null;
      }),
      (t[6] = e),
      (t[7] = n),
      (t[8] = u))
    : (u = t[8]);
  let d = u,
    f;
  return (
    t[9] !== s || t[10] !== l || t[11] !== d || t[12] !== n
      ? ((f = {
          ui: n,
          addMention: s,
          closeAutocomplete: l,
          setSelectedMention: a,
          handleMentionEvent: d,
        }),
        (t[9] = s),
        (t[10] = l),
        (t[11] = d),
        (t[12] = n),
        (t[13] = f))
      : (f = t[13]),
    f
  );
}
function wn(e) {
  return Vt.getState(e.view.state);
}
var Tn = 65535,
  En = 2 ** 16;
function Dn(e, t) {
  return e + t * En;
}
function On(e) {
  return e & Tn;
}
function kn(e) {
  return (e - (e & Tn)) / En;
}
var An = 1,
  jn = 2,
  Mn = 4,
  Nn = 8,
  Pn = class {
    constructor(e, t, n) {
      ((this.pos = e), (this.delInfo = t), (this.recover = n));
    }
    get deleted() {
      return (this.delInfo & Nn) > 0;
    }
    get deletedBefore() {
      return (this.delInfo & (An | Mn)) > 0;
    }
    get deletedAfter() {
      return (this.delInfo & (jn | Mn)) > 0;
    }
    get deletedAcross() {
      return (this.delInfo & Mn) > 0;
    }
  },
  Fn = class e {
    constructor(t, n = !1) {
      if (((this.ranges = t), (this.inverted = n), !t.length && e.empty))
        return e.empty;
    }
    recover(e) {
      let t = 0,
        n = On(e);
      if (!this.inverted)
        for (let e = 0; e < n; e++)
          t += this.ranges[e * 3 + 2] - this.ranges[e * 3 + 1];
      return this.ranges[n * 3] + t + kn(e);
    }
    mapResult(e, t = 1) {
      return this._map(e, t, !1);
    }
    map(e, t = 1) {
      return this._map(e, t, !0);
    }
    _map(e, t, n) {
      let r = 0,
        i = this.inverted ? 2 : 1,
        a = this.inverted ? 1 : 2;
      for (let o = 0; o < this.ranges.length; o += 3) {
        let s = this.ranges[o] - (this.inverted ? r : 0);
        if (s > e) break;
        let c = this.ranges[o + i],
          l = this.ranges[o + a],
          u = s + c;
        if (e <= u) {
          let i = c ? (e == s ? -1 : e == u ? 1 : t) : t,
            a = s + r + (i < 0 ? 0 : l);
          if (n) return a;
          let d = e == (t < 0 ? s : u) ? null : Dn(o / 3, e - s),
            f = e == s ? jn : e == u ? An : Mn;
          return ((t < 0 ? e != s : e != u) && (f |= Nn), new Pn(a, f, d));
        }
        r += l - c;
      }
      return n ? e + r : new Pn(e + r, 0, null);
    }
    touches(e, t) {
      let n = 0,
        r = On(t),
        i = this.inverted ? 2 : 1,
        a = this.inverted ? 1 : 2;
      for (let t = 0; t < this.ranges.length; t += 3) {
        let o = this.ranges[t] - (this.inverted ? n : 0);
        if (o > e) break;
        let s = this.ranges[t + i];
        if (e <= o + s && t == r * 3) return !0;
        n += this.ranges[t + a] - s;
      }
      return !1;
    }
    forEach(e) {
      let t = this.inverted ? 2 : 1,
        n = this.inverted ? 1 : 2;
      for (let r = 0, i = 0; r < this.ranges.length; r += 3) {
        let a = this.ranges[r],
          o = a - (this.inverted ? i : 0),
          s = a + (this.inverted ? 0 : i),
          c = this.ranges[r + t],
          l = this.ranges[r + n];
        (e(o, o + c, s, s + l), (i += l - c));
      }
    }
    invert() {
      return new e(this.ranges, !this.inverted);
    }
    toString() {
      return (this.inverted ? `-` : ``) + JSON.stringify(this.ranges);
    }
    static offset(t) {
      return t == 0 ? e.empty : new e(t < 0 ? [0, -t, 0] : [0, 0, t]);
    }
  };
Fn.empty = new Fn([]);
var In = Object.create(null),
  Ln = class {
    getMap() {
      return Fn.empty;
    }
    merge(e) {
      return null;
    }
    static fromJSON(e, t) {
      if (!t || !t.stepType)
        throw RangeError(`Invalid input for Step.fromJSON`);
      let n = In[t.stepType];
      if (!n) throw RangeError(`No step type ${t.stepType} defined`);
      return n.fromJSON(e, t);
    }
    static jsonID(e, t) {
      if (e in In) throw RangeError(`Duplicate use of step JSON ID ` + e);
      return ((In[e] = t), (t.prototype.jsonID = e), t);
    }
  },
  Rn = class e {
    constructor(e, t) {
      ((this.doc = e), (this.failed = t));
    }
    static ok(t) {
      return new e(t, null);
    }
    static fail(t) {
      return new e(null, t);
    }
    static fromReplace(t, n, r, i) {
      try {
        return e.ok(t.replace(n, r, i));
      } catch (t) {
        if (t instanceof Me) return e.fail(t.message);
        throw t;
      }
    }
  };
function zn(e, t, n) {
  let r = [];
  for (let i = 0; i < e.childCount; i++) {
    let a = e.child(i);
    (a.content.size && (a = a.copy(zn(a.content, t, a))),
      a.isInline && (a = t(a, n, i)),
      r.push(a));
  }
  return U.fromArray(r);
}
var Bn = class e extends Ln {
  constructor(e, t, n) {
    (super(), (this.from = e), (this.to = t), (this.mark = n));
  }
  apply(e) {
    let t = e.slice(this.from, this.to),
      n = e.resolve(this.from),
      r = n.node(n.sharedDepth(this.to)),
      i = new W(
        zn(
          t.content,
          (e, t) =>
            !e.isAtom || !t.type.allowsMarkType(this.mark.type)
              ? e
              : e.mark(this.mark.addToSet(e.marks)),
          r,
        ),
        t.openStart,
        t.openEnd,
      );
    return Rn.fromReplace(e, this.from, this.to, i);
  }
  invert() {
    return new Vn(this.from, this.to, this.mark);
  }
  map(t) {
    let n = t.mapResult(this.from, 1),
      r = t.mapResult(this.to, -1);
    return (n.deleted && r.deleted) || n.pos >= r.pos
      ? null
      : new e(n.pos, r.pos, this.mark);
  }
  merge(t) {
    return t instanceof e &&
      t.mark.eq(this.mark) &&
      this.from <= t.to &&
      this.to >= t.from
      ? new e(Math.min(this.from, t.from), Math.max(this.to, t.to), this.mark)
      : null;
  }
  toJSON() {
    return {
      stepType: `addMark`,
      mark: this.mark.toJSON(),
      from: this.from,
      to: this.to,
    };
  }
  static fromJSON(t, n) {
    if (typeof n.from != `number` || typeof n.to != `number`)
      throw RangeError(`Invalid input for AddMarkStep.fromJSON`);
    return new e(n.from, n.to, t.markFromJSON(n.mark));
  }
};
Ln.jsonID(`addMark`, Bn);
var Vn = class e extends Ln {
  constructor(e, t, n) {
    (super(), (this.from = e), (this.to = t), (this.mark = n));
  }
  apply(e) {
    let t = e.slice(this.from, this.to),
      n = new W(
        zn(t.content, (e) => e.mark(this.mark.removeFromSet(e.marks)), e),
        t.openStart,
        t.openEnd,
      );
    return Rn.fromReplace(e, this.from, this.to, n);
  }
  invert() {
    return new Bn(this.from, this.to, this.mark);
  }
  map(t) {
    let n = t.mapResult(this.from, 1),
      r = t.mapResult(this.to, -1);
    return (n.deleted && r.deleted) || n.pos >= r.pos
      ? null
      : new e(n.pos, r.pos, this.mark);
  }
  merge(t) {
    return t instanceof e &&
      t.mark.eq(this.mark) &&
      this.from <= t.to &&
      this.to >= t.from
      ? new e(Math.min(this.from, t.from), Math.max(this.to, t.to), this.mark)
      : null;
  }
  toJSON() {
    return {
      stepType: `removeMark`,
      mark: this.mark.toJSON(),
      from: this.from,
      to: this.to,
    };
  }
  static fromJSON(t, n) {
    if (typeof n.from != `number` || typeof n.to != `number`)
      throw RangeError(`Invalid input for RemoveMarkStep.fromJSON`);
    return new e(n.from, n.to, t.markFromJSON(n.mark));
  }
};
Ln.jsonID(`removeMark`, Vn);
var Hn = class e extends Ln {
  constructor(e, t) {
    (super(), (this.pos = e), (this.mark = t));
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t) return Rn.fail(`No node at mark step's position`);
    let n = t.type.create(t.attrs, null, this.mark.addToSet(t.marks));
    return Rn.fromReplace(
      e,
      this.pos,
      this.pos + 1,
      new W(U.from(n), 0, t.isLeaf ? 0 : 1),
    );
  }
  invert(t) {
    let n = t.nodeAt(this.pos);
    if (n) {
      let t = this.mark.addToSet(n.marks);
      if (t.length == n.marks.length) {
        for (let r = 0; r < n.marks.length; r++)
          if (!n.marks[r].isInSet(t)) return new e(this.pos, n.marks[r]);
        return new e(this.pos, this.mark);
      }
    }
    return new Un(this.pos, this.mark);
  }
  map(t) {
    let n = t.mapResult(this.pos, 1);
    return n.deletedAfter ? null : new e(n.pos, this.mark);
  }
  toJSON() {
    return { stepType: `addNodeMark`, pos: this.pos, mark: this.mark.toJSON() };
  }
  static fromJSON(t, n) {
    if (typeof n.pos != `number`)
      throw RangeError(`Invalid input for AddNodeMarkStep.fromJSON`);
    return new e(n.pos, t.markFromJSON(n.mark));
  }
};
Ln.jsonID(`addNodeMark`, Hn);
var Un = class e extends Ln {
  constructor(e, t) {
    (super(), (this.pos = e), (this.mark = t));
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t) return Rn.fail(`No node at mark step's position`);
    let n = t.type.create(t.attrs, null, this.mark.removeFromSet(t.marks));
    return Rn.fromReplace(
      e,
      this.pos,
      this.pos + 1,
      new W(U.from(n), 0, t.isLeaf ? 0 : 1),
    );
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    return !t || !this.mark.isInSet(t.marks)
      ? this
      : new Hn(this.pos, this.mark);
  }
  map(t) {
    let n = t.mapResult(this.pos, 1);
    return n.deletedAfter ? null : new e(n.pos, this.mark);
  }
  toJSON() {
    return {
      stepType: `removeNodeMark`,
      pos: this.pos,
      mark: this.mark.toJSON(),
    };
  }
  static fromJSON(t, n) {
    if (typeof n.pos != `number`)
      throw RangeError(`Invalid input for RemoveNodeMarkStep.fromJSON`);
    return new e(n.pos, t.markFromJSON(n.mark));
  }
};
Ln.jsonID(`removeNodeMark`, Un);
var Wn = class e extends Ln {
  constructor(e, t, n, r = !1) {
    (super(),
      (this.from = e),
      (this.to = t),
      (this.slice = n),
      (this.structure = r));
  }
  apply(e) {
    return this.structure && Kn(e, this.from, this.to)
      ? Rn.fail(`Structure replace would overwrite content`)
      : Rn.fromReplace(e, this.from, this.to, this.slice);
  }
  getMap() {
    return new Fn([this.from, this.to - this.from, this.slice.size]);
  }
  invert(t) {
    return new e(
      this.from,
      this.from + this.slice.size,
      t.slice(this.from, this.to),
    );
  }
  map(t) {
    let n = t.mapResult(this.from, 1),
      r = t.mapResult(this.to, -1);
    return n.deletedAcross && r.deletedAcross
      ? null
      : new e(n.pos, Math.max(n.pos, r.pos), this.slice, this.structure);
  }
  merge(t) {
    if (!(t instanceof e) || t.structure || this.structure) return null;
    if (
      this.from + this.slice.size == t.from &&
      !this.slice.openEnd &&
      !t.slice.openStart
    ) {
      let n =
        this.slice.size + t.slice.size == 0
          ? W.empty
          : new W(
              this.slice.content.append(t.slice.content),
              this.slice.openStart,
              t.slice.openEnd,
            );
      return new e(this.from, this.to + (t.to - t.from), n, this.structure);
    } else if (t.to == this.from && !this.slice.openStart && !t.slice.openEnd) {
      let n =
        this.slice.size + t.slice.size == 0
          ? W.empty
          : new W(
              t.slice.content.append(this.slice.content),
              t.slice.openStart,
              this.slice.openEnd,
            );
      return new e(t.from, this.to, n, this.structure);
    } else return null;
  }
  toJSON() {
    let e = { stepType: `replace`, from: this.from, to: this.to };
    return (
      this.slice.size && (e.slice = this.slice.toJSON()),
      this.structure && (e.structure = !0),
      e
    );
  }
  static fromJSON(t, n) {
    if (typeof n.from != `number` || typeof n.to != `number`)
      throw RangeError(`Invalid input for ReplaceStep.fromJSON`);
    return new e(n.from, n.to, W.fromJSON(t, n.slice), !!n.structure);
  }
};
Ln.jsonID(`replace`, Wn);
var Gn = class e extends Ln {
  constructor(e, t, n, r, i, a, o = !1) {
    (super(),
      (this.from = e),
      (this.to = t),
      (this.gapFrom = n),
      (this.gapTo = r),
      (this.slice = i),
      (this.insert = a),
      (this.structure = o));
  }
  apply(e) {
    if (
      this.structure &&
      (Kn(e, this.from, this.gapFrom) || Kn(e, this.gapTo, this.to))
    )
      return Rn.fail(`Structure gap-replace would overwrite content`);
    let t = e.slice(this.gapFrom, this.gapTo);
    if (t.openStart || t.openEnd) return Rn.fail(`Gap is not a flat range`);
    let n = this.slice.insertAt(this.insert, t.content);
    return n
      ? Rn.fromReplace(e, this.from, this.to, n)
      : Rn.fail(`Content does not fit in gap`);
  }
  getMap() {
    return new Fn([
      this.from,
      this.gapFrom - this.from,
      this.insert,
      this.gapTo,
      this.to - this.gapTo,
      this.slice.size - this.insert,
    ]);
  }
  invert(t) {
    let n = this.gapTo - this.gapFrom;
    return new e(
      this.from,
      this.from + this.slice.size + n,
      this.from + this.insert,
      this.from + this.insert + n,
      t
        .slice(this.from, this.to)
        .removeBetween(this.gapFrom - this.from, this.gapTo - this.from),
      this.gapFrom - this.from,
      this.structure,
    );
  }
  map(t) {
    let n = t.mapResult(this.from, 1),
      r = t.mapResult(this.to, -1),
      i = this.from == this.gapFrom ? n.pos : t.map(this.gapFrom, -1),
      a = this.to == this.gapTo ? r.pos : t.map(this.gapTo, 1);
    return (n.deletedAcross && r.deletedAcross) || i < n.pos || a > r.pos
      ? null
      : new e(n.pos, r.pos, i, a, this.slice, this.insert, this.structure);
  }
  toJSON() {
    let e = {
      stepType: `replaceAround`,
      from: this.from,
      to: this.to,
      gapFrom: this.gapFrom,
      gapTo: this.gapTo,
      insert: this.insert,
    };
    return (
      this.slice.size && (e.slice = this.slice.toJSON()),
      this.structure && (e.structure = !0),
      e
    );
  }
  static fromJSON(t, n) {
    if (
      typeof n.from != `number` ||
      typeof n.to != `number` ||
      typeof n.gapFrom != `number` ||
      typeof n.gapTo != `number` ||
      typeof n.insert != `number`
    )
      throw RangeError(`Invalid input for ReplaceAroundStep.fromJSON`);
    return new e(
      n.from,
      n.to,
      n.gapFrom,
      n.gapTo,
      W.fromJSON(t, n.slice),
      n.insert,
      !!n.structure,
    );
  }
};
Ln.jsonID(`replaceAround`, Gn);
function Kn(e, t, n) {
  let r = e.resolve(t),
    i = n - t,
    a = r.depth;
  for (; i > 0 && a > 0 && r.indexAfter(a) == r.node(a).childCount; )
    (a--, i--);
  if (i > 0) {
    let e = r.node(a).maybeChild(r.indexAfter(a));
    for (; i > 0; ) {
      if (!e || e.isLeaf) return !0;
      ((e = e.firstChild), i--);
    }
  }
  return !1;
}
function qn(e, t, n) {
  return (
    (t == 0 || e.canReplace(t, e.childCount)) &&
    (n == e.childCount || e.canReplace(0, n))
  );
}
function Jn(e) {
  let t = e.parent.content.cutByIndex(e.startIndex, e.endIndex);
  for (let n = e.depth; ; --n) {
    let r = e.$from.node(n),
      i = e.$from.index(n),
      a = e.$to.indexAfter(n);
    if (n < e.depth && r.canReplace(i, a, t)) return n;
    if (n == 0 || r.type.spec.isolating || !qn(r, i, a)) break;
  }
  return null;
}
function Yn(e, t, n = 1, r) {
  let i = e.resolve(t),
    a = i.depth - n,
    o = (r && r[r.length - 1]) || i.parent;
  if (
    a < 0 ||
    i.parent.type.spec.isolating ||
    !i.parent.canReplace(i.index(), i.parent.childCount) ||
    !o.type.validContent(
      i.parent.content.cutByIndex(i.index(), i.parent.childCount),
    )
  )
    return !1;
  for (let e = i.depth - 1, t = n - 2; e > a; e--, t--) {
    let n = i.node(e),
      a = i.index(e);
    if (n.type.spec.isolating) return !1;
    let o = n.content.cutByIndex(a, n.childCount),
      s = r && r[t + 1];
    s && (o = o.replaceChild(0, s.type.create(s.attrs)));
    let c = (r && r[t]) || n;
    if (!n.canReplace(a + 1, n.childCount) || !c.type.validContent(o))
      return !1;
  }
  let s = i.indexAfter(a),
    c = r && r[0];
  return i.node(a).canReplaceWith(s, s, c ? c.type : i.node(a + 1).type);
}
function Xn(e, t) {
  let n = e.resolve(t),
    r = n.index();
  return Qn(n.nodeBefore, n.nodeAfter) && n.parent.canReplace(r, r + 1);
}
function Zn(e, t) {
  t.content.size || e.type.compatibleContent(t.type);
  let n = e.contentMatchAt(e.childCount),
    { linebreakReplacement: r } = e.type.schema;
  for (let i = 0; i < t.childCount; i++) {
    let a = t.child(i),
      o = a.type == r ? e.type.schema.nodes.text : a.type;
    if (((n = n.matchType(o)), !n || !e.type.allowsMarks(a.marks))) return !1;
  }
  return n.validEnd;
}
function Qn(e, t) {
  return !!(e && t && !e.isLeaf && Zn(e, t));
}
function $n(e, t, n = t, r = W.empty) {
  if (t == n && !r.size) return null;
  let i = e.resolve(t),
    a = e.resolve(n);
  return er(i, a, r) ? new Wn(t, n, r) : new tr(i, a, r).fit();
}
function er(e, t, n) {
  return (
    !n.openStart &&
    !n.openEnd &&
    e.start() == t.start() &&
    e.parent.canReplace(e.index(), t.index(), n.content)
  );
}
var tr = class {
  constructor(e, t, n) {
    ((this.$from = e),
      (this.$to = t),
      (this.unplaced = n),
      (this.frontier = []),
      (this.placed = U.empty));
    for (let t = 0; t <= e.depth; t++) {
      let n = e.node(t);
      this.frontier.push({
        type: n.type,
        match: n.contentMatchAt(e.indexAfter(t)),
      });
    }
    for (let t = e.depth; t > 0; t--)
      this.placed = U.from(e.node(t).copy(this.placed));
  }
  get depth() {
    return this.frontier.length - 1;
  }
  fit() {
    for (; this.unplaced.size; ) {
      let e = this.findFittable();
      e ? this.placeNodes(e) : this.openMore() || this.dropNode();
    }
    let e = this.mustMoveInline(),
      t = this.placed.size - this.depth - this.$from.depth,
      n = this.$from,
      r = this.close(e < 0 ? this.$to : n.doc.resolve(e));
    if (!r) return null;
    let i = this.placed,
      a = n.depth,
      o = r.depth;
    for (; a && o && i.childCount == 1; )
      ((i = i.firstChild.content), a--, o--);
    let s = new W(i, a, o);
    return e > -1
      ? new Gn(n.pos, e, this.$to.pos, this.$to.end(), s, t)
      : s.size || n.pos != this.$to.pos
        ? new Wn(n.pos, r.pos, s)
        : null;
  }
  findFittable() {
    let e = this.unplaced.openStart;
    for (
      let t = this.unplaced.content, n = 0, r = this.unplaced.openEnd;
      n < e;
      n++
    ) {
      let i = t.firstChild;
      if ((t.childCount > 1 && (r = 0), i.type.spec.isolating && r <= n)) {
        e = n;
        break;
      }
      t = i.content;
    }
    for (let t = 1; t <= 2; t++)
      for (let n = t == 1 ? e : this.unplaced.openStart; n >= 0; n--) {
        let e,
          r = null;
        n
          ? ((r = ir(this.unplaced.content, n - 1).firstChild), (e = r.content))
          : (e = this.unplaced.content);
        let i = e.firstChild;
        for (let e = this.depth; e >= 0; e--) {
          let { type: a, match: o } = this.frontier[e],
            s,
            c = null;
          if (
            t == 1 &&
            (i
              ? o.matchType(i.type) || (c = o.fillBefore(U.from(i), !1))
              : r && a.compatibleContent(r.type))
          )
            return { sliceDepth: n, frontierDepth: e, parent: r, inject: c };
          if (t == 2 && i && (s = o.findWrapping(i.type)))
            return { sliceDepth: n, frontierDepth: e, parent: r, wrap: s };
          if (r && o.matchType(r.type)) break;
        }
      }
  }
  openMore() {
    let { content: e, openStart: t, openEnd: n } = this.unplaced,
      r = ir(e, t);
    return !r.childCount || r.firstChild.isLeaf
      ? !1
      : ((this.unplaced = new W(
          e,
          t + 1,
          Math.max(n, r.size + t >= e.size - n ? t + 1 : 0),
        )),
        !0);
  }
  dropNode() {
    let { content: e, openStart: t, openEnd: n } = this.unplaced,
      r = ir(e, t);
    if (r.childCount <= 1 && t > 0) {
      let i = e.size - t <= t + r.size;
      this.unplaced = new W(nr(e, t - 1, 1), t - 1, i ? t - 1 : n);
    } else this.unplaced = new W(nr(e, t, 1), t, n);
  }
  placeNodes({
    sliceDepth: e,
    frontierDepth: t,
    parent: n,
    inject: r,
    wrap: i,
  }) {
    for (; this.depth > t; ) this.closeFrontierNode();
    if (i) for (let e = 0; e < i.length; e++) this.openFrontierNode(i[e]);
    let a = this.unplaced,
      o = n ? n.content : a.content,
      s = a.openStart - e,
      c = 0,
      l = [],
      { match: u, type: d } = this.frontier[t];
    if (r) {
      for (let e = 0; e < r.childCount; e++) l.push(r.child(e));
      u = u.matchFragment(r);
    }
    let f = o.size + e - (a.content.size - a.openEnd);
    for (; c < o.childCount; ) {
      let e = o.child(c),
        t = u.matchType(e.type);
      if (!t) break;
      (c++,
        (c > 1 || s == 0 || e.content.size) &&
          ((u = t),
          l.push(
            ar(
              e.mark(d.allowedMarks(e.marks)),
              c == 1 ? s : 0,
              c == o.childCount ? f : -1,
            ),
          )));
    }
    let p = c == o.childCount;
    (p || (f = -1),
      (this.placed = rr(this.placed, t, U.from(l))),
      (this.frontier[t].match = u),
      p &&
        f < 0 &&
        n &&
        n.type == this.frontier[this.depth].type &&
        this.frontier.length > 1 &&
        this.closeFrontierNode());
    for (let e = 0, t = o; e < f; e++) {
      let e = t.lastChild;
      (this.frontier.push({
        type: e.type,
        match: e.contentMatchAt(e.childCount),
      }),
        (t = e.content));
    }
    this.unplaced = p
      ? e == 0
        ? W.empty
        : new W(nr(a.content, e - 1, 1), e - 1, f < 0 ? a.openEnd : e - 1)
      : new W(nr(a.content, e, c), a.openStart, a.openEnd);
  }
  mustMoveInline() {
    if (!this.$to.parent.isTextblock) return -1;
    let e = this.frontier[this.depth],
      t;
    if (
      !e.type.isTextblock ||
      !or(this.$to, this.$to.depth, e.type, e.match, !1) ||
      (this.$to.depth == this.depth &&
        (t = this.findCloseLevel(this.$to)) &&
        t.depth == this.depth)
    )
      return -1;
    let { depth: n } = this.$to,
      r = this.$to.after(n);
    for (; n > 1 && r == this.$to.end(--n); ) ++r;
    return r;
  }
  findCloseLevel(e) {
    scan: for (let t = Math.min(this.depth, e.depth); t >= 0; t--) {
      let { match: n, type: r } = this.frontier[t],
        i = t < e.depth && e.end(t + 1) == e.pos + (e.depth - (t + 1)),
        a = or(e, t, r, n, i);
      if (a) {
        for (let n = t - 1; n >= 0; n--) {
          let { match: t, type: r } = this.frontier[n],
            i = or(e, n, r, t, !0);
          if (!i || i.childCount) continue scan;
        }
        return {
          depth: t,
          fit: a,
          move: i ? e.doc.resolve(e.after(t + 1)) : e,
        };
      }
    }
  }
  close(e) {
    let t = this.findCloseLevel(e);
    if (!t) return null;
    for (; this.depth > t.depth; ) this.closeFrontierNode();
    (t.fit.childCount && (this.placed = rr(this.placed, t.depth, t.fit)),
      (e = t.move));
    for (let n = t.depth + 1; n <= e.depth; n++) {
      let t = e.node(n),
        r = t.type.contentMatch.fillBefore(t.content, !0, e.index(n));
      this.openFrontierNode(t.type, t.attrs, r);
    }
    return e;
  }
  openFrontierNode(e, t = null, n) {
    let r = this.frontier[this.depth];
    ((r.match = r.match.matchType(e)),
      (this.placed = rr(this.placed, this.depth, U.from(e.create(t, n)))),
      this.frontier.push({ type: e, match: e.contentMatch }));
  }
  closeFrontierNode() {
    let e = this.frontier.pop().match.fillBefore(U.empty, !0);
    e.childCount && (this.placed = rr(this.placed, this.frontier.length, e));
  }
};
function nr(e, t, n) {
  return t == 0
    ? e.cutByIndex(n, e.childCount)
    : e.replaceChild(0, e.firstChild.copy(nr(e.firstChild.content, t - 1, n)));
}
function rr(e, t, n) {
  return t == 0
    ? e.append(n)
    : e.replaceChild(
        e.childCount - 1,
        e.lastChild.copy(rr(e.lastChild.content, t - 1, n)),
      );
}
function ir(e, t) {
  for (let n = 0; n < t; n++) e = e.firstChild.content;
  return e;
}
function ar(e, t, n) {
  if (t <= 0) return e;
  let r = e.content;
  return (
    t > 1 &&
      (r = r.replaceChild(
        0,
        ar(r.firstChild, t - 1, r.childCount == 1 ? n - 1 : 0),
      )),
    t > 0 &&
      ((r = e.type.contentMatch.fillBefore(r).append(r)),
      n <= 0 &&
        (r = r.append(
          e.type.contentMatch.matchFragment(r).fillBefore(U.empty, !0),
        ))),
    e.copy(r)
  );
}
function or(e, t, n, r, i) {
  let a = e.node(t),
    o = i ? e.indexAfter(t) : e.index(t);
  if (o == a.childCount && !n.compatibleContent(a.type)) return null;
  let s = r.fillBefore(a.content, !0, o);
  return s && !sr(n, a.content, o) ? s : null;
}
function sr(e, t, n) {
  for (let r = n; r < t.childCount; r++)
    if (!e.allowsMarks(t.child(r).marks)) return !0;
  return !1;
}
var cr = class e extends Ln {
  constructor(e, t, n) {
    (super(), (this.pos = e), (this.attr = t), (this.value = n));
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t) return Rn.fail(`No node at attribute step's position`);
    let n = Object.create(null);
    for (let e in t.attrs) n[e] = t.attrs[e];
    n[this.attr] = this.value;
    let r = t.type.create(n, null, t.marks);
    return Rn.fromReplace(
      e,
      this.pos,
      this.pos + 1,
      new W(U.from(r), 0, t.isLeaf ? 0 : 1),
    );
  }
  getMap() {
    return Fn.empty;
  }
  invert(t) {
    return new e(this.pos, this.attr, t.nodeAt(this.pos).attrs[this.attr]);
  }
  map(t) {
    let n = t.mapResult(this.pos, 1);
    return n.deletedAfter ? null : new e(n.pos, this.attr, this.value);
  }
  toJSON() {
    return {
      stepType: `attr`,
      pos: this.pos,
      attr: this.attr,
      value: this.value,
    };
  }
  static fromJSON(t, n) {
    if (typeof n.pos != `number` || typeof n.attr != `string`)
      throw RangeError(`Invalid input for AttrStep.fromJSON`);
    return new e(n.pos, n.attr, n.value);
  }
};
Ln.jsonID(`attr`, cr);
var lr = class e extends Ln {
  constructor(e, t) {
    (super(), (this.attr = e), (this.value = t));
  }
  apply(e) {
    let t = Object.create(null);
    for (let n in e.attrs) t[n] = e.attrs[n];
    t[this.attr] = this.value;
    let n = e.type.create(t, e.content, e.marks);
    return Rn.ok(n);
  }
  getMap() {
    return Fn.empty;
  }
  invert(t) {
    return new e(this.attr, t.attrs[this.attr]);
  }
  map(e) {
    return this;
  }
  toJSON() {
    return { stepType: `docAttr`, attr: this.attr, value: this.value };
  }
  static fromJSON(t, n) {
    if (typeof n.attr != `string`)
      throw RangeError(`Invalid input for DocAttrStep.fromJSON`);
    return new e(n.attr, n.value);
  }
};
Ln.jsonID(`docAttr`, lr);
var ur = class extends Error {};
((ur = function e(t) {
  let n = Error.call(this, t);
  return ((n.__proto__ = e.prototype), n);
}),
  (ur.prototype = Object.create(Error.prototype)),
  (ur.prototype.constructor = ur),
  (ur.prototype.name = `TransformError`));
var dr = (e, t) =>
  e.selection.empty
    ? !1
    : (t && t(e.tr.deleteSelection().scrollIntoView()), !0);
function fr(e, t) {
  let { $cursor: n } = e.selection;
  return !n || (t ? !t.endOfTextblock(`backward`, e) : n.parentOffset > 0)
    ? null
    : n;
}
var pr = (e, t, n) => {
  let r = fr(e, n);
  if (!r) return !1;
  let i = gr(r);
  if (!i) {
    let n = r.blockRange(),
      i = n && Jn(n);
    return i == null ? !1 : (t && t(e.tr.lift(n, i).scrollIntoView()), !0);
  }
  let a = i.nodeBefore;
  if (Ar(e, i, t, -1)) return !0;
  if (r.parent.content.size == 0 && (mr(a, `end`) || q.isSelectable(a)))
    for (let n = r.depth; ; n--) {
      let o = $n(e.doc, r.before(n), r.after(n), W.empty);
      if (o && o.slice.size < o.to - o.from) {
        if (t) {
          let n = e.tr.step(o);
          (n.setSelection(
            mr(a, `end`)
              ? K.findFrom(n.doc.resolve(n.mapping.map(i.pos, -1)), -1)
              : q.create(n.doc, i.pos - a.nodeSize),
          ),
            t(n.scrollIntoView()));
        }
        return !0;
      }
      if (n == 1 || r.node(n - 1).childCount > 1) break;
    }
  return a.isAtom && i.depth == r.depth - 1
    ? (t && t(e.tr.delete(i.pos - a.nodeSize, i.pos).scrollIntoView()), !0)
    : !1;
};
function mr(e, t, n = !1) {
  for (let r = e; r; r = t == `start` ? r.firstChild : r.lastChild) {
    if (r.isTextblock) return !0;
    if (n && r.childCount != 1) return !1;
  }
  return !1;
}
var hr = (e, t, n) => {
  let { $head: r, empty: i } = e.selection,
    a = r;
  if (!i) return !1;
  if (r.parent.isTextblock) {
    if (n ? !n.endOfTextblock(`backward`, e) : r.parentOffset > 0) return !1;
    a = gr(r);
  }
  let o = a && a.nodeBefore;
  return !o || !q.isSelectable(o)
    ? !1
    : (t &&
        t(
          e.tr
            .setSelection(q.create(e.doc, a.pos - o.nodeSize))
            .scrollIntoView(),
        ),
      !0);
};
function gr(e) {
  if (!e.parent.type.spec.isolating)
    for (let t = e.depth - 1; t >= 0; t--) {
      if (e.index(t) > 0) return e.doc.resolve(e.before(t + 1));
      if (e.node(t).type.spec.isolating) break;
    }
  return null;
}
function _r(e, t) {
  let { $cursor: n } = e.selection;
  return !n ||
    (t
      ? !t.endOfTextblock(`forward`, e)
      : n.parentOffset < n.parent.content.size)
    ? null
    : n;
}
var vr = (e, t, n) => {
    let r = _r(e, n);
    if (!r) return !1;
    let i = br(r);
    if (!i) return !1;
    let a = i.nodeAfter;
    if (Ar(e, i, t, 1)) return !0;
    if (r.parent.content.size == 0 && (mr(a, `start`) || q.isSelectable(a))) {
      let n = $n(e.doc, r.before(), r.after(), W.empty);
      if (n && n.slice.size < n.to - n.from) {
        if (t) {
          let r = e.tr.step(n);
          (r.setSelection(
            mr(a, `start`)
              ? K.findFrom(r.doc.resolve(r.mapping.map(i.pos)), 1)
              : q.create(r.doc, r.mapping.map(i.pos)),
          ),
            t(r.scrollIntoView()));
        }
        return !0;
      }
    }
    return a.isAtom && i.depth == r.depth - 1
      ? (t && t(e.tr.delete(i.pos, i.pos + a.nodeSize).scrollIntoView()), !0)
      : !1;
  },
  yr = (e, t, n) => {
    let { $head: r, empty: i } = e.selection,
      a = r;
    if (!i) return !1;
    if (r.parent.isTextblock) {
      if (
        n
          ? !n.endOfTextblock(`forward`, e)
          : r.parentOffset < r.parent.content.size
      )
        return !1;
      a = br(r);
    }
    let o = a && a.nodeAfter;
    return !o || !q.isSelectable(o)
      ? !1
      : (t && t(e.tr.setSelection(q.create(e.doc, a.pos)).scrollIntoView()),
        !0);
  };
function br(e) {
  if (!e.parent.type.spec.isolating)
    for (let t = e.depth - 1; t >= 0; t--) {
      let n = e.node(t);
      if (e.index(t) + 1 < n.childCount) return e.doc.resolve(e.after(t + 1));
      if (n.type.spec.isolating) break;
    }
  return null;
}
var xr = (e, t) => {
  let { $head: n, $anchor: r } = e.selection;
  return !n.parent.type.spec.code || !n.sameParent(r)
    ? !1
    : (t &&
        t(
          e.tr
            .insertText(
              `
`,
            )
            .scrollIntoView(),
        ),
      !0);
};
function Sr(e) {
  for (let t = 0; t < e.edgeCount; t++) {
    let { type: n } = e.edge(t);
    if (n.isTextblock && !n.hasRequiredAttrs()) return n;
  }
  return null;
}
var Cr = (e, t) => {
    let { $head: n, $anchor: r } = e.selection;
    if (!n.parent.type.spec.code || !n.sameParent(r)) return !1;
    let i = n.node(-1),
      a = n.indexAfter(-1),
      o = Sr(i.contentMatchAt(a));
    if (!o || !i.canReplaceWith(a, a, o)) return !1;
    if (t) {
      let r = n.after(),
        i = e.tr.replaceWith(r, r, o.createAndFill());
      (i.setSelection(K.near(i.doc.resolve(r), 1)), t(i.scrollIntoView()));
    }
    return !0;
  },
  wr = (e, t) => {
    let n = e.selection,
      { $from: r, $to: i } = n;
    if (n instanceof Pe || r.parent.inlineContent || i.parent.inlineContent)
      return !1;
    let a = Sr(i.parent.contentMatchAt(i.indexAfter()));
    if (!a || !a.isTextblock) return !1;
    if (t) {
      let n = (!r.parentOffset && i.index() < i.parent.childCount ? r : i).pos,
        o = e.tr.insert(n, a.createAndFill());
      (o.setSelection(J.create(o.doc, n + 1)), t(o.scrollIntoView()));
    }
    return !0;
  },
  Tr = (e, t) => {
    let { $cursor: n } = e.selection;
    if (!n || n.parent.content.size) return !1;
    if (n.depth > 1 && n.after() != n.end(-1)) {
      let r = n.before();
      if (Yn(e.doc, r)) return (t && t(e.tr.split(r).scrollIntoView()), !0);
    }
    let r = n.blockRange(),
      i = r && Jn(r);
    return i == null ? !1 : (t && t(e.tr.lift(r, i).scrollIntoView()), !0);
  };
function Er(e) {
  return (t, n) => {
    let { $from: r, $to: i } = t.selection;
    if (t.selection instanceof q && t.selection.node.isBlock)
      return !r.parentOffset || !Yn(t.doc, r.pos)
        ? !1
        : (n && n(t.tr.split(r.pos).scrollIntoView()), !0);
    if (!r.depth) return !1;
    let a = [],
      o,
      s,
      c = !1,
      l = !1;
    for (let t = r.depth; ; t--)
      if (r.node(t).isBlock) {
        ((c = r.end(t) == r.pos + (r.depth - t)),
          (l = r.start(t) == r.pos - (r.depth - t)),
          (s = Sr(r.node(t - 1).contentMatchAt(r.indexAfter(t - 1)))));
        let n = e && e(i.parent, c, r);
        (a.unshift(n || (c && s ? { type: s } : null)), (o = t));
        break;
      } else {
        if (t == 1) return !1;
        a.unshift(null);
      }
    let u = t.tr;
    (t.selection instanceof J || t.selection instanceof Pe) &&
      u.deleteSelection();
    let d = u.mapping.map(r.pos),
      f = Yn(u.doc, d, a.length, a);
    if (
      ((f ||= ((a[0] = s ? { type: s } : null), Yn(u.doc, d, a.length, a))), !f)
    )
      return !1;
    if ((u.split(d, a.length, a), !c && l && r.node(o).type != s)) {
      let e = u.mapping.map(r.before(o)),
        t = u.doc.resolve(e);
      s &&
        r.node(o - 1).canReplaceWith(t.index(), t.index() + 1, s) &&
        u.setNodeMarkup(u.mapping.map(r.before(o)), s);
    }
    return (n && n(u.scrollIntoView()), !0);
  };
}
var Dr = Er(),
  Or = (e, t) => (t && t(e.tr.setSelection(new Pe(e.doc))), !0);
function kr(e, t, n) {
  let r = t.nodeBefore,
    i = t.nodeAfter,
    a = t.index();
  return !r || !i || !r.type.compatibleContent(i.type)
    ? !1
    : !r.content.size && t.parent.canReplace(a - 1, a)
      ? (n && n(e.tr.delete(t.pos - r.nodeSize, t.pos).scrollIntoView()), !0)
      : !t.parent.canReplace(a, a + 1) || !(i.isTextblock || Xn(e.doc, t.pos))
        ? !1
        : (n && n(e.tr.join(t.pos).scrollIntoView()), !0);
}
function Ar(e, t, n, r) {
  let i = t.nodeBefore,
    a = t.nodeAfter,
    o,
    s,
    c = i.type.spec.isolating || a.type.spec.isolating;
  if (!c && kr(e, t, n)) return !0;
  let l = !c && t.parent.canReplace(t.index(), t.index() + 1);
  if (
    l &&
    (o = (s = i.contentMatchAt(i.childCount)).findWrapping(a.type)) &&
    s.matchType(o[0] || a.type).validEnd
  ) {
    if (n) {
      let r = t.pos + a.nodeSize,
        s = U.empty;
      for (let e = o.length - 1; e >= 0; e--) s = U.from(o[e].create(null, s));
      s = U.from(i.copy(s));
      let c = e.tr.step(
          new Gn(t.pos - 1, r, t.pos, r, new W(s, 1, 0), o.length, !0),
        ),
        l = c.doc.resolve(r + 2 * o.length);
      (l.nodeAfter &&
        l.nodeAfter.type == i.type &&
        Xn(c.doc, l.pos) &&
        c.join(l.pos),
        n(c.scrollIntoView()));
    }
    return !0;
  }
  let u = a.type.spec.isolating || (r > 0 && c) ? null : K.findFrom(t, 1),
    d = u && u.$from.blockRange(u.$to),
    f = d && Jn(d);
  if (f != null && f >= t.depth)
    return (n && n(e.tr.lift(d, f).scrollIntoView()), !0);
  if (l && mr(a, `start`, !0) && mr(i, `end`)) {
    let r = i,
      o = [];
    for (; o.push(r), !r.isTextblock; ) r = r.lastChild;
    let s = a,
      c = 1;
    for (; !s.isTextblock; s = s.firstChild) c++;
    if (r.canReplace(r.childCount, r.childCount, s.content)) {
      if (n) {
        let r = U.empty;
        for (let e = o.length - 1; e >= 0; e--) r = U.from(o[e].copy(r));
        n(
          e.tr
            .step(
              new Gn(
                t.pos - o.length,
                t.pos + a.nodeSize,
                t.pos + c,
                t.pos + a.nodeSize - c,
                new W(r, o.length, 0),
                0,
                !0,
              ),
            )
            .scrollIntoView(),
        );
      }
      return !0;
    }
  }
  return !1;
}
function jr(e) {
  return function (t, n) {
    let r = t.selection,
      i = e < 0 ? r.$from : r.$to,
      a = i.depth;
    for (; i.node(a).isInline; ) {
      if (!a) return !1;
      a--;
    }
    return i.node(a).isTextblock
      ? (n &&
          n(t.tr.setSelection(J.create(t.doc, e < 0 ? i.start(a) : i.end(a)))),
        !0)
      : !1;
  };
}
var Mr = jr(-1),
  Nr = jr(1);
function Pr(...e) {
  return function (t, n, r) {
    for (let i = 0; i < e.length; i++) if (e[i](t, n, r)) return !0;
    return !1;
  };
}
var Fr = Pr(dr, pr, hr),
  Ir = Pr(dr, vr, yr),
  Lr = {
    Enter: Pr(xr, wr, Tr, Dr),
    "Mod-Enter": Cr,
    Backspace: Fr,
    "Mod-Backspace": Fr,
    "Shift-Backspace": Fr,
    Delete: Ir,
    "Mod-Delete": Ir,
    "Mod-a": Or,
  },
  Rr = {
    "Ctrl-h": Lr.Backspace,
    "Alt-Backspace": Lr[`Mod-Backspace`],
    "Ctrl-d": Lr.Delete,
    "Ctrl-Alt-Backspace": Lr[`Mod-Delete`],
    "Alt-Delete": Lr[`Mod-Delete`],
    "Alt-d": Lr[`Mod-Delete`],
    "Ctrl-a": Mr,
    "Ctrl-e": Nr,
  };
for (let e in Lr) Rr[e] = Lr[e];
var zr = (
    typeof navigator < `u`
      ? /Mac|iP(hone|[oa]d)/.test(navigator.platform)
      : typeof os < `u` && os.platform && os.platform() == `darwin`
  )
    ? Rr
    : Lr,
  Br = function (e) {
    for (var t = 0; ; t++) if (((e = e.previousSibling), !e)) return t;
  },
  Vr = function (e) {
    let t = e.assignedSlot || e.parentNode;
    return t && t.nodeType == 11 ? t.host : t;
  },
  Hr = null,
  Ur = function (e, t, n) {
    let r = (Hr ||= document.createRange());
    return (r.setEnd(e, n ?? e.nodeValue.length), r.setStart(e, t || 0), r);
  },
  Wr = function () {
    Hr = null;
  },
  Gr = function (e, t, n, r) {
    return n && (qr(e, t, n, r, -1) || qr(e, t, n, r, 1));
  },
  Kr = /^(img|br|input|textarea|hr)$/i;
function qr(e, t, n, r, i) {
  for (;;) {
    if (e == n && t == r) return !0;
    if (t == (i < 0 ? 0 : Jr(e))) {
      let n = e.parentNode;
      if (
        !n ||
        n.nodeType != 1 ||
        Qr(e) ||
        Kr.test(e.nodeName) ||
        e.contentEditable == `false`
      )
        return !1;
      ((t = Br(e) + (i < 0 ? 0 : 1)), (e = n));
    } else if (e.nodeType == 1) {
      let n = e.childNodes[t + (i < 0 ? -1 : 0)];
      if (n.nodeType == 1 && n.contentEditable == `false`)
        if (n.pmViewDesc?.ignoreForSelection) t += i;
        else return !1;
      else ((e = n), (t = i < 0 ? Jr(e) : 0));
    } else return !1;
  }
}
function Jr(e) {
  return e.nodeType == 3 ? e.nodeValue.length : e.childNodes.length;
}
function Yr(e, t) {
  for (;;) {
    if (e.nodeType == 3 && t) return e;
    if (e.nodeType == 1 && t > 0) {
      if (e.contentEditable == `false`) return null;
      ((e = e.childNodes[t - 1]), (t = Jr(e)));
    } else if (e.parentNode && !Qr(e)) ((t = Br(e)), (e = e.parentNode));
    else return null;
  }
}
function Xr(e, t) {
  for (;;) {
    if (e.nodeType == 3 && t < e.nodeValue.length) return e;
    if (e.nodeType == 1 && t < e.childNodes.length) {
      if (e.contentEditable == `false`) return null;
      ((e = e.childNodes[t]), (t = 0));
    } else if (e.parentNode && !Qr(e)) ((t = Br(e) + 1), (e = e.parentNode));
    else return null;
  }
}
function Zr(e, t, n) {
  for (let r = t == 0, i = t == Jr(e); r || i; ) {
    if (e == n) return !0;
    let t = Br(e);
    if (((e = e.parentNode), !e)) return !1;
    ((r &&= t == 0), (i &&= t == Jr(e)));
  }
}
function Qr(e) {
  let t;
  for (let n = e; n && !(t = n.pmViewDesc); n = n.parentNode);
  return t && t.node && t.node.isBlock && (t.dom == e || t.contentDOM == e);
}
var $r = function (e) {
  return (
    e.focusNode && Gr(e.focusNode, e.focusOffset, e.anchorNode, e.anchorOffset)
  );
};
function ei(e, t) {
  let n = document.createEvent(`Event`);
  return (
    n.initEvent(`keydown`, !0, !0),
    (n.keyCode = e),
    (n.key = n.code = t),
    n
  );
}
function ti(e) {
  let t = e.activeElement;
  for (; t && t.shadowRoot; ) t = t.shadowRoot.activeElement;
  return t;
}
function ni(e, t, n) {
  if (e.caretPositionFromPoint)
    try {
      let r = e.caretPositionFromPoint(t, n);
      if (r)
        return {
          node: r.offsetNode,
          offset: Math.min(Jr(r.offsetNode), r.offset),
        };
    } catch {}
  if (e.caretRangeFromPoint) {
    let r = e.caretRangeFromPoint(t, n);
    if (r)
      return {
        node: r.startContainer,
        offset: Math.min(Jr(r.startContainer), r.startOffset),
      };
  }
}
var $ = typeof navigator < `u` ? navigator : null,
  ri = typeof document < `u` ? document : null,
  ii = ($ && $.userAgent) || ``,
  ai = /Edge\/(\d+)/.exec(ii),
  oi = /MSIE \d/.exec(ii),
  si = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(ii),
  ci = !!(oi || si || ai),
  li = oi ? document.documentMode : si ? +si[1] : ai ? +ai[1] : 0,
  ui = !ci && /gecko\/(\d+)/i.test(ii);
ui && +(/Firefox\/(\d+)/.exec(ii) || [0, 0])[1];
var di = !ci && /Chrome\/(\d+)/.exec(ii),
  fi = !!di,
  pi = di ? +di[1] : 0,
  mi = !ci && !!$ && /Apple Computer/.test($.vendor),
  hi = mi && (/Mobile\/\w+/.test(ii) || (!!$ && $.maxTouchPoints > 2)),
  gi = hi || ($ ? /Mac/.test($.platform) : !1),
  _i = $ ? /Win/.test($.platform) : !1,
  vi = /Android \d/.test(ii),
  yi = !!ri && `webkitFontSmoothing` in ri.documentElement.style,
  bi = yi
    ? +(/\bAppleWebKit\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1]
    : 0;
function xi(e) {
  let t = e.defaultView && e.defaultView.visualViewport;
  return t
    ? { left: 0, right: t.width, top: 0, bottom: t.height }
    : {
        left: 0,
        right: e.documentElement.clientWidth,
        top: 0,
        bottom: e.documentElement.clientHeight,
      };
}
function Si(e, t) {
  return typeof e == `number` ? e : e[t];
}
function Ci(e) {
  let t = e.getBoundingClientRect(),
    n = t.width / e.offsetWidth || 1,
    r = t.height / e.offsetHeight || 1;
  return {
    left: t.left,
    right: t.left + e.clientWidth * n,
    top: t.top,
    bottom: t.top + e.clientHeight * r,
  };
}
function wi(e, t, n) {
  let r = e.someProp(`scrollThreshold`) || 0,
    i = e.someProp(`scrollMargin`) || 5,
    a = e.dom.ownerDocument;
  for (let o = n || e.dom; o; ) {
    if (o.nodeType != 1) {
      o = Vr(o);
      continue;
    }
    let e = o,
      n = e == a.body,
      s = n ? xi(a) : Ci(e),
      c = 0,
      l = 0;
    if (
      (t.top < s.top + Si(r, `top`)
        ? (l = -(s.top - t.top + Si(i, `top`)))
        : t.bottom > s.bottom - Si(r, `bottom`) &&
          (l =
            t.bottom - t.top > s.bottom - s.top
              ? t.top + Si(i, `top`) - s.top
              : t.bottom - s.bottom + Si(i, `bottom`)),
      t.left < s.left + Si(r, `left`)
        ? (c = -(s.left - t.left + Si(i, `left`)))
        : t.right > s.right - Si(r, `right`) &&
          (c = t.right - s.right + Si(i, `right`)),
      c || l)
    )
      if (n) a.defaultView.scrollBy(c, l);
      else {
        let n = e.scrollLeft,
          r = e.scrollTop;
        (l && (e.scrollTop += l), c && (e.scrollLeft += c));
        let i = e.scrollLeft - n,
          a = e.scrollTop - r;
        t = {
          left: t.left - i,
          top: t.top - a,
          right: t.right - i,
          bottom: t.bottom - a,
        };
      }
    let u = n ? `fixed` : getComputedStyle(o).position;
    if (/^(fixed|sticky)$/.test(u)) break;
    o = u == `absolute` ? o.offsetParent : Vr(o);
  }
}
function Ti(e) {
  let t = e.dom.getBoundingClientRect(),
    n = Math.max(0, t.top),
    r,
    i;
  for (
    let a = (t.left + t.right) / 2, o = n + 1;
    o < Math.min(innerHeight, t.bottom);
    o += 5
  ) {
    let t = e.root.elementFromPoint(a, o);
    if (!t || t == e.dom || !e.dom.contains(t)) continue;
    let s = t.getBoundingClientRect();
    if (s.top >= n - 20) {
      ((r = t), (i = s.top));
      break;
    }
  }
  return { refDOM: r, refTop: i, stack: Ei(e.dom) };
}
function Ei(e) {
  let t = [],
    n = e.ownerDocument;
  for (
    let r = e;
    r && (t.push({ dom: r, top: r.scrollTop, left: r.scrollLeft }), e != n);
    r = Vr(r)
  );
  return t;
}
function Di({ refDOM: e, refTop: t, stack: n }) {
  let r = e ? e.getBoundingClientRect().top : 0;
  Oi(n, r == 0 ? 0 : r - t);
}
function Oi(e, t) {
  for (let n = 0; n < e.length; n++) {
    let { dom: r, top: i, left: a } = e[n];
    (r.scrollTop != i + t && (r.scrollTop = i + t),
      r.scrollLeft != a && (r.scrollLeft = a));
  }
}
var ki = null;
function Ai(e) {
  if (e.setActive) return e.setActive();
  if (ki) return e.focus(ki);
  let t = Ei(e);
  (e.focus(
    ki == null
      ? {
          get preventScroll() {
            return ((ki = { preventScroll: !0 }), !0);
          },
        }
      : void 0,
  ),
    ki || ((ki = !1), Oi(t, 0)));
}
function ji(e, t) {
  let n,
    r = 2e8,
    i,
    a = 0,
    o = t.top,
    s = t.top,
    c,
    l;
  for (let u = e.firstChild, d = 0; u; u = u.nextSibling, d++) {
    let e;
    if (u.nodeType == 1) e = u.getClientRects();
    else if (u.nodeType == 3) e = Ur(u).getClientRects();
    else continue;
    for (let f = 0; f < e.length; f++) {
      let p = e[f];
      if (p.top <= o && p.bottom >= s) {
        ((o = Math.max(p.bottom, o)), (s = Math.min(p.top, s)));
        let e =
          p.left > t.left
            ? p.left - t.left
            : p.right < t.left
              ? t.left - p.right
              : 0;
        if (e < r) {
          ((n = u),
            (r = e),
            (i =
              e && n.nodeType == 3
                ? { left: p.right < t.left ? p.right : p.left, top: t.top }
                : t),
            u.nodeType == 1 &&
              e &&
              (a = d + (t.left >= (p.left + p.right) / 2 ? 1 : 0)));
          continue;
        }
      } else
        p.top > t.top &&
          !c &&
          p.left <= t.left &&
          p.right >= t.left &&
          ((c = u),
          (l = {
            left: Math.max(p.left, Math.min(p.right, t.left)),
            top: p.top,
          }));
      !n &&
        ((t.left >= p.right && t.top >= p.top) ||
          (t.left >= p.left && t.top >= p.bottom)) &&
        (a = d + 1);
    }
  }
  return (
    !n && c && ((n = c), (i = l), (r = 0)),
    n && n.nodeType == 3
      ? Mi(n, i)
      : !n || (r && n.nodeType == 1)
        ? { node: e, offset: a }
        : ji(n, i)
  );
}
function Mi(e, t) {
  let n = e.nodeValue.length,
    r = document.createRange(),
    i;
  for (let a = 0; a < n; a++) {
    (r.setEnd(e, a + 1), r.setStart(e, a));
    let n = Bi(r, 1);
    if (n.top != n.bottom && Ni(t, n)) {
      i = { node: e, offset: a + (t.left >= (n.left + n.right) / 2 ? 1 : 0) };
      break;
    }
  }
  return (r.detach(), i || { node: e, offset: 0 });
}
function Ni(e, t) {
  return (
    e.left >= t.left - 1 &&
    e.left <= t.right + 1 &&
    e.top >= t.top - 1 &&
    e.top <= t.bottom + 1
  );
}
function Pi(e, t) {
  let n = e.parentNode;
  return n &&
    /^li$/i.test(n.nodeName) &&
    t.left < e.getBoundingClientRect().left
    ? n
    : e;
}
function Fi(e, t, n) {
  let { node: r, offset: i } = ji(t, n),
    a = -1;
  if (r.nodeType == 1 && !r.firstChild) {
    let e = r.getBoundingClientRect();
    a = e.left != e.right && n.left > (e.left + e.right) / 2 ? 1 : -1;
  }
  return e.docView.posFromDOM(r, i, a);
}
function Ii(e, t, n, r) {
  let i = -1;
  for (let n = t, a = !1; n != e.dom; ) {
    let t = e.docView.nearestDesc(n, !0),
      o;
    if (!t) return null;
    if (
      t.dom.nodeType == 1 &&
      ((t.node.isBlock && t.parent) || !t.contentDOM) &&
      ((o = t.dom.getBoundingClientRect()).width || o.height) &&
      (t.node.isBlock &&
        t.parent &&
        !/^T(R|BODY|HEAD|FOOT)$/.test(t.dom.nodeName) &&
        ((!a && o.left > r.left) || o.top > r.top
          ? (i = t.posBefore)
          : ((!a && o.right < r.left) || o.bottom < r.top) && (i = t.posAfter),
        (a = !0)),
      !t.contentDOM && i < 0 && !t.node.isText)
    )
      return (
        t.node.isBlock
          ? r.top < (o.top + o.bottom) / 2
          : r.left < (o.left + o.right) / 2
      )
        ? t.posBefore
        : t.posAfter;
    n = t.dom.parentNode;
  }
  return i > -1 ? i : e.docView.posFromDOM(t, n, -1);
}
function Li(e, t, n) {
  let r = e.childNodes.length;
  if (r && n.top < n.bottom)
    for (
      let i = Math.max(
          0,
          Math.min(
            r - 1,
            Math.floor((r * (t.top - n.top)) / (n.bottom - n.top)) - 2,
          ),
        ),
        a = i;
      ;
    ) {
      let n = e.childNodes[a];
      if (n.nodeType == 1) {
        let e = n.getClientRects();
        for (let r = 0; r < e.length; r++) {
          let i = e[r];
          if (Ni(t, i)) return Li(n, t, i);
        }
      }
      if ((a = (a + 1) % r) == i) break;
    }
  return e;
}
function Ri(e, t) {
  let n = e.dom.ownerDocument,
    r,
    i = 0,
    a = ni(n, t.left, t.top);
  a && ({ node: r, offset: i } = a);
  let o = (e.root.elementFromPoint ? e.root : n).elementFromPoint(
      t.left,
      t.top,
    ),
    s;
  if (!o || !e.dom.contains(o.nodeType == 1 ? o : o.parentNode)) {
    let n = e.dom.getBoundingClientRect();
    if (!Ni(t, n) || ((o = Li(e.dom, t, n)), !o)) return null;
  }
  if (mi) for (let e = o; r && e; e = Vr(e)) e.draggable && (r = void 0);
  if (((o = Pi(o, t)), r)) {
    if (
      ui &&
      r.nodeType == 1 &&
      ((i = Math.min(i, r.childNodes.length)), i < r.childNodes.length)
    ) {
      let e = r.childNodes[i],
        n;
      e.nodeName == `IMG` &&
        (n = e.getBoundingClientRect()).right <= t.left &&
        n.bottom > t.top &&
        i++;
    }
    let n;
    (yi &&
      i &&
      r.nodeType == 1 &&
      (n = r.childNodes[i - 1]).nodeType == 1 &&
      n.contentEditable == `false` &&
      n.getBoundingClientRect().top >= t.top &&
      i--,
      r == e.dom &&
      i == r.childNodes.length - 1 &&
      r.lastChild.nodeType == 1 &&
      t.top > r.lastChild.getBoundingClientRect().bottom
        ? (s = e.state.doc.content.size)
        : (i == 0 || r.nodeType != 1 || r.childNodes[i - 1].nodeName != `BR`) &&
          (s = Ii(e, r, i, t)));
  }
  s ??= Fi(e, o, t);
  let c = e.docView.nearestDesc(o, !0);
  return { pos: s, inside: c ? c.posAtStart - c.border : -1 };
}
function zi(e) {
  return e.top < e.bottom || e.left < e.right;
}
function Bi(e, t) {
  let n = e.getClientRects();
  if (n.length) {
    let e = n[t < 0 ? 0 : n.length - 1];
    if (zi(e)) return e;
  }
  return Array.prototype.find.call(n, zi) || e.getBoundingClientRect();
}
var Vi = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
function Hi(e, t, n) {
  let { node: r, offset: i, atom: a } = e.docView.domFromPos(t, n < 0 ? -1 : 1),
    o = yi || ui;
  if (r.nodeType == 3)
    if (o && (Vi.test(r.nodeValue) || (n < 0 ? !i : i == r.nodeValue.length))) {
      let e = Bi(Ur(r, i, i), n);
      if (ui && i && /\s/.test(r.nodeValue[i - 1]) && i < r.nodeValue.length) {
        let t = Bi(Ur(r, i - 1, i - 1), -1);
        if (t.top == e.top) {
          let n = Bi(Ur(r, i, i + 1), -1);
          if (n.top != e.top) return Ui(n, n.left < t.left);
        }
      }
      return e;
    } else {
      let e = i,
        t = i,
        a = n < 0 ? 1 : -1;
      return (
        n < 0 && !i
          ? (t++, (a = -1))
          : n >= 0 && i == r.nodeValue.length
            ? (e--, (a = 1))
            : n < 0
              ? e--
              : t++,
        Ui(Bi(Ur(r, e, t), a), a < 0)
      );
    }
  if (!e.state.doc.resolve(t - (a || 0)).parent.inlineContent) {
    if (a == null && i && (n < 0 || i == Jr(r))) {
      let e = r.childNodes[i - 1];
      if (e.nodeType == 1) return Wi(e.getBoundingClientRect(), !1);
    }
    if (a == null && i < Jr(r)) {
      let e = r.childNodes[i];
      if (e.nodeType == 1) return Wi(e.getBoundingClientRect(), !0);
    }
    return Wi(r.getBoundingClientRect(), n >= 0);
  }
  if (a == null && i && (n < 0 || i == Jr(r))) {
    let e = r.childNodes[i - 1],
      t =
        e.nodeType == 3
          ? Ur(e, Jr(e) - (o ? 0 : 1))
          : e.nodeType == 1 && (e.nodeName != `BR` || !e.nextSibling)
            ? e
            : null;
    if (t) return Ui(Bi(t, 1), !1);
  }
  if (a == null && i < Jr(r)) {
    let e = r.childNodes[i];
    for (; e.pmViewDesc && e.pmViewDesc.ignoreForCoords; ) e = e.nextSibling;
    let t = e
      ? e.nodeType == 3
        ? Ur(e, 0, o ? 0 : 1)
        : e.nodeType == 1
          ? e
          : null
      : null;
    if (t) return Ui(Bi(t, -1), !0);
  }
  return Ui(Bi(r.nodeType == 3 ? Ur(r) : r, -n), n >= 0);
}
function Ui(e, t) {
  if (e.width == 0) return e;
  let n = t ? e.left : e.right;
  return { top: e.top, bottom: e.bottom, left: n, right: n };
}
function Wi(e, t) {
  if (e.height == 0) return e;
  let n = t ? e.top : e.bottom;
  return { top: n, bottom: n, left: e.left, right: e.right };
}
function Gi(e, t, n) {
  let r = e.state,
    i = e.root.activeElement;
  (r != t && e.updateState(t), i != e.dom && e.focus());
  try {
    return n();
  } finally {
    (r != t && e.updateState(r), i != e.dom && i && i.focus());
  }
}
function Ki(e, t, n) {
  let r = t.selection,
    i = n == `up` ? r.$from : r.$to;
  return Gi(e, t, () => {
    let { node: t } = e.docView.domFromPos(i.pos, n == `up` ? -1 : 1);
    for (;;) {
      let n = e.docView.nearestDesc(t, !0);
      if (!n) break;
      if (n.node.isBlock) {
        t = n.contentDOM || n.dom;
        break;
      }
      t = n.dom.parentNode;
    }
    let r = Hi(e, i.pos, 1);
    for (let e = t.firstChild; e; e = e.nextSibling) {
      let t;
      if (e.nodeType == 1) t = e.getClientRects();
      else if (e.nodeType == 3)
        t = Ur(e, 0, e.nodeValue.length).getClientRects();
      else continue;
      for (let e = 0; e < t.length; e++) {
        let i = t[e];
        if (
          i.bottom > i.top + 1 &&
          (n == `up`
            ? r.top - i.top > (i.bottom - r.top) * 2
            : i.bottom - r.bottom > (r.bottom - i.top) * 2)
        )
          return !1;
      }
    }
    return !0;
  });
}
var qi = /[\u0590-\u08ac]/;
function Ji(e, t, n) {
  let { $head: r } = t.selection;
  if (!r.parent.isTextblock) return !1;
  let i = r.parentOffset,
    a = !i,
    o = i == r.parent.content.size,
    s = e.domSelection();
  return s
    ? !qi.test(r.parent.textContent) || !s.modify
      ? n == `left` || n == `backward`
        ? a
        : o
      : Gi(e, t, () => {
          let {
              focusNode: t,
              focusOffset: i,
              anchorNode: a,
              anchorOffset: o,
            } = e.domSelectionRange(),
            c = s.caretBidiLevel;
          s.modify(`move`, n, `character`);
          let l = r.depth ? e.docView.domAfterPos(r.before()) : e.dom,
            { focusNode: u, focusOffset: d } = e.domSelectionRange(),
            f =
              (u && !l.contains(u.nodeType == 1 ? u : u.parentNode)) ||
              (t == u && i == d);
          try {
            (s.collapse(a, o),
              t && (t != a || i != o) && s.extend && s.extend(t, i));
          } catch {}
          return (c != null && (s.caretBidiLevel = c), f);
        })
    : r.pos == r.start() || r.pos == r.end();
}
var Yi = null,
  Xi = null,
  Zi = !1;
function Qi(e, t, n) {
  return Yi == t && Xi == n
    ? Zi
    : ((Yi = t),
      (Xi = n),
      (Zi = n == `up` || n == `down` ? Ki(e, t, n) : Ji(e, t, n)));
}
var $i = 0,
  ea = 1,
  ta = 2,
  na = 3,
  ra = class {
    constructor(e, t, n, r) {
      ((this.parent = e),
        (this.children = t),
        (this.dom = n),
        (this.contentDOM = r),
        (this.dirty = $i),
        (n.pmViewDesc = this));
    }
    matchesWidget(e) {
      return !1;
    }
    matchesMark(e) {
      return !1;
    }
    matchesNode(e, t, n) {
      return !1;
    }
    matchesHack(e) {
      return !1;
    }
    parseRule() {
      return null;
    }
    stopEvent(e) {
      return !1;
    }
    get size() {
      let e = 0;
      for (let t = 0; t < this.children.length; t++) e += this.children[t].size;
      return e;
    }
    get border() {
      return 0;
    }
    destroy() {
      ((this.parent = void 0),
        this.dom.pmViewDesc == this && (this.dom.pmViewDesc = void 0));
      for (let e = 0; e < this.children.length; e++) this.children[e].destroy();
    }
    posBeforeChild(e) {
      for (let t = 0, n = this.posAtStart; ; t++) {
        let r = this.children[t];
        if (r == e) return n;
        n += r.size;
      }
    }
    get posBefore() {
      return this.parent.posBeforeChild(this);
    }
    get posAtStart() {
      return this.parent ? this.parent.posBeforeChild(this) + this.border : 0;
    }
    get posAfter() {
      return this.posBefore + this.size;
    }
    get posAtEnd() {
      return this.posAtStart + this.size - 2 * this.border;
    }
    localPosFromDOM(e, t, n) {
      if (
        this.contentDOM &&
        this.contentDOM.contains(e.nodeType == 1 ? e : e.parentNode)
      )
        if (n < 0) {
          let n, r;
          if (e == this.contentDOM) n = e.childNodes[t - 1];
          else {
            for (; e.parentNode != this.contentDOM; ) e = e.parentNode;
            n = e.previousSibling;
          }
          for (; n && !((r = n.pmViewDesc) && r.parent == this); )
            n = n.previousSibling;
          return n ? this.posBeforeChild(r) + r.size : this.posAtStart;
        } else {
          let n, r;
          if (e == this.contentDOM) n = e.childNodes[t];
          else {
            for (; e.parentNode != this.contentDOM; ) e = e.parentNode;
            n = e.nextSibling;
          }
          for (; n && !((r = n.pmViewDesc) && r.parent == this); )
            n = n.nextSibling;
          return n ? this.posBeforeChild(r) : this.posAtEnd;
        }
      let r;
      if (e == this.dom && this.contentDOM) r = t > Br(this.contentDOM);
      else if (
        this.contentDOM &&
        this.contentDOM != this.dom &&
        this.dom.contains(this.contentDOM)
      )
        r = e.compareDocumentPosition(this.contentDOM) & 2;
      else if (this.dom.firstChild) {
        if (t == 0)
          for (let t = e; ; t = t.parentNode) {
            if (t == this.dom) {
              r = !1;
              break;
            }
            if (t.previousSibling) break;
          }
        if (r == null && t == e.childNodes.length)
          for (let t = e; ; t = t.parentNode) {
            if (t == this.dom) {
              r = !0;
              break;
            }
            if (t.nextSibling) break;
          }
      }
      return (r ?? n > 0) ? this.posAtEnd : this.posAtStart;
    }
    nearestDesc(e, t = !1) {
      for (let n = !0, r = e; r; r = r.parentNode) {
        let i = this.getDesc(r),
          a;
        if (i && (!t || i.node))
          if (
            n &&
            (a = i.nodeDOM) &&
            !(a.nodeType == 1
              ? a.contains(e.nodeType == 1 ? e : e.parentNode)
              : a == e)
          )
            n = !1;
          else return i;
      }
    }
    getDesc(e) {
      let t = e.pmViewDesc;
      for (let e = t; e; e = e.parent) if (e == this) return t;
    }
    posFromDOM(e, t, n) {
      for (let r = e; r; r = r.parentNode) {
        let i = this.getDesc(r);
        if (i) return i.localPosFromDOM(e, t, n);
      }
      return -1;
    }
    descAt(e) {
      for (let t = 0, n = 0; t < this.children.length; t++) {
        let r = this.children[t],
          i = n + r.size;
        if (n == e && i != n) {
          for (; !r.border && r.children.length; )
            for (let e = 0; e < r.children.length; e++) {
              let t = r.children[e];
              if (t.size) {
                r = t;
                break;
              }
            }
          return r;
        }
        if (e < i) return r.descAt(e - n - r.border);
        n = i;
      }
    }
    domFromPos(e, t) {
      if (!this.contentDOM) return { node: this.dom, offset: 0, atom: e + 1 };
      let n = 0,
        r = 0;
      for (let t = 0; n < this.children.length; n++) {
        let i = this.children[n],
          a = t + i.size;
        if (a > e || i instanceof ua) {
          r = e - t;
          break;
        }
        t = a;
      }
      if (r) return this.children[n].domFromPos(r - this.children[n].border, t);
      for (
        let e;
        n && !(e = this.children[n - 1]).size && e instanceof ia && e.side >= 0;
        n--
      );
      if (t <= 0) {
        let e,
          r = !0;
        for (
          ;
          (e = n ? this.children[n - 1] : null),
            !(!e || e.dom.parentNode == this.contentDOM);
          n--, r = !1
        );
        return e && t && r && !e.border && !e.domAtom
          ? e.domFromPos(e.size, t)
          : { node: this.contentDOM, offset: e ? Br(e.dom) + 1 : 0 };
      } else {
        let e,
          r = !0;
        for (
          ;
          (e = n < this.children.length ? this.children[n] : null),
            !(!e || e.dom.parentNode == this.contentDOM);
          n++, r = !1
        );
        return e && r && !e.border && !e.domAtom
          ? e.domFromPos(0, t)
          : {
              node: this.contentDOM,
              offset: e ? Br(e.dom) : this.contentDOM.childNodes.length,
            };
      }
    }
    parseRange(e, t, n = 0) {
      if (this.children.length == 0)
        return {
          node: this.contentDOM,
          from: e,
          to: t,
          fromOffset: 0,
          toOffset: this.contentDOM.childNodes.length,
        };
      let r = -1,
        i = -1;
      for (let a = n, o = 0; ; o++) {
        let n = this.children[o],
          s = a + n.size;
        if (r == -1 && e <= s) {
          let i = a + n.border;
          if (
            e >= i &&
            t <= s - n.border &&
            n.node &&
            n.contentDOM &&
            this.contentDOM.contains(n.contentDOM)
          )
            return n.parseRange(e, t, i);
          e = a;
          for (let t = o; t > 0; t--) {
            let n = this.children[t - 1];
            if (
              n.size &&
              n.dom.parentNode == this.contentDOM &&
              !n.emptyChildAt(1)
            ) {
              r = Br(n.dom) + 1;
              break;
            }
            e -= n.size;
          }
          r == -1 && (r = 0);
        }
        if (r > -1 && (s > t || o == this.children.length - 1)) {
          t = s;
          for (let e = o + 1; e < this.children.length; e++) {
            let n = this.children[e];
            if (
              n.size &&
              n.dom.parentNode == this.contentDOM &&
              !n.emptyChildAt(-1)
            ) {
              i = Br(n.dom);
              break;
            }
            t += n.size;
          }
          i == -1 && (i = this.contentDOM.childNodes.length);
          break;
        }
        a = s;
      }
      return {
        node: this.contentDOM,
        from: e,
        to: t,
        fromOffset: r,
        toOffset: i,
      };
    }
    emptyChildAt(e) {
      if (this.border || !this.contentDOM || !this.children.length) return !1;
      let t = this.children[e < 0 ? 0 : this.children.length - 1];
      return t.size == 0 || t.emptyChildAt(e);
    }
    domAfterPos(e) {
      let { node: t, offset: n } = this.domFromPos(e, 0);
      if (t.nodeType != 1 || n == t.childNodes.length)
        throw RangeError(`No node after pos ` + e);
      return t.childNodes[n];
    }
    setSelection(e, t, n, r = !1) {
      let i = Math.min(e, t),
        a = Math.max(e, t);
      for (let o = 0, s = 0; o < this.children.length; o++) {
        let c = this.children[o],
          l = s + c.size;
        if (i > s && a < l)
          return c.setSelection(e - s - c.border, t - s - c.border, n, r);
        s = l;
      }
      let o = this.domFromPos(e, e ? -1 : 1),
        s = t == e ? o : this.domFromPos(t, t ? -1 : 1),
        c = n.root.getSelection(),
        l = n.domSelectionRange(),
        u = !1;
      if ((ui || mi) && e == t) {
        let { node: e, offset: t } = o;
        if (e.nodeType == 3) {
          if (
            ((u = !!(
              t &&
              e.nodeValue[t - 1] ==
                `
`
            )),
            u && t == e.nodeValue.length)
          )
            for (let t = e, n; t; t = t.parentNode) {
              if ((n = t.nextSibling)) {
                n.nodeName == `BR` &&
                  (o = s = { node: n.parentNode, offset: Br(n) + 1 });
                break;
              }
              let e = t.pmViewDesc;
              if (e && e.node && e.node.isBlock) break;
            }
        } else {
          let n = e.childNodes[t - 1];
          u = n && (n.nodeName == `BR` || n.contentEditable == `false`);
        }
      }
      if (
        ui &&
        l.focusNode &&
        l.focusNode != s.node &&
        l.focusNode.nodeType == 1
      ) {
        let e = l.focusNode.childNodes[l.focusOffset];
        e && e.contentEditable == `false` && (r = !0);
      }
      if (
        !(r || (u && mi)) &&
        Gr(o.node, o.offset, l.anchorNode, l.anchorOffset) &&
        Gr(s.node, s.offset, l.focusNode, l.focusOffset)
      )
        return;
      let d = !1;
      if ((c.extend || e == t) && !(u && ui)) {
        c.collapse(o.node, o.offset);
        try {
          (e != t && c.extend(s.node, s.offset), (d = !0));
        } catch {}
      }
      if (!d) {
        if (e > t) {
          let e = o;
          ((o = s), (s = e));
        }
        let n = document.createRange();
        (n.setEnd(s.node, s.offset),
          n.setStart(o.node, o.offset),
          c.removeAllRanges(),
          c.addRange(n));
      }
    }
    ignoreMutation(e) {
      return !this.contentDOM && e.type != `selection`;
    }
    get contentLost() {
      return (
        this.contentDOM &&
        this.contentDOM != this.dom &&
        !this.dom.contains(this.contentDOM)
      );
    }
    markDirty(e, t) {
      for (let n = 0, r = 0; r < this.children.length; r++) {
        let i = this.children[r],
          a = n + i.size;
        if (n == a ? e <= a && t >= n : e < a && t > n) {
          let r = n + i.border,
            o = a - i.border;
          if (e >= r && t <= o) {
            ((this.dirty = e == n || t == a ? ta : ea),
              e == r &&
              t == o &&
              (i.contentLost || i.dom.parentNode != this.contentDOM)
                ? (i.dirty = na)
                : i.markDirty(e - r, t - r));
            return;
          } else
            i.dirty =
              i.dom == i.contentDOM &&
              i.dom.parentNode == this.contentDOM &&
              !i.children.length
                ? ta
                : na;
        }
        n = a;
      }
      this.dirty = ta;
    }
    markParentsDirty() {
      let e = 1;
      for (let t = this.parent; t; t = t.parent, e++) {
        let n = e == 1 ? ta : ea;
        t.dirty < n && (t.dirty = n);
      }
    }
    get domAtom() {
      return !1;
    }
    get ignoreForCoords() {
      return !1;
    }
    get ignoreForSelection() {
      return !1;
    }
    isText(e) {
      return !1;
    }
  },
  ia = class extends ra {
    constructor(e, t, n, r) {
      let i,
        a = t.type.toDOM;
      if (
        (typeof a == `function` &&
          (a = a(n, () => {
            if (!i) return r;
            if (i.parent) return i.parent.posBeforeChild(i);
          })),
        !t.type.spec.raw)
      ) {
        if (a.nodeType != 1) {
          let e = document.createElement(`span`);
          (e.appendChild(a), (a = e));
        }
        ((a.contentEditable = `false`), a.classList.add(`ProseMirror-widget`));
      }
      (super(e, [], a, null), (this.widget = t), (this.widget = t), (i = this));
    }
    matchesWidget(e) {
      return this.dirty == $i && e.type.eq(this.widget.type);
    }
    parseRule() {
      return { ignore: !0 };
    }
    stopEvent(e) {
      let t = this.widget.spec.stopEvent;
      return t ? t(e) : !1;
    }
    ignoreMutation(e) {
      return e.type != `selection` || this.widget.spec.ignoreSelection;
    }
    destroy() {
      (this.widget.type.destroy(this.dom), super.destroy());
    }
    get domAtom() {
      return !0;
    }
    get ignoreForSelection() {
      return !!this.widget.type.spec.relaxedSide;
    }
    get side() {
      return this.widget.type.side;
    }
  },
  aa = class extends ra {
    constructor(e, t, n, r) {
      (super(e, [], t, null), (this.textDOM = n), (this.text = r));
    }
    get size() {
      return this.text.length;
    }
    localPosFromDOM(e, t) {
      return e == this.textDOM
        ? this.posAtStart + t
        : this.posAtStart + (t ? this.size : 0);
    }
    domFromPos(e) {
      return { node: this.textDOM, offset: e };
    }
    ignoreMutation(e) {
      return e.type === `characterData` && e.target.nodeValue == e.oldValue;
    }
  },
  oa = class e extends ra {
    constructor(e, t, n, r, i) {
      (super(e, [], n, r), (this.mark = t), (this.spec = i));
    }
    static create(t, n, r, i) {
      let a = i.nodeViews[n.type.name],
        o = a && a(n, i, r);
      return (
        (!o || !o.dom) &&
          (o = Oe.renderSpec(document, n.type.spec.toDOM(n, r), null, n.attrs)),
        new e(t, n, o.dom, o.contentDOM || o.dom, o)
      );
    }
    parseRule() {
      return this.dirty & na || this.mark.type.spec.reparseInView
        ? null
        : {
            mark: this.mark.type.name,
            attrs: this.mark.attrs,
            contentElement: this.contentDOM,
          };
    }
    matchesMark(e) {
      return this.dirty != na && this.mark.eq(e);
    }
    markDirty(e, t) {
      if ((super.markDirty(e, t), this.dirty != $i)) {
        let e = this.parent;
        for (; !e.node; ) e = e.parent;
        (e.dirty < this.dirty && (e.dirty = this.dirty), (this.dirty = $i));
      }
    }
    slice(t, n, r) {
      let i = e.create(this.parent, this.mark, !0, r),
        a = this.children,
        o = this.size;
      (n < o && (a = Da(a, n, o, r)), t > 0 && (a = Da(a, 0, t, r)));
      for (let e = 0; e < a.length; e++) a[e].parent = i;
      return ((i.children = a), i);
    }
    ignoreMutation(e) {
      return this.spec.ignoreMutation
        ? this.spec.ignoreMutation(e)
        : super.ignoreMutation(e);
    }
    destroy() {
      (this.spec.destroy && this.spec.destroy(), super.destroy());
    }
  },
  sa = class e extends ra {
    constructor(e, t, n, r, i, a, o, s, c) {
      (super(e, [], i, a),
        (this.node = t),
        (this.outerDeco = n),
        (this.innerDeco = r),
        (this.nodeDOM = o));
    }
    static create(t, n, r, i, a, o) {
      let s = a.nodeViews[n.type.name],
        c,
        l =
          s &&
          s(
            n,
            a,
            () => {
              if (!c) return o;
              if (c.parent) return c.parent.posBeforeChild(c);
            },
            r,
            i,
          ),
        u = l && l.dom,
        d = l && l.contentDOM;
      if (n.isText) {
        if (!u) u = document.createTextNode(n.text);
        else if (u.nodeType != 3)
          throw RangeError(`Text must be rendered as a DOM text node`);
      } else if (!u) {
        let e = Oe.renderSpec(document, n.type.spec.toDOM(n), null, n.attrs);
        ({ dom: u, contentDOM: d } = e);
      }
      !d &&
        !n.isText &&
        u.nodeName != `BR` &&
        (u.hasAttribute(`contenteditable`) || (u.contentEditable = `false`),
        n.type.spec.draggable && (u.draggable = !0));
      let f = u;
      return (
        (u = va(u, r, n)),
        l
          ? (c = new da(t, n, r, i, u, d || null, f, l, a, o + 1))
          : n.isText
            ? new la(t, n, r, i, u, f, a)
            : new e(t, n, r, i, u, d || null, f, a, o + 1)
      );
    }
    parseRule() {
      if (this.node.type.spec.reparseInView) return null;
      let e = { node: this.node.type.name, attrs: this.node.attrs };
      if (
        (this.node.type.whitespace == `pre` && (e.preserveWhitespace = `full`),
        !this.contentDOM)
      )
        e.getContent = () => this.node.content;
      else if (!this.contentLost) e.contentElement = this.contentDOM;
      else {
        for (let t = this.children.length - 1; t >= 0; t--) {
          let n = this.children[t];
          if (this.dom.contains(n.dom.parentNode)) {
            e.contentElement = n.dom.parentNode;
            break;
          }
        }
        e.contentElement || (e.getContent = () => U.empty);
      }
      return e;
    }
    matchesNode(e, t, n) {
      return (
        this.dirty == $i &&
        e.eq(this.node) &&
        ya(t, this.outerDeco) &&
        n.eq(this.innerDeco)
      );
    }
    get size() {
      return this.node.nodeSize;
    }
    get border() {
      return this.node.isLeaf ? 0 : 1;
    }
    updateChildren(e, t) {
      let n = this.node.inlineContent,
        r = t,
        i = e.composing ? this.localCompositionInfo(e, t) : null,
        a = i && i.pos > -1 ? i : null,
        o = i && i.pos < 0,
        s = new xa(this, a && a.node, e);
      (wa(
        this.node,
        this.innerDeco,
        (t, i, a) => {
          (t.spec.marks
            ? s.syncToMarks(t.spec.marks, n, e, i)
            : t.type.side >= 0 &&
              !a &&
              s.syncToMarks(
                i == this.node.childCount ? Ne.none : this.node.child(i).marks,
                n,
                e,
                i,
              ),
            s.placeWidget(t, e, r));
        },
        (t, a, c, l) => {
          s.syncToMarks(t.marks, n, e, l);
          let u;
          (s.findNodeMatch(t, a, c, l) ||
            (o &&
              e.state.selection.from > r &&
              e.state.selection.to < r + t.nodeSize &&
              (u = s.findIndexWithChild(i.node)) > -1 &&
              s.updateNodeAt(t, a, c, u, e)) ||
            s.updateNextNode(t, a, c, e, l, r) ||
            s.addNode(t, a, c, e, r),
            (r += t.nodeSize));
        },
      ),
        s.syncToMarks([], n, e, 0),
        this.node.isTextblock && s.addTextblockHacks(),
        s.destroyRest(),
        (s.changed || this.dirty == ta) &&
          (a && this.protectLocalComposition(e, a),
          fa(this.contentDOM, this.children, e),
          hi && Ta(this.dom)));
    }
    localCompositionInfo(e, t) {
      let { from: n, to: r } = e.state.selection;
      if (
        !(e.state.selection instanceof J) ||
        n < t ||
        r > t + this.node.content.size
      )
        return null;
      let i = e.input.compositionNode;
      if (!i || !this.dom.contains(i.parentNode)) return null;
      if (this.node.inlineContent) {
        let e = i.nodeValue,
          a = Ea(this.node.content, e, n - t, r - t);
        return a < 0 ? null : { node: i, pos: a, text: e };
      } else return { node: i, pos: -1, text: `` };
    }
    protectLocalComposition(e, { node: t, pos: n, text: r }) {
      if (this.getDesc(t)) return;
      let i = t;
      for (; i.parentNode != this.contentDOM; i = i.parentNode) {
        for (; i.previousSibling; ) i.parentNode.removeChild(i.previousSibling);
        for (; i.nextSibling; ) i.parentNode.removeChild(i.nextSibling);
        i.pmViewDesc &&= void 0;
      }
      let a = new aa(this, i, t, r);
      (e.input.compositionNodes.push(a),
        (this.children = Da(this.children, n, n + r.length, e, a)));
    }
    update(e, t, n, r) {
      return this.dirty == na || !e.sameMarkup(this.node)
        ? !1
        : (this.updateInner(e, t, n, r), !0);
    }
    updateInner(e, t, n, r) {
      (this.updateOuterDeco(t),
        (this.node = e),
        (this.innerDeco = n),
        this.contentDOM && this.updateChildren(r, this.posAtStart),
        (this.dirty = $i));
    }
    updateOuterDeco(e) {
      if (ya(e, this.outerDeco)) return;
      let t = this.nodeDOM.nodeType != 1,
        n = this.dom;
      ((this.dom = ga(
        this.dom,
        this.nodeDOM,
        ha(this.outerDeco, this.node, t),
        ha(e, this.node, t),
      )),
        this.dom != n &&
          ((n.pmViewDesc = void 0), (this.dom.pmViewDesc = this)),
        (this.outerDeco = e));
    }
    selectNode() {
      this.nodeDOM.nodeType == 1 &&
        (this.nodeDOM.classList.add(`ProseMirror-selectednode`),
        (this.contentDOM || !this.node.type.spec.draggable) &&
          (this.nodeDOM.draggable = !0));
    }
    deselectNode() {
      this.nodeDOM.nodeType == 1 &&
        (this.nodeDOM.classList.remove(`ProseMirror-selectednode`),
        (this.contentDOM || !this.node.type.spec.draggable) &&
          this.nodeDOM.removeAttribute(`draggable`));
    }
    get domAtom() {
      return this.node.isAtom;
    }
  };
function ca(e, t, n, r, i) {
  va(r, t, e);
  let a = new sa(void 0, e, t, n, r, r, r, i, 0);
  return (a.contentDOM && a.updateChildren(i, 0), a);
}
var la = class e extends sa {
    constructor(e, t, n, r, i, a, o) {
      super(e, t, n, r, i, null, a, o, 0);
    }
    parseRule() {
      let e = this.nodeDOM.parentNode;
      for (; e && e != this.dom && !e.pmIsDeco; ) e = e.parentNode;
      return { skip: e || !0 };
    }
    update(e, t, n, r) {
      return this.dirty == na ||
        (this.dirty != $i && !this.inParent()) ||
        !e.sameMarkup(this.node)
        ? !1
        : (this.updateOuterDeco(t),
          (this.dirty != $i || e.text != this.node.text) &&
            e.text != this.nodeDOM.nodeValue &&
            ((this.nodeDOM.nodeValue = e.text),
            r.trackWrites == this.nodeDOM && (r.trackWrites = null)),
          (this.node = e),
          (this.dirty = $i),
          !0);
    }
    inParent() {
      let e = this.parent.contentDOM;
      for (let t = this.nodeDOM; t; t = t.parentNode) if (t == e) return !0;
      return !1;
    }
    domFromPos(e) {
      return { node: this.nodeDOM, offset: e };
    }
    localPosFromDOM(e, t, n) {
      return e == this.nodeDOM
        ? this.posAtStart + Math.min(t, this.node.text.length)
        : super.localPosFromDOM(e, t, n);
    }
    ignoreMutation(e) {
      return e.type != `characterData` && e.type != `selection`;
    }
    slice(t, n, r) {
      let i = this.node.cut(t, n),
        a = document.createTextNode(i.text);
      return new e(this.parent, i, this.outerDeco, this.innerDeco, a, a, r);
    }
    markDirty(e, t) {
      (super.markDirty(e, t),
        this.dom != this.nodeDOM &&
          (e == 0 || t == this.nodeDOM.nodeValue.length) &&
          (this.dirty = na));
    }
    get domAtom() {
      return !1;
    }
    isText(e) {
      return this.node.text == e;
    }
  },
  ua = class extends ra {
    parseRule() {
      return { ignore: !0 };
    }
    matchesHack(e) {
      return this.dirty == $i && this.dom.nodeName == e;
    }
    get domAtom() {
      return !0;
    }
    get ignoreForCoords() {
      return this.dom.nodeName == `IMG`;
    }
  },
  da = class extends sa {
    constructor(e, t, n, r, i, a, o, s, c, l) {
      (super(e, t, n, r, i, a, o, c, l), (this.spec = s));
    }
    update(e, t, n, r) {
      if (this.dirty == na) return !1;
      if (
        this.spec.update &&
        (this.node.type == e.type || this.spec.multiType)
      ) {
        let i = this.spec.update(e, t, n);
        return (i && this.updateInner(e, t, n, r), i);
      } else if (!this.contentDOM && !e.isLeaf) return !1;
      else return super.update(e, t, n, r);
    }
    selectNode() {
      this.spec.selectNode ? this.spec.selectNode() : super.selectNode();
    }
    deselectNode() {
      this.spec.deselectNode ? this.spec.deselectNode() : super.deselectNode();
    }
    setSelection(e, t, n, r) {
      this.spec.setSelection
        ? this.spec.setSelection(e, t, n.root)
        : super.setSelection(e, t, n, r);
    }
    destroy() {
      (this.spec.destroy && this.spec.destroy(), super.destroy());
    }
    stopEvent(e) {
      return this.spec.stopEvent ? this.spec.stopEvent(e) : !1;
    }
    ignoreMutation(e) {
      return this.spec.ignoreMutation
        ? this.spec.ignoreMutation(e)
        : super.ignoreMutation(e);
    }
  };
function fa(e, t, n) {
  let r = e.firstChild,
    i = !1;
  for (let a = 0; a < t.length; a++) {
    let o = t[a],
      s = o.dom;
    if (s.parentNode == e) {
      for (; s != r; ) ((r = ba(r)), (i = !0));
      r = r.nextSibling;
    } else ((i = !0), e.insertBefore(s, r));
    if (o instanceof oa) {
      let t = r ? r.previousSibling : e.lastChild;
      (fa(o.contentDOM, o.children, n), (r = t ? t.nextSibling : e.firstChild));
    }
  }
  for (; r; ) ((r = ba(r)), (i = !0));
  i && n.trackWrites == e && (n.trackWrites = null);
}
var pa = function (e) {
  e && (this.nodeName = e);
};
pa.prototype = Object.create(null);
var ma = [new pa()];
function ha(e, t, n) {
  if (e.length == 0) return ma;
  let r = n ? ma[0] : new pa(),
    i = [r];
  for (let a = 0; a < e.length; a++) {
    let o = e[a].type.attrs;
    if (o) {
      o.nodeName && i.push((r = new pa(o.nodeName)));
      for (let e in o) {
        let a = o[e];
        a != null &&
          (n &&
            i.length == 1 &&
            i.push((r = new pa(t.isInline ? `span` : `div`))),
          e == `class`
            ? (r.class = (r.class ? r.class + ` ` : ``) + a)
            : e == `style`
              ? (r.style = (r.style ? r.style + `;` : ``) + a)
              : e != `nodeName` && (r[e] = a));
      }
    }
  }
  return i;
}
function ga(e, t, n, r) {
  if (n == ma && r == ma) return t;
  let i = t;
  for (let t = 0; t < r.length; t++) {
    let a = r[t],
      o = n[t];
    if (t) {
      let t;
      o &&
      o.nodeName == a.nodeName &&
      i != e &&
      (t = i.parentNode) &&
      t.nodeName.toLowerCase() == a.nodeName
        ? (i = t)
        : ((t = document.createElement(a.nodeName)),
          (t.pmIsDeco = !0),
          t.appendChild(i),
          (o = ma[0]),
          (i = t));
    }
    _a(i, o || ma[0], a);
  }
  return i;
}
function _a(e, t, n) {
  for (let r in t)
    r != `class` &&
      r != `style` &&
      r != `nodeName` &&
      !(r in n) &&
      e.removeAttribute(r);
  for (let r in n)
    r != `class` &&
      r != `style` &&
      r != `nodeName` &&
      n[r] != t[r] &&
      e.setAttribute(r, n[r]);
  if (t.class != n.class) {
    let r = t.class ? t.class.split(` `).filter(Boolean) : [],
      i = n.class ? n.class.split(` `).filter(Boolean) : [];
    for (let t = 0; t < r.length; t++)
      i.indexOf(r[t]) == -1 && e.classList.remove(r[t]);
    for (let t = 0; t < i.length; t++)
      r.indexOf(i[t]) == -1 && e.classList.add(i[t]);
    e.classList.length == 0 && e.removeAttribute(`class`);
  }
  if (t.style != n.style) {
    if (t.style) {
      let n =
          /\s*([\w\-\xa1-\uffff]+)\s*:(?:"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\(.*?\)|[^;])*/g,
        r;
      for (; (r = n.exec(t.style)); ) e.style.removeProperty(r[1]);
    }
    n.style && (e.style.cssText += n.style);
  }
}
function va(e, t, n) {
  return ga(e, e, ma, ha(t, n, e.nodeType != 1));
}
function ya(e, t) {
  if (e.length != t.length) return !1;
  for (let n = 0; n < e.length; n++) if (!e[n].type.eq(t[n].type)) return !1;
  return !0;
}
function ba(e) {
  let t = e.nextSibling;
  return (e.parentNode.removeChild(e), t);
}
var xa = class {
  constructor(e, t, n) {
    ((this.lock = t),
      (this.view = n),
      (this.index = 0),
      (this.stack = []),
      (this.changed = !1),
      (this.top = e),
      (this.preMatch = Sa(e.node.content, e)));
  }
  destroyBetween(e, t) {
    if (e != t) {
      for (let n = e; n < t; n++) this.top.children[n].destroy();
      (this.top.children.splice(e, t - e), (this.changed = !0));
    }
  }
  destroyRest() {
    this.destroyBetween(this.index, this.top.children.length);
  }
  syncToMarks(e, t, n, r) {
    let i = 0,
      a = this.stack.length >> 1,
      o = Math.min(a, e.length);
    for (
      ;
      i < o &&
      (i == a - 1 ? this.top : this.stack[(i + 1) << 1]).matchesMark(e[i]) &&
      e[i].type.spec.spanning !== !1;
    )
      i++;
    for (; i < a; )
      (this.destroyRest(),
        (this.top.dirty = $i),
        (this.index = this.stack.pop()),
        (this.top = this.stack.pop()),
        a--);
    for (; a < e.length; ) {
      this.stack.push(this.top, this.index + 1);
      let i = -1,
        o = this.top.children.length;
      r < this.preMatch.index && (o = Math.min(this.index + 3, o));
      for (let t = this.index; t < o; t++) {
        let n = this.top.children[t];
        if (n.matchesMark(e[a]) && !this.isLocked(n.dom)) {
          i = t;
          break;
        }
      }
      if (i > -1)
        (i > this.index &&
          ((this.changed = !0), this.destroyBetween(this.index, i)),
          (this.top = this.top.children[this.index]));
      else {
        let r = oa.create(this.top, e[a], t, n);
        (this.top.children.splice(this.index, 0, r),
          (this.top = r),
          (this.changed = !0));
      }
      ((this.index = 0), a++);
    }
  }
  findNodeMatch(e, t, n, r) {
    let i = -1,
      a;
    if (
      r >= this.preMatch.index &&
      (a = this.preMatch.matches[r - this.preMatch.index]).parent == this.top &&
      a.matchesNode(e, t, n)
    )
      i = this.top.children.indexOf(a, this.index);
    else
      for (
        let r = this.index, a = Math.min(this.top.children.length, r + 5);
        r < a;
        r++
      ) {
        let a = this.top.children[r];
        if (a.matchesNode(e, t, n) && !this.preMatch.matched.has(a)) {
          i = r;
          break;
        }
      }
    return i < 0 ? !1 : (this.destroyBetween(this.index, i), this.index++, !0);
  }
  updateNodeAt(e, t, n, r, i) {
    let a = this.top.children[r];
    return (
      a.dirty == na && a.dom == a.contentDOM && (a.dirty = ta),
      a.update(e, t, n, i)
        ? (this.destroyBetween(this.index, r), this.index++, !0)
        : !1
    );
  }
  findIndexWithChild(e) {
    for (;;) {
      let t = e.parentNode;
      if (!t) return -1;
      if (t == this.top.contentDOM) {
        let t = e.pmViewDesc;
        if (t) {
          for (let e = this.index; e < this.top.children.length; e++)
            if (this.top.children[e] == t) return e;
        }
        return -1;
      }
      e = t;
    }
  }
  updateNextNode(e, t, n, r, i, a) {
    for (let o = this.index; o < this.top.children.length; o++) {
      let s = this.top.children[o];
      if (s instanceof sa) {
        let c = this.preMatch.matched.get(s);
        if (c != null && c != i) return !1;
        let l = s.dom,
          u,
          d =
            this.isLocked(l) &&
            !(
              e.isText &&
              s.node &&
              s.node.isText &&
              s.nodeDOM.nodeValue == e.text &&
              s.dirty != na &&
              ya(t, s.outerDeco)
            );
        if (!d && s.update(e, t, n, r))
          return (
            this.destroyBetween(this.index, o),
            s.dom != l && (this.changed = !0),
            this.index++,
            !0
          );
        if (!d && (u = this.recreateWrapper(s, e, t, n, r, a)))
          return (
            this.destroyBetween(this.index, o),
            (this.top.children[this.index] = u),
            u.contentDOM &&
              ((u.dirty = ta), u.updateChildren(r, a + 1), (u.dirty = $i)),
            (this.changed = !0),
            this.index++,
            !0
          );
        break;
      }
    }
    return !1;
  }
  recreateWrapper(e, t, n, r, i, a) {
    if (
      e.dirty ||
      t.isAtom ||
      !e.children.length ||
      !e.node.content.eq(t.content) ||
      !ya(n, e.outerDeco) ||
      !r.eq(e.innerDeco)
    )
      return null;
    let o = sa.create(this.top, t, n, r, i, a);
    if (o.contentDOM) {
      ((o.children = e.children), (e.children = []));
      for (let e of o.children) e.parent = o;
    }
    return (e.destroy(), o);
  }
  addNode(e, t, n, r, i) {
    let a = sa.create(this.top, e, t, n, r, i);
    (a.contentDOM && a.updateChildren(r, i + 1),
      this.top.children.splice(this.index++, 0, a),
      (this.changed = !0));
  }
  placeWidget(e, t, n) {
    let r =
      this.index < this.top.children.length
        ? this.top.children[this.index]
        : null;
    if (
      r &&
      r.matchesWidget(e) &&
      (e == r.widget || !r.widget.type.toDOM.parentNode)
    )
      this.index++;
    else {
      let r = new ia(this.top, e, t, n);
      (this.top.children.splice(this.index++, 0, r), (this.changed = !0));
    }
  }
  addTextblockHacks() {
    let e = this.top.children[this.index - 1],
      t = this.top;
    for (; e instanceof oa; )
      ((t = e), (e = t.children[t.children.length - 1]));
    (!e ||
      !(e instanceof la) ||
      /\n$/.test(e.node.text) ||
      (this.view.requiresGeckoHackNode && /\s$/.test(e.node.text))) &&
      ((mi || fi) &&
        e &&
        e.dom.contentEditable == `false` &&
        this.addHackNode(`IMG`, t),
      this.addHackNode(`BR`, this.top));
  }
  addHackNode(e, t) {
    if (
      t == this.top &&
      this.index < t.children.length &&
      t.children[this.index].matchesHack(e)
    )
      this.index++;
    else {
      let n = document.createElement(e);
      (e == `IMG` && ((n.className = `ProseMirror-separator`), (n.alt = ``)),
        e == `BR` && (n.className = `ProseMirror-trailingBreak`));
      let r = new ua(this.top, [], n, null);
      (t == this.top
        ? t.children.splice(this.index++, 0, r)
        : t.children.push(r),
        (this.changed = !0));
    }
  }
  isLocked(e) {
    return (
      this.lock &&
      (e == this.lock || (e.nodeType == 1 && e.contains(this.lock.parentNode)))
    );
  }
};
function Sa(e, t) {
  let n = t,
    r = n.children.length,
    i = e.childCount,
    a = new Map(),
    o = [];
  outer: for (; i > 0; ) {
    let s;
    for (;;)
      if (r) {
        let e = n.children[r - 1];
        if (e instanceof oa) ((n = e), (r = e.children.length));
        else {
          ((s = e), r--);
          break;
        }
      } else if (n == t) break outer;
      else ((r = n.parent.children.indexOf(n)), (n = n.parent));
    let c = s.node;
    if (c) {
      if (c != e.child(i - 1)) break;
      (--i, a.set(s, i), o.push(s));
    }
  }
  return { index: i, matched: a, matches: o.reverse() };
}
function Ca(e, t) {
  return e.type.side - t.type.side;
}
function wa(e, t, n, r) {
  let i = t.locals(e),
    a = 0;
  if (i.length == 0) {
    for (let n = 0; n < e.childCount; n++) {
      let o = e.child(n);
      (r(o, i, t.forChild(a, o), n), (a += o.nodeSize));
    }
    return;
  }
  let o = 0,
    s = [],
    c = null;
  for (let l = 0; ; ) {
    let u, d;
    for (; o < i.length && i[o].to == a; ) {
      let e = i[o++];
      e.widget && (u ? (d ||= [u]).push(e) : (u = e));
    }
    if (u)
      if (d) {
        d.sort(Ca);
        for (let e = 0; e < d.length; e++) n(d[e], l, !!c);
      } else n(u, l, !!c);
    let f, p;
    if (c) ((p = -1), (f = c), (c = null));
    else if (l < e.childCount) ((p = l), (f = e.child(l++)));
    else break;
    for (let e = 0; e < s.length; e++) s[e].to <= a && s.splice(e--, 1);
    for (; o < i.length && i[o].from <= a && i[o].to > a; ) s.push(i[o++]);
    let m = a + f.nodeSize;
    if (f.isText) {
      let e = m;
      o < i.length && i[o].from < e && (e = i[o].from);
      for (let t = 0; t < s.length; t++) s[t].to < e && (e = s[t].to);
      e < m && ((c = f.cut(e - a)), (f = f.cut(0, e - a)), (m = e), (p = -1));
    } else for (; o < i.length && i[o].to < m; ) o++;
    let h = f.isInline && !f.isLeaf ? s.filter((e) => !e.inline) : s.slice();
    (r(f, h, t.forChild(a, f), p), (a = m));
  }
}
function Ta(e) {
  if (e.nodeName == `UL` || e.nodeName == `OL`) {
    let t = e.style.cssText;
    ((e.style.cssText = t + `; list-style: square !important`),
      window.getComputedStyle(e).listStyle,
      (e.style.cssText = t));
  }
}
function Ea(e, t, n, r) {
  for (let i = 0, a = 0; i < e.childCount && a <= r; ) {
    let o = e.child(i++),
      s = a;
    if (((a += o.nodeSize), !o.isText)) continue;
    let c = o.text;
    for (; i < e.childCount; ) {
      let t = e.child(i++);
      if (((a += t.nodeSize), !t.isText)) break;
      c += t.text;
    }
    if (a >= n) {
      if (a >= r && c.slice(r - t.length - s, r - s) == t) return r - t.length;
      let e = s < r ? c.lastIndexOf(t, r - s - 1) : -1;
      if (e >= 0 && e + t.length + s >= n) return s + e;
      if (
        n == r &&
        c.length >= r + t.length - s &&
        c.slice(r - s, r - s + t.length) == t
      )
        return r;
    }
  }
  return -1;
}
function Da(e, t, n, r, i) {
  let a = [];
  for (let o = 0, s = 0; o < e.length; o++) {
    let c = e[o],
      l = s,
      u = (s += c.size);
    l >= n || u <= t
      ? a.push(c)
      : (l < t && a.push(c.slice(0, t - l, r)),
        (i &&= (a.push(i), void 0)),
        u > n && a.push(c.slice(n - l, c.size, r)));
  }
  return a;
}
function Oa(e, t = null) {
  let n = e.domSelectionRange(),
    r = e.state.doc;
  if (!n.focusNode) return null;
  let i = e.docView.nearestDesc(n.focusNode),
    a = i && i.size == 0,
    o = e.docView.posFromDOM(n.focusNode, n.focusOffset, 1);
  if (o < 0) return null;
  let s = r.resolve(o),
    c,
    l;
  if ($r(n)) {
    for (c = o; i && !i.node; ) i = i.parent;
    let e = i.node;
    if (
      i &&
      e.isAtom &&
      q.isSelectable(e) &&
      i.parent &&
      !(e.isInline && Zr(n.focusNode, n.focusOffset, i.dom))
    ) {
      let e = i.posBefore;
      l = new q(o == e ? s : r.resolve(e));
    }
  } else {
    if (
      n instanceof e.dom.ownerDocument.defaultView.Selection &&
      n.rangeCount > 1
    ) {
      let t = o,
        i = o;
      for (let r = 0; r < n.rangeCount; r++) {
        let a = n.getRangeAt(r);
        ((t = Math.min(
          t,
          e.docView.posFromDOM(a.startContainer, a.startOffset, 1),
        )),
          (i = Math.max(
            i,
            e.docView.posFromDOM(a.endContainer, a.endOffset, -1),
          )));
      }
      if (t < 0) return null;
      (([c, o] = i == e.state.selection.anchor ? [i, t] : [t, i]),
        (s = r.resolve(o)));
    } else c = e.docView.posFromDOM(n.anchorNode, n.anchorOffset, 1);
    if (c < 0) return null;
  }
  let u = r.resolve(c);
  if (!l) {
    let n = t == `pointer` || (e.state.selection.head < s.pos && !a) ? 1 : -1;
    l = za(e, u, s, n);
  }
  return l;
}
function ka(e) {
  return e.editable
    ? e.hasFocus()
    : Va(e) && document.activeElement && document.activeElement.contains(e.dom);
}
function Aa(e, t = !1) {
  let n = e.state.selection;
  if ((La(e, n), ka(e))) {
    if (!t && e.input.mouseDown && e.input.mouseDown.allowDefault && fi) {
      let t = e.domSelectionRange(),
        n = e.domObserver.currentSelection;
      if (
        t.anchorNode &&
        n.anchorNode &&
        Gr(t.anchorNode, t.anchorOffset, n.anchorNode, n.anchorOffset)
      ) {
        ((e.input.mouseDown.delayedSelectionSync = !0),
          e.domObserver.setCurSelection());
        return;
      }
    }
    if ((e.domObserver.disconnectSelection(), e.cursorWrapper)) Ia(e);
    else {
      let { anchor: r, head: i } = n,
        a,
        o;
      (ja &&
        !(n instanceof J) &&
        (n.$from.parent.inlineContent || (a = Ma(e, n.from)),
        !n.empty && !n.$from.parent.inlineContent && (o = Ma(e, n.to))),
        e.docView.setSelection(r, i, e, t),
        ja && (a && Pa(a), o && Pa(o)),
        n.visible
          ? e.dom.classList.remove(`ProseMirror-hideselection`)
          : (e.dom.classList.add(`ProseMirror-hideselection`),
            `onselectionchange` in document && Fa(e)));
    }
    (e.domObserver.setCurSelection(), e.domObserver.connectSelection());
  }
}
var ja = mi || (fi && pi < 63);
function Ma(e, t) {
  let { node: n, offset: r } = e.docView.domFromPos(t, 0),
    i = r < n.childNodes.length ? n.childNodes[r] : null,
    a = r ? n.childNodes[r - 1] : null;
  if (mi && i && i.contentEditable == `false`) return Na(i);
  if (
    (!i || i.contentEditable == `false`) &&
    (!a || a.contentEditable == `false`)
  ) {
    if (i) return Na(i);
    if (a) return Na(a);
  }
}
function Na(e) {
  return (
    (e.contentEditable = `true`),
    mi && e.draggable && ((e.draggable = !1), (e.wasDraggable = !0)),
    e
  );
}
function Pa(e) {
  ((e.contentEditable = `false`),
    (e.wasDraggable &&= ((e.draggable = !0), null)));
}
function Fa(e) {
  let t = e.dom.ownerDocument;
  t.removeEventListener(`selectionchange`, e.input.hideSelectionGuard);
  let n = e.domSelectionRange(),
    r = n.anchorNode,
    i = n.anchorOffset;
  t.addEventListener(
    `selectionchange`,
    (e.input.hideSelectionGuard = () => {
      (n.anchorNode != r || n.anchorOffset != i) &&
        (t.removeEventListener(`selectionchange`, e.input.hideSelectionGuard),
        setTimeout(() => {
          (!ka(e) || e.state.selection.visible) &&
            e.dom.classList.remove(`ProseMirror-hideselection`);
        }, 20));
    }),
  );
}
function Ia(e) {
  let t = e.domSelection();
  if (!t) return;
  let n = e.cursorWrapper.dom,
    r = n.nodeName == `IMG`;
  (r ? t.collapse(n.parentNode, Br(n) + 1) : t.collapse(n, 0),
    !r &&
      !e.state.selection.visible &&
      ci &&
      li <= 11 &&
      ((n.disabled = !0), (n.disabled = !1)));
}
function La(e, t) {
  if (t instanceof q) {
    let n = e.docView.descAt(t.from);
    n != e.lastSelectedViewDesc &&
      (Ra(e), n && n.selectNode(), (e.lastSelectedViewDesc = n));
  } else Ra(e);
}
function Ra(e) {
  e.lastSelectedViewDesc &&=
    (e.lastSelectedViewDesc.parent && e.lastSelectedViewDesc.deselectNode(),
    void 0);
}
function za(e, t, n, r) {
  return (
    e.someProp(`createSelectionBetween`, (r) => r(e, t, n)) ||
    J.between(t, n, r)
  );
}
function Ba(e) {
  return e.editable && !e.hasFocus() ? !1 : Va(e);
}
function Va(e) {
  let t = e.domSelectionRange();
  if (!t.anchorNode) return !1;
  try {
    return (
      e.dom.contains(
        t.anchorNode.nodeType == 3 ? t.anchorNode.parentNode : t.anchorNode,
      ) &&
      (e.editable ||
        e.dom.contains(
          t.focusNode.nodeType == 3 ? t.focusNode.parentNode : t.focusNode,
        ))
    );
  } catch {
    return !1;
  }
}
function Ha(e) {
  let t = e.docView.domFromPos(e.state.selection.anchor, 0),
    n = e.domSelectionRange();
  return Gr(t.node, t.offset, n.anchorNode, n.anchorOffset);
}
function Ua(e, t) {
  let { $anchor: n, $head: r } = e.selection,
    i = t > 0 ? n.max(r) : n.min(r),
    a = i.parent.inlineContent
      ? i.depth
        ? e.doc.resolve(t > 0 ? i.after() : i.before())
        : null
      : i;
  return a && K.findFrom(a, t);
}
function Wa(e, t) {
  return (e.dispatch(e.state.tr.setSelection(t).scrollIntoView()), !0);
}
function Ga(e, t, n) {
  let r = e.state.selection;
  if (r instanceof J) {
    if (n.indexOf(`s`) > -1) {
      let { $head: n } = r,
        i = n.textOffset ? null : t < 0 ? n.nodeBefore : n.nodeAfter;
      if (!i || i.isText || !i.isLeaf) return !1;
      let a = e.state.doc.resolve(n.pos + i.nodeSize * (t < 0 ? -1 : 1));
      return Wa(e, new J(r.$anchor, a));
    } else if (!r.empty) return !1;
    else if (e.endOfTextblock(t > 0 ? `forward` : `backward`)) {
      let n = Ua(e.state, t);
      return n && n instanceof q ? Wa(e, n) : !1;
    } else if (!(gi && n.indexOf(`m`) > -1)) {
      let n = r.$head,
        i = n.textOffset ? null : t < 0 ? n.nodeBefore : n.nodeAfter,
        a;
      if (!i || i.isText) return !1;
      let o = t < 0 ? n.pos - i.nodeSize : n.pos;
      return i.isAtom || ((a = e.docView.descAt(o)) && !a.contentDOM)
        ? q.isSelectable(i)
          ? Wa(e, new q(t < 0 ? e.state.doc.resolve(n.pos - i.nodeSize) : n))
          : yi
            ? Wa(e, new J(e.state.doc.resolve(t < 0 ? o : o + i.nodeSize)))
            : !1
        : !1;
    }
  } else if (r instanceof q && r.node.isInline)
    return Wa(e, new J(t > 0 ? r.$to : r.$from));
  else {
    let n = Ua(e.state, t);
    return n ? Wa(e, n) : !1;
  }
}
function Ka(e) {
  return e.nodeType == 3 ? e.nodeValue.length : e.childNodes.length;
}
function qa(e, t) {
  let n = e.pmViewDesc;
  return n && n.size == 0 && (t < 0 || e.nextSibling || e.nodeName != `BR`);
}
function Ja(e, t) {
  return t < 0 ? Ya(e) : Xa(e);
}
function Ya(e) {
  let t = e.domSelectionRange(),
    n = t.focusNode,
    r = t.focusOffset;
  if (!n) return;
  let i,
    a,
    o = !1;
  for (
    ui && n.nodeType == 1 && r < Ka(n) && qa(n.childNodes[r], -1) && (o = !0);
    ;
  )
    if (r > 0) {
      if (n.nodeType != 1) break;
      {
        let e = n.childNodes[r - 1];
        if (qa(e, -1)) ((i = n), (a = --r));
        else if (e.nodeType == 3) ((n = e), (r = n.nodeValue.length));
        else break;
      }
    } else if (Za(n)) break;
    else {
      let t = n.previousSibling;
      for (; t && qa(t, -1); )
        ((i = n.parentNode), (a = Br(t)), (t = t.previousSibling));
      if (t) ((n = t), (r = Ka(n)));
      else {
        if (((n = n.parentNode), n == e.dom)) break;
        r = 0;
      }
    }
  o ? eo(e, n, r) : i && eo(e, i, a);
}
function Xa(e) {
  let t = e.domSelectionRange(),
    n = t.focusNode,
    r = t.focusOffset;
  if (!n) return;
  let i = Ka(n),
    a,
    o;
  for (;;)
    if (r < i) {
      if (n.nodeType != 1) break;
      let e = n.childNodes[r];
      if (qa(e, 1)) ((a = n), (o = ++r));
      else break;
    } else if (Za(n)) break;
    else {
      let t = n.nextSibling;
      for (; t && qa(t, 1); )
        ((a = t.parentNode), (o = Br(t) + 1), (t = t.nextSibling));
      if (t) ((n = t), (r = 0), (i = Ka(n)));
      else {
        if (((n = n.parentNode), n == e.dom)) break;
        r = i = 0;
      }
    }
  a && eo(e, a, o);
}
function Za(e) {
  let t = e.pmViewDesc;
  return t && t.node && t.node.isBlock;
}
function Qa(e, t) {
  for (; e && t == e.childNodes.length && !Qr(e); )
    ((t = Br(e) + 1), (e = e.parentNode));
  for (; e && t < e.childNodes.length; ) {
    let n = e.childNodes[t];
    if (n.nodeType == 3) return n;
    if (n.nodeType == 1 && n.contentEditable == `false`) break;
    ((e = n), (t = 0));
  }
}
function $a(e, t) {
  for (; e && !t && !Qr(e); ) ((t = Br(e)), (e = e.parentNode));
  for (; e && t; ) {
    let n = e.childNodes[t - 1];
    if (n.nodeType == 3) return n;
    if (n.nodeType == 1 && n.contentEditable == `false`) break;
    ((e = n), (t = e.childNodes.length));
  }
}
function eo(e, t, n) {
  if (t.nodeType != 3) {
    let e, r;
    (r = Qa(t, n))
      ? ((t = r), (n = 0))
      : (e = $a(t, n)) && ((t = e), (n = e.nodeValue.length));
  }
  let r = e.domSelection();
  if (!r) return;
  if ($r(r)) {
    let e = document.createRange();
    (e.setEnd(t, n), e.setStart(t, n), r.removeAllRanges(), r.addRange(e));
  } else r.extend && r.extend(t, n);
  e.domObserver.setCurSelection();
  let { state: i } = e;
  setTimeout(() => {
    e.state == i && Aa(e);
  }, 50);
}
function to(e, t) {
  let n = e.state.doc.resolve(t);
  if (!(fi || _i) && n.parent.inlineContent) {
    let r = e.coordsAtPos(t);
    if (t > n.start()) {
      let n = e.coordsAtPos(t - 1),
        i = (n.top + n.bottom) / 2;
      if (i > r.top && i < r.bottom && Math.abs(n.left - r.left) > 1)
        return n.left < r.left ? `ltr` : `rtl`;
    }
    if (t < n.end()) {
      let n = e.coordsAtPos(t + 1),
        i = (n.top + n.bottom) / 2;
      if (i > r.top && i < r.bottom && Math.abs(n.left - r.left) > 1)
        return n.left > r.left ? `ltr` : `rtl`;
    }
  }
  return getComputedStyle(e.dom).direction == `rtl` ? `rtl` : `ltr`;
}
function no(e, t, n) {
  let r = e.state.selection;
  if (
    (r instanceof J && !r.empty) ||
    n.indexOf(`s`) > -1 ||
    (gi && n.indexOf(`m`) > -1)
  )
    return !1;
  let { $from: i, $to: a } = r;
  if (!i.parent.inlineContent || e.endOfTextblock(t < 0 ? `up` : `down`)) {
    let n = Ua(e.state, t);
    if (n && n instanceof q) return Wa(e, n);
  }
  if (!i.parent.inlineContent) {
    let n = t < 0 ? i : a,
      o = r instanceof Pe ? K.near(n, t) : K.findFrom(n, t);
    return o ? Wa(e, o) : !1;
  }
  return !1;
}
function ro(e, t) {
  if (!(e.state.selection instanceof J)) return !0;
  let { $head: n, $anchor: r, empty: i } = e.state.selection;
  if (!n.sameParent(r)) return !0;
  if (!i) return !1;
  if (e.endOfTextblock(t > 0 ? `forward` : `backward`)) return !0;
  let a = !n.textOffset && (t < 0 ? n.nodeBefore : n.nodeAfter);
  if (a && !a.isText) {
    let r = e.state.tr;
    return (
      t < 0
        ? r.delete(n.pos - a.nodeSize, n.pos)
        : r.delete(n.pos, n.pos + a.nodeSize),
      e.dispatch(r),
      !0
    );
  }
  return !1;
}
function io(e, t, n) {
  (e.domObserver.stop(), (t.contentEditable = n), e.domObserver.start());
}
function ao(e) {
  if (!mi || e.state.selection.$head.parentOffset > 0) return !1;
  let { focusNode: t, focusOffset: n } = e.domSelectionRange();
  if (
    t &&
    t.nodeType == 1 &&
    n == 0 &&
    t.firstChild &&
    t.firstChild.contentEditable == `false`
  ) {
    let n = t.firstChild;
    (io(e, n, `true`), setTimeout(() => io(e, n, `false`), 20));
  }
  return !1;
}
function oo(e) {
  let t = ``;
  return (
    e.ctrlKey && (t += `c`),
    e.metaKey && (t += `m`),
    e.altKey && (t += `a`),
    e.shiftKey && (t += `s`),
    t
  );
}
function so(e, t) {
  let n = t.keyCode,
    r = oo(t);
  if (n == 8 || (gi && n == 72 && r == `c`)) return ro(e, -1) || Ja(e, -1);
  if ((n == 46 && !t.shiftKey) || (gi && n == 68 && r == `c`))
    return ro(e, 1) || Ja(e, 1);
  if (n == 13 || n == 27) return !0;
  if (n == 37 || (gi && n == 66 && r == `c`)) {
    let t = n == 37 ? (to(e, e.state.selection.from) == `ltr` ? -1 : 1) : -1;
    return Ga(e, t, r) || Ja(e, t);
  } else if (n == 39 || (gi && n == 70 && r == `c`)) {
    let t = n == 39 ? (to(e, e.state.selection.from) == `ltr` ? 1 : -1) : 1;
    return Ga(e, t, r) || Ja(e, t);
  } else if (n == 38 || (gi && n == 80 && r == `c`))
    return no(e, -1, r) || Ja(e, -1);
  else if (n == 40 || (gi && n == 78 && r == `c`))
    return ao(e) || no(e, 1, r) || Ja(e, 1);
  else if (r == (gi ? `m` : `c`) && (n == 66 || n == 73 || n == 89 || n == 90))
    return !0;
  return !1;
}
function co(e, t) {
  e.someProp(`transformCopied`, (n) => {
    t = n(t, e);
  });
  let n = [],
    { content: r, openStart: i, openEnd: a } = t;
  for (
    ;
    i > 1 && a > 1 && r.childCount == 1 && r.firstChild.childCount == 1;
  ) {
    (i--, a--);
    let e = r.firstChild;
    (n.push(e.type.name, e.attrs == e.type.defaultAttrs ? null : e.attrs),
      (r = e.content));
  }
  let o = e.someProp(`clipboardSerializer`) || Oe.fromSchema(e.state.schema),
    s = bo(),
    c = s.createElement(`div`);
  c.appendChild(o.serializeFragment(r, { document: s }));
  let l = c.firstChild,
    u,
    d = 0;
  for (; l && l.nodeType == 1 && (u = vo[l.nodeName.toLowerCase()]); ) {
    for (let e = u.length - 1; e >= 0; e--) {
      let t = s.createElement(u[e]);
      for (; c.firstChild; ) t.appendChild(c.firstChild);
      (c.appendChild(t), d++);
    }
    l = c.firstChild;
  }
  return (
    l &&
      l.nodeType == 1 &&
      l.setAttribute(
        `data-pm-slice`,
        `${i} ${a}${d ? ` -${d}` : ``} ${JSON.stringify(n)}`,
      ),
    {
      dom: c,
      text:
        e.someProp(`clipboardTextSerializer`, (n) => n(t, e)) ||
        t.content.textBetween(
          0,
          t.content.size,
          `

`,
        ),
      slice: t,
    }
  );
}
function lo(e, t, n, r, i) {
  let a = i.parent.type.spec.code,
    o,
    s;
  if (!n && !t) return null;
  let c = !!t && (r || a || !n);
  if (c) {
    if (
      (e.someProp(`transformPastedText`, (n) => {
        t = n(t, a || r, e);
      }),
      a)
    )
      return (
        (s = new W(
          U.from(
            e.state.schema.text(
              t.replace(
                /\r\n?/g,
                `
`,
              ),
            ),
          ),
          0,
          0,
        )),
        e.someProp(`transformPasted`, (t) => {
          s = t(s, e, !0);
        }),
        s
      );
    let n = e.someProp(`clipboardTextParser`, (n) => n(t, i, r, e));
    if (n) s = n;
    else {
      let n = i.marks(),
        { schema: r } = e.state,
        a = Oe.fromSchema(r);
      ((o = document.createElement(`div`)),
        t.split(/(?:\r\n?|\n)+/).forEach((e) => {
          let t = o.appendChild(document.createElement(`p`));
          e && t.appendChild(a.serializeNode(r.text(e, n)));
        }));
    }
  } else
    (e.someProp(`transformPastedHTML`, (t) => {
      n = t(n, e);
    }),
      (o = Co(n)),
      yi && wo(o));
  let l = o && o.querySelector(`[data-pm-slice]`),
    u =
      l &&
      /^(\d+) (\d+)(?: -(\d+))? (.*)/.exec(
        l.getAttribute(`data-pm-slice`) || ``,
      );
  if (u && u[3])
    for (let e = +u[3]; e > 0; e--) {
      let e = o.firstChild;
      for (; e && e.nodeType != 1; ) e = e.nextSibling;
      if (!e) break;
      o = e;
    }
  if (
    ((s ||= (
      e.someProp(`clipboardParser`) ||
      e.someProp(`domParser`) ||
      Fe.fromSchema(e.state.schema)
    ).parseSlice(o, {
      preserveWhitespace: !!(c || u),
      context: i,
      ruleFromNode(e) {
        return e.nodeName == `BR` &&
          !e.nextSibling &&
          e.parentNode &&
          !uo.test(e.parentNode.nodeName)
          ? { ignore: !0 }
          : null;
      },
    })),
    u)
  )
    s = To(_o(s, +u[1], +u[2]), u[4]);
  else if (((s = W.maxOpen(fo(s.content, i), !0)), s.openStart || s.openEnd)) {
    let e = 0,
      t = 0;
    for (
      let t = s.content.firstChild;
      e < s.openStart && !t.type.spec.isolating;
      e++, t = t.firstChild
    );
    for (
      let e = s.content.lastChild;
      t < s.openEnd && !e.type.spec.isolating;
      t++, e = e.lastChild
    );
    s = _o(s, e, t);
  }
  return (
    e.someProp(`transformPasted`, (t) => {
      s = t(s, e, c);
    }),
    s
  );
}
var uo =
  /^(a|abbr|acronym|b|cite|code|del|em|i|ins|kbd|label|output|q|ruby|s|samp|span|strong|sub|sup|time|u|tt|var)$/i;
function fo(e, t) {
  if (e.childCount < 2) return e;
  for (let n = t.depth; n >= 0; n--) {
    let r = t.node(n).contentMatchAt(t.index(n)),
      i,
      a = [];
    if (
      (e.forEach((e) => {
        if (!a) return;
        let t = r.findWrapping(e.type),
          n;
        if (!t) return (a = null);
        if ((n = a.length && i.length && mo(t, i, e, a[a.length - 1], 0)))
          a[a.length - 1] = n;
        else {
          a.length && (a[a.length - 1] = ho(a[a.length - 1], i.length));
          let n = po(e, t);
          (a.push(n), (r = r.matchType(n.type)), (i = t));
        }
      }),
      a)
    )
      return U.from(a);
  }
  return e;
}
function po(e, t, n = 0) {
  for (let r = t.length - 1; r >= n; r--) e = t[r].create(null, U.from(e));
  return e;
}
function mo(e, t, n, r, i) {
  if (i < e.length && i < t.length && e[i] == t[i]) {
    let a = mo(e, t, n, r.lastChild, i + 1);
    if (a) return r.copy(r.content.replaceChild(r.childCount - 1, a));
    if (
      r
        .contentMatchAt(r.childCount)
        .matchType(i == e.length - 1 ? n.type : e[i + 1])
    )
      return r.copy(r.content.append(U.from(po(n, e, i + 1))));
  }
}
function ho(e, t) {
  if (t == 0) return e;
  let n = e.content.replaceChild(e.childCount - 1, ho(e.lastChild, t - 1)),
    r = e.contentMatchAt(e.childCount).fillBefore(U.empty, !0);
  return e.copy(n.append(r));
}
function go(e, t, n, r, i, a) {
  let o = t < 0 ? e.firstChild : e.lastChild,
    s = o.content;
  return (
    e.childCount > 1 && (a = 0),
    i < r - 1 && (s = go(s, t, n, r, i + 1, a)),
    i >= n &&
      (s =
        t < 0
          ? o
              .contentMatchAt(0)
              .fillBefore(s, a <= i)
              .append(s)
          : s.append(o.contentMatchAt(o.childCount).fillBefore(U.empty, !0))),
    e.replaceChild(t < 0 ? 0 : e.childCount - 1, o.copy(s))
  );
}
function _o(e, t, n) {
  return (
    t < e.openStart &&
      (e = new W(
        go(e.content, -1, t, e.openStart, 0, e.openEnd),
        t,
        e.openEnd,
      )),
    n < e.openEnd &&
      (e = new W(go(e.content, 1, n, e.openEnd, 0, 0), e.openStart, n)),
    e
  );
}
var vo = {
    thead: [`table`],
    tbody: [`table`],
    tfoot: [`table`],
    caption: [`table`],
    colgroup: [`table`],
    col: [`table`, `colgroup`],
    tr: [`table`, `tbody`],
    td: [`table`, `tbody`, `tr`],
    th: [`table`, `tbody`, `tr`],
  },
  yo = null;
function bo() {
  return (yo ||= document.implementation.createHTMLDocument(`title`));
}
var xo = null;
function So(e) {
  let t = window.trustedTypes;
  return t
    ? ((xo ||=
        t.defaultPolicy ||
        t.createPolicy(`ProseMirrorClipboard`, { createHTML: (e) => e })),
      xo.createHTML(e))
    : e;
}
function Co(e) {
  let t = /^(\s*<meta [^>]*>)*/.exec(e);
  t && (e = e.slice(t[0].length));
  let n = bo().createElement(`div`),
    r = /<([a-z][^>\s]+)/i.exec(e),
    i;
  if (
    ((i = r && vo[r[1].toLowerCase()]) &&
      (e =
        i.map((e) => `<` + e + `>`).join(``) +
        e +
        i
          .map((e) => `</` + e + `>`)
          .reverse()
          .join(``)),
    (n.innerHTML = So(e)),
    i)
  )
    for (let e = 0; e < i.length; e++) n = n.querySelector(i[e]) || n;
  return n;
}
function wo(e) {
  let t = e.querySelectorAll(
    fi ? `span:not([class]):not([style])` : `span.Apple-converted-space`,
  );
  for (let n = 0; n < t.length; n++) {
    let r = t[n];
    r.childNodes.length == 1 &&
      r.textContent == `\xA0` &&
      r.parentNode &&
      r.parentNode.replaceChild(e.ownerDocument.createTextNode(` `), r);
  }
}
function To(e, t) {
  if (!e.size) return e;
  let n = e.content.firstChild.type.schema,
    r;
  try {
    r = JSON.parse(t);
  } catch {
    return e;
  }
  let { content: i, openStart: a, openEnd: o } = e;
  for (let e = r.length - 2; e >= 0; e -= 2) {
    let t = n.nodes[r[e]];
    if (!t || t.hasRequiredAttrs()) break;
    ((i = U.from(t.create(r[e + 1], i))), a++, o++);
  }
  return new W(i, a, o);
}
var Eo = {},
  Do = {},
  Oo = { touchstart: !0, touchmove: !0 },
  ko = class {
    constructor() {
      ((this.shiftKey = !1),
        (this.mouseDown = null),
        (this.lastKeyCode = null),
        (this.lastKeyCodeTime = 0),
        (this.lastClick = { time: 0, x: 0, y: 0, type: ``, button: 0 }),
        (this.lastSelectionOrigin = null),
        (this.lastSelectionTime = 0),
        (this.lastIOSEnter = 0),
        (this.lastIOSEnterFallbackTimeout = -1),
        (this.lastFocus = 0),
        (this.lastTouch = 0),
        (this.lastChromeDelete = 0),
        (this.composing = !1),
        (this.compositionNode = null),
        (this.composingTimeout = -1),
        (this.compositionNodes = []),
        (this.compositionEndedAt = -2e8),
        (this.compositionID = 1),
        (this.badSafariComposition = !1),
        (this.compositionPendingChanges = 0),
        (this.domChangeCount = 0),
        (this.eventHandlers = Object.create(null)),
        (this.hideSelectionGuard = null));
    }
  };
function Ao(e) {
  for (let t in Eo) {
    let n = Eo[t];
    e.dom.addEventListener(
      t,
      (e.input.eventHandlers[t] = (t) => {
        Fo(e, t) && !Po(e, t) && (e.editable || !(t.type in Do)) && n(e, t);
      }),
      Oo[t] ? { passive: !0 } : void 0,
    );
  }
  (mi && e.dom.addEventListener(`input`, () => null), No(e));
}
function jo(e, t) {
  ((e.input.lastSelectionOrigin = t), (e.input.lastSelectionTime = Date.now()));
}
function Mo(e) {
  e.domObserver.stop();
  for (let t in e.input.eventHandlers)
    e.dom.removeEventListener(t, e.input.eventHandlers[t]);
  (clearTimeout(e.input.composingTimeout),
    clearTimeout(e.input.lastIOSEnterFallbackTimeout));
}
function No(e) {
  e.someProp(`handleDOMEvents`, (t) => {
    for (let n in t)
      e.input.eventHandlers[n] ||
        e.dom.addEventListener(n, (e.input.eventHandlers[n] = (t) => Po(e, t)));
  });
}
function Po(e, t) {
  return e.someProp(`handleDOMEvents`, (n) => {
    let r = n[t.type];
    return r ? r(e, t) || t.defaultPrevented : !1;
  });
}
function Fo(e, t) {
  if (!t.bubbles) return !0;
  if (t.defaultPrevented) return !1;
  for (let n = t.target; n != e.dom; n = n.parentNode)
    if (!n || n.nodeType == 11 || (n.pmViewDesc && n.pmViewDesc.stopEvent(t)))
      return !1;
  return !0;
}
function Io(e, t) {
  !Po(e, t) &&
    Eo[t.type] &&
    (e.editable || !(t.type in Do)) &&
    Eo[t.type](e, t);
}
((Do.keydown = (e, t) => {
  let n = t;
  if (
    ((e.input.shiftKey = n.keyCode == 16 || n.shiftKey),
    !Xo(e, n) &&
      ((e.input.lastKeyCode = n.keyCode),
      (e.input.lastKeyCodeTime = Date.now()),
      !(vi && fi && n.keyCode == 13)))
  )
    if (
      (n.keyCode != 229 && e.domObserver.forceFlush(),
      hi && n.keyCode == 13 && !n.ctrlKey && !n.altKey && !n.metaKey)
    ) {
      let t = Date.now();
      ((e.input.lastIOSEnter = t),
        (e.input.lastIOSEnterFallbackTimeout = setTimeout(() => {
          e.input.lastIOSEnter == t &&
            (e.someProp(`handleKeyDown`, (t) => t(e, ei(13, `Enter`))),
            (e.input.lastIOSEnter = 0));
        }, 200)));
    } else
      e.someProp(`handleKeyDown`, (t) => t(e, n)) || so(e, n)
        ? n.preventDefault()
        : jo(e, `key`);
}),
  (Do.keyup = (e, t) => {
    t.keyCode == 16 && (e.input.shiftKey = !1);
  }),
  (Do.keypress = (e, t) => {
    let n = t;
    if (
      Xo(e, n) ||
      !n.charCode ||
      (n.ctrlKey && !n.altKey) ||
      (gi && n.metaKey)
    )
      return;
    if (e.someProp(`handleKeyPress`, (t) => t(e, n))) {
      n.preventDefault();
      return;
    }
    let r = e.state.selection;
    if (!(r instanceof J) || !r.$from.sameParent(r.$to)) {
      let t = String.fromCharCode(n.charCode),
        i = () => e.state.tr.insertText(t).scrollIntoView();
      (!/[\r\n]/.test(t) &&
        !e.someProp(`handleTextInput`, (n) =>
          n(e, r.$from.pos, r.$to.pos, t, i),
        ) &&
        e.dispatch(i()),
        n.preventDefault());
    }
  }));
function Lo(e) {
  return { left: e.clientX, top: e.clientY };
}
function Ro(e, t) {
  let n = t.x - e.clientX,
    r = t.y - e.clientY;
  return n * n + r * r < 100;
}
function zo(e, t, n, r, i) {
  if (r == -1) return !1;
  let a = e.state.doc.resolve(r);
  for (let r = a.depth + 1; r > 0; r--)
    if (
      e.someProp(t, (t) =>
        r > a.depth
          ? t(e, n, a.nodeAfter, a.before(r), i, !0)
          : t(e, n, a.node(r), a.before(r), i, !1),
      )
    )
      return !0;
  return !1;
}
function Bo(e, t, n) {
  if ((e.focused || e.focus(), e.state.selection.eq(t))) return;
  let r = e.state.tr.setSelection(t);
  (n == `pointer` && r.setMeta(`pointer`, !0), e.dispatch(r));
}
function Vo(e, t) {
  if (t == -1) return !1;
  let n = e.state.doc.resolve(t),
    r = n.nodeAfter;
  return r && r.isAtom && q.isSelectable(r)
    ? (Bo(e, new q(n), `pointer`), !0)
    : !1;
}
function Ho(e, t) {
  if (t == -1) return !1;
  let n = e.state.selection,
    r,
    i;
  n instanceof q && (r = n.node);
  let a = e.state.doc.resolve(t);
  for (let e = a.depth + 1; e > 0; e--) {
    let t = e > a.depth ? a.nodeAfter : a.node(e);
    if (q.isSelectable(t)) {
      i =
        r &&
        n.$from.depth > 0 &&
        e >= n.$from.depth &&
        a.before(n.$from.depth + 1) == n.$from.pos
          ? a.before(n.$from.depth)
          : a.before(e);
      break;
    }
  }
  return i == null ? !1 : (Bo(e, q.create(e.state.doc, i), `pointer`), !0);
}
function Uo(e, t, n, r, i) {
  return (
    zo(e, `handleClickOn`, t, n, r) ||
    e.someProp(`handleClick`, (n) => n(e, t, r)) ||
    (i ? Ho(e, n) : Vo(e, n))
  );
}
function Wo(e, t, n, r) {
  return (
    zo(e, `handleDoubleClickOn`, t, n, r) ||
    e.someProp(`handleDoubleClick`, (n) => n(e, t, r))
  );
}
function Go(e, t, n, r) {
  return (
    zo(e, `handleTripleClickOn`, t, n, r) ||
    e.someProp(`handleTripleClick`, (n) => n(e, t, r)) ||
    Ko(e, n, r)
  );
}
function Ko(e, t, n) {
  if (n.button != 0) return !1;
  let r = e.state.doc;
  if (t == -1)
    return r.inlineContent
      ? (Bo(e, J.create(r, 0, r.content.size), `pointer`), !0)
      : !1;
  let i = r.resolve(t);
  for (let t = i.depth + 1; t > 0; t--) {
    let n = t > i.depth ? i.nodeAfter : i.node(t),
      a = i.before(t);
    if (n.inlineContent)
      Bo(e, J.create(r, a + 1, a + 1 + n.content.size), `pointer`);
    else if (q.isSelectable(n)) Bo(e, q.create(r, a), `pointer`);
    else continue;
    return !0;
  }
}
function qo(e) {
  return rs(e);
}
var Jo = gi ? `metaKey` : `ctrlKey`;
Eo.mousedown = (e, t) => {
  let n = t;
  e.input.shiftKey = n.shiftKey;
  let r = qo(e),
    i = Date.now(),
    a = `singleClick`;
  (i - e.input.lastClick.time < 500 &&
    Ro(n, e.input.lastClick) &&
    !n[Jo] &&
    e.input.lastClick.button == n.button &&
    (e.input.lastClick.type == `singleClick`
      ? (a = `doubleClick`)
      : e.input.lastClick.type == `doubleClick` && (a = `tripleClick`)),
    (e.input.lastClick = {
      time: i,
      x: n.clientX,
      y: n.clientY,
      type: a,
      button: n.button,
    }));
  let o = e.posAtCoords(Lo(n));
  o &&
    (a == `singleClick`
      ? (e.input.mouseDown && e.input.mouseDown.done(),
        (e.input.mouseDown = new Yo(e, o, n, !!r)))
      : (a == `doubleClick` ? Wo : Go)(e, o.pos, o.inside, n)
        ? n.preventDefault()
        : jo(e, `pointer`));
};
var Yo = class {
  constructor(e, t, n, r) {
    ((this.view = e),
      (this.pos = t),
      (this.event = n),
      (this.flushed = r),
      (this.delayedSelectionSync = !1),
      (this.mightDrag = null),
      (this.startDoc = e.state.doc),
      (this.selectNode = !!n[Jo]),
      (this.allowDefault = n.shiftKey));
    let i, a;
    if (t.inside > -1) ((i = e.state.doc.nodeAt(t.inside)), (a = t.inside));
    else {
      let n = e.state.doc.resolve(t.pos);
      ((i = n.parent), (a = n.depth ? n.before() : 0));
    }
    let o = r ? null : n.target,
      s = o ? e.docView.nearestDesc(o, !0) : null;
    this.target = s && s.nodeDOM.nodeType == 1 ? s.nodeDOM : null;
    let { selection: c } = e.state;
    (n.button == 0 &&
      ((i.type.spec.draggable && i.type.spec.selectable !== !1) ||
        (c instanceof q && c.from <= a && c.to > a)) &&
      (this.mightDrag = {
        node: i,
        pos: a,
        addAttr: !!(this.target && !this.target.draggable),
        setUneditable: !!(
          this.target &&
          ui &&
          !this.target.hasAttribute(`contentEditable`)
        ),
      }),
      this.target &&
        this.mightDrag &&
        (this.mightDrag.addAttr || this.mightDrag.setUneditable) &&
        (this.view.domObserver.stop(),
        this.mightDrag.addAttr && (this.target.draggable = !0),
        this.mightDrag.setUneditable &&
          setTimeout(() => {
            this.view.input.mouseDown == this &&
              this.target.setAttribute(`contentEditable`, `false`);
          }, 20),
        this.view.domObserver.start()),
      e.root.addEventListener(`mouseup`, (this.up = this.up.bind(this))),
      e.root.addEventListener(`mousemove`, (this.move = this.move.bind(this))),
      jo(e, `pointer`));
  }
  done() {
    (this.view.root.removeEventListener(`mouseup`, this.up),
      this.view.root.removeEventListener(`mousemove`, this.move),
      this.mightDrag &&
        this.target &&
        (this.view.domObserver.stop(),
        this.mightDrag.addAttr && this.target.removeAttribute(`draggable`),
        this.mightDrag.setUneditable &&
          this.target.removeAttribute(`contentEditable`),
        this.view.domObserver.start()),
      this.delayedSelectionSync && setTimeout(() => Aa(this.view)),
      (this.view.input.mouseDown = null));
  }
  up(e) {
    if ((this.done(), !this.view.dom.contains(e.target))) return;
    let t = this.pos;
    (this.view.state.doc != this.startDoc && (t = this.view.posAtCoords(Lo(e))),
      this.updateAllowDefault(e),
      this.allowDefault || !t
        ? jo(this.view, `pointer`)
        : Uo(this.view, t.pos, t.inside, e, this.selectNode)
          ? e.preventDefault()
          : e.button == 0 &&
              (this.flushed ||
                (mi && this.mightDrag && !this.mightDrag.node.isAtom) ||
                (fi &&
                  !this.view.state.selection.visible &&
                  Math.min(
                    Math.abs(t.pos - this.view.state.selection.from),
                    Math.abs(t.pos - this.view.state.selection.to),
                  ) <= 2))
            ? (Bo(
                this.view,
                K.near(this.view.state.doc.resolve(t.pos)),
                `pointer`,
              ),
              e.preventDefault())
            : jo(this.view, `pointer`));
  }
  move(e) {
    (this.updateAllowDefault(e),
      jo(this.view, `pointer`),
      e.buttons == 0 && this.done());
  }
  updateAllowDefault(e) {
    !this.allowDefault &&
      (Math.abs(this.event.x - e.clientX) > 4 ||
        Math.abs(this.event.y - e.clientY) > 4) &&
      (this.allowDefault = !0);
  }
};
((Eo.touchstart = (e) => {
  ((e.input.lastTouch = Date.now()), qo(e), jo(e, `pointer`));
}),
  (Eo.touchmove = (e) => {
    ((e.input.lastTouch = Date.now()), jo(e, `pointer`));
  }),
  (Eo.contextmenu = (e) => qo(e)));
function Xo(e, t) {
  return e.composing
    ? !0
    : mi && Math.abs(t.timeStamp - e.input.compositionEndedAt) < 500
      ? ((e.input.compositionEndedAt = -2e8), !0)
      : !1;
}
var Zo = vi ? 5e3 : -1;
Do.compositionstart = Do.compositionupdate = (e) => {
  if (!e.composing) {
    e.domObserver.flush();
    let { state: t } = e,
      n = t.selection.$to;
    if (
      t.selection instanceof J &&
      (t.storedMarks ||
        (!n.textOffset &&
          n.parentOffset &&
          n.nodeBefore.marks.some((e) => e.type.spec.inclusive === !1)) ||
        (fi && _i && Qo(e)))
    )
      ((e.markCursor = e.state.storedMarks || n.marks()),
        rs(e, !0),
        (e.markCursor = null));
    else if (
      (rs(e, !t.selection.empty),
      ui &&
        t.selection.empty &&
        n.parentOffset &&
        !n.textOffset &&
        n.nodeBefore.marks.length)
    ) {
      let t = e.domSelectionRange();
      for (
        let n = t.focusNode, r = t.focusOffset;
        n && n.nodeType == 1 && r != 0;
      ) {
        let t = r < 0 ? n.lastChild : n.childNodes[r - 1];
        if (!t) break;
        if (t.nodeType == 3) {
          let n = e.domSelection();
          n && n.collapse(t, t.nodeValue.length);
          break;
        } else ((n = t), (r = -1));
      }
    }
    e.input.composing = !0;
  }
  $o(e, Zo);
};
function Qo(e) {
  let { focusNode: t, focusOffset: n } = e.domSelectionRange();
  if (!t || t.nodeType != 1 || n >= t.childNodes.length) return !1;
  let r = t.childNodes[n];
  return r.nodeType == 1 && r.contentEditable == `false`;
}
Do.compositionend = (e, t) => {
  e.composing &&
    ((e.input.composing = !1),
    (e.input.compositionEndedAt = t.timeStamp),
    (e.input.compositionPendingChanges = e.domObserver.pendingRecords().length
      ? e.input.compositionID
      : 0),
    (e.input.compositionNode = null),
    e.input.badSafariComposition
      ? e.domObserver.forceFlush()
      : e.input.compositionPendingChanges &&
        Promise.resolve().then(() => e.domObserver.flush()),
    e.input.compositionID++,
    $o(e, 20));
};
function $o(e, t) {
  (clearTimeout(e.input.composingTimeout),
    t > -1 && (e.input.composingTimeout = setTimeout(() => rs(e), t)));
}
function es(e) {
  for (
    e.composing &&
    ((e.input.composing = !1), (e.input.compositionEndedAt = ns()));
    e.input.compositionNodes.length > 0;
  )
    e.input.compositionNodes.pop().markParentsDirty();
}
function ts(e) {
  let t = e.domSelectionRange();
  if (!t.focusNode) return null;
  let n = Yr(t.focusNode, t.focusOffset),
    r = Xr(t.focusNode, t.focusOffset);
  if (n && r && n != r) {
    let t = r.pmViewDesc,
      i = e.domObserver.lastChangedTextNode;
    if (n == i || r == i) return i;
    if (!t || !t.isText(r.nodeValue)) return r;
    if (e.input.compositionNode == r) {
      let e = n.pmViewDesc;
      if (!(!e || !e.isText(n.nodeValue))) return r;
    }
  }
  return n || r;
}
function ns() {
  let e = document.createEvent(`Event`);
  return (e.initEvent(`event`, !0, !0), e.timeStamp);
}
function rs(e, t = !1) {
  if (!(vi && e.domObserver.flushingSoon >= 0)) {
    if (
      (e.domObserver.forceFlush(), es(e), t || (e.docView && e.docView.dirty))
    ) {
      let n = Oa(e),
        r = e.state.selection;
      return (
        n && !n.eq(r)
          ? e.dispatch(e.state.tr.setSelection(n))
          : (e.markCursor || t) &&
              !r.$from.node(r.$from.sharedDepth(r.to)).inlineContent
            ? e.dispatch(e.state.tr.deleteSelection())
            : e.updateState(e.state),
        !0
      );
    }
    return !1;
  }
}
function is(e, t) {
  if (!e.dom.parentNode) return;
  let n = e.dom.parentNode.appendChild(document.createElement(`div`));
  (n.appendChild(t),
    (n.style.cssText = `position: fixed; left: -10000px; top: 10px`));
  let r = getSelection(),
    i = document.createRange();
  (i.selectNodeContents(t),
    e.dom.blur(),
    r.removeAllRanges(),
    r.addRange(i),
    setTimeout(() => {
      (n.parentNode && n.parentNode.removeChild(n), e.focus());
    }, 50));
}
var as = (ci && li < 15) || (hi && bi < 604);
Eo.copy = Do.cut = (e, t) => {
  let n = t,
    r = e.state.selection,
    i = n.type == `cut`;
  if (r.empty) return;
  let a = as ? null : n.clipboardData,
    { dom: o, text: s } = co(e, r.content());
  (a
    ? (n.preventDefault(),
      a.clearData(),
      a.setData(`text/html`, o.innerHTML),
      a.setData(`text/plain`, s))
    : is(e, o),
    i &&
      e.dispatch(
        e.state.tr.deleteSelection().scrollIntoView().setMeta(`uiEvent`, `cut`),
      ));
};
function ss(e) {
  return e.openStart == 0 && e.openEnd == 0 && e.content.childCount == 1
    ? e.content.firstChild
    : null;
}
function cs(e, t) {
  if (!e.dom.parentNode) return;
  let n = e.input.shiftKey || e.state.selection.$from.parent.type.spec.code,
    r = e.dom.parentNode.appendChild(
      document.createElement(n ? `textarea` : `div`),
    );
  (n || (r.contentEditable = `true`),
    (r.style.cssText = `position: fixed; left: -10000px; top: 10px`),
    r.focus());
  let i = e.input.shiftKey && e.input.lastKeyCode != 45;
  setTimeout(() => {
    (e.focus(),
      r.parentNode && r.parentNode.removeChild(r),
      n ? ls(e, r.value, null, i, t) : ls(e, r.textContent, r.innerHTML, i, t));
  }, 50);
}
function ls(e, t, n, r, i) {
  let a = lo(e, t, n, r, e.state.selection.$from);
  if (e.someProp(`handlePaste`, (t) => t(e, i, a || W.empty))) return !0;
  if (!a) return !1;
  let o = ss(a),
    s = o
      ? e.state.tr.replaceSelectionWith(o, r)
      : e.state.tr.replaceSelection(a);
  return (
    e.dispatch(
      s.scrollIntoView().setMeta(`paste`, !0).setMeta(`uiEvent`, `paste`),
    ),
    !0
  );
}
function us(e) {
  let t = e.getData(`text/plain`) || e.getData(`Text`);
  if (t) return t;
  let n = e.getData(`text/uri-list`);
  return n ? n.replace(/\r?\n/g, ` `) : ``;
}
Do.paste = (e, t) => {
  let n = t;
  if (e.composing && !vi) return;
  let r = as ? null : n.clipboardData,
    i = e.input.shiftKey && e.input.lastKeyCode != 45;
  r && ls(e, us(r), r.getData(`text/html`), i, n)
    ? n.preventDefault()
    : cs(e, n);
};
var ds = class {
    constructor(e, t, n) {
      ((this.slice = e), (this.move = t), (this.node = n));
    }
  },
  fs = gi ? `altKey` : `ctrlKey`;
function ps(e, t) {
  let n;
  return (
    e.someProp(`dragCopies`, (e) => {
      n ||= e(t);
    }),
    n == null ? !t[fs] : !n
  );
}
((Eo.dragstart = (e, t) => {
  let n = t,
    r = e.input.mouseDown;
  if ((r && r.done(), !n.dataTransfer)) return;
  let i = e.state.selection,
    a = i.empty ? null : e.posAtCoords(Lo(n)),
    o;
  if (!(a && a.pos >= i.from && a.pos <= (i instanceof q ? i.to - 1 : i.to))) {
    if (r && r.mightDrag) o = q.create(e.state.doc, r.mightDrag.pos);
    else if (n.target && n.target.nodeType == 1) {
      let t = e.docView.nearestDesc(n.target, !0);
      t &&
        t.node.type.spec.draggable &&
        t != e.docView &&
        (o = q.create(e.state.doc, t.posBefore));
    }
  }
  let { dom: s, text: c, slice: l } = co(e, (o || e.state.selection).content());
  ((!n.dataTransfer.files.length || !fi || pi > 120) &&
    n.dataTransfer.clearData(),
    n.dataTransfer.setData(as ? `Text` : `text/html`, s.innerHTML),
    (n.dataTransfer.effectAllowed = `copyMove`),
    as || n.dataTransfer.setData(`text/plain`, c),
    (e.dragging = new ds(l, ps(e, n), o)));
}),
  (Eo.dragend = (e) => {
    let t = e.dragging;
    window.setTimeout(() => {
      e.dragging == t && (e.dragging = null);
    }, 50);
  }),
  (Do.dragover = Do.dragenter = (e, t) => t.preventDefault()),
  (Do.drop = (e, t) => {
    try {
      ms(e, t, e.dragging);
    } finally {
      e.dragging = null;
    }
  }));
function ms(e, t, n) {
  if (!t.dataTransfer) return;
  let r = e.posAtCoords(Lo(t));
  if (!r) return;
  let i = e.state.doc.resolve(r.pos),
    a = n && n.slice;
  a
    ? e.someProp(`transformPasted`, (t) => {
        a = t(a, e, !1);
      })
    : (a = lo(
        e,
        us(t.dataTransfer),
        as ? null : t.dataTransfer.getData(`text/html`),
        !1,
        i,
      ));
  let o = !!(n && ps(e, t));
  if (e.someProp(`handleDrop`, (n) => n(e, t, a || W.empty, o))) {
    t.preventDefault();
    return;
  }
  if (!a) return;
  t.preventDefault();
  let s = a ? je(e.state.doc, i.pos, a) : i.pos;
  s ??= i.pos;
  let c = e.state.tr;
  if (o) {
    let { node: e } = n;
    e ? e.replace(c) : c.deleteSelection();
  }
  let l = c.mapping.map(s),
    u = a.openStart == 0 && a.openEnd == 0 && a.content.childCount == 1,
    d = c.doc;
  if (
    (u
      ? c.replaceRangeWith(l, l, a.content.firstChild)
      : c.replaceRange(l, l, a),
    c.doc.eq(d))
  )
    return;
  let f = c.doc.resolve(l);
  if (
    u &&
    q.isSelectable(a.content.firstChild) &&
    f.nodeAfter &&
    f.nodeAfter.sameMarkup(a.content.firstChild)
  )
    c.setSelection(new q(f));
  else {
    let t = c.mapping.map(s);
    (c.mapping.maps[c.mapping.maps.length - 1].forEach((e, n, r, i) => (t = i)),
      c.setSelection(za(e, f, c.doc.resolve(t))));
  }
  (e.focus(), e.dispatch(c.setMeta(`uiEvent`, `drop`)));
}
((Eo.focus = (e) => {
  ((e.input.lastFocus = Date.now()),
    e.focused ||
      (e.domObserver.stop(),
      e.dom.classList.add(`ProseMirror-focused`),
      e.domObserver.start(),
      (e.focused = !0),
      setTimeout(() => {
        e.docView &&
          e.hasFocus() &&
          !e.domObserver.currentSelection.eq(e.domSelectionRange()) &&
          Aa(e);
      }, 20)));
}),
  (Eo.blur = (e, t) => {
    let n = t;
    e.focused &&=
      (e.domObserver.stop(),
      e.dom.classList.remove(`ProseMirror-focused`),
      e.domObserver.start(),
      n.relatedTarget &&
        e.dom.contains(n.relatedTarget) &&
        e.domObserver.currentSelection.clear(),
      !1);
  }),
  (Eo.beforeinput = (e, t) => {
    if (fi && vi && t.inputType == `deleteContentBackward`) {
      e.domObserver.flushSoon();
      let { domChangeCount: t } = e.input;
      setTimeout(() => {
        if (
          e.input.domChangeCount != t ||
          (e.dom.blur(),
          e.focus(),
          e.someProp(`handleKeyDown`, (t) => t(e, ei(8, `Backspace`))))
        )
          return;
        let { $cursor: n } = e.state.selection;
        n &&
          n.pos > 0 &&
          e.dispatch(e.state.tr.delete(n.pos - 1, n.pos).scrollIntoView());
      }, 50);
    }
  }));
for (let e in Do) Eo[e] = Do[e];
function hs(e, t) {
  if (e == t) return !0;
  for (let n in e) if (e[n] !== t[n]) return !1;
  for (let n in t) if (!(n in e)) return !1;
  return !0;
}
var gs = class e {
    constructor(e, t) {
      ((this.toDOM = e),
        (this.spec = t || xs),
        (this.side = this.spec.side || 0));
    }
    map(e, t, n, r) {
      let { pos: i, deleted: a } = e.mapResult(
        t.from + r,
        this.side < 0 ? -1 : 1,
      );
      return a ? null : new ys(i - n, i - n, this);
    }
    valid() {
      return !0;
    }
    eq(t) {
      return (
        this == t ||
        (t instanceof e &&
          ((this.spec.key && this.spec.key == t.spec.key) ||
            (this.toDOM == t.toDOM && hs(this.spec, t.spec))))
      );
    }
    destroy(e) {
      this.spec.destroy && this.spec.destroy(e);
    }
  },
  _s = class e {
    constructor(e, t) {
      ((this.attrs = e), (this.spec = t || xs));
    }
    map(e, t, n, r) {
      let i = e.map(t.from + r, this.spec.inclusiveStart ? -1 : 1) - n,
        a = e.map(t.to + r, this.spec.inclusiveEnd ? 1 : -1) - n;
      return i >= a ? null : new ys(i, a, this);
    }
    valid(e, t) {
      return t.from < t.to;
    }
    eq(t) {
      return (
        this == t ||
        (t instanceof e && hs(this.attrs, t.attrs) && hs(this.spec, t.spec))
      );
    }
    static is(t) {
      return t.type instanceof e;
    }
    destroy() {}
  },
  vs = class e {
    constructor(e, t) {
      ((this.attrs = e), (this.spec = t || xs));
    }
    map(e, t, n, r) {
      let i = e.mapResult(t.from + r, 1);
      if (i.deleted) return null;
      let a = e.mapResult(t.to + r, -1);
      return a.deleted || a.pos <= i.pos
        ? null
        : new ys(i.pos - n, a.pos - n, this);
    }
    valid(e, t) {
      let { index: n, offset: r } = e.content.findIndex(t.from),
        i;
      return r == t.from && !(i = e.child(n)).isText && r + i.nodeSize == t.to;
    }
    eq(t) {
      return (
        this == t ||
        (t instanceof e && hs(this.attrs, t.attrs) && hs(this.spec, t.spec))
      );
    }
    destroy() {}
  },
  ys = class e {
    constructor(e, t, n) {
      ((this.from = e), (this.to = t), (this.type = n));
    }
    copy(t, n) {
      return new e(t, n, this.type);
    }
    eq(e, t = 0) {
      return (
        this.type.eq(e.type) && this.from + t == e.from && this.to + t == e.to
      );
    }
    map(e, t, n) {
      return this.type.map(e, this, t, n);
    }
    static widget(t, n, r) {
      return new e(t, t, new gs(n, r));
    }
    static inline(t, n, r, i) {
      return new e(t, n, new _s(r, i));
    }
    static node(t, n, r, i) {
      return new e(t, n, new vs(r, i));
    }
    get spec() {
      return this.type.spec;
    }
    get inline() {
      return this.type instanceof _s;
    }
    get widget() {
      return this.type instanceof gs;
    }
  },
  bs = [],
  xs = {},
  Ss = class e {
    constructor(e, t) {
      ((this.local = e.length ? e : bs), (this.children = t.length ? t : bs));
    }
    static create(e, t) {
      return t.length ? As(t, e, 0, xs) : Cs;
    }
    find(e, t, n) {
      let r = [];
      return (this.findInner(e ?? 0, t ?? 1e9, r, 0, n), r);
    }
    findInner(e, t, n, r, i) {
      for (let a = 0; a < this.local.length; a++) {
        let o = this.local[a];
        o.from <= t &&
          o.to >= e &&
          (!i || i(o.spec)) &&
          n.push(o.copy(o.from + r, o.to + r));
      }
      for (let a = 0; a < this.children.length; a += 3)
        if (this.children[a] < t && this.children[a + 1] > e) {
          let o = this.children[a] + 1;
          this.children[a + 2].findInner(e - o, t - o, n, r + o, i);
        }
    }
    map(e, t, n) {
      return this == Cs || e.maps.length == 0
        ? this
        : this.mapInner(e, t, 0, 0, n || xs);
    }
    mapInner(t, n, r, i, a) {
      let o;
      for (let e = 0; e < this.local.length; e++) {
        let s = this.local[e].map(t, r, i);
        s && s.type.valid(n, s)
          ? (o ||= []).push(s)
          : a.onRemove && a.onRemove(this.local[e].spec);
      }
      return this.children.length
        ? Ts(this.children, o || [], t, n, r, i, a)
        : o
          ? new e(o.sort(js), bs)
          : Cs;
    }
    add(t, n) {
      return n.length
        ? this == Cs
          ? e.create(t, n)
          : this.addInner(t, n, 0)
        : this;
    }
    addInner(t, n, r) {
      let i,
        a = 0;
      t.forEach((e, t) => {
        let o = t + r,
          s;
        if ((s = Os(n, e, o))) {
          for (i ||= this.children.slice(); a < i.length && i[a] < t; ) a += 3;
          (i[a] == t
            ? (i[a + 2] = i[a + 2].addInner(e, s, o + 1))
            : i.splice(a, 0, t, t + e.nodeSize, As(s, e, o + 1, xs)),
            (a += 3));
        }
      });
      let o = Es(a ? ks(n) : n, -r);
      for (let e = 0; e < o.length; e++)
        o[e].type.valid(t, o[e]) || o.splice(e--, 1);
      return new e(
        o.length ? this.local.concat(o).sort(js) : this.local,
        i || this.children,
      );
    }
    remove(e) {
      return e.length == 0 || this == Cs ? this : this.removeInner(e, 0);
    }
    removeInner(t, n) {
      let r = this.children,
        i = this.local;
      for (let e = 0; e < r.length; e += 3) {
        let i,
          a = r[e] + n,
          o = r[e + 1] + n;
        for (let e = 0, n; e < t.length; e++)
          (n = t[e]) &&
            n.from > a &&
            n.to < o &&
            ((t[e] = null), (i ||= []).push(n));
        if (!i) continue;
        r == this.children && (r = this.children.slice());
        let s = r[e + 2].removeInner(i, a + 1);
        s == Cs ? (r.splice(e, 3), (e -= 3)) : (r[e + 2] = s);
      }
      if (i.length) {
        for (let e = 0, r; e < t.length; e++)
          if ((r = t[e]))
            for (let e = 0; e < i.length; e++)
              i[e].eq(r, n) &&
                (i == this.local && (i = this.local.slice()), i.splice(e--, 1));
      }
      return r == this.children && i == this.local
        ? this
        : i.length || r.length
          ? new e(i, r)
          : Cs;
    }
    forChild(t, n) {
      if (this == Cs) return this;
      if (n.isLeaf) return e.empty;
      let r, i;
      for (let e = 0; e < this.children.length; e += 3)
        if (this.children[e] >= t) {
          this.children[e] == t && (r = this.children[e + 2]);
          break;
        }
      let a = t + 1,
        o = a + n.content.size;
      for (let e = 0; e < this.local.length; e++) {
        let t = this.local[e];
        if (t.from < o && t.to > a && t.type instanceof _s) {
          let e = Math.max(a, t.from) - a,
            n = Math.min(o, t.to) - a;
          e < n && (i ||= []).push(t.copy(e, n));
        }
      }
      if (i) {
        let t = new e(i.sort(js), bs);
        return r ? new ws([t, r]) : t;
      }
      return r || Cs;
    }
    eq(t) {
      if (this == t) return !0;
      if (
        !(t instanceof e) ||
        this.local.length != t.local.length ||
        this.children.length != t.children.length
      )
        return !1;
      for (let e = 0; e < this.local.length; e++)
        if (!this.local[e].eq(t.local[e])) return !1;
      for (let e = 0; e < this.children.length; e += 3)
        if (
          this.children[e] != t.children[e] ||
          this.children[e + 1] != t.children[e + 1] ||
          !this.children[e + 2].eq(t.children[e + 2])
        )
          return !1;
      return !0;
    }
    locals(e) {
      return Ms(this.localsInner(e));
    }
    localsInner(e) {
      if (this == Cs) return bs;
      if (e.inlineContent || !this.local.some(_s.is)) return this.local;
      let t = [];
      for (let e = 0; e < this.local.length; e++)
        this.local[e].type instanceof _s || t.push(this.local[e]);
      return t;
    }
    forEachSet(e) {
      e(this);
    }
  };
((Ss.empty = new Ss([], [])), (Ss.removeOverlap = Ms));
var Cs = Ss.empty,
  ws = class e {
    constructor(e) {
      this.members = e;
    }
    map(t, n) {
      let r = this.members.map((e) => e.map(t, n, xs));
      return e.from(r);
    }
    forChild(t, n) {
      if (n.isLeaf) return Ss.empty;
      let r = [];
      for (let i = 0; i < this.members.length; i++) {
        let a = this.members[i].forChild(t, n);
        a != Cs && (a instanceof e ? (r = r.concat(a.members)) : r.push(a));
      }
      return e.from(r);
    }
    eq(t) {
      if (!(t instanceof e) || t.members.length != this.members.length)
        return !1;
      for (let e = 0; e < this.members.length; e++)
        if (!this.members[e].eq(t.members[e])) return !1;
      return !0;
    }
    locals(e) {
      let t,
        n = !0;
      for (let r = 0; r < this.members.length; r++) {
        let i = this.members[r].localsInner(e);
        if (i.length)
          if (!t) t = i;
          else {
            n &&= ((t = t.slice()), !1);
            for (let e = 0; e < i.length; e++) t.push(i[e]);
          }
      }
      return t ? Ms(n ? t : t.sort(js)) : bs;
    }
    static from(t) {
      switch (t.length) {
        case 0:
          return Cs;
        case 1:
          return t[0];
        default:
          return new e(
            t.every((e) => e instanceof Ss)
              ? t
              : t.reduce(
                  (e, t) => e.concat(t instanceof Ss ? t : t.members),
                  [],
                ),
          );
      }
    }
    forEachSet(e) {
      for (let t = 0; t < this.members.length; t++)
        this.members[t].forEachSet(e);
    }
  };
function Ts(e, t, n, r, i, a, o) {
  let s = e.slice();
  for (let e = 0, t = a; e < n.maps.length; e++) {
    let r = 0;
    (n.maps[e].forEach((e, n, i, a) => {
      let o = a - i - (n - e);
      for (let i = 0; i < s.length; i += 3) {
        let a = s[i + 1];
        if (a < 0 || e > a + t - r) continue;
        let c = s[i] + t - r;
        n >= c
          ? (s[i + 1] = e <= c ? -2 : -1)
          : e >= t && o && ((s[i] += o), (s[i + 1] += o));
      }
      r += o;
    }),
      (t = n.maps[e].map(t, -1)));
  }
  let c = !1;
  for (let t = 0; t < s.length; t += 3)
    if (s[t + 1] < 0) {
      if (s[t + 1] == -2) {
        ((c = !0), (s[t + 1] = -1));
        continue;
      }
      let l = n.map(e[t] + a),
        u = l - i;
      if (u < 0 || u >= r.content.size) {
        c = !0;
        continue;
      }
      let d = n.map(e[t + 1] + a, -1) - i,
        { index: f, offset: p } = r.content.findIndex(u),
        m = r.maybeChild(f);
      if (m && p == u && p + m.nodeSize == d) {
        let r = s[t + 2].mapInner(n, m, l + 1, e[t] + a + 1, o);
        r == Cs
          ? ((s[t + 1] = -2), (c = !0))
          : ((s[t] = u), (s[t + 1] = d), (s[t + 2] = r));
      } else c = !0;
    }
  if (c) {
    let c = As(Ds(s, e, t, n, i, a, o), r, 0, o);
    t = c.local;
    for (let e = 0; e < s.length; e += 3)
      s[e + 1] < 0 && (s.splice(e, 3), (e -= 3));
    for (let e = 0, t = 0; e < c.children.length; e += 3) {
      let n = c.children[e];
      for (; t < s.length && s[t] < n; ) t += 3;
      s.splice(t, 0, c.children[e], c.children[e + 1], c.children[e + 2]);
    }
  }
  return new Ss(t.sort(js), s);
}
function Es(e, t) {
  if (!t || !e.length) return e;
  let n = [];
  for (let r = 0; r < e.length; r++) {
    let i = e[r];
    n.push(new ys(i.from + t, i.to + t, i.type));
  }
  return n;
}
function Ds(e, t, n, r, i, a, o) {
  function s(e, t) {
    for (let a = 0; a < e.local.length; a++) {
      let s = e.local[a].map(r, i, t);
      s ? n.push(s) : o.onRemove && o.onRemove(e.local[a].spec);
    }
    for (let n = 0; n < e.children.length; n += 3)
      s(e.children[n + 2], e.children[n] + t + 1);
  }
  for (let n = 0; n < e.length; n += 3)
    e[n + 1] == -1 && s(e[n + 2], t[n] + a + 1);
  return n;
}
function Os(e, t, n) {
  if (t.isLeaf) return null;
  let r = n + t.nodeSize,
    i = null;
  for (let t = 0, a; t < e.length; t++)
    (a = e[t]) && a.from > n && a.to < r && ((i ||= []).push(a), (e[t] = null));
  return i;
}
function ks(e) {
  let t = [];
  for (let n = 0; n < e.length; n++) e[n] != null && t.push(e[n]);
  return t;
}
function As(e, t, n, r) {
  let i = [],
    a = !1;
  t.forEach((t, o) => {
    let s = Os(e, t, o + n);
    if (s) {
      a = !0;
      let e = As(s, t, n + o + 1, r);
      e != Cs && i.push(o, o + t.nodeSize, e);
    }
  });
  let o = Es(a ? ks(e) : e, -n).sort(js);
  for (let e = 0; e < o.length; e++)
    o[e].type.valid(t, o[e]) ||
      (r.onRemove && r.onRemove(o[e].spec), o.splice(e--, 1));
  return o.length || i.length ? new Ss(o, i) : Cs;
}
function js(e, t) {
  return e.from - t.from || e.to - t.to;
}
function Ms(e) {
  let t = e;
  for (let n = 0; n < t.length - 1; n++) {
    let r = t[n];
    if (r.from != r.to)
      for (let i = n + 1; i < t.length; i++) {
        let a = t[i];
        if (a.from == r.from) {
          a.to != r.to &&
            (t == e && (t = e.slice()),
            (t[i] = a.copy(a.from, r.to)),
            Ns(t, i + 1, a.copy(r.to, a.to)));
          continue;
        } else {
          a.from < r.to &&
            (t == e && (t = e.slice()),
            (t[n] = r.copy(r.from, a.from)),
            Ns(t, i, r.copy(a.from, r.to)));
          break;
        }
      }
  }
  return t;
}
function Ns(e, t, n) {
  for (; t < e.length && js(n, e[t]) > 0; ) t++;
  e.splice(t, 0, n);
}
function Ps(e) {
  let t = [];
  return (
    e.someProp(`decorations`, (n) => {
      let r = n(e.state);
      r && r != Cs && t.push(r);
    }),
    e.cursorWrapper && t.push(Ss.create(e.state.doc, [e.cursorWrapper.deco])),
    ws.from(t)
  );
}
var Fs = {
    childList: !0,
    characterData: !0,
    characterDataOldValue: !0,
    attributes: !0,
    attributeOldValue: !0,
    subtree: !0,
  },
  Is = ci && li <= 11,
  Ls = class {
    constructor() {
      ((this.anchorNode = null),
        (this.anchorOffset = 0),
        (this.focusNode = null),
        (this.focusOffset = 0));
    }
    set(e) {
      ((this.anchorNode = e.anchorNode),
        (this.anchorOffset = e.anchorOffset),
        (this.focusNode = e.focusNode),
        (this.focusOffset = e.focusOffset));
    }
    clear() {
      this.anchorNode = this.focusNode = null;
    }
    eq(e) {
      return (
        e.anchorNode == this.anchorNode &&
        e.anchorOffset == this.anchorOffset &&
        e.focusNode == this.focusNode &&
        e.focusOffset == this.focusOffset
      );
    }
  },
  Rs = class {
    constructor(e, t) {
      ((this.view = e),
        (this.handleDOMChange = t),
        (this.queue = []),
        (this.flushingSoon = -1),
        (this.observer = null),
        (this.currentSelection = new Ls()),
        (this.onCharData = null),
        (this.suppressingSelectionUpdates = !1),
        (this.lastChangedTextNode = null),
        (this.observer =
          window.MutationObserver &&
          new window.MutationObserver((t) => {
            for (let e = 0; e < t.length; e++) this.queue.push(t[e]);
            ci &&
            li <= 11 &&
            t.some(
              (e) =>
                (e.type == `childList` && e.removedNodes.length) ||
                (e.type == `characterData` &&
                  e.oldValue.length > e.target.nodeValue.length),
            )
              ? this.flushSoon()
              : mi &&
                  e.composing &&
                  t.some(
                    (e) => e.type == `childList` && e.target.nodeName == `TR`,
                  )
                ? ((e.input.badSafariComposition = !0), this.flushSoon())
                : this.flush();
          })),
        Is &&
          (this.onCharData = (e) => {
            (this.queue.push({
              target: e.target,
              type: `characterData`,
              oldValue: e.prevValue,
            }),
              this.flushSoon());
          }),
        (this.onSelectionChange = this.onSelectionChange.bind(this)));
    }
    flushSoon() {
      this.flushingSoon < 0 &&
        (this.flushingSoon = window.setTimeout(() => {
          ((this.flushingSoon = -1), this.flush());
        }, 20));
    }
    forceFlush() {
      this.flushingSoon > -1 &&
        (window.clearTimeout(this.flushingSoon),
        (this.flushingSoon = -1),
        this.flush());
    }
    start() {
      (this.observer &&
        (this.observer.takeRecords(), this.observer.observe(this.view.dom, Fs)),
        this.onCharData &&
          this.view.dom.addEventListener(
            `DOMCharacterDataModified`,
            this.onCharData,
          ),
        this.connectSelection());
    }
    stop() {
      if (this.observer) {
        let e = this.observer.takeRecords();
        if (e.length) {
          for (let t = 0; t < e.length; t++) this.queue.push(e[t]);
          window.setTimeout(() => this.flush(), 20);
        }
        this.observer.disconnect();
      }
      (this.onCharData &&
        this.view.dom.removeEventListener(
          `DOMCharacterDataModified`,
          this.onCharData,
        ),
        this.disconnectSelection());
    }
    connectSelection() {
      this.view.dom.ownerDocument.addEventListener(
        `selectionchange`,
        this.onSelectionChange,
      );
    }
    disconnectSelection() {
      this.view.dom.ownerDocument.removeEventListener(
        `selectionchange`,
        this.onSelectionChange,
      );
    }
    suppressSelectionUpdates() {
      ((this.suppressingSelectionUpdates = !0),
        setTimeout(() => (this.suppressingSelectionUpdates = !1), 50));
    }
    onSelectionChange() {
      if (Ba(this.view)) {
        if (this.suppressingSelectionUpdates) return Aa(this.view);
        if (ci && li <= 11 && !this.view.state.selection.empty) {
          let e = this.view.domSelectionRange();
          if (
            e.focusNode &&
            Gr(e.focusNode, e.focusOffset, e.anchorNode, e.anchorOffset)
          )
            return this.flushSoon();
        }
        this.flush();
      }
    }
    setCurSelection() {
      this.currentSelection.set(this.view.domSelectionRange());
    }
    ignoreSelectionChange(e) {
      if (!e.focusNode) return !0;
      let t = new Set(),
        n;
      for (let n = e.focusNode; n; n = Vr(n)) t.add(n);
      for (let r = e.anchorNode; r; r = Vr(r))
        if (t.has(r)) {
          n = r;
          break;
        }
      let r = n && this.view.docView.nearestDesc(n);
      if (
        r &&
        r.ignoreMutation({
          type: `selection`,
          target: n.nodeType == 3 ? n.parentNode : n,
        })
      )
        return (this.setCurSelection(), !0);
    }
    pendingRecords() {
      if (this.observer)
        for (let e of this.observer.takeRecords()) this.queue.push(e);
      return this.queue;
    }
    flush() {
      let { view: e } = this;
      if (!e.docView || this.flushingSoon > -1) return;
      let t = this.pendingRecords();
      t.length && (this.queue = []);
      let n = e.domSelectionRange(),
        r =
          !this.suppressingSelectionUpdates &&
          !this.currentSelection.eq(n) &&
          Ba(e) &&
          !this.ignoreSelectionChange(n),
        i = -1,
        a = -1,
        o = !1,
        s = [];
      if (e.editable)
        for (let e = 0; e < t.length; e++) {
          let n = this.registerMutation(t[e], s);
          n &&
            ((i = i < 0 ? n.from : Math.min(n.from, i)),
            (a = a < 0 ? n.to : Math.max(n.to, a)),
            n.typeOver && (o = !0));
        }
      if (
        s.some((e) => e.nodeName == `BR`) &&
        (e.input.lastKeyCode == 8 || e.input.lastKeyCode == 46)
      ) {
        for (let e of s)
          if (e.nodeName == `BR` && e.parentNode) {
            let t = e.nextSibling;
            for (; t && t.nodeType == 1; ) {
              if (t.contentEditable == `false`) {
                e.parentNode.removeChild(e);
                break;
              }
              t = t.firstChild;
            }
          }
      } else if (ui && s.length) {
        let t = s.filter((e) => e.nodeName == `BR`);
        if (t.length == 2) {
          let [e, n] = t;
          e.parentNode && e.parentNode.parentNode == n.parentNode
            ? n.remove()
            : e.remove();
        } else {
          let { focusNode: n } = this.currentSelection;
          for (let r of t) {
            let t = r.parentNode;
            t && t.nodeName == `LI` && (!n || Ws(e, n) != t) && r.remove();
          }
        }
      }
      let c = null;
      i < 0 &&
      r &&
      e.input.lastFocus > Date.now() - 200 &&
      Math.max(e.input.lastTouch, e.input.lastClick.time) < Date.now() - 300 &&
      $r(n) &&
      (c = Oa(e)) &&
      c.eq(K.near(e.state.doc.resolve(0), 1))
        ? ((e.input.lastFocus = 0),
          Aa(e),
          this.currentSelection.set(n),
          e.scrollToSelection())
        : (i > -1 || r) &&
          (i > -1 && (e.docView.markDirty(i, a), Vs(e)),
          e.input.badSafariComposition &&
            ((e.input.badSafariComposition = !1), Gs(e, s)),
          this.handleDOMChange(i, a, o, s),
          e.docView && e.docView.dirty
            ? e.updateState(e.state)
            : this.currentSelection.eq(n) || Aa(e),
          this.currentSelection.set(n));
    }
    registerMutation(e, t) {
      if (t.indexOf(e.target) > -1) return null;
      let n = this.view.docView.nearestDesc(e.target);
      if (
        (e.type == `attributes` &&
          (n == this.view.docView ||
            e.attributeName == `contenteditable` ||
            (e.attributeName == `style` &&
              !e.oldValue &&
              !e.target.getAttribute(`style`)))) ||
        !n ||
        n.ignoreMutation(e)
      )
        return null;
      if (e.type == `childList`) {
        for (let n = 0; n < e.addedNodes.length; n++) {
          let r = e.addedNodes[n];
          (t.push(r), r.nodeType == 3 && (this.lastChangedTextNode = r));
        }
        if (
          n.contentDOM &&
          n.contentDOM != n.dom &&
          !n.contentDOM.contains(e.target)
        )
          return { from: n.posBefore, to: n.posAfter };
        let r = e.previousSibling,
          i = e.nextSibling;
        if (ci && li <= 11 && e.addedNodes.length)
          for (let t = 0; t < e.addedNodes.length; t++) {
            let { previousSibling: n, nextSibling: a } = e.addedNodes[t];
            ((!n || Array.prototype.indexOf.call(e.addedNodes, n) < 0) &&
              (r = n),
              (!a || Array.prototype.indexOf.call(e.addedNodes, a) < 0) &&
                (i = a));
          }
        let a = r && r.parentNode == e.target ? Br(r) + 1 : 0,
          o = n.localPosFromDOM(e.target, a, -1),
          s =
            i && i.parentNode == e.target ? Br(i) : e.target.childNodes.length;
        return { from: o, to: n.localPosFromDOM(e.target, s, 1) };
      } else if (e.type == `attributes`)
        return { from: n.posAtStart - n.border, to: n.posAtEnd + n.border };
      else
        return (
          (this.lastChangedTextNode = e.target),
          {
            from: n.posAtStart,
            to: n.posAtEnd,
            typeOver: e.target.nodeValue == e.oldValue,
          }
        );
    }
  },
  zs = new WeakMap(),
  Bs = !1;
function Vs(e) {
  if (
    !zs.has(e) &&
    (zs.set(e, null),
    [`normal`, `nowrap`, `pre-line`].indexOf(
      getComputedStyle(e.dom).whiteSpace,
    ) !== -1)
  ) {
    if (((e.requiresGeckoHackNode = ui), Bs)) return;
    (console.warn(
      `ProseMirror expects the CSS white-space property to be set, preferably to 'pre-wrap'. It is recommended to load style/prosemirror.css from the prosemirror-view package.`,
    ),
      (Bs = !0));
  }
}
function Hs(e, t) {
  let n = t.startContainer,
    r = t.startOffset,
    i = t.endContainer,
    a = t.endOffset,
    o = e.domAtPos(e.state.selection.anchor);
  return (
    Gr(o.node, o.offset, i, a) && ([n, r, i, a] = [i, a, n, r]),
    { anchorNode: n, anchorOffset: r, focusNode: i, focusOffset: a }
  );
}
function Us(e, t) {
  if (t.getComposedRanges) {
    let n = t.getComposedRanges(e.root)[0];
    if (n) return Hs(e, n);
  }
  let n;
  function r(e) {
    (e.preventDefault(),
      e.stopImmediatePropagation(),
      (n = e.getTargetRanges()[0]));
  }
  return (
    e.dom.addEventListener(`beforeinput`, r, !0),
    document.execCommand(`indent`),
    e.dom.removeEventListener(`beforeinput`, r, !0),
    n ? Hs(e, n) : null
  );
}
function Ws(e, t) {
  for (let n = t.parentNode; n && n != e.dom; n = n.parentNode) {
    let t = e.docView.nearestDesc(n, !0);
    if (t && t.node.isBlock) return n;
  }
  return null;
}
function Gs(e, t) {
  let { focusNode: n, focusOffset: r } = e.domSelectionRange();
  for (let i of t)
    if (i.parentNode?.nodeName == `TR`) {
      let t = i.nextSibling;
      for (; t && t.nodeName != `TD` && t.nodeName != `TH`; ) t = t.nextSibling;
      if (t) {
        let a = t;
        for (;;) {
          let e = a.firstChild;
          if (
            !e ||
            e.nodeType != 1 ||
            e.contentEditable == `false` ||
            /^(BR|IMG)$/.test(e.nodeName)
          )
            break;
          a = e;
        }
        (a.insertBefore(i, a.firstChild),
          n == i && e.domSelection().collapse(i, r));
      } else i.parentNode.removeChild(i);
    }
}
function Ks(e, t, n) {
  let {
      node: r,
      fromOffset: i,
      toOffset: a,
      from: o,
      to: s,
    } = e.docView.parseRange(t, n),
    c = e.domSelectionRange(),
    l,
    u = c.anchorNode;
  if (
    (u &&
      e.dom.contains(u.nodeType == 1 ? u : u.parentNode) &&
      ((l = [{ node: u, offset: c.anchorOffset }]),
      $r(c) || l.push({ node: c.focusNode, offset: c.focusOffset })),
    fi && e.input.lastKeyCode === 8)
  )
    for (let e = a; e > i; e--) {
      let t = r.childNodes[e - 1],
        n = t.pmViewDesc;
      if (t.nodeName == `BR` && !n) {
        a = e;
        break;
      }
      if (!n || n.size) break;
    }
  let d = e.state.doc,
    f = e.someProp(`domParser`) || Fe.fromSchema(e.state.schema),
    p = d.resolve(o),
    m = null,
    h = f.parse(r, {
      topNode: p.parent,
      topMatch: p.parent.contentMatchAt(p.index()),
      topOpen: !0,
      from: i,
      to: a,
      preserveWhitespace: p.parent.type.whitespace == `pre` ? `full` : !0,
      findPositions: l,
      ruleFromNode: qs,
      context: p,
    });
  if (l && l[0].pos != null) {
    let e = l[0].pos,
      t = l[1] && l[1].pos;
    ((t ??= e), (m = { anchor: e + o, head: t + o }));
  }
  return { doc: h, sel: m, from: o, to: s };
}
function qs(e) {
  let t = e.pmViewDesc;
  if (t) return t.parseRule();
  if (e.nodeName == `BR` && e.parentNode) {
    if (mi && /^(ul|ol)$/i.test(e.parentNode.nodeName)) {
      let e = document.createElement(`div`);
      return (e.appendChild(document.createElement(`li`)), { skip: e });
    } else if (
      e.parentNode.lastChild == e ||
      (mi && /^(tr|table)$/i.test(e.parentNode.nodeName))
    )
      return { ignore: !0 };
  } else if (e.nodeName == `IMG` && e.getAttribute(`mark-placeholder`))
    return { ignore: !0 };
  return null;
}
var Js =
  /^(a|abbr|acronym|b|bd[io]|big|br|button|cite|code|data(list)?|del|dfn|em|i|img|ins|kbd|label|map|mark|meter|output|q|ruby|s|samp|small|span|strong|su[bp]|time|u|tt|var)$/i;
function Ys(e, t, n, r, i) {
  let a =
    e.input.compositionPendingChanges ||
    (e.composing ? e.input.compositionID : 0);
  if (((e.input.compositionPendingChanges = 0), t < 0)) {
    let t =
        e.input.lastSelectionTime > Date.now() - 50
          ? e.input.lastSelectionOrigin
          : null,
      n = Oa(e, t);
    if (n && !e.state.selection.eq(n)) {
      if (
        fi &&
        vi &&
        e.input.lastKeyCode === 13 &&
        Date.now() - 100 < e.input.lastKeyCodeTime &&
        e.someProp(`handleKeyDown`, (t) => t(e, ei(13, `Enter`)))
      )
        return;
      let r = e.state.tr.setSelection(n);
      (t == `pointer`
        ? r.setMeta(`pointer`, !0)
        : t == `key` && r.scrollIntoView(),
        a && r.setMeta(`composition`, a),
        e.dispatch(r));
    }
    return;
  }
  let o = e.state.doc.resolve(t),
    s = o.sharedDepth(n);
  ((t = o.before(s + 1)), (n = e.state.doc.resolve(n).after(s + 1)));
  let c = e.state.selection,
    l = Ks(e, t, n),
    u = e.state.doc,
    d = u.slice(l.from, l.to),
    f,
    p;
  (e.input.lastKeyCode === 8 && Date.now() - 100 < e.input.lastKeyCodeTime
    ? ((f = e.state.selection.to), (p = `end`))
    : ((f = e.state.selection.from), (p = `start`)),
    (e.input.lastKeyCode = null));
  let m = ec(d.content, l.doc.content, l.from, f, p);
  if (
    (m && e.input.domChangeCount++,
    ((hi && e.input.lastIOSEnter > Date.now() - 225) || vi) &&
      i.some((e) => e.nodeType == 1 && !Js.test(e.nodeName)) &&
      (!m || m.endA >= m.endB) &&
      e.someProp(`handleKeyDown`, (t) => t(e, ei(13, `Enter`))))
  ) {
    e.input.lastIOSEnter = 0;
    return;
  }
  if (!m)
    if (
      r &&
      c instanceof J &&
      !c.empty &&
      c.$head.sameParent(c.$anchor) &&
      !e.composing &&
      !(l.sel && l.sel.anchor != l.sel.head)
    )
      m = { start: c.from, endA: c.to, endB: c.to };
    else {
      if (l.sel) {
        let t = Xs(e, e.state.doc, l.sel);
        if (t && !t.eq(e.state.selection)) {
          let n = e.state.tr.setSelection(t);
          (a && n.setMeta(`composition`, a), e.dispatch(n));
        }
      }
      return;
    }
  (e.state.selection.from < e.state.selection.to &&
    m.start == m.endB &&
    e.state.selection instanceof J &&
    (m.start > e.state.selection.from &&
    m.start <= e.state.selection.from + 2 &&
    e.state.selection.from >= l.from
      ? (m.start = e.state.selection.from)
      : m.endA < e.state.selection.to &&
        m.endA >= e.state.selection.to - 2 &&
        e.state.selection.to <= l.to &&
        ((m.endB += e.state.selection.to - m.endA),
        (m.endA = e.state.selection.to))),
    ci &&
      li <= 11 &&
      m.endB == m.start + 1 &&
      m.endA == m.start &&
      m.start > l.from &&
      l.doc.textBetween(m.start - l.from - 1, m.start - l.from + 1) ==
        ` \xA0` &&
      (m.start--, m.endA--, m.endB--));
  let h = l.doc.resolveNoCache(m.start - l.from),
    g = l.doc.resolveNoCache(m.endB - l.from),
    _ = u.resolve(m.start),
    v = h.sameParent(g) && h.parent.inlineContent && _.end() >= m.endA;
  if (
    ((hi &&
      e.input.lastIOSEnter > Date.now() - 225 &&
      (!v || i.some((e) => e.nodeName == `DIV` || e.nodeName == `P`))) ||
      (!v &&
        h.pos < l.doc.content.size &&
        (!h.sameParent(g) || !h.parent.inlineContent) &&
        h.pos < g.pos &&
        !/\S/.test(l.doc.textBetween(h.pos, g.pos, ``, ``)))) &&
    e.someProp(`handleKeyDown`, (t) => t(e, ei(13, `Enter`)))
  ) {
    e.input.lastIOSEnter = 0;
    return;
  }
  if (
    e.state.selection.anchor > m.start &&
    Qs(u, m.start, m.endA, h, g) &&
    e.someProp(`handleKeyDown`, (t) => t(e, ei(8, `Backspace`)))
  ) {
    vi && fi && e.domObserver.suppressSelectionUpdates();
    return;
  }
  (fi && m.endB == m.start && (e.input.lastChromeDelete = Date.now()),
    vi &&
      !v &&
      h.start() != g.start() &&
      g.parentOffset == 0 &&
      h.depth == g.depth &&
      l.sel &&
      l.sel.anchor == l.sel.head &&
      l.sel.head == m.endA &&
      ((m.endB -= 2),
      (g = l.doc.resolveNoCache(m.endB - l.from)),
      setTimeout(() => {
        e.someProp(`handleKeyDown`, function (t) {
          return t(e, ei(13, `Enter`));
        });
      }, 20)));
  let y = m.start,
    b = m.endA,
    x = (t) => {
      let n =
        t ||
        e.state.tr.replace(
          y,
          b,
          l.doc.slice(m.start - l.from, m.endB - l.from),
        );
      if (l.sel) {
        let t = Xs(e, n.doc, l.sel);
        t &&
          !(
            (fi &&
              e.composing &&
              t.empty &&
              (m.start != m.endB ||
                e.input.lastChromeDelete < Date.now() - 100) &&
              (t.head == y || t.head == n.mapping.map(b) - 1)) ||
            (ci && t.empty && t.head == y)
          ) &&
          n.setSelection(t);
      }
      return (a && n.setMeta(`composition`, a), n.scrollIntoView());
    },
    S;
  if (v)
    if (h.pos == g.pos) {
      ci &&
        li <= 11 &&
        h.parentOffset == 0 &&
        (e.domObserver.suppressSelectionUpdates(), setTimeout(() => Aa(e), 20));
      let t = x(e.state.tr.delete(y, b)),
        n = u.resolve(m.start).marksAcross(u.resolve(m.endA));
      (n && t.ensureMarks(n), e.dispatch(t));
    } else if (
      m.endA == m.endB &&
      (S = Zs(
        h.parent.content.cut(h.parentOffset, g.parentOffset),
        _.parent.content.cut(_.parentOffset, m.endA - _.start()),
      ))
    ) {
      let t = x(e.state.tr);
      (S.type == `add` ? t.addMark(y, b, S.mark) : t.removeMark(y, b, S.mark),
        e.dispatch(t));
    } else if (
      h.parent.child(h.index()).isText &&
      h.index() == g.index() - (g.textOffset ? 0 : 1)
    ) {
      let t = h.parent.textBetween(h.parentOffset, g.parentOffset),
        n = () => x(e.state.tr.insertText(t, y, b));
      e.someProp(`handleTextInput`, (r) => r(e, y, b, t, n)) || e.dispatch(n());
    } else e.dispatch(x());
  else e.dispatch(x());
}
function Xs(e, t, n) {
  return Math.max(n.anchor, n.head) > t.content.size
    ? null
    : za(e, t.resolve(n.anchor), t.resolve(n.head));
}
function Zs(e, t) {
  let n = e.firstChild.marks,
    r = t.firstChild.marks,
    i = n,
    a = r,
    o,
    s,
    c;
  for (let e = 0; e < r.length; e++) i = r[e].removeFromSet(i);
  for (let e = 0; e < n.length; e++) a = n[e].removeFromSet(a);
  if (i.length == 1 && a.length == 0)
    ((s = i[0]), (o = `add`), (c = (e) => e.mark(s.addToSet(e.marks))));
  else if (i.length == 0 && a.length == 1)
    ((s = a[0]), (o = `remove`), (c = (e) => e.mark(s.removeFromSet(e.marks))));
  else return null;
  let l = [];
  for (let e = 0; e < t.childCount; e++) l.push(c(t.child(e)));
  if (U.from(l).eq(e)) return { mark: s, type: o };
}
function Qs(e, t, n, r, i) {
  if (n - t <= i.pos - r.pos || $s(r, !0, !1) < i.pos) return !1;
  let a = e.resolve(t);
  if (!r.parent.isTextblock) {
    let e = a.nodeAfter;
    return e != null && n == t + e.nodeSize;
  }
  if (a.parentOffset < a.parent.content.size || !a.parent.isTextblock)
    return !1;
  let o = e.resolve($s(a, !0, !0));
  return !o.parent.isTextblock || o.pos > n || $s(o, !0, !1) < n
    ? !1
    : r.parent.content.cut(r.parentOffset).eq(o.parent.content);
}
function $s(e, t, n) {
  let r = e.depth,
    i = t ? e.end() : e.pos;
  for (; r > 0 && (t || e.indexAfter(r) == e.node(r).childCount); )
    (r--, i++, (t = !1));
  if (n) {
    let t = e.node(r).maybeChild(e.indexAfter(r));
    for (; t && !t.isLeaf; ) ((t = t.firstChild), i++);
  }
  return i;
}
function ec(e, t, n, r, i) {
  let a = e.findDiffStart(t, n);
  if (a == null) return null;
  let { a: o, b: s } = e.findDiffEnd(t, n + e.size, n + t.size);
  if (i == `end`) {
    let e = Math.max(0, a - Math.min(o, s));
    r -= o + e - a;
  }
  if (o < a && e.size < t.size) {
    let e = r <= a && r >= o ? a - r : 0;
    ((a -= e),
      a && a < t.size && tc(t.textBetween(a - 1, a + 1)) && (a += e ? 1 : -1),
      (s = a + (s - o)),
      (o = a));
  } else if (s < a) {
    let t = r <= a && r >= s ? a - r : 0;
    ((a -= t),
      a && a < e.size && tc(e.textBetween(a - 1, a + 1)) && (a += t ? 1 : -1),
      (o = a + (o - s)),
      (s = a));
  }
  return { start: a, endA: o, endB: s };
}
function tc(e) {
  if (e.length != 2) return !1;
  let t = e.charCodeAt(0),
    n = e.charCodeAt(1);
  return t >= 56320 && t <= 57343 && n >= 55296 && n <= 56319;
}
var nc = class {
  constructor(e, t) {
    ((this._root = null),
      (this.focused = !1),
      (this.trackWrites = null),
      (this.mounted = !1),
      (this.markCursor = null),
      (this.cursorWrapper = null),
      (this.lastSelectedViewDesc = void 0),
      (this.input = new ko()),
      (this.prevDirectPlugins = []),
      (this.pluginViews = []),
      (this.requiresGeckoHackNode = !1),
      (this.dragging = null),
      (this._props = t),
      (this.state = t.state),
      (this.directPlugins = t.plugins || []),
      this.directPlugins.forEach(lc),
      (this.dispatch = this.dispatch.bind(this)),
      (this.dom = (e && e.mount) || document.createElement(`div`)),
      e &&
        (e.appendChild
          ? e.appendChild(this.dom)
          : typeof e == `function`
            ? e(this.dom)
            : e.mount && (this.mounted = !0)),
      (this.editable = ac(this)),
      ic(this),
      (this.nodeViews = sc(this)),
      (this.docView = ca(this.state.doc, rc(this), Ps(this), this.dom, this)),
      (this.domObserver = new Rs(this, (e, t, n, r) => Ys(this, e, t, n, r))),
      this.domObserver.start(),
      Ao(this),
      this.updatePluginViews());
  }
  get composing() {
    return this.input.composing;
  }
  get props() {
    if (this._props.state != this.state) {
      let e = this._props;
      this._props = {};
      for (let t in e) this._props[t] = e[t];
      this._props.state = this.state;
    }
    return this._props;
  }
  update(e) {
    e.handleDOMEvents != this._props.handleDOMEvents && No(this);
    let t = this._props;
    ((this._props = e),
      e.plugins && (e.plugins.forEach(lc), (this.directPlugins = e.plugins)),
      this.updateStateInner(e.state, t));
  }
  setProps(e) {
    let t = {};
    for (let e in this._props) t[e] = this._props[e];
    t.state = this.state;
    for (let n in e) t[n] = e[n];
    this.update(t);
  }
  updateState(e) {
    this.updateStateInner(e, this._props);
  }
  updateStateInner(e, t) {
    let n = this.state,
      r = !1,
      i = !1;
    (e.storedMarks && this.composing && (es(this), (i = !0)), (this.state = e));
    let a = n.plugins != e.plugins || this._props.plugins != t.plugins;
    if (
      a ||
      this._props.plugins != t.plugins ||
      this._props.nodeViews != t.nodeViews
    ) {
      let e = sc(this);
      cc(e, this.nodeViews) && ((this.nodeViews = e), (r = !0));
    }
    ((a || t.handleDOMEvents != this._props.handleDOMEvents) && No(this),
      (this.editable = ac(this)),
      ic(this));
    let o = Ps(this),
      s = rc(this),
      c =
        n.plugins != e.plugins && !n.doc.eq(e.doc)
          ? `reset`
          : e.scrollToSelection > n.scrollToSelection
            ? `to selection`
            : `preserve`,
      l = r || !this.docView.matchesNode(e.doc, s, o);
    (l || !e.selection.eq(n.selection)) && (i = !0);
    let u =
      c == `preserve` && i && this.dom.style.overflowAnchor == null && Ti(this);
    if (i) {
      this.domObserver.stop();
      let t =
        l &&
        (ci || fi) &&
        !this.composing &&
        !n.selection.empty &&
        !e.selection.empty &&
        oc(n.selection, e.selection);
      if (l) {
        let n = fi
          ? (this.trackWrites = this.domSelectionRange().focusNode)
          : null;
        (this.composing && (this.input.compositionNode = ts(this)),
          (r || !this.docView.update(e.doc, s, o, this)) &&
            (this.docView.updateOuterDeco(s),
            this.docView.destroy(),
            (this.docView = ca(e.doc, s, o, this.dom, this))),
          n &&
            (!this.trackWrites || !this.dom.contains(this.trackWrites)) &&
            (t = !0));
      }
      (t ||
      !(
        this.input.mouseDown &&
        this.domObserver.currentSelection.eq(this.domSelectionRange()) &&
        Ha(this)
      )
        ? Aa(this, t)
        : (La(this, e.selection), this.domObserver.setCurSelection()),
        this.domObserver.start());
    }
    (this.updatePluginViews(n),
      this.dragging?.node &&
        !n.doc.eq(e.doc) &&
        this.updateDraggedNode(this.dragging, n),
      c == `reset`
        ? (this.dom.scrollTop = 0)
        : c == `to selection`
          ? this.scrollToSelection()
          : u && Di(u));
  }
  scrollToSelection() {
    let e = this.domSelectionRange().focusNode;
    if (
      !(!e || !this.dom.contains(e.nodeType == 1 ? e : e.parentNode)) &&
      !this.someProp(`handleScrollToSelection`, (e) => e(this))
    )
      if (this.state.selection instanceof q) {
        let t = this.docView.domAfterPos(this.state.selection.from);
        t.nodeType == 1 && wi(this, t.getBoundingClientRect(), e);
      } else wi(this, this.coordsAtPos(this.state.selection.head, 1), e);
  }
  destroyPluginViews() {
    let e;
    for (; (e = this.pluginViews.pop()); ) e.destroy && e.destroy();
  }
  updatePluginViews(e) {
    if (
      !e ||
      e.plugins != this.state.plugins ||
      this.directPlugins != this.prevDirectPlugins
    ) {
      ((this.prevDirectPlugins = this.directPlugins),
        this.destroyPluginViews());
      for (let e = 0; e < this.directPlugins.length; e++) {
        let t = this.directPlugins[e];
        t.spec.view && this.pluginViews.push(t.spec.view(this));
      }
      for (let e = 0; e < this.state.plugins.length; e++) {
        let t = this.state.plugins[e];
        t.spec.view && this.pluginViews.push(t.spec.view(this));
      }
    } else
      for (let t = 0; t < this.pluginViews.length; t++) {
        let n = this.pluginViews[t];
        n.update && n.update(this, e);
      }
  }
  updateDraggedNode(e, t) {
    let n = e.node,
      r = -1;
    if (
      n.from < this.state.doc.content.size &&
      this.state.doc.nodeAt(n.from) == n.node
    )
      r = n.from;
    else {
      let e = n.from + (this.state.doc.content.size - t.doc.content.size);
      (e > 0 && e < this.state.doc.content.size && this.state.doc.nodeAt(e)) ==
        n.node && (r = e);
    }
    this.dragging = new ds(
      e.slice,
      e.move,
      r < 0 ? void 0 : q.create(this.state.doc, r),
    );
  }
  someProp(e, t) {
    let n = this._props && this._props[e],
      r;
    if (n != null && (r = t ? t(n) : n)) return r;
    for (let n = 0; n < this.directPlugins.length; n++) {
      let i = this.directPlugins[n].props[e];
      if (i != null && (r = t ? t(i) : i)) return r;
    }
    let i = this.state.plugins;
    if (i)
      for (let n = 0; n < i.length; n++) {
        let a = i[n].props[e];
        if (a != null && (r = t ? t(a) : a)) return r;
      }
  }
  hasFocus() {
    if (ci) {
      let e = this.root.activeElement;
      if (e == this.dom) return !0;
      if (!e || !this.dom.contains(e)) return !1;
      for (; e && this.dom != e && this.dom.contains(e); ) {
        if (e.contentEditable == `false`) return !1;
        e = e.parentElement;
      }
      return !0;
    }
    return this.root.activeElement == this.dom;
  }
  focus() {
    (this.domObserver.stop(),
      this.editable && Ai(this.dom),
      Aa(this),
      this.domObserver.start());
  }
  get root() {
    let e = this._root;
    if (e == null) {
      for (let e = this.dom.parentNode; e; e = e.parentNode)
        if (e.nodeType == 9 || (e.nodeType == 11 && e.host))
          return (
            e.getSelection ||
              (Object.getPrototypeOf(e).getSelection = () =>
                e.ownerDocument.getSelection()),
            (this._root = e)
          );
    }
    return e || document;
  }
  updateRoot() {
    this._root = null;
  }
  posAtCoords(e) {
    return Ri(this, e);
  }
  coordsAtPos(e, t = 1) {
    return Hi(this, e, t);
  }
  domAtPos(e, t = 0) {
    return this.docView.domFromPos(e, t);
  }
  nodeDOM(e) {
    let t = this.docView.descAt(e);
    return t ? t.nodeDOM : null;
  }
  posAtDOM(e, t, n = -1) {
    let r = this.docView.posFromDOM(e, t, n);
    if (r == null) throw RangeError(`DOM position not inside the editor`);
    return r;
  }
  endOfTextblock(e, t) {
    return Qi(this, t || this.state, e);
  }
  pasteHTML(e, t) {
    return ls(this, ``, e, !1, t || new ClipboardEvent(`paste`));
  }
  pasteText(e, t) {
    return ls(this, e, null, !0, t || new ClipboardEvent(`paste`));
  }
  serializeForClipboard(e) {
    return co(this, e);
  }
  destroy() {
    this.docView &&
      (Mo(this),
      this.destroyPluginViews(),
      this.mounted
        ? (this.docView.update(this.state.doc, [], Ps(this), this),
          (this.dom.textContent = ``))
        : this.dom.parentNode && this.dom.parentNode.removeChild(this.dom),
      this.docView.destroy(),
      (this.docView = null),
      Wr());
  }
  get isDestroyed() {
    return this.docView == null;
  }
  dispatchEvent(e) {
    return Io(this, e);
  }
  domSelectionRange() {
    let e = this.domSelection();
    return e
      ? (mi &&
          this.root.nodeType === 11 &&
          ti(this.dom.ownerDocument) == this.dom &&
          Us(this, e)) ||
          e
      : { focusNode: null, focusOffset: 0, anchorNode: null, anchorOffset: 0 };
  }
  domSelection() {
    return this.root.getSelection();
  }
};
nc.prototype.dispatch = function (e) {
  let t = this._props.dispatchTransaction;
  t ? t.call(this, e) : this.updateState(this.state.apply(e));
};
function rc(e) {
  let t = Object.create(null);
  return (
    (t.class = `ProseMirror`),
    (t.contenteditable = String(e.editable)),
    e.someProp(`attributes`, (n) => {
      if ((typeof n == `function` && (n = n(e.state)), n))
        for (let e in n)
          e == `class`
            ? (t.class += ` ` + n[e])
            : e == `style`
              ? (t.style = (t.style ? t.style + `;` : ``) + n[e])
              : !t[e] &&
                e != `contenteditable` &&
                e != `nodeName` &&
                (t[e] = String(n[e]));
    }),
    (t.translate ||= `no`),
    [ys.node(0, e.state.doc.content.size, t)]
  );
}
function ic(e) {
  if (e.markCursor) {
    let t = document.createElement(`img`);
    ((t.className = `ProseMirror-separator`),
      t.setAttribute(`mark-placeholder`, `true`),
      t.setAttribute(`alt`, ``),
      (e.cursorWrapper = {
        dom: t,
        deco: ys.widget(e.state.selection.from, t, {
          raw: !0,
          marks: e.markCursor,
        }),
      }));
  } else e.cursorWrapper = null;
}
function ac(e) {
  return !e.someProp(`editable`, (t) => t(e.state) === !1);
}
function oc(e, t) {
  let n = Math.min(
    e.$anchor.sharedDepth(e.head),
    t.$anchor.sharedDepth(t.head),
  );
  return e.$anchor.start(n) != t.$anchor.start(n);
}
function sc(e) {
  let t = Object.create(null);
  function n(e) {
    for (let n in e)
      Object.prototype.hasOwnProperty.call(t, n) || (t[n] = e[n]);
  }
  return (e.someProp(`nodeViews`, n), e.someProp(`markViews`, n), t);
}
function cc(e, t) {
  let n = 0,
    r = 0;
  for (let r in e) {
    if (e[r] != t[r]) return !0;
    n++;
  }
  for (let e in t) r++;
  return n != r;
}
function lc(e) {
  if (e.spec.state || e.spec.filterTransaction || e.spec.appendTransaction)
    throw RangeError(
      `Plugins passed directly to the view must not have a state component`,
    );
}
var uc = class e extends K {
  constructor(e) {
    super(e, e);
  }
  map(t, n) {
    let r = t.resolve(n.map(this.head));
    return e.valid(r) ? new e(r) : K.near(r);
  }
  content() {
    return W.empty;
  }
  eq(t) {
    return t instanceof e && t.head == this.head;
  }
  toJSON() {
    return { type: `gapcursor`, pos: this.head };
  }
  static fromJSON(t, n) {
    if (typeof n.pos != `number`)
      throw RangeError(`Invalid input for GapCursor.fromJSON`);
    return new e(t.resolve(n.pos));
  }
  getBookmark() {
    return new dc(this.anchor);
  }
  static valid(e) {
    let t = e.parent;
    if (t.inlineContent || !pc(e) || !mc(e)) return !1;
    let n = t.type.spec.allowGapCursor;
    if (n != null) return n;
    let r = t.contentMatchAt(e.index()).defaultType;
    return r && r.isTextblock;
  }
  static findGapCursorFrom(t, n, r = !1) {
    search: for (;;) {
      if (!r && e.valid(t)) return t;
      let i = t.pos,
        a = null;
      for (let r = t.depth; ; r--) {
        let o = t.node(r);
        if (n > 0 ? t.indexAfter(r) < o.childCount : t.index(r) > 0) {
          a = o.child(n > 0 ? t.indexAfter(r) : t.index(r) - 1);
          break;
        } else if (r == 0) return null;
        i += n;
        let s = t.doc.resolve(i);
        if (e.valid(s)) return s;
      }
      for (;;) {
        let o = n > 0 ? a.firstChild : a.lastChild;
        if (!o) {
          if (a.isAtom && !a.isText && !q.isSelectable(a)) {
            ((t = t.doc.resolve(i + a.nodeSize * n)), (r = !1));
            continue search;
          }
          break;
        }
        ((a = o), (i += n));
        let s = t.doc.resolve(i);
        if (e.valid(s)) return s;
      }
      return null;
    }
  }
};
((uc.prototype.visible = !1),
  (uc.findFrom = uc.findGapCursorFrom),
  K.jsonID(`gapcursor`, uc));
var dc = class e {
  constructor(e) {
    this.pos = e;
  }
  map(t) {
    return new e(t.map(this.pos));
  }
  resolve(e) {
    let t = e.resolve(this.pos);
    return uc.valid(t) ? new uc(t) : K.near(t);
  }
};
function fc(e) {
  return e.isAtom || e.spec.isolating || e.spec.createGapCursor;
}
function pc(e) {
  for (let t = e.depth; t >= 0; t--) {
    let n = e.index(t),
      r = e.node(t);
    if (n == 0) {
      if (r.type.spec.isolating) return !0;
      continue;
    }
    for (let e = r.child(n - 1); ; e = e.lastChild) {
      if ((e.childCount == 0 && !e.inlineContent) || fc(e.type)) return !0;
      if (e.inlineContent) return !1;
    }
  }
  return !0;
}
function mc(e) {
  for (let t = e.depth; t >= 0; t--) {
    let n = e.indexAfter(t),
      r = e.node(t);
    if (n == r.childCount) {
      if (r.type.spec.isolating) return !0;
      continue;
    }
    for (let e = r.child(n); ; e = e.firstChild) {
      if ((e.childCount == 0 && !e.inlineContent) || fc(e.type)) return !0;
      if (e.inlineContent) return !1;
    }
  }
  return !0;
}
function hc() {
  return new Ae({
    props: {
      decorations: bc,
      createSelectionBetween(e, t, n) {
        return t.pos == n.pos && uc.valid(n) ? new uc(n) : null;
      },
      handleClick: vc,
      handleKeyDown: gc,
      handleDOMEvents: { beforeinput: yc },
    },
  });
}
var gc = Et({
  ArrowLeft: _c(`horiz`, -1),
  ArrowRight: _c(`horiz`, 1),
  ArrowUp: _c(`vert`, -1),
  ArrowDown: _c(`vert`, 1),
});
function _c(e, t) {
  let n = e == `vert` ? (t > 0 ? `down` : `up`) : t > 0 ? `right` : `left`;
  return function (e, r, i) {
    let a = e.selection,
      o = t > 0 ? a.$to : a.$from,
      s = a.empty;
    if (a instanceof J) {
      if (!i.endOfTextblock(n) || o.depth == 0) return !1;
      ((s = !1), (o = e.doc.resolve(t > 0 ? o.after() : o.before())));
    }
    let c = uc.findGapCursorFrom(o, t, s);
    return c ? (r && r(e.tr.setSelection(new uc(c))), !0) : !1;
  };
}
function vc(e, t, n) {
  if (!e || !e.editable) return !1;
  let r = e.state.doc.resolve(t);
  if (!uc.valid(r)) return !1;
  let i = e.posAtCoords({ left: n.clientX, top: n.clientY });
  return i && i.inside > -1 && q.isSelectable(e.state.doc.nodeAt(i.inside))
    ? !1
    : (e.dispatch(e.state.tr.setSelection(new uc(r))), !0);
}
function yc(e, t) {
  if (
    t.inputType != `insertCompositionText` ||
    !(e.state.selection instanceof uc)
  )
    return !1;
  let { $from: n } = e.state.selection,
    r = n.parent
      .contentMatchAt(n.index())
      .findWrapping(e.state.schema.nodes.text);
  if (!r) return !1;
  let i = U.empty;
  for (let e = r.length - 1; e >= 0; e--)
    i = U.from(r[e].createAndFill(null, i));
  let a = e.state.tr.replace(n.pos, n.pos, new W(i, 0, 0));
  return (a.setSelection(J.near(a.doc.resolve(n.pos + 1))), e.dispatch(a), !1);
}
function bc(e) {
  if (!(e.selection instanceof uc)) return null;
  let t = document.createElement(`div`);
  return (
    (t.className = `ProseMirror-gapcursor`),
    Ss.create(e.doc, [ys.widget(e.selection.head, t, { key: `gapcursor` })])
  );
}
var xc = 200,
  Sc = function () {};
((Sc.prototype.append = function (e) {
  return e.length
    ? ((e = Sc.from(e)),
      (!this.length && e) ||
        (e.length < xc && this.leafAppend(e)) ||
        (this.length < xc && e.leafPrepend(this)) ||
        this.appendInner(e))
    : this;
}),
  (Sc.prototype.prepend = function (e) {
    return e.length ? Sc.from(e).append(this) : this;
  }),
  (Sc.prototype.appendInner = function (e) {
    return new wc(this, e);
  }),
  (Sc.prototype.slice = function (e, t) {
    return (
      e === void 0 && (e = 0),
      t === void 0 && (t = this.length),
      e >= t
        ? Sc.empty
        : this.sliceInner(Math.max(0, e), Math.min(this.length, t))
    );
  }),
  (Sc.prototype.get = function (e) {
    if (!(e < 0 || e >= this.length)) return this.getInner(e);
  }),
  (Sc.prototype.forEach = function (e, t, n) {
    (t === void 0 && (t = 0),
      n === void 0 && (n = this.length),
      t <= n
        ? this.forEachInner(e, t, n, 0)
        : this.forEachInvertedInner(e, t, n, 0));
  }),
  (Sc.prototype.map = function (e, t, n) {
    (t === void 0 && (t = 0), n === void 0 && (n = this.length));
    var r = [];
    return (
      this.forEach(
        function (t, n) {
          return r.push(e(t, n));
        },
        t,
        n,
      ),
      r
    );
  }),
  (Sc.from = function (e) {
    return e instanceof Sc ? e : e && e.length ? new Cc(e) : Sc.empty;
  }));
var Cc = (function (e) {
  function t(t) {
    (e.call(this), (this.values = t));
  }
  (e && (t.__proto__ = e),
    (t.prototype = Object.create(e && e.prototype)),
    (t.prototype.constructor = t));
  var n = { length: { configurable: !0 }, depth: { configurable: !0 } };
  return (
    (t.prototype.flatten = function () {
      return this.values;
    }),
    (t.prototype.sliceInner = function (e, n) {
      return e == 0 && n == this.length ? this : new t(this.values.slice(e, n));
    }),
    (t.prototype.getInner = function (e) {
      return this.values[e];
    }),
    (t.prototype.forEachInner = function (e, t, n, r) {
      for (var i = t; i < n; i++)
        if (e(this.values[i], r + i) === !1) return !1;
    }),
    (t.prototype.forEachInvertedInner = function (e, t, n, r) {
      for (var i = t - 1; i >= n; i--)
        if (e(this.values[i], r + i) === !1) return !1;
    }),
    (t.prototype.leafAppend = function (e) {
      if (this.length + e.length <= xc)
        return new t(this.values.concat(e.flatten()));
    }),
    (t.prototype.leafPrepend = function (e) {
      if (this.length + e.length <= xc)
        return new t(e.flatten().concat(this.values));
    }),
    (n.length.get = function () {
      return this.values.length;
    }),
    (n.depth.get = function () {
      return 0;
    }),
    Object.defineProperties(t.prototype, n),
    t
  );
})(Sc);
Sc.empty = new Cc([]);
var wc = (function (e) {
    function t(t, n) {
      (e.call(this),
        (this.left = t),
        (this.right = n),
        (this.length = t.length + n.length),
        (this.depth = Math.max(t.depth, n.depth) + 1));
    }
    return (
      e && (t.__proto__ = e),
      (t.prototype = Object.create(e && e.prototype)),
      (t.prototype.constructor = t),
      (t.prototype.flatten = function () {
        return this.left.flatten().concat(this.right.flatten());
      }),
      (t.prototype.getInner = function (e) {
        return e < this.left.length
          ? this.left.get(e)
          : this.right.get(e - this.left.length);
      }),
      (t.prototype.forEachInner = function (e, t, n, r) {
        var i = this.left.length;
        if (
          (t < i && this.left.forEachInner(e, t, Math.min(n, i), r) === !1) ||
          (n > i &&
            this.right.forEachInner(
              e,
              Math.max(t - i, 0),
              Math.min(this.length, n) - i,
              r + i,
            ) === !1)
        )
          return !1;
      }),
      (t.prototype.forEachInvertedInner = function (e, t, n, r) {
        var i = this.left.length;
        if (
          (t > i &&
            this.right.forEachInvertedInner(
              e,
              t - i,
              Math.max(n, i) - i,
              r + i,
            ) === !1) ||
          (n < i &&
            this.left.forEachInvertedInner(e, Math.min(t, i), n, r) === !1)
        )
          return !1;
      }),
      (t.prototype.sliceInner = function (e, t) {
        if (e == 0 && t == this.length) return this;
        var n = this.left.length;
        return t <= n
          ? this.left.slice(e, t)
          : e >= n
            ? this.right.slice(e - n, t - n)
            : this.left.slice(e, n).append(this.right.slice(0, t - n));
      }),
      (t.prototype.leafAppend = function (e) {
        var n = this.right.leafAppend(e);
        if (n) return new t(this.left, n);
      }),
      (t.prototype.leafPrepend = function (e) {
        var n = this.left.leafPrepend(e);
        if (n) return new t(n, this.right);
      }),
      (t.prototype.appendInner = function (e) {
        return this.left.depth >= Math.max(this.right.depth, e.depth) + 1
          ? new t(this.left, new t(this.right, e))
          : new t(this, e);
      }),
      t
    );
  })(Sc),
  Tc = 500,
  Ec = class e {
    constructor(e, t) {
      ((this.items = e), (this.eventCount = t));
    }
    popEvent(t, n) {
      if (this.eventCount == 0) return null;
      let r = this.items.length;
      for (; ; r--)
        if (this.items.get(r - 1).selection) {
          --r;
          break;
        }
      let i, a;
      n && ((i = this.remapping(r, this.items.length)), (a = i.maps.length));
      let o = t.tr,
        s,
        c,
        l = [],
        u = [];
      return (
        this.items.forEach(
          (t, n) => {
            if (!t.step) {
              (i || ((i = this.remapping(r, n + 1)), (a = i.maps.length)),
                a--,
                u.push(t));
              return;
            }
            if (i) {
              u.push(new Oc(t.map));
              let e = t.step.map(i.slice(a)),
                n;
              (e &&
                o.maybeStep(e).doc &&
                ((n = o.mapping.maps[o.mapping.maps.length - 1]),
                l.push(new Oc(n, void 0, void 0, l.length + u.length))),
                a--,
                n && i.appendMap(n, a));
            } else o.maybeStep(t.step);
            if (t.selection)
              return (
                (s = i ? t.selection.map(i.slice(a)) : t.selection),
                (c = new e(
                  this.items.slice(0, r).append(u.reverse().concat(l)),
                  this.eventCount - 1,
                )),
                !1
              );
          },
          this.items.length,
          0,
        ),
        { remaining: c, transform: o, selection: s }
      );
    }
    addTransform(t, n, r, i) {
      let a = [],
        o = this.eventCount,
        s = this.items,
        c = !i && s.length ? s.get(s.length - 1) : null;
      for (let e = 0; e < t.steps.length; e++) {
        let r = t.steps[e].invert(t.docs[e]),
          l = new Oc(t.mapping.maps[e], r, n),
          u;
        ((u = c && c.merge(l)) &&
          ((l = u), e ? a.pop() : (s = s.slice(0, s.length - 1))),
          a.push(l),
          (n &&= (o++, void 0)),
          i || (c = l));
      }
      let l = o - r.depth;
      return (l > Ac && ((s = Dc(s, l)), (o -= l)), new e(s.append(a), o));
    }
    remapping(e, t) {
      let n = new De();
      return (
        this.items.forEach(
          (t, r) => {
            let i =
              t.mirrorOffset != null && r - t.mirrorOffset >= e
                ? n.maps.length - t.mirrorOffset
                : void 0;
            n.appendMap(t.map, i);
          },
          e,
          t,
        ),
        n
      );
    }
    addMaps(t) {
      return this.eventCount == 0
        ? this
        : new e(this.items.append(t.map((e) => new Oc(e))), this.eventCount);
    }
    rebased(t, n) {
      if (!this.eventCount) return this;
      let r = [],
        i = Math.max(0, this.items.length - n),
        a = t.mapping,
        o = t.steps.length,
        s = this.eventCount;
      this.items.forEach((e) => {
        e.selection && s--;
      }, i);
      let c = n;
      this.items.forEach((e) => {
        let n = a.getMirror(--c);
        if (n == null) return;
        o = Math.min(o, n);
        let i = a.maps[n];
        if (e.step) {
          let o = t.steps[n].invert(t.docs[n]),
            l = e.selection && e.selection.map(a.slice(c + 1, n));
          (l && s++, r.push(new Oc(i, o, l)));
        } else r.push(new Oc(i));
      }, i);
      let l = [];
      for (let e = n; e < o; e++) l.push(new Oc(a.maps[e]));
      let u = new e(this.items.slice(0, i).append(l).append(r), s);
      return (
        u.emptyItemCount() > Tc &&
          (u = u.compress(this.items.length - r.length)),
        u
      );
    }
    emptyItemCount() {
      let e = 0;
      return (
        this.items.forEach((t) => {
          t.step || e++;
        }),
        e
      );
    }
    compress(t = this.items.length) {
      let n = this.remapping(0, t),
        r = n.maps.length,
        i = [],
        a = 0;
      return (
        this.items.forEach(
          (e, o) => {
            if (o >= t) (i.push(e), e.selection && a++);
            else if (e.step) {
              let t = e.step.map(n.slice(r)),
                o = t && t.getMap();
              if ((r--, o && n.appendMap(o, r), t)) {
                let s = e.selection && e.selection.map(n.slice(r));
                s && a++;
                let c = new Oc(o.invert(), t, s),
                  l,
                  u = i.length - 1;
                (l = i.length && i[u].merge(c)) ? (i[u] = l) : i.push(c);
              }
            } else e.map && r--;
          },
          this.items.length,
          0,
        ),
        new e(Sc.from(i.reverse()), a)
      );
    }
  };
Ec.empty = new Ec(Sc.empty, 0);
function Dc(e, t) {
  let n;
  return (
    e.forEach((e, r) => {
      if (e.selection && t-- == 0) return ((n = r), !1);
    }),
    e.slice(n)
  );
}
var Oc = class e {
    constructor(e, t, n, r) {
      ((this.map = e),
        (this.step = t),
        (this.selection = n),
        (this.mirrorOffset = r));
    }
    merge(t) {
      if (this.step && t.step && !t.selection) {
        let n = t.step.merge(this.step);
        if (n) return new e(n.getMap().invert(), n, this.selection);
      }
    }
  },
  kc = class {
    constructor(e, t, n, r, i) {
      ((this.done = e),
        (this.undone = t),
        (this.prevRanges = n),
        (this.prevTime = r),
        (this.prevComposition = i));
    }
  },
  Ac = 20;
function jc(e, t, n, r) {
  let i = n.getMeta(zc),
    a;
  if (i) return i.historyState;
  n.getMeta(Bc) && (e = new kc(e.done, e.undone, null, 0, -1));
  let o = n.getMeta(`appendedTransaction`);
  if (n.steps.length == 0) return e;
  if (o && o.getMeta(zc))
    return o.getMeta(zc).redo
      ? new kc(
          e.done.addTransform(n, void 0, r, Rc(t)),
          e.undone,
          Nc(n.mapping.maps),
          e.prevTime,
          e.prevComposition,
        )
      : new kc(
          e.done,
          e.undone.addTransform(n, void 0, r, Rc(t)),
          null,
          e.prevTime,
          e.prevComposition,
        );
  if (
    n.getMeta(`addToHistory`) !== !1 &&
    !(o && o.getMeta(`addToHistory`) === !1)
  ) {
    let i = n.getMeta(`composition`),
      a =
        e.prevTime == 0 ||
        (!o &&
          e.prevComposition != i &&
          (e.prevTime < (n.time || 0) - r.newGroupDelay ||
            !Mc(n, e.prevRanges))),
      s = o ? Pc(e.prevRanges, n.mapping) : Nc(n.mapping.maps);
    return new kc(
      e.done.addTransform(n, a ? t.selection.getBookmark() : void 0, r, Rc(t)),
      Ec.empty,
      s,
      n.time,
      i ?? e.prevComposition,
    );
  } else if ((a = n.getMeta(`rebased`)))
    return new kc(
      e.done.rebased(n, a),
      e.undone.rebased(n, a),
      Pc(e.prevRanges, n.mapping),
      e.prevTime,
      e.prevComposition,
    );
  else
    return new kc(
      e.done.addMaps(n.mapping.maps),
      e.undone.addMaps(n.mapping.maps),
      Pc(e.prevRanges, n.mapping),
      e.prevTime,
      e.prevComposition,
    );
}
function Mc(e, t) {
  if (!t) return !1;
  if (!e.docChanged) return !0;
  let n = !1;
  return (
    e.mapping.maps[0].forEach((e, r) => {
      for (let i = 0; i < t.length; i += 2)
        e <= t[i + 1] && r >= t[i] && (n = !0);
    }),
    n
  );
}
function Nc(e) {
  let t = [];
  for (let n = e.length - 1; n >= 0 && t.length == 0; n--)
    e[n].forEach((e, n, r, i) => t.push(r, i));
  return t;
}
function Pc(e, t) {
  if (!e) return null;
  let n = [];
  for (let r = 0; r < e.length; r += 2) {
    let i = t.map(e[r], 1),
      a = t.map(e[r + 1], -1);
    i <= a && n.push(i, a);
  }
  return n;
}
function Fc(e, t, n) {
  let r = Rc(t),
    i = zc.get(t).spec.config,
    a = (n ? e.undone : e.done).popEvent(t, r);
  if (!a) return null;
  let o = a.selection.resolve(a.transform.doc),
    s = (n ? e.done : e.undone).addTransform(
      a.transform,
      t.selection.getBookmark(),
      i,
      r,
    ),
    c = new kc(n ? s : a.remaining, n ? a.remaining : s, null, 0, -1);
  return a.transform.setSelection(o).setMeta(zc, { redo: n, historyState: c });
}
var Ic = !1,
  Lc = null;
function Rc(e) {
  let t = e.plugins;
  if (Lc != t) {
    ((Ic = !1), (Lc = t));
    for (let e = 0; e < t.length; e++)
      if (t[e].spec.historyPreserveItems) {
        Ic = !0;
        break;
      }
  }
  return Ic;
}
var zc = new Ee(`history`),
  Bc = new Ee(`closeHistory`);
function Vc(e = {}) {
  return (
    (e = { depth: e.depth || 100, newGroupDelay: e.newGroupDelay || 500 }),
    new Ae({
      key: zc,
      state: {
        init() {
          return new kc(Ec.empty, Ec.empty, null, 0, -1);
        },
        apply(t, n, r) {
          return jc(n, r, t, e);
        },
      },
      config: e,
      props: {
        handleDOMEvents: {
          beforeinput(e, t) {
            let n = t.inputType,
              r = n == `historyUndo` ? Uc : n == `historyRedo` ? Wc : null;
            return !r || !e.editable
              ? !1
              : (t.preventDefault(), r(e.state, e.dispatch));
          },
        },
      },
    })
  );
}
function Hc(e, t) {
  return (n, r) => {
    let i = zc.getState(n);
    if (!i || (e ? i.undone : i.done).eventCount == 0) return !1;
    if (r) {
      let a = Fc(i, n, e);
      a && r(t ? a.scrollIntoView() : a);
    }
    return !0;
  };
}
var Uc = Hc(!1, !0),
  Wc = Hc(!0, !0);
function Gc(e, { preserveTextLinkMarks: t = !1 } = {}) {
  let n = ``,
    r = !1;
  function i(e) {
    if (((r = !1), e.type.name === `paragraph`))
      return (
        e.descendants((e) => i(e)),
        (n += `
`),
        (r = !0),
        !1
      );
    if (e.isText && e.text !== void 0) {
      let r = e.marks.find((e) => e.type.name === `link`);
      r == null
        ? (n += e.text)
        : (n += Kc(e.text, `${t ? y : ``}${r.attrs.href}`));
    } else if (e.type.name === `atMention`)
      n += Kc(e.attrs.label, e.attrs.path);
    else if (e.type.name === `agentMention`) {
      let t =
        typeof e.attrs.displayName == `string` && e.attrs.displayName.length > 0
          ? e.attrs.displayName
          : e.attrs.name;
      n += Kc(`@${t}`, e.attrs.path);
    } else if (e.type.name === `resourceMention`)
      n += Kc(
        e.attrs.title,
        N({ resourceUri: e.attrs.resourceUri, server: e.attrs.server }),
      );
    else if (e.type.name === `chatGptConversationMention`)
      n += Kc(e.attrs.title, e.attrs.path);
    else if (
      e.type.name === `skillMention` ||
      e.type.name === `appMention` ||
      e.type.name === `pluginMention`
    ) {
      if (
        e.type.name === `skillMention` &&
        typeof e.attrs.path == `string` &&
        e.attrs.path.length === 0
      )
        return;
      let t = e.type.name === `pluginMention` ? `@` : `$`,
        r =
          e.type.name === `appMention`
            ? `app`
            : e.type.name === `pluginMention`
              ? `plugin`
              : `skill`,
        i = typeof e.attrs.name == `string` ? e.attrs.name : r;
      n += Kc(`${t}${i}`, e.attrs.path);
    } else
      e.type.name === `richLink` &&
        (n += Kc(e.attrs.displayText, e.attrs.href));
  }
  return (
    e.descendants((e) => i(e)),
    r &&
      n.endsWith(`
`) &&
      (n = n.slice(0, -1)),
    { content: n, metadata: {} }
  );
}
function Kc(e, t) {
  return `[${v(e)}](${_(t)})`;
}
var qc = Pr(wr, Tr, Dr);
async function Jc(e, t) {
  let { schema: n } = e.state,
    r = t.split(`
`);
  if (
    (e.dispatch(e.state.tr.deleteSelection()),
    e.dispatch(e.state.tr.insertText(r[0])),
    r.length > 1)
  ) {
    qc(e.state, e.dispatch);
    let t = r.slice(1),
      i = new W(
        U.fromArray(
          t.map((e) =>
            n.nodes.paragraph.create(null, e === `` ? null : n.text(e)),
          ),
        ),
        0,
        0,
      );
    (e.dispatch(e.state.tr.replaceSelection(i)), pr(e.state, e.dispatch, e));
  }
}
var Yc = new Ee(`placeholderPlugin`);
function Xc(e) {
  return new Ae({
    key: Yc,
    state: {
      init() {
        return { placeholder: e };
      },
      apply(e, t) {
        return e.getMeta(Yc) ? { placeholder: e.getMeta(Yc).placeholder } : t;
      },
    },
    props: {
      decorations(e) {
        let { doc: t } = e;
        if (
          t.childCount === 1 &&
          t.firstChild?.isTextblock === !0 &&
          t.firstChild.content.size === 0
        ) {
          let n = [],
            { placeholder: r } = Yc.getState(e);
          return (
            t.descendants((e, t) => {
              n.push(
                ys.node(t, t + e.nodeSize, {
                  class: `placeholder`,
                  "data-placeholder": r,
                }),
              );
            }),
            Ss.create(t, n)
          );
        }
        return null;
      },
    },
  });
}
var Zc = 1e5,
  Qc = 1e5,
  $c = 100;
function el({ html: e, schema: t, text: n }) {
  if (e.length > Zc || n.length > Qc) return null;
  let r = 0,
    i,
    a = n.replaceAll(`\xA0`, ` `),
    o = new window.DOMParser().parseFromString(e, `text/html`),
    s = o.body.querySelectorAll(`a[href]`);
  if (s.length > $c) return null;
  let c = new Map();
  for (let e of s) {
    let t = z(e.getAttribute(`href`) ?? ``);
    t != null && !tl(e) && c.set(e, t);
  }
  if (c.size === 0) return null;
  let l = [],
    u = o.createTreeWalker(o.body, window.NodeFilter.SHOW_TEXT);
  for (let e = u.nextNode(); e != null; e = u.nextNode()) {
    let t = (e.textContent ?? ``).replaceAll(`\xA0`, ` `);
    if (t.trim() === ``) continue;
    if (tl(e.parentElement)) {
      let e = a.indexOf(t, i ?? r);
      e !== -1 && (i = e + t.length);
      continue;
    }
    let n = i == null ? -1 : a.indexOf(t, i),
      o = n === -1 ? a.indexOf(t, r) : n;
    if (o === -1) return null;
    let s = o + t.length;
    ((r = s), (i = void 0));
    let u = e.parentElement?.closest(`a[href]`),
      d = u == null ? void 0 : c.get(u);
    d != null && l.push({ from: o, href: d, to: s });
  }
  if (l.length === 0) return null;
  let d = 0,
    f = 0;
  return t.nodes.doc.create(
    null,
    n
      .split(
        `
`,
      )
      .map((e) => {
        let r = d + e.length,
          i = d,
          a = [];
        for (; f < l.length; ) {
          let { from: e, href: o, to: s } = l[f];
          if (e >= r) break;
          let c = Math.max(e, d),
            u = Math.min(s, r);
          if (
            (c < u &&
              (i < c && a.push(t.text(n.slice(i, c))),
              a.push(t.text(n.slice(c, u), [t.marks.link.create({ href: o })])),
              (i = u)),
            s > r)
          )
            break;
          f += 1;
        }
        return (
          i < r && a.push(t.text(n.slice(i, r))),
          (d = r + 1),
          t.nodes.paragraph.create(null, a)
        );
      }),
  );
}
function tl(e) {
  for (let t = e; t != null; t = t.parentElement)
    if (
      t.matches(`script, style, template, noscript`) ||
      t.hasAttribute(`hidden`) ||
      t.getAttribute(`aria-hidden`) === `true` ||
      (t instanceof window.HTMLElement &&
        (t.style.display === `none` || t.style.visibility === `hidden`))
    )
      return !0;
  return !1;
}
var nl = new ke({
    nodes: {
      doc: { content: `paragraph+` },
      paragraph: {
        content: `inline*`,
        group: `block`,
        parseDOM: [{ tag: `p` }],
        toDOM() {
          return [`p`, 0];
        },
      },
      text: { group: `inline` },
      atMention: {
        attrs: {
          label: { validate: `string` },
          path: { validate: `string` },
          fsPath: { validate: `string` },
        },
        inline: !0,
        group: `inline`,
        draggable: !1,
        selectable: !1,
        toDOM: (e) => {
          let t = typeof e.attrs.path == `string` ? e.attrs.path : void 0;
          return Bt({
            text: e.attrs.label,
            icon: ue({ path: t }),
            interactive: !0,
            dataAttributes: {
              "at-mention-label": e.attrs.label,
              "at-mention-path": e.attrs.path,
              "at-mention-fs-path": e.attrs.fsPath,
            },
          });
        },
        parseDOM: [
          {
            tag: `span[at-mention-label][at-mention-path][at-mention-fs-path]`,
            getAttrs: (e) => ({
              label: e.getAttribute(`at-mention-label`),
              path: e.getAttribute(`at-mention-path`),
              fsPath: e.getAttribute(`at-mention-fs-path`),
            }),
          },
        ],
      },
      agentMention: {
        attrs: {
          name: { validate: `string` },
          displayName: { validate: `string`, default: `` },
          conversationId: { default: null },
          path: { validate: `string` },
        },
        inline: !0,
        group: `inline`,
        draggable: !1,
        selectable: !1,
        toDOM: (e) => {
          let t = e.attrs.displayName || e.attrs.name,
            n =
              typeof e.attrs.conversationId == `string`
                ? e.attrs.conversationId
                : null;
          return Bt({
            text: `@${t}`,
            interactive: !0,
            className: `hover:opacity-90`,
            textClassName: `text-token-foreground`,
            dataAttributes: {
              "agent-mention-name": e.attrs.name,
              "agent-mention-display-name": t,
              "agent-mention-path": e.attrs.path,
              ...(n == null ? {} : { "agent-mention-conversation-id": n }),
            },
          });
        },
        parseDOM: [
          {
            tag: `span[agent-mention-name][agent-mention-path]`,
            getAttrs: (e) => {
              let t = e.getAttribute(`agent-mention-name`);
              return {
                name: t,
                displayName: e.getAttribute(`agent-mention-display-name`) ?? t,
                conversationId: e.getAttribute(`agent-mention-conversation-id`),
                path: e.getAttribute(`agent-mention-path`),
              };
            },
          },
        ],
      },
      skillMention: Ut,
      appMention: Wt,
      pluginMention: Gt,
      richLink: {
        attrs: {
          displayText: { validate: `string` },
          href: { validate: `string` },
          sourceAppId: { validate: `string` },
        },
        atom: !0,
        draggable: !1,
        group: `inline`,
        inline: !0,
        selectable: !1,
        toDOM: (e) =>
          Bt({
            dataAttributes: {
              "rich-link-display-text": e.attrs.displayText,
              "rich-link-href": e.attrs.href,
              "rich-link-source-app-id": e.attrs.sourceAppId,
            },
            icon: C(e.attrs.sourceAppId) ?? be,
            text: e.attrs.displayText,
            tooltipText: e.attrs.href,
          }),
        parseDOM: [
          {
            tag: `span[rich-link-display-text][rich-link-href][rich-link-source-app-id]`,
            getAttrs: (e) => ({
              displayText: e.getAttribute(`rich-link-display-text`),
              href: e.getAttribute(`rich-link-href`),
              sourceAppId: e.getAttribute(`rich-link-source-app-id`),
            }),
          },
        ],
      },
      resourceMention: {
        attrs: {
          brandColor: { validate: `string`, default: `` },
          iconSmall: { validate: `string`, default: `` },
          resourceUri: { validate: `string` },
          server: { validate: `string` },
          title: { validate: `string` },
        },
        inline: !0,
        group: `inline`,
        draggable: !1,
        selectable: !1,
        toDOM: (e) => {
          let t = typeof e.attrs.iconSmall == `string` ? e.attrs.iconSmall : ``,
            n =
              typeof e.attrs.resourceUri == `string` ? e.attrs.resourceUri : ``,
            r = typeof e.attrs.server == `string` ? e.attrs.server : ``,
            i = typeof e.attrs.title == `string` ? e.attrs.title : ``,
            a =
              typeof e.attrs.brandColor == `string` &&
              e.attrs.brandColor.length > 0
                ? e.attrs.brandColor
                : void 0;
          return Bt({
            text: i,
            icon: de(null, {
              alt: i,
              basePath: r,
              fallbackIcon: V,
              fallbackName: r,
              iconSmall: t,
              size: `small`,
              smallOnly: !0,
            }),
            brandColor: a,
            interactive: !0,
            dataAttributes: {
              "resource-mention-brand-color": a ?? ``,
              "resource-mention-icon": t,
              "resource-mention-resource-uri": n,
              "resource-mention-server": r,
              "resource-mention-title": i,
            },
          });
        },
        parseDOM: [
          {
            tag: `span[resource-mention-resource-uri][resource-mention-server][resource-mention-title]`,
            getAttrs: (e) => ({
              brandColor: e.getAttribute(`resource-mention-brand-color`) ?? ``,
              iconSmall: e.getAttribute(`resource-mention-icon`) ?? ``,
              resourceUri: e.getAttribute(`resource-mention-resource-uri`),
              server: e.getAttribute(`resource-mention-server`),
              title: e.getAttribute(`resource-mention-title`),
            }),
          },
        ],
      },
      chatGptConversationMention: {
        attrs: {
          conversationId: { validate: `string` },
          path: { validate: `string` },
          title: { validate: `string` },
        },
        inline: !0,
        group: `inline`,
        draggable: !1,
        selectable: !1,
        toDOM: (e) =>
          Bt({
            text: e.attrs.title,
            icon: fe,
            interactive: !0,
            dataAttributes: {
              "chatgpt-conversation-mention-conversation-id":
                e.attrs.conversationId,
              "chatgpt-conversation-mention-path": e.attrs.path,
              "chatgpt-conversation-mention-title": e.attrs.title,
            },
          }),
        parseDOM: [
          {
            tag: `span[chatgpt-conversation-mention-conversation-id][chatgpt-conversation-mention-path][chatgpt-conversation-mention-title]`,
            getAttrs: (e) => ({
              conversationId: e.getAttribute(
                `chatgpt-conversation-mention-conversation-id`,
              ),
              path: e.getAttribute(`chatgpt-conversation-mention-path`),
              title: e.getAttribute(`chatgpt-conversation-mention-title`),
            }),
          },
        ],
      },
    },
    marks: {
      link: {
        attrs: { href: { validate: `string` } },
        inclusive: !1,
        toDOM(e) {
          return [
            `span`,
            {
              class: `text-token-text-link-foreground underline underline-offset-2`,
              title: e.attrs.href,
            },
            0,
          ];
        },
      },
    },
  }),
  rl = class {
    listeners = new Map();
    emit(e, t) {
      let n = this.listeners.get(e),
        r = !!n?.size;
      return (n?.forEach((e) => e(t)), r);
    }
    addListener(e, t) {
      let n = this.listeners.get(e) ?? new Set();
      (n.add(t), this.listeners.set(e, n));
    }
    removeListener(e, t) {
      this.listeners.get(e)?.delete(t);
    }
  };
function il(
  e = null,
  {
    defaultTextKind: t = `plain`,
    enableFileMentions: n = !0,
    enableSelectedTextLinks: r = !1,
    enableSkillMentions: i = !0,
    enableSlashCommands: a = !0,
    enterBehavior: o = `enter`,
    restoreMarkdownLinksAsTextLinks: s = !1,
    restorePathLinksAsFileMentions: c = !0,
  } = {},
) {
  let l = typeof a == `boolean` ? {} : a,
    u = new EventTarget(),
    d = new rl(),
    f = o,
    inputModeDisabled = !1,
    getAttributes = () =>
      inputModeDisabled
        ? { spellcheck: `true` }
        : { spellcheck: `true`, inputmode: `none` },
    setPointerInputMode = (e) => {
      inputModeDisabled !== e &&
        ((inputModeDisabled = e),
        p.isDestroyed || p.setProps({ attributes: getAttributes }));
    },
    p = new nc(null, {
      attributes: getAttributes,
      state: G.create({
        schema: nl,
        doc:
          e == null
            ? void 0
            : t === `prompt`
              ? D({
                  schema: nl,
                  text: e,
                  restoreMarkdownLinksAsTextLinks: s,
                  restorePathLinksAsFileMentions: c,
                })
              : O({ schema: nl, text: e }),
        plugins: [
          Vc(),
          en(),
          ...(n
            ? It({
                onSubmit(e) {
                  d.emit(`mention-ui-submit`, e);
                },
                onClose() {
                  d.emit(`mention-ui-close`);
                },
              })
            : []),
          ...(i
            ? Kt({
                onSubmit() {
                  d.emit(`skill-mention-ui-submit`);
                },
                onClose() {
                  d.emit(`skill-mention-ui-close`);
                },
              })
            : []),
          ...(a
            ? Z({
                ...l,
                onSubmit() {
                  d.emit(`slash-command-ui-submit`);
                },
                onClose() {
                  d.emit(`slash-command-ui-close`);
                },
              })
            : []),
          Tt({
            ...zr,
            ArrowDown: (e) => {
              let t = e.doc,
                n = t.firstChild;
              return (
                t.childCount === 1 &&
                n != null &&
                n.isTextblock &&
                n.content.size === 0
              );
            },
            "Shift-Enter": (e, t) => qc(e, t),
            "Alt-Enter": (e, t) => qc(e, t),
            Enter: (e, t) => {
              let n = Ft.getState(e),
                r = Vt.getState(e),
                i = qt.getState(e);
              if (n?.active || r?.active || i?.active) return !0;
              if (f === `newline`) return qc(e, t);
              let a = e.doc.childCount > 1;
              return f === `cmdIfMultiline` && a
                ? qc(e, t)
                : (d.emit(`submit`), !0);
            },
            "Mod-Enter": () => (d.emit(`submit`), !0),
            "Mod-a": Or,
            "Mod-z": Uc,
            "Mod-y": Wc,
            "Mod-Shift-z": Wc,
          }),
          Ce(u),
          Xc(``),
          hc(),
        ],
      }),
      dispatchTransaction(e) {
        let t = p.state.apply(e);
        (p.updateState(t), u.dispatchEvent(new Event(we)));
      },
      handleDOMEvents: {
        mousedown(e, t) {
          return (setPointerInputMode(!0), !1);
        },
        touchstart(e, t) {
          return (setPointerInputMode(!0), !1);
        },
        blur(e, t) {
          return (setPointerInputMode(!1), !1);
        },
      },
      handlePaste(e, t) {
        if (t.defaultPrevented) return !0;
        let n = t.clipboardData,
          { imageFiles: i, otherFiles: a } = et(n);
        if (
          (i.length > 0 && d.emit(`pasted-images`, i),
          a.length > 0 && d.emit(`pasted-files`, a),
          i.length > 0 || a.length > 0)
        )
          return !0;
        let o = n?.getData(`text/plain`);
        if (o == null) return !1;
        if (o.length >= 5e3 && d.emit(`pasted-text`, o)) return !0;
        let l = z(o);
        if (r && l != null && !e.state.selection.empty) {
          let t = !1,
            n = !1;
          if (
            (e.state.selection.content().content.descendants((e) => {
              e.isText
                ? (t ||= e.textContent.trim() !== ``)
                : e.isInline && (n = !0);
            }),
            t && !n)
          ) {
            let { from: t, to: n } = e.state.selection;
            return (
              e.dispatch(
                e.state.tr.addMark(
                  t,
                  n,
                  e.state.schema.marks.link.create({ href: l }),
                ),
              ),
              !0
            );
          }
        }
        let u = R(o);
        if (u != null) {
          let t = e.state.schema.nodes.richLink.create(u);
          return (e.dispatch(e.state.tr.replaceSelectionWith(t)), !0);
        }
        if (k(o) || (s && j(o))) {
          let t = D({
            schema: e.state.schema,
            text: o,
            restoreMarkdownLinksAsTextLinks: s,
            restorePathLinksAsFileMentions: c,
          });
          return (
            e.dispatch(e.state.tr.replaceSelection(new W(t.content, 1, 1))),
            !0
          );
        }
        let f = n?.getData(`text/html`);
        if (f != null && f.length > 0) {
          let t = el({ html: f, schema: e.state.schema, text: o });
          if (t != null)
            return (
              e.dispatch(e.state.tr.replaceSelection(new W(t.content, 1, 1))),
              !0
            );
        }
        return (Jc(e, o), !0);
      },
      handleDrop(e, t) {
        let n = t.dataTransfer;
        return n == null
          ? !1
          : n.files.length > 0 ||
              Array.from(n.items ?? []).some((e) => e.kind === `file`);
      },
      clipboardTextSerializer(e) {
        return Gc(e.content).content;
      },
    });
  return (
    e != null && p.dispatch(p.state.tr.setSelection(J.atEnd(p.state.doc))),
    {
      view: p,
      eventEmitter: d,
      setEnterBehavior: (e) => {
        f = e;
      },
    }
  );
}
var al = class {
  pastedImagesHandlers = new Map();
  pastedFilesHandlers = new Map();
  pastedTextHandlers = new Map();
  constructor(e, t, n, r, i) {
    ((this.view = e),
      (this.eventEmitter = t),
      (this.updateEnterBehavior = n),
      (this.restoreMarkdownLinksAsTextLinks = r),
      (this.restorePathLinksAsFileMentions = i));
  }
  getText() {
    return Gc(this.view.state.doc).content;
  }
  getPersistedText() {
    return Gc(this.view.state.doc, { preserveTextLinkMarks: !0 }).content;
  }
  hasText() {
    return this.getText().trim() !== ``;
  }
  getMentionedAgentConversationIds() {
    let e = new Set();
    return (
      this.view.state.doc.descendants((t) => {
        if (t.type.name !== `agentMention`) return !0;
        let n = t.attrs.conversationId;
        return (typeof n == `string` && n.length > 0 && e.add(o(n)), !0);
      }),
      Array.from(e)
    );
  }
  getMentionedAgentConversationIdsKey() {
    return this.getMentionedAgentConversationIds().join(`\0`);
  }
  hasPluginBackedMentions() {
    let e = !1;
    return (
      this.view.state.doc.descendants((t) =>
        t.type.name === `pluginMention` ? ((e = !0), !1) : !0,
      ),
      e
    );
  }
  isCursorAtEnd() {
    let e = this.view.dom;
    if (!this.view.state.selection.empty) return !1;
    let t = e.ownerDocument.getSelection();
    if (!t || !t.isCollapsed || t.rangeCount === 0) return !1;
    let n = t.anchorNode;
    return n == null || !e.contains(n)
      ? !1
      : this.view.posAtDOM(n, t.anchorOffset, -1) ===
          J.atEnd(this.view.state.doc).from;
  }
  setText(e) {
    let t = O({ schema: this.view.state.schema, text: e }),
      n = this.view.state.tr;
    (n.replaceWith(0, this.view.state.doc.content.size, t.content),
      n.setSelection(J.atEnd(n.doc)),
      this.view.dispatch(n));
  }
  appendText(e) {
    let t = e.trim();
    if (t.length === 0) return;
    let n = this.getText(),
      r = n.length > 0 && !/\s$/.test(n) ? ` ${t}` : t,
      i = this.view.state.tr;
    (i.setSelection(J.atEnd(i.doc)),
      i.insertText(r),
      i.setSelection(J.atEnd(i.doc)),
      this.view.dispatch(i),
      this.view.focus());
  }
  insertDictationText(e) {
    let t = e.trim();
    if (t.length === 0) return;
    let n = this.view.dom.ownerDocument.getSelection();
    if (
      !(
        n != null &&
        n.rangeCount > 0 &&
        n.anchorNode != null &&
        n.focusNode != null &&
        this.view.dom.contains(n.anchorNode) &&
        this.view.dom.contains(n.focusNode)
      )
    ) {
      this.appendText(t);
      return;
    }
    let { state: r, dispatch: i } = this.view,
      { from: a, to: o } = r.selection,
      s = r.doc.textBetween(
        Math.max(0, a - 1),
        a,
        `
`,
      ),
      c = r.doc.textBetween(
        o,
        Math.min(r.doc.content.size, o + 1),
        `
`,
      ),
      l = s.length > 0 && !/\s$/.test(s),
      u = c.length > 0 && !/^\s/.test(c),
      d = `${l ? ` ` : ``}${t}${u ? ` ` : ``}`,
      f = r.tr.insertText(d, a, o);
    (f.setSelection(J.create(f.doc, a + d.length)), i(f), this.view.focus());
  }
  insertTextAtSelection(e) {
    if (e.length === 0) return;
    if (
      e.includes(`
`)
    ) {
      (Jc(this.view, e), this.view.focus());
      return;
    }
    let { state: t, dispatch: n } = this.view,
      { from: r, to: i } = t.selection,
      a = t.tr.insertText(e, r, i);
    (a.setSelection(J.create(a.doc, r + e.length)), n(a), this.view.focus());
  }
  setPromptText(e) {
    let t = D({
        schema: this.view.state.schema,
        text: e,
        restoreMarkdownLinksAsTextLinks: this.restoreMarkdownLinksAsTextLinks,
        restorePathLinksAsFileMentions: this.restorePathLinksAsFileMentions,
      }),
      n = this.view.state.tr;
    (n.replaceWith(0, this.view.state.doc.content.size, t.content),
      n.setSelection(J.atEnd(n.doc)),
      this.view.dispatch(n));
  }
  setPlaceholder(e) {
    this.view.dispatch(this.view.state.tr.setMeta(Yc, { placeholder: e }));
  }
  syncMentionMetadata({
    skills: e,
    apps: t = [],
    plugins: n = [],
    nativeApps: r = [],
    pluginMentionLabels: i,
  }) {
    let a = new Map(),
      o = new Map(),
      s = new Map(),
      c = new Map(),
      l = new Map(),
      d = new Map();
    (e.forEach((e) => {
      (a.set(u(e.path), e), o.set(e.name.toLowerCase(), e));
    }),
      t.forEach((e) => {
        let t = L(e.id);
        (s.set(t, e),
          c.set(e.id.toLowerCase(), e),
          c.set(e.name.toLowerCase(), e));
      }),
      n.forEach((e) => {
        let t = ie(e.plugin.id);
        (l.set(t, e),
          d.set(e.plugin.id.toLowerCase(), e),
          d.set(e.plugin.name.toLowerCase(), e));
        let n = e.displayName?.toLowerCase();
        n != null && n.length > 0 && d.set(n, e);
      }));
    let f = ce(n),
      { state: p, dispatch: m } = this.view,
      h = p.tr,
      g = !1;
    (p.doc.descendants((e, t) => {
      if (
        e.type.name !== `skillMention` &&
        e.type.name !== `appMention` &&
        e.type.name !== `pluginMention`
      )
        return !0;
      let n = typeof e.attrs.path == `string` ? e.attrs.path : ``,
        p = typeof e.attrs.name == `string` ? e.attrs.name : ``,
        m = cl({ nodeTypeName: e.type.name, path: n }),
        _ = null;
      if (m === `app`) {
        let e = s.get(n),
          t = p.length > 0 ? c.get(p.toLowerCase()) : void 0,
          r = e ?? t;
        r && (_ = ne(r));
      } else if (m === `plugin`) {
        let t = l.get(n),
          a = p.length > 0 ? d.get(p.toLowerCase()) : void 0,
          o = t ?? a,
          s =
            typeof e.attrs.displayName == `string` &&
            e.attrs.displayName.length > 0
              ? e.attrs.displayName
              : p,
          c = le({
            mentionPath: n,
            mentionDisplayName: s,
            nativeApps: r,
            computerPlugin: f,
          }),
          u = o == null ? null : re(o, i),
          m = o?.displayName ?? o?.plugin.name ?? ``,
          h = o == null ? `` : re(o).displayName,
          g =
            c.isComputerUse &&
            s.length > 0 &&
            s !== m &&
            s !== (u?.displayName ?? ``) &&
            s !== h &&
            s !== (o?.plugin.name ?? ``);
        if (c.nativeApp) {
          let { nativeApp: t } = c,
            r = se(t),
            i =
              typeof e.attrs.description == `string` ? e.attrs.description : ``,
            a = typeof e.attrs.iconSmall == `string` ? e.attrs.iconSmall : ``;
          _ = {
            name: r,
            displayName: r,
            path: n,
            description: i.length > 0 ? i : (o?.description ?? ``),
            iconSmall: a,
            brandColor:
              typeof e.attrs.brandColor == `string` ? e.attrs.brandColor : ``,
          };
        } else u != null && !g && (_ = u);
      } else {
        let t = n.length > 0 ? a.get(u(n)) : void 0;
        (!t && p.length > 0 && (t = o.get(p.toLowerCase())),
          t
            ? (_ = P(t))
            : n.length > 0 &&
              (_ = {
                name: p,
                displayName:
                  typeof e.attrs.displayName == `string`
                    ? e.attrs.displayName
                    : p,
                path: ``,
                description:
                  typeof e.attrs.description == `string`
                    ? e.attrs.description
                    : ``,
                iconSmall:
                  typeof e.attrs.iconSmall == `string` ? e.attrs.iconSmall : ``,
                brandColor:
                  typeof e.attrs.brandColor == `string`
                    ? e.attrs.brandColor
                    : ``,
              }));
      }
      let v = sl(m),
        y = e.type !== v;
      return (!_ && !y) ||
        (!(
          _ != null &&
          (e.attrs.name !== _.name ||
            e.attrs.displayName !== _.displayName ||
            e.attrs.path !== _.path ||
            e.attrs.description !== _.description ||
            e.attrs.iconSmall !== _.iconSmall ||
            (typeof e.attrs.brandColor == `string`
              ? e.attrs.brandColor
              : ``) !== (_.brandColor ?? ``))
        ) &&
          !y)
        ? !0
        : ((g = !0), (h = h.setNodeMarkup(t, v, { ...e.attrs, ..._ })), !0);
    }),
      g && m(h));
  }
  insertAtMention(e, t) {
    let n = t ?? Ft.getState(this.view.state);
    if (!n || n.anchorPos == null) return;
    let { state: r, dispatch: i } = this.view,
      a = n.anchorPos - 1,
      o = n.anchorPos + n.query.length,
      s =
        e.matchType === `directory` && !/[\\/]$/.test(e.path)
          ? `${e.path}/`
          : e.path,
      c = nl.nodes.atMention.create({ ...e, path: s }),
      l = r.tr.replaceRangeWith(a, o, c),
      u = ol(l, l.mapping.map(a) + c.nodeSize);
    ((l = l.setSelection(J.create(l.doc, u))),
      (l = l.setMeta(Ft, { active: !1, anchorPos: null, query: `` })),
      i(l),
      this.view.focus());
  }
  insertAgentMention(e, t) {
    let n = t ?? Ft.getState(this.view.state);
    if (!n || n.anchorPos == null) return;
    let { state: r, dispatch: i } = this.view,
      a = n.anchorPos - 1,
      o = n.anchorPos + n.query.length,
      s = nl.nodes.agentMention.create({
        name: e.name,
        displayName: e.displayName,
        conversationId: e.conversationId ?? null,
        path: e.path,
      }),
      c = r.tr.replaceRangeWith(a, o, s),
      l = c.mapping.map(a) + s.nodeSize,
      u = ol(c, l);
    ((c = c.setSelection(J.create(c.doc, u))),
      (c = c.setMeta(Ft, { active: !1, anchorPos: null, query: `` })),
      i(c),
      this.view.focus());
  }
  insertConfiguredAgentMention(e, t) {
    this.insertAgentMention(M(e), t);
  }
  insertSkillMention(e, t) {
    this.insertMention(I(e), t);
  }
  insertSkillMentionFromSlashCommand(e, t) {
    this.insertMentionFromSlashCommand(I(e), t);
  }
  insertMention(e, t) {
    let n = t ?? Vt.getState(this.view.state);
    !n || n.anchorPos == null || this.replaceQueryWithMention(e, n, Vt);
  }
  insertMentionFromSlashCommand(e, t) {
    let n = t ?? qt.getState(this.view.state);
    !n || n.anchorPos == null || this.replaceQueryWithMention(e, n, qt);
  }
  replaceQueryWithMention(e, t, n) {
    if (t.anchorPos == null) return;
    let r = t.anchorPos - 1,
      i = t.anchorPos + t.query.length;
    this.insertMentionInRange(e, r, i, n);
  }
  insertMentionFromAtMention(e, t) {
    let n = t ?? Ft.getState(this.view.state);
    !n || n.anchorPos == null || this.replaceQueryWithMention(e, n, Ft);
  }
  setAtMentionSource(e, t) {
    if (t.anchorPos == null) return;
    let { state: n, dispatch: r } = this.view,
      i = n.tr.insertText(``, t.anchorPos, t.anchorPos + t.query.length);
    ((i = i.setMeta(Ft, {
      active: !0,
      anchorPos: t.anchorPos,
      query: ``,
      source: e,
    })),
      r(i),
      this.view.focus());
  }
  insertSkillMentionAtSelection(e) {
    this.insertMentionAtSelection(I(e));
  }
  insertMentionAtSelection(e) {
    let { from: t, to: n } = this.view.state.selection;
    this.insertMentionInRange(e, t, n);
  }
  clearSlashCommand(e) {
    let t = e ?? qt.getState(this.view.state);
    if (!t || t.anchorPos == null) return;
    let { state: n, dispatch: r } = this.view,
      i = t.anchorPos - 1,
      a = t.anchorPos + t.query.length,
      o = n.tr.insertText(``, i, a);
    ((o = o.setSelection(J.create(o.doc, i))),
      (o = o.setMeta(qt, { active: !1, anchorPos: null, query: `` })),
      r(o),
      this.view.focus());
  }
  insertMentionInRange(e, t, n, r) {
    let { state: i, dispatch: a } = this.view,
      o = sl(e.kind).create({
        name: e.name,
        displayName: e.displayName,
        path: e.path,
        description: e.description,
        iconSmall: e.iconSmall,
        brandColor: e.brandColor ?? ``,
      }),
      s = i.tr.replaceRangeWith(t, n, o),
      c = s.mapping.map(t) + o.nodeSize,
      l = ol(s, c);
    ((s = s.setSelection(J.create(s.doc, l))),
      r && (s = s.setMeta(r, { active: !1, anchorPos: null, query: `` })),
      a(s),
      this.view.focus());
  }
  insertResourceMentionFromAtMention(e, t, n) {
    if (n.anchorPos == null) return;
    let { state: r, dispatch: i } = this.view,
      a = n.anchorPos - 1,
      o = n.anchorPos + n.query.length,
      s = nl.nodes.resourceMention.create({
        brandColor: e.brandColor ?? ``,
        iconSmall: e.iconSmall,
        resourceUri: e.resourceUri,
        server: e.server,
        title: t,
      }),
      c = r.tr.replaceRangeWith(a, o, s),
      l = c.mapping.map(a) + s.nodeSize,
      u = ol(c, l);
    ((c = c.setSelection(J.create(c.doc, u))),
      (c = c.setMeta(Ft, { active: !1, anchorPos: null, query: `` })),
      i(c),
      this.view.focus());
  }
  insertChatGptConversationMention(e, t) {
    let n = t ?? Ft.getState(this.view.state);
    if (!n || n.anchorPos == null) return;
    let { state: r, dispatch: i } = this.view,
      a = n.anchorPos - 1,
      o = n.anchorPos + n.query.length,
      s = nl.nodes.chatGptConversationMention.create(e),
      c = r.tr.replaceRangeWith(a, o, s),
      l = c.mapping.map(a) + s.nodeSize,
      u = ol(c, l);
    ((c = c.setSelection(J.create(c.doc, u))),
      (c = c.setMeta(Ft, { active: !1, anchorPos: null, query: `` })),
      i(c),
      this.view.focus());
  }
  addSubmitHandler(e) {
    this.eventEmitter.addListener(`submit`, e);
  }
  removeSubmitHandler(e) {
    this.eventEmitter.removeListener(`submit`, e);
  }
  addPastedImagesHandler(e) {
    if (this.pastedImagesHandlers.has(e)) return;
    let t = (t) => {
      e(t);
    };
    (this.pastedImagesHandlers.set(e, t),
      this.eventEmitter.addListener(`pasted-images`, t));
  }
  removePastedImagesHandler(e) {
    let t = this.pastedImagesHandlers.get(e);
    t != null &&
      (this.eventEmitter.removeListener(`pasted-images`, t),
      this.pastedImagesHandlers.delete(e));
  }
  addPastedFilesHandler(e) {
    if (this.pastedFilesHandlers.has(e)) return;
    let t = (t) => {
      e(t);
    };
    (this.pastedFilesHandlers.set(e, t),
      this.eventEmitter.addListener(`pasted-files`, t));
  }
  removePastedFilesHandler(e) {
    let t = this.pastedFilesHandlers.get(e);
    t != null &&
      (this.eventEmitter.removeListener(`pasted-files`, t),
      this.pastedFilesHandlers.delete(e));
  }
  addPastedTextHandler(e) {
    if (this.pastedTextHandlers.has(e)) return;
    let t = (t) => {
      typeof t == `string` && e(t);
    };
    (this.pastedTextHandlers.set(e, t),
      this.eventEmitter.addListener(`pasted-text`, t));
  }
  removePastedTextHandler(e) {
    let t = this.pastedTextHandlers.get(e);
    t != null &&
      (this.eventEmitter.removeListener(`pasted-text`, t),
      this.pastedTextHandlers.delete(e));
  }
  setEnterBehavior(e) {
    this.updateEnterBehavior(e);
  }
  focus() {
    this.view.focus();
  }
  destroy() {
    this.view.destroy();
  }
};
function ol(e, t) {
  let n = e.doc.resolve(t);
  if (n.parentOffset < n.parent.content.size) {
    let e = n.parent.childAfter(n.parentOffset),
      r = e.node && e.node.isText ? e.node.text?.[0] : void 0;
    if (r && /\s/.test(r)) return t;
  }
  return (e.insertText(` `, t), t + 1);
}
function sl(e) {
  switch (e) {
    case `agent`:
      return nl.nodes.agentMention;
    case `app`:
      return nl.nodes.appMention;
    case `plugin`:
      return nl.nodes.pluginMention;
    case `skill`:
      return nl.nodes.skillMention;
  }
}
function cl({ nodeTypeName: e, path: t }) {
  return e === `agentMention`
    ? `agent`
    : e === `appMention`
      ? `app`
      : e === `pluginMention`
        ? `plugin`
        : te(t);
}
function ll(e, t) {
  let { view: n, eventEmitter: r, setEnterBehavior: i } = il(e ?? null, t);
  return new al(
    n,
    r,
    i,
    t?.restoreMarkdownLinksAsTextLinks ?? !1,
    t?.restorePathLinksAsFileMentions ?? !0,
  );
}
export {
  Ke as C,
  Ge as S,
  et as _,
  an as a,
  tt as b,
  qt as c,
  At as d,
  ft as f,
  $e as g,
  lt as h,
  hn as i,
  Vt as l,
  ct as m,
  Cn as n,
  tn as o,
  st as p,
  xn as r,
  $t as s,
  ll as t,
  Ft as u,
  X as v,
  Ye as w,
  nt as x,
  rt as y,
};
//# sourceMappingURL=composer-controller-dL4CgOni.js.map
