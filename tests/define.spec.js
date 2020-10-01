import assert from 'assert'
import { define } from '../index.js'

const getDesc = (o, n) => Object.getOwnPropertyDescriptor(o, n)

describe('Define', () => {

  it('should define getter with default props', () => {
    let name = 'a'
    const get = () => name
    const set = (x) => name=x
    const o = {}

    define(o, name, { get, set })
    const d = getDesc(o, name)

    assert.strictEqual(d.configurable, true)
    assert.strictEqual(d.enumerable, true)
    assert.strictEqual(d.writable, undefined)
    assert.strictEqual(d.value, undefined)
    assert.strictEqual(d.set, set)
    assert.strictEqual(d.get, get)
    assert.strictEqual(o.a, name)

    o.a = 'b'
    assert.strictEqual(name, 'b')
    assert.strictEqual(o.a, name)
  })

  it('should define alias descriptor props', () => {
    const name = 'a'
    const c = false
    const e = false
    const w = false
    const o = {}

    define(o, name, { value: name, c, e, w })
    const d = getDesc(o, name)

    assert.strictEqual(d.configurable, c)
    assert.strictEqual(d.enumerable, e)
    assert.strictEqual(d.writable, w)
    assert.strictEqual(d.value, name)
    try {
      o.a = 'b'
      assert.fail('expected o.a to be not configurable')
    } catch (_) {
      assert.strictEqual(o.a, name)
    }

    try {
      delete o.a
      assert.fail('expected o.a to be not writable')
    } catch (_) {
      assert.strictEqual(o.a, name)
    }
  })

})

describe('Define.alias', () => {
  it('should alias property name', () => {
    const o = { get a() { return 'a' } }
    define.alias(o, 'a', 'b')
    assert.deepStrictEqual(o.a, o.b)
    assert.deepStrictEqual(getDesc(o, 'a'), getDesc(o, 'b'))
  })

  it('should copy property', () => {
    const a = { get x() { return 'x' } }
    const b = {  }

    define.alias(a, 'x', b)
    assert.deepStrictEqual(a.x, b.x)
    assert.deepStrictEqual(getDesc(a, 'x'), getDesc(b, 'x'))
  })

  it('should copy and alias property', () => {
    const a = { get x() { return 'x' } }
    const b = {  }

    define.alias(a, 'x', 'y', b)
    assert.deepStrictEqual(a.x, b.y)
    assert.deepStrictEqual(getDesc(a, 'x'), getDesc(b, 'y'))
  })

})

