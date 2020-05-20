const Is = x => x != null
Is.asrt = (x, m) => must(x!=null, m)

Is.not = x => x == null
Is.not.asrt = (x, m) => must(x==null, m)


Is.use = (name, fnc) => {
  Is[ name ] = fnc
  Is[ name ].asrt = (x, m) => must(fnc(x), m)

  Is.not[ name ] = x => !fnc(x)
  Is.not[ name ].asrt = (x, m) => must(!fnc(x), m)
}

Is.use('a', x => Array.isArray(x))
Is.use('n', x => Number.isFinite(x))
Is.use('BF', x => Buffer.isBuffer(x))

Is.use('RS', x => x instanceof Stream.Readable)
Is.use('WS', x => x instanceof Stream.Writable)

Is.use('O', x => toString.call(x) === '[object Object]')
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

Is.get = (a, b, c) => Is.o(a)
  ? b.split('.').every(k => Is(a=a[ k ]))
    ? a
    : c
  : c

function must(x, m) {
  if (!x)
    throw new Error(m)
}


export default Is