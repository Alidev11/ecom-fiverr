// window._ = require("lodash");
// window.axios = require("axios");
// window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
var ke = !1,
    je = !1,
    K = [],
    Be = -1;
function sn(e) {
    un(e);
}
function un(e) {
    K.includes(e) || K.push(e), cn();
}
function Lt(e) {
    let t = K.indexOf(e);
    t !== -1 && t > Be && K.splice(t, 1);
}
function cn() {
    !je && !ke && ((ke = !0), queueMicrotask(ln));
}
function ln() {
    (ke = !1), (je = !0);
    for (let e = 0; e < K.length; e++) K[e](), (Be = e);
    (K.length = 0), (Be = -1), (je = !1);
}
var J,
    Y,
    ce,
    $t,
    Ke = !0;
function fn(e) {
    (Ke = !1), e(), (Ke = !0);
}
function dn(e) {
    (J = e.reactive),
        (ce = e.release),
        (Y = (t) =>
            e.effect(t, {
                scheduler: (r) => {
                    Ke ? sn(r) : r();
                },
            })),
        ($t = e.raw);
}
function Et(e) {
    Y = e;
}
function pn(e) {
    let t = () => {};
    return [
        (n) => {
            let a = Y(n);
            return (
                e._x_effects ||
                    ((e._x_effects = new Set()),
                    (e._x_runEffects = () => {
                        e._x_effects.forEach((i) => i());
                    })),
                e._x_effects.add(a),
                (t = () => {
                    a !== void 0 && (e._x_effects.delete(a), ce(a));
                }),
                a
            );
        },
        () => {
            t();
        },
    ];
}
var kt = [],
    jt = [],
    Bt = [];
function hn(e) {
    Bt.push(e);
}
function Kt(e, t) {
    typeof t == "function"
        ? (e._x_cleanups || (e._x_cleanups = []), e._x_cleanups.push(t))
        : ((t = e), jt.push(t));
}
function _n(e) {
    kt.push(e);
}
function vn(e, t, r) {
    e._x_attributeCleanups || (e._x_attributeCleanups = {}),
        e._x_attributeCleanups[t] || (e._x_attributeCleanups[t] = []),
        e._x_attributeCleanups[t].push(r);
}
function Ht(e, t) {
    e._x_attributeCleanups &&
        Object.entries(e._x_attributeCleanups).forEach(([r, n]) => {
            (t === void 0 || t.includes(r)) &&
                (n.forEach((a) => a()), delete e._x_attributeCleanups[r]);
        });
}
var tt = new MutationObserver(at),
    rt = !1;
function nt() {
    tt.observe(document, {
        subtree: !0,
        childList: !0,
        attributes: !0,
        attributeOldValue: !0,
    }),
        (rt = !0);
}
function qt() {
    gn(), tt.disconnect(), (rt = !1);
}
var ie = [],
    Pe = !1;
function gn() {
    (ie = ie.concat(tt.takeRecords())),
        ie.length &&
            !Pe &&
            ((Pe = !0),
            queueMicrotask(() => {
                bn(), (Pe = !1);
            }));
}
function bn() {
    at(ie), (ie.length = 0);
}
function S(e) {
    if (!rt) return e();
    qt();
    let t = e();
    return nt(), t;
}
var it = !1,
    ve = [];
function yn() {
    it = !0;
}
function mn() {
    (it = !1), at(ve), (ve = []);
}
function at(e) {
    if (it) {
        ve = ve.concat(e);
        return;
    }
    let t = [],
        r = [],
        n = new Map(),
        a = new Map();
    for (let i = 0; i < e.length; i++)
        if (
            !e[i].target._x_ignoreMutationObserver &&
            (e[i].type === "childList" &&
                (e[i].addedNodes.forEach((o) => o.nodeType === 1 && t.push(o)),
                e[i].removedNodes.forEach(
                    (o) => o.nodeType === 1 && r.push(o)
                )),
            e[i].type === "attributes")
        ) {
            let o = e[i].target,
                s = e[i].attributeName,
                u = e[i].oldValue,
                c = () => {
                    n.has(o) || n.set(o, []),
                        n.get(o).push({ name: s, value: o.getAttribute(s) });
                },
                f = () => {
                    a.has(o) || a.set(o, []), a.get(o).push(s);
                };
            o.hasAttribute(s) && u === null
                ? c()
                : o.hasAttribute(s)
                ? (f(), c())
                : f();
        }
    a.forEach((i, o) => {
        Ht(o, i);
    }),
        n.forEach((i, o) => {
            kt.forEach((s) => s(o, i));
        });
    for (let i of r)
        if (!t.includes(i) && (jt.forEach((o) => o(i)), i._x_cleanups))
            for (; i._x_cleanups.length; ) i._x_cleanups.pop()();
    t.forEach((i) => {
        (i._x_ignoreSelf = !0), (i._x_ignore = !0);
    });
    for (let i of t)
        r.includes(i) ||
            (i.isConnected &&
                (delete i._x_ignoreSelf,
                delete i._x_ignore,
                Bt.forEach((o) => o(i)),
                (i._x_ignore = !0),
                (i._x_ignoreSelf = !0)));
    t.forEach((i) => {
        delete i._x_ignoreSelf, delete i._x_ignore;
    }),
        (t = null),
        (r = null),
        (n = null),
        (a = null);
}
function zt(e) {
    return fe(V(e));
}
function le(e, t, r) {
    return (
        (e._x_dataStack = [t, ...V(r || e)]),
        () => {
            e._x_dataStack = e._x_dataStack.filter((n) => n !== t);
        }
    );
}
function V(e) {
    return e._x_dataStack
        ? e._x_dataStack
        : typeof ShadowRoot == "function" && e instanceof ShadowRoot
        ? V(e.host)
        : e.parentNode
        ? V(e.parentNode)
        : [];
}
function fe(e) {
    let t = new Proxy(
        {},
        {
            ownKeys: () =>
                Array.from(new Set(e.flatMap((r) => Object.keys(r)))),
            has: (r, n) => e.some((a) => a.hasOwnProperty(n)),
            get: (r, n) =>
                (e.find((a) => {
                    if (a.hasOwnProperty(n)) {
                        let i = Object.getOwnPropertyDescriptor(a, n);
                        if (
                            (i.get && i.get._x_alreadyBound) ||
                            (i.set && i.set._x_alreadyBound)
                        )
                            return !0;
                        if ((i.get || i.set) && i.enumerable) {
                            let o = i.get,
                                s = i.set,
                                u = i;
                            (o = o && o.bind(t)),
                                (s = s && s.bind(t)),
                                o && (o._x_alreadyBound = !0),
                                s && (s._x_alreadyBound = !0),
                                Object.defineProperty(a, n, {
                                    ...u,
                                    get: o,
                                    set: s,
                                });
                        }
                        return !0;
                    }
                    return !1;
                }) || {})[n],
            set: (r, n, a) => {
                let i = e.find((o) => o.hasOwnProperty(n));
                return i ? (i[n] = a) : (e[e.length - 1][n] = a), !0;
            },
        }
    );
    return t;
}
function Wt(e) {
    let t = (n) => typeof n == "object" && !Array.isArray(n) && n !== null,
        r = (n, a = "") => {
            Object.entries(Object.getOwnPropertyDescriptors(n)).forEach(
                ([i, { value: o, enumerable: s }]) => {
                    if (s === !1 || o === void 0) return;
                    let u = a === "" ? i : `${a}.${i}`;
                    typeof o == "object" && o !== null && o._x_interceptor
                        ? (n[i] = o.initialize(e, u, i))
                        : t(o) && o !== n && !(o instanceof Element) && r(o, u);
                }
            );
        };
    return r(e);
}
function Ut(e, t = () => {}) {
    let r = {
        initialValue: void 0,
        _x_interceptor: !0,
        initialize(n, a, i) {
            return e(
                this.initialValue,
                () => xn(n, a),
                (o) => He(n, a, o),
                a,
                i
            );
        },
    };
    return (
        t(r),
        (n) => {
            if (typeof n == "object" && n !== null && n._x_interceptor) {
                let a = r.initialize.bind(r);
                r.initialize = (i, o, s) => {
                    let u = n.initialize(i, o, s);
                    return (r.initialValue = u), a(i, o, s);
                };
            } else r.initialValue = n;
            return r;
        }
    );
}
function xn(e, t) {
    return t.split(".").reduce((r, n) => r[n], e);
}
function He(e, t, r) {
    if ((typeof t == "string" && (t = t.split(".")), t.length === 1))
        e[t[0]] = r;
    else {
        if (t.length === 0) throw error;
        return e[t[0]] || (e[t[0]] = {}), He(e[t[0]], t.slice(1), r);
    }
}
var Vt = {};
function M(e, t) {
    Vt[e] = t;
}
function qe(e, t) {
    return (
        Object.entries(Vt).forEach(([r, n]) => {
            let a = null;
            function i() {
                if (a) return a;
                {
                    let [o, s] = Zt(t);
                    return (a = { interceptor: Ut, ...o }), Kt(t, s), a;
                }
            }
            Object.defineProperty(e, `$${r}`, {
                get() {
                    return n(t, i());
                },
                enumerable: !1,
            });
        }),
        e
    );
}
function wn(e, t, r, ...n) {
    try {
        return r(...n);
    } catch (a) {
        se(a, e, t);
    }
}
function se(e, t, r = void 0) {
    Object.assign(e, { el: t, expression: r }),
        console.warn(
            `Alpine Expression Error: ${e.message}

${
    r
        ? 'Expression: "' +
          r +
          `"

`
        : ""
}`,
            t
        ),
        setTimeout(() => {
            throw e;
        }, 0);
}
var _e = !0;
function Gt(e) {
    let t = _e;
    _e = !1;
    let r = e();
    return (_e = t), r;
}
function H(e, t, r = {}) {
    let n;
    return T(e, t)((a) => (n = a), r), n;
}
function T(...e) {
    return Jt(...e);
}
var Jt = Yt;
function En(e) {
    Jt = e;
}
function Yt(e, t) {
    let r = {};
    qe(r, e);
    let n = [r, ...V(e)],
        a = typeof t == "function" ? Sn(n, t) : On(n, t, e);
    return wn.bind(null, e, t, a);
}
function Sn(e, t) {
    return (r = () => {}, { scope: n = {}, params: a = [] } = {}) => {
        let i = t.apply(fe([n, ...e]), a);
        ge(r, i);
    };
}
var Re = {};
function An(e, t) {
    if (Re[e]) return Re[e];
    let r = Object.getPrototypeOf(async function () {}).constructor,
        n =
            /^[\n\s]*if.*\(.*\)/.test(e) || /^(let|const)\s/.test(e)
                ? `(async()=>{ ${e} })()`
                : e,
        i = (() => {
            try {
                return new r(
                    ["__self", "scope"],
                    `with (scope) { __self.result = ${n} }; __self.finished = true; return __self.result;`
                );
            } catch (o) {
                return se(o, t, e), Promise.resolve();
            }
        })();
    return (Re[e] = i), i;
}
function On(e, t, r) {
    let n = An(t, r);
    return (a = () => {}, { scope: i = {}, params: o = [] } = {}) => {
        (n.result = void 0), (n.finished = !1);
        let s = fe([i, ...e]);
        if (typeof n == "function") {
            let u = n(n, s).catch((c) => se(c, r, t));
            n.finished
                ? (ge(a, n.result, s, o, r), (n.result = void 0))
                : u
                      .then((c) => {
                          ge(a, c, s, o, r);
                      })
                      .catch((c) => se(c, r, t))
                      .finally(() => (n.result = void 0));
        }
    };
}
function ge(e, t, r, n, a) {
    if (_e && typeof t == "function") {
        let i = t.apply(r, n);
        i instanceof Promise
            ? i.then((o) => ge(e, o, r, n)).catch((o) => se(o, a, t))
            : e(i);
    } else
        typeof t == "object" && t instanceof Promise
            ? t.then((i) => e(i))
            : e(t);
}
var ot = "x-";
function X(e = "") {
    return ot + e;
}
function Cn(e) {
    ot = e;
}
var ze = {};
function w(e, t) {
    return (
        (ze[e] = t),
        {
            before(r) {
                if (!ze[r]) {
                    console.warn(
                        "Cannot find directive `${directive}`. `${name}` will use the default order of execution"
                    );
                    return;
                }
                const n = B.indexOf(r);
                B.splice(n >= 0 ? n : B.indexOf("DEFAULT"), 0, e);
            },
        }
    );
}
function st(e, t, r) {
    if (((t = Array.from(t)), e._x_virtualDirectives)) {
        let i = Object.entries(e._x_virtualDirectives).map(([s, u]) => ({
                name: s,
                value: u,
            })),
            o = Xt(i);
        (i = i.map((s) =>
            o.find((u) => u.name === s.name)
                ? { name: `x-bind:${s.name}`, value: `"${s.value}"` }
                : s
        )),
            (t = t.concat(i));
    }
    let n = {};
    return t
        .map(rr((i, o) => (n[i] = o)))
        .filter(ir)
        .map(Nn(n, r))
        .sort(Mn)
        .map((i) => Fn(e, i));
}
function Xt(e) {
    return Array.from(e)
        .map(rr())
        .filter((t) => !ir(t));
}
var We = !1,
    ne = new Map(),
    Qt = Symbol();
function Tn(e) {
    We = !0;
    let t = Symbol();
    (Qt = t), ne.set(t, []);
    let r = () => {
            for (; ne.get(t).length; ) ne.get(t).shift()();
            ne.delete(t);
        },
        n = () => {
            (We = !1), r();
        };
    e(r), n();
}
function Zt(e) {
    let t = [],
        r = (s) => t.push(s),
        [n, a] = pn(e);
    return (
        t.push(a),
        [
            {
                Alpine: pe,
                effect: n,
                cleanup: r,
                evaluateLater: T.bind(T, e),
                evaluate: H.bind(H, e),
            },
            () => t.forEach((s) => s()),
        ]
    );
}
function Fn(e, t) {
    let r = () => {},
        n = ze[t.type] || r,
        [a, i] = Zt(e);
    vn(e, t.original, i);
    let o = () => {
        e._x_ignore ||
            e._x_ignoreSelf ||
            (n.inline && n.inline(e, t, a),
            (n = n.bind(n, e, t, a)),
            We ? ne.get(Qt).push(n) : n());
    };
    return (o.runCleanups = i), o;
}
var er =
        (e, t) =>
        ({ name: r, value: n }) => (
            r.startsWith(e) && (r = r.replace(e, t)), { name: r, value: n }
        ),
    tr = (e) => e;
function rr(e = () => {}) {
    return ({ name: t, value: r }) => {
        let { name: n, value: a } = nr.reduce((i, o) => o(i), {
            name: t,
            value: r,
        });
        return n !== t && e(n, t), { name: n, value: a };
    };
}
var nr = [];
function ut(e) {
    nr.push(e);
}
function ir({ name: e }) {
    return ar().test(e);
}
var ar = () => new RegExp(`^${ot}([^:^.]+)\\b`);
function Nn(e, t) {
    return ({ name: r, value: n }) => {
        let a = r.match(ar()),
            i = r.match(/:([a-zA-Z0-9\-:]+)/),
            o = r.match(/\.[^.\]]+(?=[^\]]*$)/g) || [],
            s = t || e[r] || r;
        return {
            type: a ? a[1] : null,
            value: i ? i[1] : null,
            modifiers: o.map((u) => u.replace(".", "")),
            expression: n,
            original: s,
        };
    };
}
var Ue = "DEFAULT",
    B = [
        "ignore",
        "ref",
        "data",
        "id",
        "bind",
        "init",
        "for",
        "model",
        "modelable",
        "transition",
        "show",
        "if",
        Ue,
        "teleport",
    ];
function Mn(e, t) {
    let r = B.indexOf(e.type) === -1 ? Ue : e.type,
        n = B.indexOf(t.type) === -1 ? Ue : t.type;
    return B.indexOf(r) - B.indexOf(n);
}
function ae(e, t, r = {}) {
    e.dispatchEvent(
        new CustomEvent(t, {
            detail: r,
            bubbles: !0,
            composed: !0,
            cancelable: !0,
        })
    );
}
function D(e, t) {
    if (typeof ShadowRoot == "function" && e instanceof ShadowRoot) {
        Array.from(e.children).forEach((a) => D(a, t));
        return;
    }
    let r = !1;
    if ((t(e, () => (r = !0)), r)) return;
    let n = e.firstElementChild;
    for (; n; ) D(n, t), (n = n.nextElementSibling);
}
function L(e, ...t) {
    console.warn(`Alpine Warning: ${e}`, ...t);
}
var St = !1;
function In() {
    St &&
        L(
            "Alpine has already been initialized on this page. Calling Alpine.start() more than once can cause problems."
        ),
        (St = !0),
        document.body ||
            L(
                "Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?"
            ),
        ae(document, "alpine:init"),
        ae(document, "alpine:initializing"),
        nt(),
        hn((t) => $(t, D)),
        Kt((t) => dr(t)),
        _n((t, r) => {
            st(t, r).forEach((n) => n());
        });
    let e = (t) => !xe(t.parentElement, !0);
    Array.from(document.querySelectorAll(ur()))
        .filter(e)
        .forEach((t) => {
            $(t);
        }),
        ae(document, "alpine:initialized");
}
var ct = [],
    or = [];
function sr() {
    return ct.map((e) => e());
}
function ur() {
    return ct.concat(or).map((e) => e());
}
function cr(e) {
    ct.push(e);
}
function lr(e) {
    or.push(e);
}
function xe(e, t = !1) {
    return we(e, (r) => {
        if ((t ? ur() : sr()).some((a) => r.matches(a))) return !0;
    });
}
function we(e, t) {
    if (e) {
        if (t(e)) return e;
        if ((e._x_teleportBack && (e = e._x_teleportBack), !!e.parentElement))
            return we(e.parentElement, t);
    }
}
function Pn(e) {
    return sr().some((t) => e.matches(t));
}
var fr = [];
function Rn(e) {
    fr.push(e);
}
function $(e, t = D, r = () => {}) {
    Tn(() => {
        t(e, (n, a) => {
            r(n, a),
                fr.forEach((i) => i(n, a)),
                st(n, n.attributes).forEach((i) => i()),
                n._x_ignore && a();
        });
    });
}
function dr(e) {
    D(e, (t) => Ht(t));
}
var Ve = [],
    lt = !1;
function ft(e = () => {}) {
    return (
        queueMicrotask(() => {
            lt ||
                setTimeout(() => {
                    Ge();
                });
        }),
        new Promise((t) => {
            Ve.push(() => {
                e(), t();
            });
        })
    );
}
function Ge() {
    for (lt = !1; Ve.length; ) Ve.shift()();
}
function Dn() {
    lt = !0;
}
function dt(e, t) {
    return Array.isArray(t)
        ? At(e, t.join(" "))
        : typeof t == "object" && t !== null
        ? Ln(e, t)
        : typeof t == "function"
        ? dt(e, t())
        : At(e, t);
}
function At(e, t) {
    let r = (a) =>
            a
                .split(" ")
                .filter((i) => !e.classList.contains(i))
                .filter(Boolean),
        n = (a) => (
            e.classList.add(...a),
            () => {
                e.classList.remove(...a);
            }
        );
    return (t = t === !0 ? (t = "") : t || ""), n(r(t));
}
function Ln(e, t) {
    let r = (s) => s.split(" ").filter(Boolean),
        n = Object.entries(t)
            .flatMap(([s, u]) => (u ? r(s) : !1))
            .filter(Boolean),
        a = Object.entries(t)
            .flatMap(([s, u]) => (u ? !1 : r(s)))
            .filter(Boolean),
        i = [],
        o = [];
    return (
        a.forEach((s) => {
            e.classList.contains(s) && (e.classList.remove(s), o.push(s));
        }),
        n.forEach((s) => {
            e.classList.contains(s) || (e.classList.add(s), i.push(s));
        }),
        () => {
            o.forEach((s) => e.classList.add(s)),
                i.forEach((s) => e.classList.remove(s));
        }
    );
}
function Ee(e, t) {
    return typeof t == "object" && t !== null ? $n(e, t) : kn(e, t);
}
function $n(e, t) {
    let r = {};
    return (
        Object.entries(t).forEach(([n, a]) => {
            (r[n] = e.style[n]),
                n.startsWith("--") || (n = jn(n)),
                e.style.setProperty(n, a);
        }),
        setTimeout(() => {
            e.style.length === 0 && e.removeAttribute("style");
        }),
        () => {
            Ee(e, r);
        }
    );
}
function kn(e, t) {
    let r = e.getAttribute("style", t);
    return (
        e.setAttribute("style", t),
        () => {
            e.setAttribute("style", r || "");
        }
    );
}
function jn(e) {
    return e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
function Je(e, t = () => {}) {
    let r = !1;
    return function () {
        r ? t.apply(this, arguments) : ((r = !0), e.apply(this, arguments));
    };
}
w(
    "transition",
    (e, { value: t, modifiers: r, expression: n }, { evaluate: a }) => {
        typeof n == "function" && (n = a(n)),
            n !== !1 &&
                (!n || typeof n == "boolean" ? Kn(e, r, t) : Bn(e, n, t));
    }
);
function Bn(e, t, r) {
    pr(e, dt, ""),
        {
            enter: (a) => {
                e._x_transition.enter.during = a;
            },
            "enter-start": (a) => {
                e._x_transition.enter.start = a;
            },
            "enter-end": (a) => {
                e._x_transition.enter.end = a;
            },
            leave: (a) => {
                e._x_transition.leave.during = a;
            },
            "leave-start": (a) => {
                e._x_transition.leave.start = a;
            },
            "leave-end": (a) => {
                e._x_transition.leave.end = a;
            },
        }[r](t);
}
function Kn(e, t, r) {
    pr(e, Ee);
    let n = !t.includes("in") && !t.includes("out") && !r,
        a = n || t.includes("in") || ["enter"].includes(r),
        i = n || t.includes("out") || ["leave"].includes(r);
    t.includes("in") && !n && (t = t.filter((v, x) => x < t.indexOf("out"))),
        t.includes("out") &&
            !n &&
            (t = t.filter((v, x) => x > t.indexOf("out")));
    let o = !t.includes("opacity") && !t.includes("scale"),
        s = o || t.includes("opacity"),
        u = o || t.includes("scale"),
        c = s ? 0 : 1,
        f = u ? ee(t, "scale", 95) / 100 : 1,
        _ = ee(t, "delay", 0) / 1e3,
        h = ee(t, "origin", "center"),
        y = "opacity, transform",
        A = ee(t, "duration", 150) / 1e3,
        F = ee(t, "duration", 75) / 1e3,
        d = "cubic-bezier(0.4, 0.0, 0.2, 1)";
    a &&
        ((e._x_transition.enter.during = {
            transformOrigin: h,
            transitionDelay: `${_}s`,
            transitionProperty: y,
            transitionDuration: `${A}s`,
            transitionTimingFunction: d,
        }),
        (e._x_transition.enter.start = {
            opacity: c,
            transform: `scale(${f})`,
        }),
        (e._x_transition.enter.end = { opacity: 1, transform: "scale(1)" })),
        i &&
            ((e._x_transition.leave.during = {
                transformOrigin: h,
                transitionDelay: `${_}s`,
                transitionProperty: y,
                transitionDuration: `${F}s`,
                transitionTimingFunction: d,
            }),
            (e._x_transition.leave.start = {
                opacity: 1,
                transform: "scale(1)",
            }),
            (e._x_transition.leave.end = {
                opacity: c,
                transform: `scale(${f})`,
            }));
}
function pr(e, t, r = {}) {
    e._x_transition ||
        (e._x_transition = {
            enter: { during: r, start: r, end: r },
            leave: { during: r, start: r, end: r },
            in(n = () => {}, a = () => {}) {
                Ye(
                    e,
                    t,
                    {
                        during: this.enter.during,
                        start: this.enter.start,
                        end: this.enter.end,
                    },
                    n,
                    a
                );
            },
            out(n = () => {}, a = () => {}) {
                Ye(
                    e,
                    t,
                    {
                        during: this.leave.during,
                        start: this.leave.start,
                        end: this.leave.end,
                    },
                    n,
                    a
                );
            },
        });
}
window.Element.prototype._x_toggleAndCascadeWithTransitions = function (
    e,
    t,
    r,
    n
) {
    const a =
        document.visibilityState === "visible"
            ? requestAnimationFrame
            : setTimeout;
    let i = () => a(r);
    if (t) {
        e._x_transition && (e._x_transition.enter || e._x_transition.leave)
            ? e._x_transition.enter &&
              (Object.entries(e._x_transition.enter.during).length ||
                  Object.entries(e._x_transition.enter.start).length ||
                  Object.entries(e._x_transition.enter.end).length)
                ? e._x_transition.in(r)
                : i()
            : e._x_transition
            ? e._x_transition.in(r)
            : i();
        return;
    }
    (e._x_hidePromise = e._x_transition
        ? new Promise((o, s) => {
              e._x_transition.out(
                  () => {},
                  () => o(n)
              ),
                  e._x_transitioning.beforeCancel(() =>
                      s({ isFromCancelledTransition: !0 })
                  );
          })
        : Promise.resolve(n)),
        queueMicrotask(() => {
            let o = hr(e);
            o
                ? (o._x_hideChildren || (o._x_hideChildren = []),
                  o._x_hideChildren.push(e))
                : a(() => {
                      let s = (u) => {
                          let c = Promise.all([
                              u._x_hidePromise,
                              ...(u._x_hideChildren || []).map(s),
                          ]).then(([f]) => f());
                          return (
                              delete u._x_hidePromise,
                              delete u._x_hideChildren,
                              c
                          );
                      };
                      s(e).catch((u) => {
                          if (!u.isFromCancelledTransition) throw u;
                      });
                  });
        });
};
function hr(e) {
    let t = e.parentNode;
    if (t) return t._x_hidePromise ? t : hr(t);
}
function Ye(
    e,
    t,
    { during: r, start: n, end: a } = {},
    i = () => {},
    o = () => {}
) {
    if (
        (e._x_transitioning && e._x_transitioning.cancel(),
        Object.keys(r).length === 0 &&
            Object.keys(n).length === 0 &&
            Object.keys(a).length === 0)
    ) {
        i(), o();
        return;
    }
    let s, u, c;
    Hn(e, {
        start() {
            s = t(e, n);
        },
        during() {
            u = t(e, r);
        },
        before: i,
        end() {
            s(), (c = t(e, a));
        },
        after: o,
        cleanup() {
            u(), c();
        },
    });
}
function Hn(e, t) {
    let r,
        n,
        a,
        i = Je(() => {
            S(() => {
                (r = !0),
                    n || t.before(),
                    a || (t.end(), Ge()),
                    t.after(),
                    e.isConnected && t.cleanup(),
                    delete e._x_transitioning;
            });
        });
    (e._x_transitioning = {
        beforeCancels: [],
        beforeCancel(o) {
            this.beforeCancels.push(o);
        },
        cancel: Je(function () {
            for (; this.beforeCancels.length; ) this.beforeCancels.shift()();
            i();
        }),
        finish: i,
    }),
        S(() => {
            t.start(), t.during();
        }),
        Dn(),
        requestAnimationFrame(() => {
            if (r) return;
            let o =
                    Number(
                        getComputedStyle(e)
                            .transitionDuration.replace(/,.*/, "")
                            .replace("s", "")
                    ) * 1e3,
                s =
                    Number(
                        getComputedStyle(e)
                            .transitionDelay.replace(/,.*/, "")
                            .replace("s", "")
                    ) * 1e3;
            o === 0 &&
                (o =
                    Number(
                        getComputedStyle(e).animationDuration.replace("s", "")
                    ) * 1e3),
                S(() => {
                    t.before();
                }),
                (n = !0),
                requestAnimationFrame(() => {
                    r ||
                        (S(() => {
                            t.end();
                        }),
                        Ge(),
                        setTimeout(e._x_transitioning.finish, o + s),
                        (a = !0));
                });
        });
}
function ee(e, t, r) {
    if (e.indexOf(t) === -1) return r;
    const n = e[e.indexOf(t) + 1];
    if (!n || (t === "scale" && isNaN(n))) return r;
    if (t === "duration" || t === "delay") {
        let a = n.match(/([0-9]+)ms/);
        if (a) return a[1];
    }
    return t === "origin" &&
        ["top", "right", "left", "center", "bottom"].includes(
            e[e.indexOf(t) + 2]
        )
        ? [n, e[e.indexOf(t) + 2]].join(" ")
        : n;
}
var ue = !1;
function de(e, t = () => {}) {
    return (...r) => (ue ? t(...r) : e(...r));
}
function qn(e) {
    return (...t) => ue && e(...t);
}
function zn(e, t) {
    t._x_dataStack || (t._x_dataStack = e._x_dataStack),
        (ue = !0),
        Un(() => {
            Wn(t);
        }),
        (ue = !1);
}
function Wn(e) {
    let t = !1;
    $(e, (n, a) => {
        D(n, (i, o) => {
            if (t && Pn(i)) return o();
            (t = !0), a(i, o);
        });
    });
}
function Un(e) {
    let t = Y;
    Et((r, n) => {
        let a = t(r);
        return ce(a), () => {};
    }),
        e(),
        Et(t);
}
function _r(e, t, r, n = []) {
    switch (
        (e._x_bindings || (e._x_bindings = J({})),
        (e._x_bindings[t] = r),
        (t = n.includes("camel") ? ei(t) : t),
        t)
    ) {
        case "value":
            Vn(e, r);
            break;
        case "style":
            Jn(e, r);
            break;
        case "class":
            Gn(e, r);
            break;
        case "selected":
        case "checked":
            Yn(e, t, r);
            break;
        default:
            vr(e, t, r);
            break;
    }
}
function Vn(e, t) {
    if (e.type === "radio")
        e.attributes.value === void 0 && (e.value = t),
            window.fromModel && (e.checked = Ot(e.value, t));
    else if (e.type === "checkbox")
        Number.isInteger(t)
            ? (e.value = t)
            : !Number.isInteger(t) &&
              !Array.isArray(t) &&
              typeof t != "boolean" &&
              ![null, void 0].includes(t)
            ? (e.value = String(t))
            : Array.isArray(t)
            ? (e.checked = t.some((r) => Ot(r, e.value)))
            : (e.checked = !!t);
    else if (e.tagName === "SELECT") Zn(e, t);
    else {
        if (e.value === t) return;
        e.value = t;
    }
}
function Gn(e, t) {
    e._x_undoAddedClasses && e._x_undoAddedClasses(),
        (e._x_undoAddedClasses = dt(e, t));
}
function Jn(e, t) {
    e._x_undoAddedStyles && e._x_undoAddedStyles(),
        (e._x_undoAddedStyles = Ee(e, t));
}
function Yn(e, t, r) {
    vr(e, t, r), Qn(e, t, r);
}
function vr(e, t, r) {
    [null, void 0, !1].includes(r) && ti(t)
        ? e.removeAttribute(t)
        : (gr(t) && (r = t), Xn(e, t, r));
}
function Xn(e, t, r) {
    e.getAttribute(t) != r && e.setAttribute(t, r);
}
function Qn(e, t, r) {
    e[t] !== r && (e[t] = r);
}
function Zn(e, t) {
    const r = [].concat(t).map((n) => n + "");
    Array.from(e.options).forEach((n) => {
        n.selected = r.includes(n.value);
    });
}
function ei(e) {
    return e.toLowerCase().replace(/-(\w)/g, (t, r) => r.toUpperCase());
}
function Ot(e, t) {
    return e == t;
}
function gr(e) {
    return [
        "disabled",
        "checked",
        "required",
        "readonly",
        "hidden",
        "open",
        "selected",
        "autofocus",
        "itemscope",
        "multiple",
        "novalidate",
        "allowfullscreen",
        "allowpaymentrequest",
        "formnovalidate",
        "autoplay",
        "controls",
        "loop",
        "muted",
        "playsinline",
        "default",
        "ismap",
        "reversed",
        "async",
        "defer",
        "nomodule",
    ].includes(e);
}
function ti(e) {
    return ![
        "aria-pressed",
        "aria-checked",
        "aria-expanded",
        "aria-selected",
    ].includes(e);
}
function ri(e, t, r) {
    return e._x_bindings && e._x_bindings[t] !== void 0
        ? e._x_bindings[t]
        : br(e, t, r);
}
function ni(e, t, r, n = !0) {
    if (e._x_bindings && e._x_bindings[t] !== void 0) return e._x_bindings[t];
    if (e._x_inlineBindings && e._x_inlineBindings[t] !== void 0) {
        let a = e._x_inlineBindings[t];
        return (a.extract = n), Gt(() => H(e, a.expression));
    }
    return br(e, t, r);
}
function br(e, t, r) {
    let n = e.getAttribute(t);
    return n === null
        ? typeof r == "function"
            ? r()
            : r
        : n === ""
        ? !0
        : gr(t)
        ? !![t, "true"].includes(n)
        : n;
}
function yr(e, t) {
    var r;
    return function () {
        var n = this,
            a = arguments,
            i = function () {
                (r = null), e.apply(n, a);
            };
        clearTimeout(r), (r = setTimeout(i, t));
    };
}
function mr(e, t) {
    let r;
    return function () {
        let n = this,
            a = arguments;
        r || (e.apply(n, a), (r = !0), setTimeout(() => (r = !1), t));
    };
}
function ii(e) {
    (Array.isArray(e) ? e : [e]).forEach((r) => r(pe));
}
var j = {},
    Ct = !1;
function ai(e, t) {
    if ((Ct || ((j = J(j)), (Ct = !0)), t === void 0)) return j[e];
    (j[e] = t),
        typeof t == "object" &&
            t !== null &&
            t.hasOwnProperty("init") &&
            typeof t.init == "function" &&
            j[e].init(),
        Wt(j[e]);
}
function oi() {
    return j;
}
var xr = {};
function si(e, t) {
    let r = typeof t != "function" ? () => t : t;
    e instanceof Element ? wr(e, r()) : (xr[e] = r);
}
function ui(e) {
    return (
        Object.entries(xr).forEach(([t, r]) => {
            Object.defineProperty(e, t, {
                get() {
                    return (...n) => r(...n);
                },
            });
        }),
        e
    );
}
function wr(e, t, r) {
    let n = [];
    for (; n.length; ) n.pop()();
    let a = Object.entries(t).map(([o, s]) => ({ name: o, value: s })),
        i = Xt(a);
    (a = a.map((o) =>
        i.find((s) => s.name === o.name)
            ? { name: `x-bind:${o.name}`, value: `"${o.value}"` }
            : o
    )),
        st(e, a, r).map((o) => {
            n.push(o.runCleanups), o();
        });
}
var Er = {};
function ci(e, t) {
    Er[e] = t;
}
function li(e, t) {
    return (
        Object.entries(Er).forEach(([r, n]) => {
            Object.defineProperty(e, r, {
                get() {
                    return (...a) => n.bind(t)(...a);
                },
                enumerable: !1,
            });
        }),
        e
    );
}
var fi = {
        get reactive() {
            return J;
        },
        get release() {
            return ce;
        },
        get effect() {
            return Y;
        },
        get raw() {
            return $t;
        },
        version: "3.12.3",
        flushAndStopDeferringMutations: mn,
        dontAutoEvaluateFunctions: Gt,
        disableEffectScheduling: fn,
        startObservingMutations: nt,
        stopObservingMutations: qt,
        setReactivityEngine: dn,
        closestDataStack: V,
        skipDuringClone: de,
        onlyDuringClone: qn,
        addRootSelector: cr,
        addInitSelector: lr,
        addScopeToNode: le,
        deferMutations: yn,
        mapAttributes: ut,
        evaluateLater: T,
        interceptInit: Rn,
        setEvaluator: En,
        mergeProxies: fe,
        extractProp: ni,
        findClosest: we,
        closestRoot: xe,
        destroyTree: dr,
        interceptor: Ut,
        transition: Ye,
        setStyles: Ee,
        mutateDom: S,
        directive: w,
        throttle: mr,
        debounce: yr,
        evaluate: H,
        initTree: $,
        nextTick: ft,
        prefixed: X,
        prefix: Cn,
        plugin: ii,
        magic: M,
        store: ai,
        start: In,
        clone: zn,
        bound: ri,
        $data: zt,
        walk: D,
        data: ci,
        bind: si,
    },
    pe = fi;
function di(e, t) {
    const r = Object.create(null),
        n = e.split(",");
    for (let a = 0; a < n.length; a++) r[n[a]] = !0;
    return t ? (a) => !!r[a.toLowerCase()] : (a) => !!r[a];
}
var pi = Object.freeze({}),
    Sr = Object.assign,
    hi = Object.prototype.hasOwnProperty,
    Se = (e, t) => hi.call(e, t),
    q = Array.isArray,
    oe = (e) => Ar(e) === "[object Map]",
    _i = (e) => typeof e == "string",
    pt = (e) => typeof e == "symbol",
    Ae = (e) => e !== null && typeof e == "object",
    vi = Object.prototype.toString,
    Ar = (e) => vi.call(e),
    Or = (e) => Ar(e).slice(8, -1),
    ht = (e) =>
        _i(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
    gi = (e) => {
        const t = Object.create(null);
        return (r) => t[r] || (t[r] = e(r));
    },
    bi = gi((e) => e.charAt(0).toUpperCase() + e.slice(1)),
    Cr = (e, t) => e !== t && (e === e || t === t),
    Xe = new WeakMap(),
    te = [],
    P,
    z = Symbol("iterate"),
    Qe = Symbol("Map key iterate");
function yi(e) {
    return e && e._isEffect === !0;
}
function mi(e, t = pi) {
    yi(e) && (e = e.raw);
    const r = Ei(e, t);
    return t.lazy || r(), r;
}
function xi(e) {
    e.active &&
        (Tr(e), e.options.onStop && e.options.onStop(), (e.active = !1));
}
var wi = 0;
function Ei(e, t) {
    const r = function () {
        if (!r.active) return e();
        if (!te.includes(r)) {
            Tr(r);
            try {
                return Ai(), te.push(r), (P = r), e();
            } finally {
                te.pop(), Fr(), (P = te[te.length - 1]);
            }
        }
    };
    return (
        (r.id = wi++),
        (r.allowRecurse = !!t.allowRecurse),
        (r._isEffect = !0),
        (r.active = !0),
        (r.raw = e),
        (r.deps = []),
        (r.options = t),
        r
    );
}
function Tr(e) {
    const { deps: t } = e;
    if (t.length) {
        for (let r = 0; r < t.length; r++) t[r].delete(e);
        t.length = 0;
    }
}
var G = !0,
    _t = [];
function Si() {
    _t.push(G), (G = !1);
}
function Ai() {
    _t.push(G), (G = !0);
}
function Fr() {
    const e = _t.pop();
    G = e === void 0 ? !0 : e;
}
function N(e, t, r) {
    if (!G || P === void 0) return;
    let n = Xe.get(e);
    n || Xe.set(e, (n = new Map()));
    let a = n.get(r);
    a || n.set(r, (a = new Set())),
        a.has(P) ||
            (a.add(P),
            P.deps.push(a),
            P.options.onTrack &&
                P.options.onTrack({ effect: P, target: e, type: t, key: r }));
}
function k(e, t, r, n, a, i) {
    const o = Xe.get(e);
    if (!o) return;
    const s = new Set(),
        u = (f) => {
            f &&
                f.forEach((_) => {
                    (_ !== P || _.allowRecurse) && s.add(_);
                });
        };
    if (t === "clear") o.forEach(u);
    else if (r === "length" && q(e))
        o.forEach((f, _) => {
            (_ === "length" || _ >= n) && u(f);
        });
    else
        switch ((r !== void 0 && u(o.get(r)), t)) {
            case "add":
                q(e)
                    ? ht(r) && u(o.get("length"))
                    : (u(o.get(z)), oe(e) && u(o.get(Qe)));
                break;
            case "delete":
                q(e) || (u(o.get(z)), oe(e) && u(o.get(Qe)));
                break;
            case "set":
                oe(e) && u(o.get(z));
                break;
        }
    const c = (f) => {
        f.options.onTrigger &&
            f.options.onTrigger({
                effect: f,
                target: e,
                key: r,
                type: t,
                newValue: n,
                oldValue: a,
                oldTarget: i,
            }),
            f.options.scheduler ? f.options.scheduler(f) : f();
    };
    s.forEach(c);
}
var Oi = di("__proto__,__v_isRef,__isVue"),
    Nr = new Set(
        Object.getOwnPropertyNames(Symbol)
            .map((e) => Symbol[e])
            .filter(pt)
    ),
    Ci = Oe(),
    Ti = Oe(!1, !0),
    Fi = Oe(!0),
    Ni = Oe(!0, !0),
    be = {};
["includes", "indexOf", "lastIndexOf"].forEach((e) => {
    const t = Array.prototype[e];
    be[e] = function (...r) {
        const n = m(this);
        for (let i = 0, o = this.length; i < o; i++) N(n, "get", i + "");
        const a = t.apply(n, r);
        return a === -1 || a === !1 ? t.apply(n, r.map(m)) : a;
    };
});
["push", "pop", "shift", "unshift", "splice"].forEach((e) => {
    const t = Array.prototype[e];
    be[e] = function (...r) {
        Si();
        const n = t.apply(this, r);
        return Fr(), n;
    };
});
function Oe(e = !1, t = !1) {
    return function (n, a, i) {
        if (a === "__v_isReactive") return !e;
        if (a === "__v_isReadonly") return e;
        if (a === "__v_raw" && i === (e ? (t ? Bi : Wr) : t ? ji : zr).get(n))
            return n;
        const o = q(n);
        if (!e && o && Se(be, a)) return Reflect.get(be, a, i);
        const s = Reflect.get(n, a, i);
        return (pt(a) ? Nr.has(a) : Oi(a)) || (e || N(n, "get", a), t)
            ? s
            : Ze(s)
            ? !o || !ht(a)
                ? s.value
                : s
            : Ae(s)
            ? e
                ? Ur(s)
                : yt(s)
            : s;
    };
}
var Mi = Mr(),
    Ii = Mr(!0);
function Mr(e = !1) {
    return function (r, n, a, i) {
        let o = r[n];
        if (!e && ((a = m(a)), (o = m(o)), !q(r) && Ze(o) && !Ze(a)))
            return (o.value = a), !0;
        const s = q(r) && ht(n) ? Number(n) < r.length : Se(r, n),
            u = Reflect.set(r, n, a, i);
        return (
            r === m(i) &&
                (s ? Cr(a, o) && k(r, "set", n, a, o) : k(r, "add", n, a)),
            u
        );
    };
}
function Pi(e, t) {
    const r = Se(e, t),
        n = e[t],
        a = Reflect.deleteProperty(e, t);
    return a && r && k(e, "delete", t, void 0, n), a;
}
function Ri(e, t) {
    const r = Reflect.has(e, t);
    return (!pt(t) || !Nr.has(t)) && N(e, "has", t), r;
}
function Di(e) {
    return N(e, "iterate", q(e) ? "length" : z), Reflect.ownKeys(e);
}
var Ir = { get: Ci, set: Mi, deleteProperty: Pi, has: Ri, ownKeys: Di },
    Pr = {
        get: Fi,
        set(e, t) {
            return (
                console.warn(
                    `Set operation on key "${String(
                        t
                    )}" failed: target is readonly.`,
                    e
                ),
                !0
            );
        },
        deleteProperty(e, t) {
            return (
                console.warn(
                    `Delete operation on key "${String(
                        t
                    )}" failed: target is readonly.`,
                    e
                ),
                !0
            );
        },
    };
Sr({}, Ir, { get: Ti, set: Ii });
Sr({}, Pr, { get: Ni });
var vt = (e) => (Ae(e) ? yt(e) : e),
    gt = (e) => (Ae(e) ? Ur(e) : e),
    bt = (e) => e,
    Ce = (e) => Reflect.getPrototypeOf(e);
function Te(e, t, r = !1, n = !1) {
    e = e.__v_raw;
    const a = m(e),
        i = m(t);
    t !== i && !r && N(a, "get", t), !r && N(a, "get", i);
    const { has: o } = Ce(a),
        s = n ? bt : r ? gt : vt;
    if (o.call(a, t)) return s(e.get(t));
    if (o.call(a, i)) return s(e.get(i));
    e !== a && e.get(t);
}
function Fe(e, t = !1) {
    const r = this.__v_raw,
        n = m(r),
        a = m(e);
    return (
        e !== a && !t && N(n, "has", e),
        !t && N(n, "has", a),
        e === a ? r.has(e) : r.has(e) || r.has(a)
    );
}
function Ne(e, t = !1) {
    return (
        (e = e.__v_raw), !t && N(m(e), "iterate", z), Reflect.get(e, "size", e)
    );
}
function Rr(e) {
    e = m(e);
    const t = m(this);
    return Ce(t).has.call(t, e) || (t.add(e), k(t, "add", e, e)), this;
}
function Dr(e, t) {
    t = m(t);
    const r = m(this),
        { has: n, get: a } = Ce(r);
    let i = n.call(r, e);
    i ? qr(r, n, e) : ((e = m(e)), (i = n.call(r, e)));
    const o = a.call(r, e);
    return (
        r.set(e, t),
        i ? Cr(t, o) && k(r, "set", e, t, o) : k(r, "add", e, t),
        this
    );
}
function Lr(e) {
    const t = m(this),
        { has: r, get: n } = Ce(t);
    let a = r.call(t, e);
    a ? qr(t, r, e) : ((e = m(e)), (a = r.call(t, e)));
    const i = n ? n.call(t, e) : void 0,
        o = t.delete(e);
    return a && k(t, "delete", e, void 0, i), o;
}
function $r() {
    const e = m(this),
        t = e.size !== 0,
        r = oe(e) ? new Map(e) : new Set(e),
        n = e.clear();
    return t && k(e, "clear", void 0, void 0, r), n;
}
function Me(e, t) {
    return function (n, a) {
        const i = this,
            o = i.__v_raw,
            s = m(o),
            u = t ? bt : e ? gt : vt;
        return (
            !e && N(s, "iterate", z),
            o.forEach((c, f) => n.call(a, u(c), u(f), i))
        );
    };
}
function he(e, t, r) {
    return function (...n) {
        const a = this.__v_raw,
            i = m(a),
            o = oe(i),
            s = e === "entries" || (e === Symbol.iterator && o),
            u = e === "keys" && o,
            c = a[e](...n),
            f = r ? bt : t ? gt : vt;
        return (
            !t && N(i, "iterate", u ? Qe : z),
            {
                next() {
                    const { value: _, done: h } = c.next();
                    return h
                        ? { value: _, done: h }
                        : { value: s ? [f(_[0]), f(_[1])] : f(_), done: h };
                },
                [Symbol.iterator]() {
                    return this;
                },
            }
        );
    };
}
function R(e) {
    return function (...t) {
        {
            const r = t[0] ? `on key "${t[0]}" ` : "";
            console.warn(
                `${bi(e)} operation ${r}failed: target is readonly.`,
                m(this)
            );
        }
        return e === "delete" ? !1 : this;
    };
}
var kr = {
        get(e) {
            return Te(this, e);
        },
        get size() {
            return Ne(this);
        },
        has: Fe,
        add: Rr,
        set: Dr,
        delete: Lr,
        clear: $r,
        forEach: Me(!1, !1),
    },
    jr = {
        get(e) {
            return Te(this, e, !1, !0);
        },
        get size() {
            return Ne(this);
        },
        has: Fe,
        add: Rr,
        set: Dr,
        delete: Lr,
        clear: $r,
        forEach: Me(!1, !0),
    },
    Br = {
        get(e) {
            return Te(this, e, !0);
        },
        get size() {
            return Ne(this, !0);
        },
        has(e) {
            return Fe.call(this, e, !0);
        },
        add: R("add"),
        set: R("set"),
        delete: R("delete"),
        clear: R("clear"),
        forEach: Me(!0, !1),
    },
    Kr = {
        get(e) {
            return Te(this, e, !0, !0);
        },
        get size() {
            return Ne(this, !0);
        },
        has(e) {
            return Fe.call(this, e, !0);
        },
        add: R("add"),
        set: R("set"),
        delete: R("delete"),
        clear: R("clear"),
        forEach: Me(!0, !0),
    },
    Li = ["keys", "values", "entries", Symbol.iterator];
Li.forEach((e) => {
    (kr[e] = he(e, !1, !1)),
        (Br[e] = he(e, !0, !1)),
        (jr[e] = he(e, !1, !0)),
        (Kr[e] = he(e, !0, !0));
});
function Hr(e, t) {
    const r = t ? (e ? Kr : jr) : e ? Br : kr;
    return (n, a, i) =>
        a === "__v_isReactive"
            ? !e
            : a === "__v_isReadonly"
            ? e
            : a === "__v_raw"
            ? n
            : Reflect.get(Se(r, a) && a in n ? r : n, a, i);
}
var $i = { get: Hr(!1, !1) },
    ki = { get: Hr(!0, !1) };
function qr(e, t, r) {
    const n = m(r);
    if (n !== r && t.call(e, n)) {
        const a = Or(e);
        console.warn(
            `Reactive ${a} contains both the raw and reactive versions of the same object${
                a === "Map" ? " as keys" : ""
            }, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
        );
    }
}
var zr = new WeakMap(),
    ji = new WeakMap(),
    Wr = new WeakMap(),
    Bi = new WeakMap();
function Ki(e) {
    switch (e) {
        case "Object":
        case "Array":
            return 1;
        case "Map":
        case "Set":
        case "WeakMap":
        case "WeakSet":
            return 2;
        default:
            return 0;
    }
}
function Hi(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : Ki(Or(e));
}
function yt(e) {
    return e && e.__v_isReadonly ? e : Vr(e, !1, Ir, $i, zr);
}
function Ur(e) {
    return Vr(e, !0, Pr, ki, Wr);
}
function Vr(e, t, r, n, a) {
    if (!Ae(e))
        return console.warn(`value cannot be made reactive: ${String(e)}`), e;
    if (e.__v_raw && !(t && e.__v_isReactive)) return e;
    const i = a.get(e);
    if (i) return i;
    const o = Hi(e);
    if (o === 0) return e;
    const s = new Proxy(e, o === 2 ? n : r);
    return a.set(e, s), s;
}
function m(e) {
    return (e && m(e.__v_raw)) || e;
}
function Ze(e) {
    return !!(e && e.__v_isRef === !0);
}
M("nextTick", () => ft);
M("dispatch", (e) => ae.bind(ae, e));
M("watch", (e, { evaluateLater: t, effect: r }) => (n, a) => {
    let i = t(n),
        o = !0,
        s,
        u = r(() =>
            i((c) => {
                JSON.stringify(c),
                    o
                        ? (s = c)
                        : queueMicrotask(() => {
                              a(c, s), (s = c);
                          }),
                    (o = !1);
            })
        );
    e._x_effects.delete(u);
});
M("store", oi);
M("data", (e) => zt(e));
M("root", (e) => xe(e));
M(
    "refs",
    (e) => (e._x_refs_proxy || (e._x_refs_proxy = fe(qi(e))), e._x_refs_proxy)
);
function qi(e) {
    let t = [],
        r = e;
    for (; r; ) r._x_refs && t.push(r._x_refs), (r = r.parentNode);
    return t;
}
var De = {};
function Gr(e) {
    return De[e] || (De[e] = 0), ++De[e];
}
function zi(e, t) {
    return we(e, (r) => {
        if (r._x_ids && r._x_ids[t]) return !0;
    });
}
function Wi(e, t) {
    e._x_ids || (e._x_ids = {}), e._x_ids[t] || (e._x_ids[t] = Gr(t));
}
M("id", (e) => (t, r = null) => {
    let n = zi(e, t),
        a = n ? n._x_ids[t] : Gr(t);
    return r ? `${t}-${a}-${r}` : `${t}-${a}`;
});
M("el", (e) => e);
Jr("Focus", "focus", "focus");
Jr("Persist", "persist", "persist");
function Jr(e, t, r) {
    M(t, (n) =>
        L(
            `You can't use [$${directiveName}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${r}`,
            n
        )
    );
}
function Ui({ get: e, set: t }, { get: r, set: n }) {
    let a = !0,
        i,
        o,
        s = Y(() => {
            let u, c;
            a
                ? ((u = e()), n(u), (c = r()), (a = !1))
                : ((u = e()),
                  (c = r()),
                  (o = JSON.stringify(u)),
                  JSON.stringify(c),
                  o !== i ? ((c = r()), n(u), (c = u)) : (t(c), (u = c))),
                (i = JSON.stringify(u)),
                JSON.stringify(c);
        });
    return () => {
        ce(s);
    };
}
w(
    "modelable",
    (e, { expression: t }, { effect: r, evaluateLater: n, cleanup: a }) => {
        let i = n(t),
            o = () => {
                let f;
                return i((_) => (f = _)), f;
            },
            s = n(`${t} = __placeholder`),
            u = (f) => s(() => {}, { scope: { __placeholder: f } }),
            c = o();
        u(c),
            queueMicrotask(() => {
                if (!e._x_model) return;
                e._x_removeModelListeners.default();
                let f = e._x_model.get,
                    _ = e._x_model.set,
                    h = Ui(
                        {
                            get() {
                                return f();
                            },
                            set(y) {
                                _(y);
                            },
                        },
                        {
                            get() {
                                return o();
                            },
                            set(y) {
                                u(y);
                            },
                        }
                    );
                a(h);
            });
    }
);
var Vi = document.createElement("div");
w("teleport", (e, { modifiers: t, expression: r }, { cleanup: n }) => {
    e.tagName.toLowerCase() !== "template" &&
        L("x-teleport can only be used on a <template> tag", e);
    let a = de(
        () => document.querySelector(r),
        () => Vi
    )();
    a || L(`Cannot find x-teleport element for selector: "${r}"`);
    let i = e.content.cloneNode(!0).firstElementChild;
    (e._x_teleport = i),
        (i._x_teleportBack = e),
        e._x_forwardEvents &&
            e._x_forwardEvents.forEach((o) => {
                i.addEventListener(o, (s) => {
                    s.stopPropagation(),
                        e.dispatchEvent(new s.constructor(s.type, s));
                });
            }),
        le(i, {}, e),
        S(() => {
            t.includes("prepend")
                ? a.parentNode.insertBefore(i, a)
                : t.includes("append")
                ? a.parentNode.insertBefore(i, a.nextSibling)
                : a.appendChild(i),
                $(i),
                (i._x_ignore = !0);
        }),
        n(() => i.remove());
});
var Yr = () => {};
Yr.inline = (e, { modifiers: t }, { cleanup: r }) => {
    t.includes("self") ? (e._x_ignoreSelf = !0) : (e._x_ignore = !0),
        r(() => {
            t.includes("self") ? delete e._x_ignoreSelf : delete e._x_ignore;
        });
};
w("ignore", Yr);
w("effect", (e, { expression: t }, { effect: r }) => r(T(e, t)));
function et(e, t, r, n) {
    let a = e,
        i = (u) => n(u),
        o = {},
        s = (u, c) => (f) => c(u, f);
    if (
        (r.includes("dot") && (t = Gi(t)),
        r.includes("camel") && (t = Ji(t)),
        r.includes("passive") && (o.passive = !0),
        r.includes("capture") && (o.capture = !0),
        r.includes("window") && (a = window),
        r.includes("document") && (a = document),
        r.includes("debounce"))
    ) {
        let u = r[r.indexOf("debounce") + 1] || "invalid-wait",
            c = ye(u.split("ms")[0]) ? Number(u.split("ms")[0]) : 250;
        i = yr(i, c);
    }
    if (r.includes("throttle")) {
        let u = r[r.indexOf("throttle") + 1] || "invalid-wait",
            c = ye(u.split("ms")[0]) ? Number(u.split("ms")[0]) : 250;
        i = mr(i, c);
    }
    return (
        r.includes("prevent") &&
            (i = s(i, (u, c) => {
                c.preventDefault(), u(c);
            })),
        r.includes("stop") &&
            (i = s(i, (u, c) => {
                c.stopPropagation(), u(c);
            })),
        r.includes("self") &&
            (i = s(i, (u, c) => {
                c.target === e && u(c);
            })),
        (r.includes("away") || r.includes("outside")) &&
            ((a = document),
            (i = s(i, (u, c) => {
                e.contains(c.target) ||
                    (c.target.isConnected !== !1 &&
                        ((e.offsetWidth < 1 && e.offsetHeight < 1) ||
                            (e._x_isShown !== !1 && u(c))));
            }))),
        r.includes("once") &&
            (i = s(i, (u, c) => {
                u(c), a.removeEventListener(t, i, o);
            })),
        (i = s(i, (u, c) => {
            (Xi(t) && Qi(c, r)) || u(c);
        })),
        a.addEventListener(t, i, o),
        () => {
            a.removeEventListener(t, i, o);
        }
    );
}
function Gi(e) {
    return e.replace(/-/g, ".");
}
function Ji(e) {
    return e.toLowerCase().replace(/-(\w)/g, (t, r) => r.toUpperCase());
}
function ye(e) {
    return !Array.isArray(e) && !isNaN(e);
}
function Yi(e) {
    return [" ", "_"].includes(e)
        ? e
        : e
              .replace(/([a-z])([A-Z])/g, "$1-$2")
              .replace(/[_\s]/, "-")
              .toLowerCase();
}
function Xi(e) {
    return ["keydown", "keyup"].includes(e);
}
function Qi(e, t) {
    let r = t.filter(
        (i) =>
            ![
                "window",
                "document",
                "prevent",
                "stop",
                "once",
                "capture",
            ].includes(i)
    );
    if (r.includes("debounce")) {
        let i = r.indexOf("debounce");
        r.splice(i, ye((r[i + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
    }
    if (r.includes("throttle")) {
        let i = r.indexOf("throttle");
        r.splice(i, ye((r[i + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
    }
    if (r.length === 0 || (r.length === 1 && Tt(e.key).includes(r[0])))
        return !1;
    const a = ["ctrl", "shift", "alt", "meta", "cmd", "super"].filter((i) =>
        r.includes(i)
    );
    return (
        (r = r.filter((i) => !a.includes(i))),
        !(
            a.length > 0 &&
            a.filter(
                (o) => (
                    (o === "cmd" || o === "super") && (o = "meta"), e[`${o}Key`]
                )
            ).length === a.length &&
            Tt(e.key).includes(r[0])
        )
    );
}
function Tt(e) {
    if (!e) return [];
    e = Yi(e);
    let t = {
        ctrl: "control",
        slash: "/",
        space: " ",
        spacebar: " ",
        cmd: "meta",
        esc: "escape",
        up: "arrow-up",
        down: "arrow-down",
        left: "arrow-left",
        right: "arrow-right",
        period: ".",
        equal: "=",
        minus: "-",
        underscore: "_",
    };
    return (
        (t[e] = e),
        Object.keys(t)
            .map((r) => {
                if (t[r] === e) return r;
            })
            .filter((r) => r)
    );
}
w("model", (e, { modifiers: t, expression: r }, { effect: n, cleanup: a }) => {
    let i = e;
    t.includes("parent") && (i = e.parentNode);
    let o = T(i, r),
        s;
    typeof r == "string"
        ? (s = T(i, `${r} = __placeholder`))
        : typeof r == "function" && typeof r() == "string"
        ? (s = T(i, `${r()} = __placeholder`))
        : (s = () => {});
    let u = () => {
            let h;
            return o((y) => (h = y)), Ft(h) ? h.get() : h;
        },
        c = (h) => {
            let y;
            o((A) => (y = A)),
                Ft(y) ? y.set(h) : s(() => {}, { scope: { __placeholder: h } });
        };
    typeof r == "string" &&
        e.type === "radio" &&
        S(() => {
            e.hasAttribute("name") || e.setAttribute("name", r);
        });
    var f =
        e.tagName.toLowerCase() === "select" ||
        ["checkbox", "radio"].includes(e.type) ||
        t.includes("lazy")
            ? "change"
            : "input";
    let _ = ue
        ? () => {}
        : et(e, f, t, (h) => {
              c(Zi(e, t, h, u()));
          });
    if (
        (t.includes("fill") &&
            [null, ""].includes(u()) &&
            e.dispatchEvent(new Event(f, {})),
        e._x_removeModelListeners || (e._x_removeModelListeners = {}),
        (e._x_removeModelListeners.default = _),
        a(() => e._x_removeModelListeners.default()),
        e.form)
    ) {
        let h = et(e.form, "reset", [], (y) => {
            ft(() => e._x_model && e._x_model.set(e.value));
        });
        a(() => h());
    }
    (e._x_model = {
        get() {
            return u();
        },
        set(h) {
            c(h);
        },
    }),
        (e._x_forceModelUpdate = (h) => {
            (h = h === void 0 ? u() : h),
                h === void 0 &&
                    typeof r == "string" &&
                    r.match(/\./) &&
                    (h = ""),
                (window.fromModel = !0),
                S(() => _r(e, "value", h)),
                delete window.fromModel;
        }),
        n(() => {
            let h = u();
            (t.includes("unintrusive") &&
                document.activeElement.isSameNode(e)) ||
                e._x_forceModelUpdate(h);
        });
});
function Zi(e, t, r, n) {
    return S(() => {
        if (r instanceof CustomEvent && r.detail !== void 0)
            return r.detail ?? r.target.value;
        if (e.type === "checkbox")
            if (Array.isArray(n)) {
                let a = t.includes("number")
                    ? Le(r.target.value)
                    : r.target.value;
                return r.target.checked
                    ? n.concat([a])
                    : n.filter((i) => !ea(i, a));
            } else return r.target.checked;
        else {
            if (e.tagName.toLowerCase() === "select" && e.multiple)
                return t.includes("number")
                    ? Array.from(r.target.selectedOptions).map((a) => {
                          let i = a.value || a.text;
                          return Le(i);
                      })
                    : Array.from(r.target.selectedOptions).map(
                          (a) => a.value || a.text
                      );
            {
                let a = r.target.value;
                return t.includes("number")
                    ? Le(a)
                    : t.includes("trim")
                    ? a.trim()
                    : a;
            }
        }
    });
}
function Le(e) {
    let t = e ? parseFloat(e) : null;
    return ta(t) ? t : e;
}
function ea(e, t) {
    return e == t;
}
function ta(e) {
    return !Array.isArray(e) && !isNaN(e);
}
function Ft(e) {
    return (
        e !== null &&
        typeof e == "object" &&
        typeof e.get == "function" &&
        typeof e.set == "function"
    );
}
w("cloak", (e) => queueMicrotask(() => S(() => e.removeAttribute(X("cloak")))));
lr(() => `[${X("init")}]`);
w(
    "init",
    de((e, { expression: t }, { evaluate: r }) =>
        typeof t == "string" ? !!t.trim() && r(t, {}, !1) : r(t, {}, !1)
    )
);
w("text", (e, { expression: t }, { effect: r, evaluateLater: n }) => {
    let a = n(t);
    r(() => {
        a((i) => {
            S(() => {
                e.textContent = i;
            });
        });
    });
});
w("html", (e, { expression: t }, { effect: r, evaluateLater: n }) => {
    let a = n(t);
    r(() => {
        a((i) => {
            S(() => {
                (e.innerHTML = i),
                    (e._x_ignoreSelf = !0),
                    $(e),
                    delete e._x_ignoreSelf;
            });
        });
    });
});
ut(er(":", tr(X("bind:"))));
var Xr = (
    e,
    { value: t, modifiers: r, expression: n, original: a },
    { effect: i }
) => {
    if (!t) {
        let s = {};
        ui(s),
            T(e, n)(
                (c) => {
                    wr(e, c, a);
                },
                { scope: s }
            );
        return;
    }
    if (t === "key") return ra(e, n);
    if (
        e._x_inlineBindings &&
        e._x_inlineBindings[t] &&
        e._x_inlineBindings[t].extract
    )
        return;
    let o = T(e, n);
    i(() =>
        o((s) => {
            s === void 0 && typeof n == "string" && n.match(/\./) && (s = ""),
                S(() => _r(e, t, s, r));
        })
    );
};
Xr.inline = (e, { value: t, modifiers: r, expression: n }) => {
    t &&
        (e._x_inlineBindings || (e._x_inlineBindings = {}),
        (e._x_inlineBindings[t] = { expression: n, extract: !1 }));
};
w("bind", Xr);
function ra(e, t) {
    e._x_keyExpression = t;
}
cr(() => `[${X("data")}]`);
w(
    "data",
    de((e, { expression: t }, { cleanup: r }) => {
        t = t === "" ? "{}" : t;
        let n = {};
        qe(n, e);
        let a = {};
        li(a, n);
        let i = H(e, t, { scope: a });
        (i === void 0 || i === !0) && (i = {}), qe(i, e);
        let o = J(i);
        Wt(o);
        let s = le(e, o);
        o.init && H(e, o.init),
            r(() => {
                o.destroy && H(e, o.destroy), s();
            });
    })
);
w("show", (e, { modifiers: t, expression: r }, { effect: n }) => {
    let a = T(e, r);
    e._x_doHide ||
        (e._x_doHide = () => {
            S(() => {
                e.style.setProperty(
                    "display",
                    "none",
                    t.includes("important") ? "important" : void 0
                );
            });
        }),
        e._x_doShow ||
            (e._x_doShow = () => {
                S(() => {
                    e.style.length === 1 && e.style.display === "none"
                        ? e.removeAttribute("style")
                        : e.style.removeProperty("display");
                });
            });
    let i = () => {
            e._x_doHide(), (e._x_isShown = !1);
        },
        o = () => {
            e._x_doShow(), (e._x_isShown = !0);
        },
        s = () => setTimeout(o),
        u = Je(
            (_) => (_ ? o() : i()),
            (_) => {
                typeof e._x_toggleAndCascadeWithTransitions == "function"
                    ? e._x_toggleAndCascadeWithTransitions(e, _, o, i)
                    : _
                    ? s()
                    : i();
            }
        ),
        c,
        f = !0;
    n(() =>
        a((_) => {
            (!f && _ === c) ||
                (t.includes("immediate") && (_ ? s() : i()),
                u(_),
                (c = _),
                (f = !1));
        })
    );
});
w("for", (e, { expression: t }, { effect: r, cleanup: n }) => {
    let a = ia(t),
        i = T(e, a.items),
        o = T(e, e._x_keyExpression || "index");
    (e._x_prevKeys = []),
        (e._x_lookup = {}),
        r(() => na(e, a, i, o)),
        n(() => {
            Object.values(e._x_lookup).forEach((s) => s.remove()),
                delete e._x_prevKeys,
                delete e._x_lookup;
        });
});
function na(e, t, r, n) {
    let a = (o) => typeof o == "object" && !Array.isArray(o),
        i = e;
    r((o) => {
        aa(o) && o >= 0 && (o = Array.from(Array(o).keys(), (d) => d + 1)),
            o === void 0 && (o = []);
        let s = e._x_lookup,
            u = e._x_prevKeys,
            c = [],
            f = [];
        if (a(o))
            o = Object.entries(o).map(([d, v]) => {
                let x = Nt(t, v, d, o);
                n((E) => f.push(E), { scope: { index: d, ...x } }), c.push(x);
            });
        else
            for (let d = 0; d < o.length; d++) {
                let v = Nt(t, o[d], d, o);
                n((x) => f.push(x), { scope: { index: d, ...v } }), c.push(v);
            }
        let _ = [],
            h = [],
            y = [],
            A = [];
        for (let d = 0; d < u.length; d++) {
            let v = u[d];
            f.indexOf(v) === -1 && y.push(v);
        }
        u = u.filter((d) => !y.includes(d));
        let F = "template";
        for (let d = 0; d < f.length; d++) {
            let v = f[d],
                x = u.indexOf(v);
            if (x === -1) u.splice(d, 0, v), _.push([F, d]);
            else if (x !== d) {
                let E = u.splice(d, 1)[0],
                    O = u.splice(x - 1, 1)[0];
                u.splice(d, 0, O), u.splice(x, 0, E), h.push([E, O]);
            } else A.push(v);
            F = v;
        }
        for (let d = 0; d < y.length; d++) {
            let v = y[d];
            s[v]._x_effects && s[v]._x_effects.forEach(Lt),
                s[v].remove(),
                (s[v] = null),
                delete s[v];
        }
        for (let d = 0; d < h.length; d++) {
            let [v, x] = h[d],
                E = s[v],
                O = s[x],
                b = document.createElement("div");
            S(() => {
                O || L('x-for ":key" is undefined or invalid', i),
                    O.after(b),
                    E.after(O),
                    O._x_currentIfEl && O.after(O._x_currentIfEl),
                    b.before(E),
                    E._x_currentIfEl && E.after(E._x_currentIfEl),
                    b.remove();
            }),
                O._x_refreshXForScope(c[f.indexOf(x)]);
        }
        for (let d = 0; d < _.length; d++) {
            let [v, x] = _[d],
                E = v === "template" ? i : s[v];
            E._x_currentIfEl && (E = E._x_currentIfEl);
            let O = c[x],
                b = f[x],
                l = document.importNode(i.content, !0).firstElementChild,
                p = J(O);
            le(l, p, i),
                (l._x_refreshXForScope = (g) => {
                    Object.entries(g).forEach(([C, I]) => {
                        p[C] = I;
                    });
                }),
                S(() => {
                    E.after(l), $(l);
                }),
                typeof b == "object" &&
                    L(
                        "x-for key cannot be an object, it must be a string or an integer",
                        i
                    ),
                (s[b] = l);
        }
        for (let d = 0; d < A.length; d++)
            s[A[d]]._x_refreshXForScope(c[f.indexOf(A[d])]);
        i._x_prevKeys = f;
    });
}
function ia(e) {
    let t = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/,
        r = /^\s*\(|\)\s*$/g,
        n = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/,
        a = e.match(n);
    if (!a) return;
    let i = {};
    i.items = a[2].trim();
    let o = a[1].replace(r, "").trim(),
        s = o.match(t);
    return (
        s
            ? ((i.item = o.replace(t, "").trim()),
              (i.index = s[1].trim()),
              s[2] && (i.collection = s[2].trim()))
            : (i.item = o),
        i
    );
}
function Nt(e, t, r, n) {
    let a = {};
    return (
        /^\[.*\]$/.test(e.item) && Array.isArray(t)
            ? e.item
                  .replace("[", "")
                  .replace("]", "")
                  .split(",")
                  .map((o) => o.trim())
                  .forEach((o, s) => {
                      a[o] = t[s];
                  })
            : /^\{.*\}$/.test(e.item) &&
              !Array.isArray(t) &&
              typeof t == "object"
            ? e.item
                  .replace("{", "")
                  .replace("}", "")
                  .split(",")
                  .map((o) => o.trim())
                  .forEach((o) => {
                      a[o] = t[o];
                  })
            : (a[e.item] = t),
        e.index && (a[e.index] = r),
        e.collection && (a[e.collection] = n),
        a
    );
}
function aa(e) {
    return !Array.isArray(e) && !isNaN(e);
}
function Qr() {}
Qr.inline = (e, { expression: t }, { cleanup: r }) => {
    let n = xe(e);
    n._x_refs || (n._x_refs = {}),
        (n._x_refs[t] = e),
        r(() => delete n._x_refs[t]);
};
w("ref", Qr);
w("if", (e, { expression: t }, { effect: r, cleanup: n }) => {
    let a = T(e, t),
        i = () => {
            if (e._x_currentIfEl) return e._x_currentIfEl;
            let s = e.content.cloneNode(!0).firstElementChild;
            return (
                le(s, {}, e),
                S(() => {
                    e.after(s), $(s);
                }),
                (e._x_currentIfEl = s),
                (e._x_undoIf = () => {
                    D(s, (u) => {
                        u._x_effects && u._x_effects.forEach(Lt);
                    }),
                        s.remove(),
                        delete e._x_currentIfEl;
                }),
                s
            );
        },
        o = () => {
            e._x_undoIf && (e._x_undoIf(), delete e._x_undoIf);
        };
    r(() =>
        a((s) => {
            s ? i() : o();
        })
    ),
        n(() => e._x_undoIf && e._x_undoIf());
});
w("id", (e, { expression: t }, { evaluate: r }) => {
    r(t).forEach((a) => Wi(e, a));
});
ut(er("@", tr(X("on:"))));
w(
    "on",
    de((e, { value: t, modifiers: r, expression: n }, { cleanup: a }) => {
        let i = n ? T(e, n) : () => {};
        e.tagName.toLowerCase() === "template" &&
            (e._x_forwardEvents || (e._x_forwardEvents = []),
            e._x_forwardEvents.includes(t) || e._x_forwardEvents.push(t));
        let o = et(e, t, r, (s) => {
            i(() => {}, { scope: { $event: s }, params: [s] });
        });
        a(() => o());
    })
);
Ie("Collapse", "collapse", "collapse");
Ie("Intersect", "intersect", "intersect");
Ie("Focus", "trap", "focus");
Ie("Mask", "mask", "mask");
function Ie(e, t, r) {
    w(t, (n) =>
        L(
            `You can't use [x-${t}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${r}`,
            n
        )
    );
}
pe.setEvaluator(Yt);
pe.setReactivityEngine({ reactive: yt, effect: mi, release: xi, raw: m });
var oa = pe,
    mt = oa;
/*!
 * tabbable 5.2.1
 * @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
 */ var Zr = [
        "input",
        "select",
        "textarea",
        "a[href]",
        "button",
        "[tabindex]",
        "audio[controls]",
        "video[controls]",
        '[contenteditable]:not([contenteditable="false"])',
        "details>summary:first-of-type",
        "details",
    ],
    Mt = Zr.join(","),
    me =
        typeof Element > "u"
            ? function () {}
            : Element.prototype.matches ||
              Element.prototype.msMatchesSelector ||
              Element.prototype.webkitMatchesSelector,
    en = function (t, r, n) {
        var a = Array.prototype.slice.apply(t.querySelectorAll(Mt));
        return r && me.call(t, Mt) && a.unshift(t), (a = a.filter(n)), a;
    },
    sa = function (t) {
        return t.contentEditable === "true";
    },
    tn = function (t) {
        var r = parseInt(t.getAttribute("tabindex"), 10);
        return isNaN(r)
            ? sa(t) ||
              ((t.nodeName === "AUDIO" ||
                  t.nodeName === "VIDEO" ||
                  t.nodeName === "DETAILS") &&
                  t.getAttribute("tabindex") === null)
                ? 0
                : t.tabIndex
            : r;
    },
    ua = function (t, r) {
        return t.tabIndex === r.tabIndex
            ? t.documentOrder - r.documentOrder
            : t.tabIndex - r.tabIndex;
    },
    xt = function (t) {
        return t.tagName === "INPUT";
    },
    ca = function (t) {
        return xt(t) && t.type === "hidden";
    },
    la = function (t) {
        var r =
            t.tagName === "DETAILS" &&
            Array.prototype.slice.apply(t.children).some(function (n) {
                return n.tagName === "SUMMARY";
            });
        return r;
    },
    fa = function (t, r) {
        for (var n = 0; n < t.length; n++)
            if (t[n].checked && t[n].form === r) return t[n];
    },
    da = function (t) {
        if (!t.name) return !0;
        var r = t.form || t.ownerDocument,
            n = function (s) {
                return r.querySelectorAll(
                    'input[type="radio"][name="' + s + '"]'
                );
            },
            a;
        if (
            typeof window < "u" &&
            typeof window.CSS < "u" &&
            typeof window.CSS.escape == "function"
        )
            a = n(window.CSS.escape(t.name));
        else
            try {
                a = n(t.name);
            } catch (o) {
                return (
                    console.error(
                        "Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s",
                        o.message
                    ),
                    !1
                );
            }
        var i = fa(a, t.form);
        return !i || i === t;
    },
    pa = function (t) {
        return xt(t) && t.type === "radio";
    },
    ha = function (t) {
        return pa(t) && !da(t);
    },
    _a = function (t, r) {
        if (getComputedStyle(t).visibility === "hidden") return !0;
        var n = me.call(t, "details>summary:first-of-type"),
            a = n ? t.parentElement : t;
        if (me.call(a, "details:not([open]) *")) return !0;
        if (!r || r === "full")
            for (; t; ) {
                if (getComputedStyle(t).display === "none") return !0;
                t = t.parentElement;
            }
        else if (r === "non-zero-area") {
            var i = t.getBoundingClientRect(),
                o = i.width,
                s = i.height;
            return o === 0 && s === 0;
        }
        return !1;
    },
    va = function (t) {
        if (
            xt(t) ||
            t.tagName === "SELECT" ||
            t.tagName === "TEXTAREA" ||
            t.tagName === "BUTTON"
        )
            for (var r = t.parentElement; r; ) {
                if (r.tagName === "FIELDSET" && r.disabled) {
                    for (var n = 0; n < r.children.length; n++) {
                        var a = r.children.item(n);
                        if (a.tagName === "LEGEND") return !a.contains(t);
                    }
                    return !0;
                }
                r = r.parentElement;
            }
        return !1;
    },
    wt = function (t, r) {
        return !(
            r.disabled ||
            ca(r) ||
            _a(r, t.displayCheck) ||
            la(r) ||
            va(r)
        );
    },
    ga = function (t, r) {
        return !(!wt(t, r) || ha(r) || tn(r) < 0);
    },
    ba = function (t, r) {
        r = r || {};
        var n = [],
            a = [],
            i = en(t, r.includeContainer, ga.bind(null, r));
        i.forEach(function (s, u) {
            var c = tn(s);
            c === 0
                ? n.push(s)
                : a.push({ documentOrder: u, tabIndex: c, node: s });
        });
        var o = a
            .sort(ua)
            .map(function (s) {
                return s.node;
            })
            .concat(n);
        return o;
    },
    ya = function (t, r) {
        r = r || {};
        var n = en(t, r.includeContainer, wt.bind(null, r));
        return n;
    },
    ma = Zr.concat("iframe").join(","),
    rn = function (t, r) {
        if (((r = r || {}), !t)) throw new Error("No node provided");
        return me.call(t, ma) === !1 ? !1 : wt(r, t);
    };
/*!
 * focus-trap 6.6.1
 * @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
 */ function It(e, t) {
    var r = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(e);
        t &&
            (n = n.filter(function (a) {
                return Object.getOwnPropertyDescriptor(e, a).enumerable;
            })),
            r.push.apply(r, n);
    }
    return r;
}
function xa(e) {
    for (var t = 1; t < arguments.length; t++) {
        var r = arguments[t] != null ? arguments[t] : {};
        t % 2
            ? It(Object(r), !0).forEach(function (n) {
                  wa(e, n, r[n]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
            : It(Object(r)).forEach(function (n) {
                  Object.defineProperty(
                      e,
                      n,
                      Object.getOwnPropertyDescriptor(r, n)
                  );
              });
    }
    return e;
}
function wa(e, t, r) {
    return (
        t in e
            ? Object.defineProperty(e, t, {
                  value: r,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
              })
            : (e[t] = r),
        e
    );
}
var Pt = (function () {
        var e = [];
        return {
            activateTrap: function (r) {
                if (e.length > 0) {
                    var n = e[e.length - 1];
                    n !== r && n.pause();
                }
                var a = e.indexOf(r);
                a === -1 || e.splice(a, 1), e.push(r);
            },
            deactivateTrap: function (r) {
                var n = e.indexOf(r);
                n !== -1 && e.splice(n, 1),
                    e.length > 0 && e[e.length - 1].unpause();
            },
        };
    })(),
    Ea = function (t) {
        return (
            t.tagName &&
            t.tagName.toLowerCase() === "input" &&
            typeof t.select == "function"
        );
    },
    Sa = function (t) {
        return t.key === "Escape" || t.key === "Esc" || t.keyCode === 27;
    },
    Aa = function (t) {
        return t.key === "Tab" || t.keyCode === 9;
    },
    Rt = function (t) {
        return setTimeout(t, 0);
    },
    $e = function (t, r) {
        var n = -1;
        return (
            t.every(function (a, i) {
                return r(a) ? ((n = i), !1) : !0;
            }),
            n
        );
    },
    re = function (t) {
        for (
            var r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), a = 1;
            a < r;
            a++
        )
            n[a - 1] = arguments[a];
        return typeof t == "function" ? t.apply(void 0, n) : t;
    },
    Oa = function (t, r) {
        var n = document,
            a = xa(
                {
                    returnFocusOnDeactivate: !0,
                    escapeDeactivates: !0,
                    delayInitialFocus: !0,
                },
                r
            ),
            i = {
                containers: [],
                tabbableGroups: [],
                nodeFocusedBeforeActivation: null,
                mostRecentlyFocusedNode: null,
                active: !1,
                paused: !1,
                delayInitialFocusTimer: void 0,
            },
            o,
            s = function (l, p, g) {
                return l && l[p] !== void 0 ? l[p] : a[g || p];
            },
            u = function (l) {
                return i.containers.some(function (p) {
                    return p.contains(l);
                });
            },
            c = function (l) {
                var p = a[l];
                if (!p) return null;
                var g = p;
                if (typeof p == "string" && ((g = n.querySelector(p)), !g))
                    throw new Error("`".concat(l, "` refers to no known node"));
                if (typeof p == "function" && ((g = p()), !g))
                    throw new Error("`".concat(l, "` did not return a node"));
                return g;
            },
            f = function () {
                var l;
                if (s({}, "initialFocus") === !1) return !1;
                if (c("initialFocus") !== null) l = c("initialFocus");
                else if (u(n.activeElement)) l = n.activeElement;
                else {
                    var p = i.tabbableGroups[0],
                        g = p && p.firstTabbableNode;
                    l = g || c("fallbackFocus");
                }
                if (!l)
                    throw new Error(
                        "Your focus-trap needs to have at least one focusable element"
                    );
                return l;
            },
            _ = function () {
                if (
                    ((i.tabbableGroups = i.containers
                        .map(function (l) {
                            var p = ba(l);
                            if (p.length > 0)
                                return {
                                    container: l,
                                    firstTabbableNode: p[0],
                                    lastTabbableNode: p[p.length - 1],
                                };
                        })
                        .filter(function (l) {
                            return !!l;
                        })),
                    i.tabbableGroups.length <= 0 && !c("fallbackFocus"))
                )
                    throw new Error(
                        "Your focus-trap must have at least one container with at least one tabbable node in it at all times"
                    );
            },
            h = function b(l) {
                if (l !== !1 && l !== n.activeElement) {
                    if (!l || !l.focus) {
                        b(f());
                        return;
                    }
                    l.focus({ preventScroll: !!a.preventScroll }),
                        (i.mostRecentlyFocusedNode = l),
                        Ea(l) && l.select();
                }
            },
            y = function (l) {
                var p = c("setReturnFocus");
                return p || l;
            },
            A = function (l) {
                if (!u(l.target)) {
                    if (re(a.clickOutsideDeactivates, l)) {
                        o.deactivate({
                            returnFocus:
                                a.returnFocusOnDeactivate && !rn(l.target),
                        });
                        return;
                    }
                    re(a.allowOutsideClick, l) || l.preventDefault();
                }
            },
            F = function (l) {
                var p = u(l.target);
                p || l.target instanceof Document
                    ? p && (i.mostRecentlyFocusedNode = l.target)
                    : (l.stopImmediatePropagation(),
                      h(i.mostRecentlyFocusedNode || f()));
            },
            d = function (l) {
                _();
                var p = null;
                if (i.tabbableGroups.length > 0) {
                    var g = $e(i.tabbableGroups, function (Q) {
                        var Z = Q.container;
                        return Z.contains(l.target);
                    });
                    if (g < 0)
                        l.shiftKey
                            ? (p =
                                  i.tabbableGroups[i.tabbableGroups.length - 1]
                                      .lastTabbableNode)
                            : (p = i.tabbableGroups[0].firstTabbableNode);
                    else if (l.shiftKey) {
                        var C = $e(i.tabbableGroups, function (Q) {
                            var Z = Q.firstTabbableNode;
                            return l.target === Z;
                        });
                        if (
                            (C < 0 &&
                                i.tabbableGroups[g].container === l.target &&
                                (C = g),
                            C >= 0)
                        ) {
                            var I =
                                    C === 0
                                        ? i.tabbableGroups.length - 1
                                        : C - 1,
                                W = i.tabbableGroups[I];
                            p = W.lastTabbableNode;
                        }
                    } else {
                        var U = $e(i.tabbableGroups, function (Q) {
                            var Z = Q.lastTabbableNode;
                            return l.target === Z;
                        });
                        if (
                            (U < 0 &&
                                i.tabbableGroups[g].container === l.target &&
                                (U = g),
                            U >= 0)
                        ) {
                            var an =
                                    U === i.tabbableGroups.length - 1
                                        ? 0
                                        : U + 1,
                                on = i.tabbableGroups[an];
                            p = on.firstTabbableNode;
                        }
                    }
                } else p = c("fallbackFocus");
                p && (l.preventDefault(), h(p));
            },
            v = function (l) {
                if (Sa(l) && re(a.escapeDeactivates) !== !1) {
                    l.preventDefault(), o.deactivate();
                    return;
                }
                if (Aa(l)) {
                    d(l);
                    return;
                }
            },
            x = function (l) {
                re(a.clickOutsideDeactivates, l) ||
                    u(l.target) ||
                    re(a.allowOutsideClick, l) ||
                    (l.preventDefault(), l.stopImmediatePropagation());
            },
            E = function () {
                if (i.active)
                    return (
                        Pt.activateTrap(o),
                        (i.delayInitialFocusTimer = a.delayInitialFocus
                            ? Rt(function () {
                                  h(f());
                              })
                            : h(f())),
                        n.addEventListener("focusin", F, !0),
                        n.addEventListener("mousedown", A, {
                            capture: !0,
                            passive: !1,
                        }),
                        n.addEventListener("touchstart", A, {
                            capture: !0,
                            passive: !1,
                        }),
                        n.addEventListener("click", x, {
                            capture: !0,
                            passive: !1,
                        }),
                        n.addEventListener("keydown", v, {
                            capture: !0,
                            passive: !1,
                        }),
                        o
                    );
            },
            O = function () {
                if (i.active)
                    return (
                        n.removeEventListener("focusin", F, !0),
                        n.removeEventListener("mousedown", A, !0),
                        n.removeEventListener("touchstart", A, !0),
                        n.removeEventListener("click", x, !0),
                        n.removeEventListener("keydown", v, !0),
                        o
                    );
            };
        return (
            (o = {
                activate: function (l) {
                    if (i.active) return this;
                    var p = s(l, "onActivate"),
                        g = s(l, "onPostActivate"),
                        C = s(l, "checkCanFocusTrap");
                    C || _(),
                        (i.active = !0),
                        (i.paused = !1),
                        (i.nodeFocusedBeforeActivation = n.activeElement),
                        p && p();
                    var I = function () {
                        C && _(), E(), g && g();
                    };
                    return C
                        ? (C(i.containers.concat()).then(I, I), this)
                        : (I(), this);
                },
                deactivate: function (l) {
                    if (!i.active) return this;
                    clearTimeout(i.delayInitialFocusTimer),
                        (i.delayInitialFocusTimer = void 0),
                        O(),
                        (i.active = !1),
                        (i.paused = !1),
                        Pt.deactivateTrap(o);
                    var p = s(l, "onDeactivate"),
                        g = s(l, "onPostDeactivate"),
                        C = s(l, "checkCanReturnFocus");
                    p && p();
                    var I = s(l, "returnFocus", "returnFocusOnDeactivate"),
                        W = function () {
                            Rt(function () {
                                I && h(y(i.nodeFocusedBeforeActivation)),
                                    g && g();
                            });
                        };
                    return I && C
                        ? (C(y(i.nodeFocusedBeforeActivation)).then(W, W), this)
                        : (W(), this);
                },
                pause: function () {
                    return i.paused || !i.active
                        ? this
                        : ((i.paused = !0), O(), this);
                },
                unpause: function () {
                    return !i.paused || !i.active
                        ? this
                        : ((i.paused = !1), _(), E(), this);
                },
                updateContainerElements: function (l) {
                    var p = [].concat(l).filter(Boolean);
                    return (
                        (i.containers = p.map(function (g) {
                            return typeof g == "string"
                                ? n.querySelector(g)
                                : g;
                        })),
                        i.active && _(),
                        this
                    );
                },
            }),
            o.updateContainerElements(t),
            o
        );
    };
function Ca(e) {
    let t, r;
    window.addEventListener("focusin", () => {
        (t = r), (r = document.activeElement);
    }),
        e.magic("focus", (n) => {
            let a = n;
            return {
                __noscroll: !1,
                __wrapAround: !1,
                within(i) {
                    return (a = i), this;
                },
                withoutScrolling() {
                    return (this.__noscroll = !0), this;
                },
                noscroll() {
                    return (this.__noscroll = !0), this;
                },
                withWrapAround() {
                    return (this.__wrapAround = !0), this;
                },
                wrap() {
                    return this.withWrapAround();
                },
                focusable(i) {
                    return rn(i);
                },
                previouslyFocused() {
                    return t;
                },
                lastFocused() {
                    return t;
                },
                focused() {
                    return r;
                },
                focusables() {
                    return Array.isArray(a)
                        ? a
                        : ya(a, { displayCheck: "none" });
                },
                all() {
                    return this.focusables();
                },
                isFirst(i) {
                    let o = this.all();
                    return o[0] && o[0].isSameNode(i);
                },
                isLast(i) {
                    let o = this.all();
                    return o.length && o.slice(-1)[0].isSameNode(i);
                },
                getFirst() {
                    return this.all()[0];
                },
                getLast() {
                    return this.all().slice(-1)[0];
                },
                getNext() {
                    let i = this.all(),
                        o = document.activeElement;
                    if (i.indexOf(o) !== -1)
                        return this.__wrapAround &&
                            i.indexOf(o) === i.length - 1
                            ? i[0]
                            : i[i.indexOf(o) + 1];
                },
                getPrevious() {
                    let i = this.all(),
                        o = document.activeElement;
                    if (i.indexOf(o) !== -1)
                        return this.__wrapAround && i.indexOf(o) === 0
                            ? i.slice(-1)[0]
                            : i[i.indexOf(o) - 1];
                },
                first() {
                    this.focus(this.getFirst());
                },
                last() {
                    this.focus(this.getLast());
                },
                next() {
                    this.focus(this.getNext());
                },
                previous() {
                    this.focus(this.getPrevious());
                },
                prev() {
                    return this.previous();
                },
                focus(i) {
                    i &&
                        setTimeout(() => {
                            i.hasAttribute("tabindex") ||
                                i.setAttribute("tabindex", "0"),
                                i.focus({ preventScroll: this._noscroll });
                        });
                },
            };
        }),
        e.directive(
            "trap",
            e.skipDuringClone(
                (
                    n,
                    { expression: a, modifiers: i },
                    { effect: o, evaluateLater: s, cleanup: u }
                ) => {
                    let c = s(a),
                        f = !1,
                        _ = {
                            escapeDeactivates: !1,
                            allowOutsideClick: !0,
                            fallbackFocus: () => n,
                        },
                        h = n.querySelector("[autofocus]");
                    h && (_.initialFocus = h);
                    let y = Oa(n, _),
                        A = () => {},
                        F = () => {};
                    const d = () => {
                        A(),
                            (A = () => {}),
                            F(),
                            (F = () => {}),
                            y.deactivate({
                                returnFocus: !i.includes("noreturn"),
                            });
                    };
                    o(() =>
                        c((v) => {
                            f !== v &&
                                (v &&
                                    !f &&
                                    setTimeout(() => {
                                        i.includes("inert") && (A = Dt(n)),
                                            i.includes("noscroll") &&
                                                (F = Ta()),
                                            y.activate();
                                    }),
                                !v && f && d(),
                                (f = !!v));
                        })
                    ),
                        u(d);
                },
                (n, { expression: a, modifiers: i }, { evaluate: o }) => {
                    i.includes("inert") && o(a) && Dt(n);
                }
            )
        );
}
function Dt(e) {
    let t = [];
    return (
        nn(e, (r) => {
            let n = r.hasAttribute("aria-hidden");
            r.setAttribute("aria-hidden", "true"),
                t.push(() => n || r.removeAttribute("aria-hidden"));
        }),
        () => {
            for (; t.length; ) t.pop()();
        }
    );
}
function nn(e, t) {
    e.isSameNode(document.body) ||
        !e.parentNode ||
        Array.from(e.parentNode.children).forEach((r) => {
            r.isSameNode(e) ? nn(e.parentNode, t) : t(r);
        });
}
function Ta() {
    let e = document.documentElement.style.overflow,
        t = document.documentElement.style.paddingRight,
        r = window.innerWidth - document.documentElement.clientWidth;
    return (
        (document.documentElement.style.overflow = "hidden"),
        (document.documentElement.style.paddingRight = `${r}px`),
        () => {
            (document.documentElement.style.overflow = e),
                (document.documentElement.style.paddingRight = t);
        }
    );
}
var Fa = Ca;
window.Alpine = mt;
mt.plugin(Fa);
mt.start();
