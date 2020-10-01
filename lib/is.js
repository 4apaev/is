import Fail from './errors.js'

export default function Is(x) {
  return x != null
}

function No(x) {
  return x == null
}

Is.a = x => Array.isArray(x)
Is.n = x => x === +x
Is.o = x => 'object' === typeof x && !!x
Is.s = x => 'string' === typeof x
Is.b = x => 'boolean' === typeof x
Is.f = x => 'function' === typeof x
Is.ok = x => !!x
Is.em = x => { for (let i in x) { return false } return !x || 'object' === typeof x }
Is.it = (a, b) => a.toLowerCase() === toString.call(b).slice(8, -1).toLowerCase()
Is.eq = (a, b) => {
  if (a === b)
    return true

  const t = toString.call(a)
  if (t !== toString.call(b))
    return false

  switch (t) {
  case '[object Array]':
    return a.length === b.length && a.every((x, i) => Is.eq(x, b[ i ]))

  case '[object Object]':
    return Is.eq(Object.entries(a), Object.entries(b))

  default:
    return a === b
  }
}

No.a = x => !Is.a(x)
No.n = x => !Is.n(x)
No.o = x => !Is.o(x)
No.s = x => !Is.s(x)
No.b = x => !Is.b(x)
No.f = x => !Is.f(x)
No.ok = x => !Is.ok(x)
No.em = x => !Is.em(x)
No.it = (a, b) => !Is.it(a, b)
No.eq = (a, b) => !Is.eq(a, b)

Is.assert = (x, m) => Fail.assert(Is(x), m)
Is.a.assert = (x, m) => Fail.assert(Is.a(x), m)
Is.n.assert = (x, m) => Fail.assert(Is.n(x), m)
Is.o.assert = (x, m) => Fail.assert(Is.o(x), m)
Is.s.assert = (x, m) => Fail.assert(Is.s(x), m)
Is.b.assert = (x, m) => Fail.assert(Is.b(x), m)
Is.f.assert = (x, m) => Fail.assert(Is.f(x), m)
Is.ok.assert = (x, m) => Fail.assert(Is.ok(x), m)
Is.em.assert = (x, m) => Fail.assert(Is.em(x), m)
Is.it.assert = (a, b, m) => Fail.assert(Is.it(a, b), m)
Is.eq.assert = (a, b, m) => Fail.assert(Is.eq(a, b), m)

No.assert = (x, m) => Fail.assert(No(x), m)
No.a.assert = (x, m) => Fail.assert(No.a(x), m)
No.n.assert = (x, m) => Fail.assert(No.n(x), m)
No.o.assert = (x, m) => Fail.assert(No.o(x), m)
No.s.assert = (x, m) => Fail.assert(No.s(x), m)
No.b.assert = (x, m) => Fail.assert(No.b(x), m)
No.f.assert = (x, m) => Fail.assert(No.f(x), m)
No.ok.assert = (x, m) => Fail.assert(No.ok(x), m)
No.em.assert = (x, m) => Fail.assert(No.em(x), m)
No.it.assert = (a, b, m) => Fail.assert(No.it(a, b), m)
No.eq.assert = (a, b, m) => Fail.assert(No.eq(a, b), m)

Is.not = No
Is.get = Get

function Get(a, b, c) {
  return Is.o(a)
    ? b.split('.').every(k => Is(a=a[ k ]))
      ? a
      : c
    : c
}
