/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const A = Symbol("Comlink.proxy"), z = Symbol("Comlink.endpoint"), N = Symbol("Comlink.releaseProxy"), k = Symbol("Comlink.finalizer"), E = Symbol("Comlink.thrown"), R = (e) => typeof e == "object" && e !== null || typeof e == "function", I = {
  canHandle: (e) => R(e) && e[A],
  serialize(e) {
    const { port1: t, port2: r } = new MessageChannel();
    return S(e, t), [r, [r]];
  },
  deserialize(e) {
    return e.start(), _(e);
  }
}, H = {
  canHandle: (e) => R(e) && E in e,
  serialize({ value: e }) {
    let t;
    return e instanceof Error ? t = {
      isError: !0,
      value: {
        message: e.message,
        name: e.name,
        stack: e.stack
      }
    } : t = { isError: !1, value: e }, [t, []];
  },
  deserialize(e) {
    throw e.isError ? Object.assign(new Error(e.value.message), e.value) : e.value;
  }
}, T = /* @__PURE__ */ new Map([
  ["proxy", I],
  ["throw", H]
]);
function V(e, t) {
  for (const r of e)
    if (t === r || r === "*" || r instanceof RegExp && r.test(t))
      return !0;
  return !1;
}
function S(e, t = globalThis, r = ["*"]) {
  t.addEventListener("message", function u(n) {
    if (!n || !n.data)
      return;
    if (!V(r, n.origin)) {
      console.warn(`Invalid origin '${n.origin}' for comlink proxy`);
      return;
    }
    const { id: g, type: s, path: i } = Object.assign({ path: [] }, n.data), l = (n.data.argumentList || []).map(m);
    let a;
    try {
      const o = i.slice(0, -1).reduce((c, y) => c[y], e), f = i.reduce((c, y) => c[y], e);
      switch (s) {
        case "GET":
          a = f;
          break;
        case "SET":
          o[i.slice(-1)[0]] = m(n.data.value), a = !0;
          break;
        case "APPLY":
          a = f.apply(o, l);
          break;
        case "CONSTRUCT":
          {
            const c = new f(...l);
            a = G(c);
          }
          break;
        case "ENDPOINT":
          {
            const { port1: c, port2: y } = new MessageChannel();
            S(e, y), a = U(c, [c]);
          }
          break;
        case "RELEASE":
          a = void 0;
          break;
        default:
          return;
      }
    } catch (o) {
      a = { value: o, [E]: 0 };
    }
    Promise.resolve(a).catch((o) => ({ value: o, [E]: 0 })).then((o) => {
      const [f, c] = b(o);
      t.postMessage(Object.assign(Object.assign({}, f), { id: g }), c), s === "RELEASE" && (t.removeEventListener("message", u), C(t), k in e && typeof e[k] == "function" && e[k]());
    }).catch((o) => {
      const [f, c] = b({
        value: new TypeError("Unserializable return value"),
        [E]: 0
      });
      t.postMessage(Object.assign(Object.assign({}, f), { id: g }), c);
    });
  }), t.start && t.start();
}
function W(e) {
  return e.constructor.name === "MessagePort";
}
function C(e) {
  W(e) && e.close();
}
function _(e, t) {
  return x(e, [], t);
}
function h(e) {
  if (e)
    throw new Error("Proxy has been released and is not useable");
}
function L(e) {
  return d(e, {
    type: "RELEASE"
  }).then(() => {
    C(e);
  });
}
const w = /* @__PURE__ */ new WeakMap(), p = "FinalizationRegistry" in globalThis && new FinalizationRegistry((e) => {
  const t = (w.get(e) || 0) - 1;
  w.set(e, t), t === 0 && L(e);
});
function j(e, t) {
  const r = (w.get(t) || 0) + 1;
  w.set(t, r), p && p.register(e, t, e);
}
function D(e) {
  p && p.unregister(e);
}
function x(e, t = [], r = function() {
}) {
  let u = !1;
  const n = new Proxy(r, {
    get(g, s) {
      if (h(u), s === N)
        return () => {
          D(n), L(e), u = !0;
        };
      if (s === "then") {
        if (t.length === 0)
          return { then: () => n };
        const i = d(e, {
          type: "GET",
          path: t.map((l) => l.toString())
        }).then(m);
        return i.then.bind(i);
      }
      return x(e, [...t, s]);
    },
    set(g, s, i) {
      h(u);
      const [l, a] = b(i);
      return d(e, {
        type: "SET",
        path: [...t, s].map((o) => o.toString()),
        value: l
      }, a).then(m);
    },
    apply(g, s, i) {
      h(u);
      const l = t[t.length - 1];
      if (l === z)
        return d(e, {
          type: "ENDPOINT"
        }).then(m);
      if (l === "bind")
        return x(e, t.slice(0, -1));
      const [a, o] = M(i);
      return d(e, {
        type: "APPLY",
        path: t.map((f) => f.toString()),
        argumentList: a
      }, o).then(m);
    },
    construct(g, s) {
      h(u);
      const [i, l] = M(s);
      return d(e, {
        type: "CONSTRUCT",
        path: t.map((a) => a.toString()),
        argumentList: i
      }, l).then(m);
    }
  });
  return j(n, e), n;
}
function F(e) {
  return Array.prototype.concat.apply([], e);
}
function M(e) {
  const t = e.map(b);
  return [t.map((r) => r[0]), F(t.map((r) => r[1]))];
}
const O = /* @__PURE__ */ new WeakMap();
function U(e, t) {
  return O.set(e, t), e;
}
function G(e) {
  return Object.assign(e, { [A]: !0 });
}
function b(e) {
  for (const [t, r] of T)
    if (r.canHandle(e)) {
      const [u, n] = r.serialize(e);
      return [
        {
          type: "HANDLER",
          name: t,
          value: u
        },
        n
      ];
    }
  return [
    {
      type: "RAW",
      value: e
    },
    O.get(e) || []
  ];
}
function m(e) {
  switch (e.type) {
    case "HANDLER":
      return T.get(e.name).deserialize(e.value);
    case "RAW":
      return e.value;
  }
}
function d(e, t, r) {
  return new Promise((u) => {
    const n = Y();
    e.addEventListener("message", function g(s) {
      !s.data || !s.data.id || s.data.id !== n || (e.removeEventListener("message", g), u(s.data));
    }), e.start && e.start(), e.postMessage(Object.assign({ id: n }, t), r);
  });
}
function Y() {
  return new Array(4).fill(0).map(() => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16)).join("-");
}
const q = self, P = /* @__PURE__ */ new Map(), X = {
  getItem: (e) => P.get(e),
  setItem: (e, t) => (P.set(e, t), t),
  removeItem: (e) => {
    P.delete(e);
  }
};
q.onconnect = (e) => {
  const t = e.ports[0];
  S(X, t);
};
