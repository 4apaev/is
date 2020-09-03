export default function Is(x) {
  return x != null
}

Is.not = x => x == null
Is.assert = (x, m) => assert(x!=null, m)
Is.not.assert = (x, m) => assert(x==null, m)

Is.use = (name, fnc, nope=(...a) => !fnc(...a)) => {
  Is[ name ] = fnc
  Is.not[ name ] = nope

  Is[ name ].assert = (...a) => assert(fnc(...a), a[ fnc.length ])
  Is.not[ name ].assert = (...a) => assert(nope(...a), a[ fnc.length ])
}

Is.use('a', x => Array.isArray(x))
Is.use('n', x => Number.isFinite(x))
Is.use('o', x => 'object' === typeof x && !!x)
Is.use('s', x => 'string' === typeof x)
Is.use('b', x => 'boolean' === typeof x)
Is.use('f', x => 'function' === typeof x)
Is.use('ok', x => !!x)
Is.use('empty', x => {
  // noinspection LoopStatementThatDoesntLoopJS
  for (let i in x)
    return false
  return !x || 'object' === typeof x
})

// Is.use('it', (a, b) => Is.s(a) ? a.toLowerCase() === toString.call(b).slice(8, -1).toLowerCase() : false)
Is.use('it', (a, b) => a.toLowerCase() === toString.call(b).slice(8, -1).toLowerCase())

Is.use('eq', (a, b) => {
  if (a === b) return true
  const t = toString.call(a)
  if (t !== toString.call(b)) return false
  switch (t) {
    case '[object Array]': return a.length === b.length && a.every((x, i) => Is.eq(x, b[ i ]))
    case '[object Object]': return Is.eq(Object.entries(a), Object.entries(b))
    default: return a === b
  }
})

Is.get = (a, b, c) => Is.o(a)
  ? b.split('.').every(k => Is(a=a[ k ]))
    ? a
    : c
  : c

export function assert(x, m) {
  if (!x) throw new Error(m)
}
