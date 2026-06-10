import { s as g } from "./chunk-Bj-mKKzh.js";
import { Gn as e, Qn as t } from "./apps-Au-fp4y1.js";
import { n as _, t as n } from "./jsx-runtime-Bj4hVTj7.js";
import { t as r } from "./clsx-Duxel1Jl.js";
import {
  J as i,
  S as a,
  V as o,
  pt as s,
  y as c,
} from "./vscode-api-DH_DWhkY.js";
import { t as l } from "./badge-0UPLZdLW.js";
var u = s(),
  v = g(_());
function d() {
  let n = (0, u.c)(3),
    r = o(a),
    i,
    s;
  (n[0] === r
    ? ((i = n[1]), (s = n[2]))
    : ((i = () => {
        t(r, !r.get(e));
      }),
      (s = [r]),
      (n[0] = r),
      (n[1] = i),
      (n[2] = s)),
    c(`toggle-sidebar`, i, s),
    v.useEffect(() => {
      window.__ELECTRON_SHIM__.closeSidebar = () => {
        t(r, !1);
      };
    }, [r]));
}
var f = n();
function p(e) {
  let t = (0, u.c)(50),
    n,
    i,
    a,
    o,
    s,
    c,
    d,
    p,
    m,
    h,
    g,
    _,
    v,
    y;
  t[0] === e
    ? ((n = t[1]),
      (i = t[2]),
      (a = t[3]),
      (o = t[4]),
      (s = t[5]),
      (c = t[6]),
      (d = t[7]),
      (p = t[8]),
      (m = t[9]),
      (h = t[10]),
      (g = t[11]),
      (_ = t[12]),
      (v = t[13]),
      (y = t[14]))
    : (({
        icon: n,
        label: s,
        hideLabel: o,
        fullWidth: p,
        hoverBackground: m,
        onClick: c,
        isActive: h,
        disabled: g,
        className: a,
        weightClassName: y,
        iconClassName: _,
        trailing: v,
        badge: i,
        ...d
      } = e),
      (t[0] = e),
      (t[1] = n),
      (t[2] = i),
      (t[3] = a),
      (t[4] = o),
      (t[5] = s),
      (t[6] = c),
      (t[7] = d),
      (t[8] = p),
      (t[9] = m),
      (t[10] = h),
      (t[11] = g),
      (t[12] = _),
      (t[13] = v),
      (t[14] = y));
  let b = p === void 0 ? !0 : p,
    x = m === void 0 ? !0 : m,
    S = h === void 0 ? !1 : h,
    C = g === void 0 ? !1 : g,
    w = _ === void 0 ? `icon-xs` : _,
    T = typeof i == `number`,
    E = b ? `flex w-full` : `inline-flex w-auto`,
    D = S
      ? `bg-token-list-hover-background`
      : x && `hover:bg-token-list-hover-background`,
    O = T && `pr-10`,
    k;
  t[15] !== a || t[16] !== E || t[17] !== D || t[18] !== O || t[19] !== y
    ? ((k = r(
        `focus-visible:outline-token-border relative h-token-nav-row px-row-x py-row-y cursor-interaction shrink-0 items-center overflow-hidden rounded-lg text-left text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 gap-2`,
        E,
        D,
        O,
        y,
        a,
      )),
      (t[15] = a),
      (t[16] = E),
      (t[17] = D),
      (t[18] = O),
      (t[19] = y),
      (t[20] = k))
    : (k = t[20]);
  let A = S ? `page` : void 0,
    j = d,
    M = b && `flex-1`,
    N = o !== void 0 && `min-h-6`,
    P = S
      ? `text-token-list-active-selection-foreground`
      : `text-token-foreground`,
    F;
  t[21] !== M || t[22] !== N || t[23] !== P
    ? ((F = r(`flex min-w-0 items-center text-base gap-2`, M, N, P)),
      (t[21] = M),
      (t[22] = N),
      (t[23] = P),
      (t[24] = F))
    : (F = t[24]);
  let I = S && `text-token-list-active-selection-icon-foreground`,
    L;
  t[25] !== w || t[26] !== I
    ? ((L = r(w, I)), (t[25] = w), (t[26] = I), (t[27] = L))
    : (L = t[27]);
  let R;
  t[28] !== n || t[29] !== L
    ? ((R = (0, f.jsx)(n, { className: L })),
      (t[28] = n),
      (t[29] = L),
      (t[30] = R))
    : (R = t[30]);
  let z;
  t[31] !== o || t[32] !== s
    ? ((z = o
        ? null
        : (0, f.jsx)(`span`, { className: `truncate`, children: s })),
      (t[31] = o),
      (t[32] = s),
      (t[33] = z))
    : (z = t[33]);
  let B;
  t[34] !== F || t[35] !== R || t[36] !== z
    ? ((B = (0, f.jsxs)(`div`, { className: F, children: [R, z] })),
      (t[34] = F),
      (t[35] = R),
      (t[36] = z),
      (t[37] = B))
    : (B = t[37]);
  let V;
  t[38] !== i || t[39] !== T
    ? ((V = T
        ? (0, f.jsx)(l, {
            className: `disambiguated-digits absolute top-1/2 right-[var(--padding-row-x)] -translate-y-1/2`,
            children: i,
          })
        : null),
      (t[38] = i),
      (t[39] = T),
      (t[40] = V))
    : (V = t[40]);
  let H;
  return (
    t[41] !== C ||
    t[42] !== c ||
    t[43] !== A ||
    t[44] !== j ||
    t[45] !== B ||
    t[46] !== V ||
    t[47] !== k ||
    t[48] !== v
      ? ((H = (0, f.jsxs)(`button`, {
          type: `button`,
          className: k,
          onClick: c,
          "aria-current": A,
          disabled: C,
          ...j,
          children: [B, v, V],
        })),
        (t[41] = C),
        (t[42] = c),
        (t[43] = A),
        (t[44] = j),
        (t[45] = B),
        (t[46] = V),
        (t[47] = k),
        (t[48] = v),
        (t[49] = H))
      : (H = t[49]),
    H
  );
}
function m(e) {
  let t = (0, u.c)(13),
    {
      children: n,
      className: i,
      title: a,
      titleActions: o,
      titleRowClassName: s,
      titleClassName: c,
    } = e,
    l;
  t[0] === i
    ? (l = t[1])
    : ((l = r(`flex flex-col gap-1`, i)), (t[0] = i), (t[1] = l));
  let d;
  t[2] !== a || t[3] !== o || t[4] !== c || t[5] !== s
    ? ((d = a
        ? (0, f.jsxs)(`div`, {
            className: r(
              `flex items-center justify-between gap-2`,
              s ?? `pr-0.5 pl-2`,
            ),
            children: [
              (0, f.jsx)(`div`, {
                className: r(
                  `min-w-0 flex-1`,
                  c ??
                    `text-base text-token-input-placeholder-foreground opacity-75`,
                ),
                children: a,
              }),
              o == null
                ? null
                : (0, f.jsx)(`div`, { className: `shrink-0`, children: o }),
            ],
          })
        : null),
      (t[2] = a),
      (t[3] = o),
      (t[4] = c),
      (t[5] = s),
      (t[6] = d))
    : (d = t[6]);
  let p;
  t[7] === n
    ? (p = t[8])
    : ((p = (0, f.jsx)(`div`, {
        className: `flex flex-col gap-px`,
        children: n,
      })),
      (t[7] = n),
      (t[8] = p));
  let m;
  return (
    t[9] !== l || t[10] !== d || t[11] !== p
      ? ((m = (0, f.jsxs)(`div`, { className: l, children: [d, p] })),
        (t[9] = l),
        (t[10] = d),
        (t[11] = p),
        (t[12] = m))
      : (m = t[12]),
    m
  );
}
var h = i(a, null);
export { d as i, p as n, m as r, h as t };
//# sourceMappingURL=settings-back-route-C5YW47j2.js.map
