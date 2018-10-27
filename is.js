const Is = x => x!=null

Is.tos = x => toString.call(x).slice(8, -1)
Is.not = x => !Is(x)

Is.assert = (x, m) => {
  if (!x)
    throw new Error(m||'Fail')
}

Is.not.assert = (x, m) => {
  if (x)
    throw new Error(m||'Fail')
}

Is.use = (name, cb) => {
  Is[ name ] = cb
  Is[ name ].assert = (x, m) => Is.assert(cb(x), m)
  Is.not[ name ] = x => !cb(x)
  Is.not[ name ].assert = (x, m) => Is.not.assert(cb(x), m)
}

Is.use('num', x => x === +x)
Is.use('arr', x => Array.isArray(x))
Is.use('Obj', x => Is.it(x, 'Object'))
Is.use('obj', x => 'object' === typeof x && !!x)
Is.use('str', x => 'string' === typeof x)
Is.use('fnc', x => 'function' === typeof x)
Is.use('bol', x => 'boolean' === typeof x)
Is.use('empty', x => {
  for (let i in x)
    return false
  return !x || 'object' === typeof x && !!x
})

Is.eql = (a, b) => {
  if (Object.is(a, b)) return true
  const t = Is.tos(a)
  if (t!==Is.tos(b)) return false
  if (t==='Date') return  +a===+b
  if (t==='Array') return  a.length===b.length && a.every((v, k) => Is.eql(v, b[ k ]))
  if (t==='Object') return  Object.entries(a).every(([ k, v ]) => k in b && Is.eql(v, b[ k ]))
  if (t==='RegExp') return  a.toString()===b.toString()
  return a===b
}

Is.eql.assert = (a, b, m) => Is.assert(Is.eql(a, b), m)
Is.not.eql = (a, b) => !Is.eql(a, b)
Is.not.eql.assert = (a, b, m) => Is.assert(Is.not.eql(a, b), m)

Is.it = (a, b) => Is.tos(a).toLowerCase() === b.toLowerCase()
Is.not.it = (a, b) => !Is.it(a, b)
Is.it.assert = (a, b, m) => Is.assert(Is.it(a, b), m)
Is.not.it.assert = (a, b, m) => Is.assert(Is.not.it(a, b), m)

module.exports = Is