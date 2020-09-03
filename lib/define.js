import { assert } from '../is.js'

export const {
  assign,
  entries,
  defineProperty,
  getOwnPropertyDescriptor: getDesc,
} = Object

/**
 * define property alias
 * @param {any} src
 * @param {string} name
 * @param {(string|Object|function)} alias
 * @param {?any=} trg
 */
export function alias(src, name, alias, trg) {
  assert(alias, '[ define.alias ]: expected alias to be one of [ string, object, function ]')
  if (trg == null) {
    if/* alias for same target Array includes >> has */('string' === typeof alias) {
      trg = src
    } else/* copy for new target Array.has >> String.has */{
      trg = alias
      alias = name
    }
  }
  const desc = getDesc(src, name)
  assert(desc, `[ define.alias ] no such property "${ name }"`)
  return defineProperty(trg, alias, desc)
}

/**
 * define property descriptor
 * @param {any} trg
 * @param {string} name
 * @param {any=} value
 * @param {function=} get
 * @param {function=} set
 * @param {(number|boolean)} [c=1]
 * @param {(number|boolean)} [configurable=c]
 * @param {(number|boolean)} [e=1]
 * @param {(number|boolean)} [enumerable=e]
 * @param {(number|boolean)} [w=1]
 * @param {(number|boolean)} [writable=w]
 */
export default function define(trg, name, {
    c=1, configurable=c,
    e=1, enumerable=e,
    w=1, writable=w,
    get, set, value,
}) {
  return defineProperty(trg, name, get ? {
    configurable,
    enumerable,
    get, set,
  } : {
    configurable,
    enumerable,
    writable,
    value,
   })
}

