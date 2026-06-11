import { s as e } from "./chunk-Cq_f4orQ.js";
import { n as t } from "./jsx-runtime-DXKlqYIQ.js";
import { c as n, g as r, h as i, t as a } from "./app-scope-DbsKKT7R.js";
import { Hr as o, Rr as s, t as c } from "./persisted-signal-B5PZJR1E.js";
import {
  At as l,
  Ct as u,
  Dt as d,
  G as f,
  K as p,
  Q as m,
  Y as h,
  at as g,
  c as _,
  d as v,
  et as ee,
  h as y,
  l as b,
  n as x,
  nt as te,
  ot as ne,
  q as S,
  rt as re,
  st as C,
  t as w,
  u as T,
  vt as E,
  xt as ie,
} from "./single-value-vzkAmsUV.js";
import { r as D } from "./reduced-motion-preference-CuU2kiHa.js";
import { t as O } from "./route-scope-5oViaHuP.js";
var ae = (e, t, n) => {
  let r = t - e;
  return ((((n - e) % r) + r) % r) + e;
};
function k(e, t) {
  return E(e) ? e[ae(0, e.length, t)] : e;
}
var oe = class {
  constructor(e) {
    ((this.stop = () => this.runAll(`stop`)),
      (this.animations = e.filter(Boolean)));
  }
  get finished() {
    return Promise.all(this.animations.map((e) => e.finished));
  }
  getAll(e) {
    return this.animations[0][e];
  }
  setAll(e, t) {
    for (let n = 0; n < this.animations.length; n++) this.animations[n][e] = t;
  }
  attachTimeline(e) {
    let t = this.animations.map((t) => t.attachTimeline(e));
    return () => {
      t.forEach((e, t) => {
        (e && e(), this.animations[t].stop());
      });
    };
  }
  get time() {
    return this.getAll(`time`);
  }
  set time(e) {
    this.setAll(`time`, e);
  }
  get speed() {
    return this.getAll(`speed`);
  }
  set speed(e) {
    this.setAll(`speed`, e);
  }
  get state() {
    return this.getAll(`state`);
  }
  get startTime() {
    return this.getAll(`startTime`);
  }
  get duration() {
    return se(this.animations, `duration`);
  }
  get iterationDuration() {
    return se(this.animations, `iterationDuration`);
  }
  runAll(e) {
    this.animations.forEach((t) => t[e]());
  }
  play() {
    this.runAll(`play`);
  }
  pause() {
    this.runAll(`pause`);
  }
  cancel() {
    this.runAll(`cancel`);
  }
  complete() {
    this.runAll(`complete`);
  }
};
function se(e, t) {
  let n = 0;
  for (let r = 0; r < e.length; r++) {
    let i = e[r][t];
    i !== null && i > n && (n = i);
  }
  return n;
}
var ce = class extends oe {
  then(e, t) {
    return this.finished.finally(e).then(() => {});
  }
};
function A(e) {
  return typeof e == `object` && !Array.isArray(e);
}
function le(e, t, n, r) {
  return typeof e == `string` && A(t)
    ? m(e, n, r)
    : e instanceof NodeList
      ? Array.from(e)
      : Array.isArray(e)
        ? e
        : [e];
}
function ue(e, t, n) {
  return e * (t + 1);
}
function j(e, t, n, r) {
  return typeof t == `number`
    ? t
    : t.startsWith(`-`) || t.startsWith(`+`)
      ? Math.max(0, e + parseFloat(t))
      : t === `<`
        ? n
        : t.startsWith(`<`)
          ? Math.max(0, n + parseFloat(t.slice(1)))
          : (r.get(t) ?? e);
}
function de(e, t, n) {
  for (let r = 0; r < e.length; r++) {
    let i = e[r];
    i.at > t && i.at < n && (l(e, i), r--);
  }
}
function fe(e, t, n, r, i, a) {
  de(e, i, a);
  for (let o = 0; o < t.length; o++)
    e.push({ value: t[o], at: C(i, a, r[o]), easing: k(n, o) });
}
function pe(e, t) {
  for (let n = 0; n < e.length; n++) e[n] = e[n] / (t + 1);
}
function me(e, t) {
  return e.at === t.at
    ? e.value === null
      ? 1
      : t.value === null
        ? -1
        : 0
    : e.at - t.at;
}
var he = `easeInOut`,
  ge = 20;
function _e(e, { defaultTransition: t = {}, ...n } = {}, r, i) {
  let a = t.duration || 0.3,
    o = new Map(),
    s = new Map(),
    c = {},
    l = new Map(),
    p = 0,
    m = 0,
    h = 0;
  for (let n = 0; n < e.length; n++) {
    let o = e[n];
    if (typeof o == `string`) {
      l.set(o, m);
      continue;
    } else if (!Array.isArray(o)) {
      l.set(o.name, j(m, o.at, p, l));
      continue;
    }
    let [u, g, _ = {}] = o;
    _.at !== void 0 && (m = j(m, _.at, p, l));
    let v = 0,
      y = (e, n, r, o = 0, s = 0) => {
        let c = ye(e),
          {
            delay: l = 0,
            times: u = te(c),
            type: f = `keyframes`,
            repeat: p,
            repeatType: g,
            repeatDelay: _ = 0,
            ...y
          } = n,
          { ease: b = t.ease || `easeOut`, duration: x } = n,
          S = typeof l == `function` ? l(o, s) : l,
          C = c.length,
          w = ee(f) ? f : i?.[f || `keyframes`];
        if (C <= 2 && w) {
          let e = 100;
          if (C === 2 && Se(c)) {
            let t = c[1] - c[0];
            e = Math.abs(t);
          }
          let t = { ...y };
          x !== void 0 && (t.duration = ie(x));
          let n = ne(t, e, w);
          ((b = n.ease), (x = n.duration));
        }
        x ??= a;
        let T = m + S;
        u.length === 1 && u[0] === 0 && (u[1] = 1);
        let E = u.length - c.length;
        if ((E > 0 && re(u, E), c.length === 1 && c.unshift(null), p)) {
          (d(
            p < ge,
            `Repeat count too high, must be less than 20`,
            `repeat-count-high`,
          ),
            (x = ue(x, p)));
          let e = [...c],
            t = [...u];
          b = Array.isArray(b) ? [...b] : [b];
          let n = [...b];
          for (let r = 0; r < p; r++) {
            c.push(...e);
            for (let i = 0; i < e.length; i++)
              (u.push(t[i] + (r + 1)),
                b.push(i === 0 ? `linear` : k(n, i - 1)));
          }
          pe(u, p);
        }
        let D = T + x;
        (fe(r, c, b, u, T, D), (v = Math.max(S + x, v)), (h = Math.max(D, h)));
      };
    if (f(u)) {
      let e = M(u, s);
      y(g, _, ve(`default`, e));
    } else {
      let e = le(u, g, r, c),
        t = e.length;
      for (let n = 0; n < t; n++) {
        ((g = g), (_ = _));
        let r = e[n],
          i = M(r, s);
        for (let e in g) y(g[e], be(_, e), ve(e, i), n, t);
      }
    }
    ((p = m), (m += v));
  }
  return (
    s.forEach((e, r) => {
      for (let i in e) {
        let a = e[i];
        a.sort(me);
        let s = [],
          c = [],
          l = [];
        for (let e = 0; e < a.length; e++) {
          let { at: t, value: n, easing: r } = a[e];
          (s.push(n), c.push(u(0, h, t)), l.push(r || `easeOut`));
        }
        (c[0] !== 0 && (c.unshift(0), s.unshift(s[0]), l.unshift(he)),
          c[c.length - 1] !== 1 && (c.push(1), s.push(null)),
          o.has(r) || o.set(r, { keyframes: {}, transition: {} }));
        let d = o.get(r);
        ((d.keyframes[i] = s),
          (d.transition[i] = { ...t, duration: h, ease: l, times: c, ...n }));
      }
    }),
    o
  );
}
function M(e, t) {
  return (!t.has(e) && t.set(e, {}), t.get(e));
}
function ve(e, t) {
  return (t[e] || (t[e] = []), t[e]);
}
function ye(e) {
  return Array.isArray(e) ? e : [e];
}
function be(e, t) {
  return e && e[t] ? { ...e, ...e[t] } : { ...e };
}
var xe = (e) => typeof e == `number`,
  Se = (e) => e.every(xe);
function Ce(e, t) {
  return e in t;
}
var we = class extends T {
  constructor() {
    (super(...arguments), (this.type = `object`));
  }
  readValueFromInstance(e, t) {
    if (Ce(t, e)) {
      let n = e[t];
      if (typeof n == `string` || typeof n == `number`) return n;
    }
  }
  getBaseTargetFromProps() {}
  removeValueFromRenderState(e, t) {
    delete t.output[e];
  }
  measureInstanceViewportBox() {
    return y();
  }
  build(e, t) {
    Object.assign(e.output, t);
  }
  renderInstance(e, { output: t }) {
    Object.assign(e, t);
  }
  sortInstanceNodePosition() {
    return 0;
  }
};
function Te(e) {
  let t = {
      presenceContext: null,
      props: {},
      visualState: {
        renderState: {
          transform: {},
          transformOrigin: {},
          style: {},
          vars: {},
          attrs: {},
        },
        latestValues: {},
      },
    },
    n = S(e) && !p(e) ? new _(t) : new b(t);
  (n.mount(e), v.set(e, n));
}
function Ee(e) {
  let t = new we({
    presenceContext: null,
    props: {},
    visualState: { renderState: { output: {} }, latestValues: {} },
  });
  (t.mount(e), v.set(e, t));
}
function De(e, t) {
  return f(e) || typeof e == `number` || (typeof e == `string` && !A(t));
}
function Oe(e, t, n, r) {
  let i = [];
  if (De(e, t)) i.push(w(e, (A(t) && t.default) || t, n && (n.default || n)));
  else {
    let a = le(e, t, r),
      o = a.length;
    d(!!o, `No valid elements provided.`, `no-valid-elements`);
    for (let e = 0; e < o; e++) {
      let r = a[e];
      d(
        r !== null,
        `You're trying to perform an animation on null. Ensure that selectors are correctly finding elements and refs are correctly hydrated.`,
        `animate-null`,
      );
      let s = r instanceof Element ? Te : Ee;
      v.has(r) || s(r);
      let c = v.get(r),
        l = { ...n };
      (`delay` in l &&
        typeof l.delay == `function` &&
        (l.delay = l.delay(e, o)),
        i.push(...x(c, { ...t, transition: l }, {})));
    }
  }
  return i;
}
function ke(e, t, n) {
  let r = [];
  return (
    _e(e, t, n, { spring: g }).forEach(({ keyframes: e, transition: t }, n) => {
      r.push(...Oe(n, e, t));
    }),
    r
  );
}
function Ae(e) {
  return Array.isArray(e) && e.some(Array.isArray);
}
function je(e) {
  function t(t, n, r) {
    let i = [],
      a;
    if (Ae(t)) i = ke(t, n, e);
    else {
      let { onComplete: o, ...s } = r || {};
      (typeof o == `function` && (a = o), (i = Oe(t, n, s, e)));
    }
    let o = new ce(i);
    return (
      a && o.finished.then(a),
      e &&
        (e.animations.push(o),
        o.finished.then(() => {
          l(e.animations, o);
        })),
      o
    );
  }
  return t;
}
var N = je(),
  Me = `app-shell:right-panel-width:v2`,
  Ne = 352;
function Pe(e) {
  return `${Me}:${e}`;
}
function Fe(e, t, n = `regular`) {
  let r = Number.isFinite(e) ? e : 600,
    i = ze(t, n);
  return Math.max(Math.min(320, i), Math.min(r, i));
}
function Ie({
  defaultWidth: e,
  mainContentWidth: t,
  storageKey: n,
  widthMode: r,
}) {
  let i = s(n, null);
  return i == null || !Number.isFinite(i)
    ? P(e, t, r)
    : i <= 1
      ? F(i)
      : P(i, t, r);
}
function Le({ mainContentWidth: e, storageKey: t, width: n, widthMode: r }) {
  o(t, P(n, e, r));
}
function P(e, t, n = `regular`) {
  let r = Be(t, n),
    i = r.maximum - r.minimum;
  return i === 0 ? 0 : F((Fe(e, t, n) - r.minimum) / i);
}
function Re(e, t, n = `regular`) {
  let r = Be(t, n);
  return Fe(r.minimum + F(e) * (r.maximum - r.minimum), t, n);
}
function ze(e, t) {
  return t === `full` ? Math.max(320, e) : Math.max(320, e - Ne);
}
function Be(e, t) {
  let n = ze(e, t);
  return { maximum: n, minimum: Math.min(320, n) };
}
function F(e) {
  return Math.max(0, Math.min(1, e));
}
var Ve = e(t(), 1),
  I = { type: `spring`, duration: 0.5, bounce: 0.1 },
  He = 0.5;
function Ue(e) {
  return e * He;
}
function We({
  isRightPanelOpen: e,
  mainContentWidth: t,
  rightPanelWidthMode: n,
  rightPanelWidthRatio: r,
}) {
  return e ? Math.max(0, t - Re(r, t, n)) : t;
}
var L = (0, Ve.createContext)(null);
function Ge() {
  let e = (0, Ve.useContext)(L);
  if (e == null) throw Error(`AppShellLayoutMotionContext is missing`);
  return e;
}
var Ke = `main`,
  qe = i(O, null),
  Je = i(O, null),
  Ye = i(O, null),
  Xe = i(O, null),
  Ze = i(O, null),
  R = i(O, !1),
  Qe = i(O, null),
  z = i(O, null),
  $e = n(
    O,
    ({ get: e, scope: t }) =>
      e(z) ?? { defaultWidth: 600, storageKey: Pe(t.value.routeTemplate) },
  ),
  et = i(O, null),
  tt = i(O, null),
  nt = i(O, null),
  rt = i(O, null),
  it = i(O, null),
  at = i(O, `default`),
  B = i(O, `main`),
  ot = i(O, Ke),
  V = i(O, !1),
  H = i(O, null);
function st(e, t) {
  e.get(B) !== t && e.set(B, t);
}
function ct(e, t) {
  e.get(V) !== t && e.set(V, t);
}
function lt(e, t) {
  e.get(H) !== t && e.set(H, t);
}
function U() {
  let e = i(O, []),
    t = r(O, (e) => null);
  return {
    entries$: n(O, ({ get: n }) =>
      n(e)
        .map((e) => ({ action: n(t, e), actionId: e }))
        .filter((e) => e.action != null)
        .sort((e, t) => e.action.order - t.action.order)
        .map(({ action: e, actionId: t }) => ({
          align: e.align,
          actionId: t,
          node: e.node,
          order: e.order,
        })),
    ),
    byId: t,
    ids$: e,
  };
}
function ut() {
  let e = i(O, []),
    t = r(O, (e) => null);
  return {
    byId: t,
    entries$: n(O, ({ get: n }) =>
      n(e).flatMap((e) => {
        let r = n(t, e);
        return r == null ? [] : [r];
      }),
    ),
    ids$: e,
  };
}
var dt = U(),
  ft = U(),
  pt = U(),
  mt = ut(),
  ht = dt.entries$,
  gt = ft.entries$,
  _t = pt.entries$,
  vt = mt.entries$,
  yt = { center: dt, left: ft, right: pt },
  bt = 520,
  xt = `sidebar-width`;
function St() {
  return W(s(xt, 300));
}
function Ct(e) {
  o(xt, W(e));
}
function W(e) {
  return Number.isFinite(e) ? Math.min(Math.max(e, 240), bt) : 300;
}
var wt = `app-shell-bottom-panel-launcher-visible`,
  Tt = 100,
  G = i(a, window.__ELECTRON_SHIM__.initialSidebarState),
  K = i(a, !1),
  q = i(a, !1),
  J = i(a, !1),
  Et = i(a, !1),
  Y = i(a, 0),
  Dt = i(a, !1, {
    onMount: (e, t) => {
      let n = null,
        r = () => {
          n != null && (window.clearTimeout(n), (n = null));
        },
        i = t.watch(({ get: t }) => {
          if (t(G) || !t(K)) {
            (r(), e(!1));
            return;
          }
          n ??= window.setTimeout(() => {
            ((n = null), e(!0));
          }, Tt);
        });
      return () => {
        (r(), i());
      };
    },
  }),
  Ot = i(a, () => new h(window.__ELECTRON_SHIM__.initialSidebarState)),
  kt = i(a, St),
  At = c(wt, !0),
  jt = i(O, !1),
  Mt = i(O, () => new h(0)),
  Nt = i(O, !1),
  Pt = i(O, () => new h(0)),
  X = i(O, !1),
  Z = i(O, !1),
  Ft = i(a, !0),
  It = i(a, !1),
  Lt = i(a, () => new h(0)),
  Rt = i(a, 250);
function zt(e, t, n = {}) {
  let r = e.get(Ot),
    i = t ? 1 : 0,
    a = !t && n.suppressHoverOpen !== !1;
  if (e.get(G) === t && r.get() === i) {
    (e.set(K, !1), e.set(q, a), e.set(J, !1));
    return;
  }
  let o = n.animate !== !1 && !e.get(D),
    s = e.get(Y) + 1;
  if (
    (e.set(Y, s),
    e.set(K, !1),
    e.set(q, a),
    e.set(J, o),
    e.set(G, t),
    r.stop(),
    !o)
  ) {
    r.set(i);
    return;
  }
  let c = N(r, i, I),
    l = () => {
      e.get(Y) === s && e.set(J, !1);
    };
  c.then(l, l);
}
function Bt(e, t) {
  e.set(At, t);
}
function Vt() {
  s(`app-shell-bottom-panel-launcher-visible`, void 0) ?? o(wt, !1);
}
function Ht(e, t) {
  (e.set(jt, t), $(e.get(Mt), t, e.get(D)));
}
function Q(e, t, n = {}) {
  e.set(Nt, t);
  let r = e.get(Pt);
  if ((r.stop(), $(r, t, e.get(D)), t)) {
    e.get(Z) && (e.set(R, !0), e.set(Z, !1));
    return;
  }
  (e.set(X, !1),
    e.set(Z, n.restoreFullWidthOnNextOpen === !0 && e.get(R)),
    e.set(R, !1));
}
function Ut(e, t) {
  if (t) {
    (e.set(X, !0), Q(e, !0));
    return;
  }
  Q(e, !1);
}
function Wt(e, t, n = {}) {
  (e.set(It, t), Gt(e.get(Lt), t, e.get(D), n));
}
function Gt(e, t, n, r) {
  if ((e.stop(), r.animate === !1 || n)) {
    e.set(t ? 1 : 0);
    return;
  }
  N(e, t ? 1 : 0, I);
}
function $(e, t, n) {
  let r = t ? 1 : 0;
  if (n) {
    e.set(r);
    return;
  }
  N(e, r, I);
}
export {
  z as $,
  B as A,
  mt as B,
  zt as C,
  W as D,
  St as E,
  nt as F,
  at as G,
  gt as H,
  rt as I,
  Je as J,
  qe as K,
  it as L,
  V as M,
  et as N,
  Ct as O,
  tt as P,
  $e as Q,
  yt as R,
  Ut as S,
  Ft as T,
  _t as U,
  vt as V,
  R as W,
  Ye as X,
  Xe as Y,
  Ze as Z,
  Rt as _,
  Nt as a,
  We as at,
  Ht as b,
  Ot as c,
  Pe as ct,
  Et as d,
  P as dt,
  st as et,
  K as f,
  Le as ft,
  It as g,
  Lt as h,
  Pt as i,
  L as it,
  H as j,
  ot as k,
  q as l,
  Ie as lt,
  Dt as m,
  At as n,
  ct as nt,
  X as o,
  Ue as ot,
  kt as p,
  N as pt,
  Qe as q,
  jt as r,
  I as rt,
  J as s,
  Ge as st,
  Mt as t,
  lt as tt,
  G as u,
  Re as ut,
  Vt as v,
  Wt as w,
  Q as x,
  Bt as y,
  ht as z,
};
//# sourceMappingURL=app-shell-state-CttrqqGQ.js.map
