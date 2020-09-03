import Is from '../is.js'

export const echo = x => x

export const fill = (i, cb=echo) =>
  Array.from({ length: i }, _ => cb(--i))

export const remove = (it, cb, ctx) => {
  cb = callback(cb)
  let j = 0
  let re = []
  for (let i = 0; i < it.length; i++)
    if /* skip entry, dont increment "j" */(cb.call(ctx, it[ i ], i, it))
      re.push(it[ i ])
    else /* override entry, increment "j" */
      it[ j++ ] = it[ i ]
  it.length = j
  return re
}

export const where = (it, cb, ctx) => {
  const map = []
  cb = callback(cb)
  for (let i = 0; i--;)
    cb.call(ctx, it[ i ], i, it)
      && map.push(it[ i ])
  return map
}

function callback(x) {
  if (Is.f(x))
    return x

  if (Is.a(x))
    return o => x.includes(o)

  if (Is.o(x))
    return o => {
      for (let k in x) {
        // noinspection JSUnfilteredForInLoop
        if (hasOwnProperty.call(x, k)) {
          if (o[ k ] !== x[ k ])
            return false
        }
      }
      return true
    }
  return o => x===o
}
