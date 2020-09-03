import assert from 'assert'
import Is from './is.js'

const expect = a => ({
  eq(e, m) {
    assert.strictEqual(a, e, m)
  },

  throws(e) {
    assert.throws(a, e)
  },

  notThrow(e) {
    assert.doesNotThrow(a, e)
  }
})

function runner(m, a, b) {
  const message = `Is.${ m } Error`
  const ae = a.concat(message)
  const be = b.concat(message)

  // console.log(`%o\n\n%o`, a, b)

  it(`${ m } a => true`, () => assert.strictEqual(Is[ m ](...a), true))
  it(`${ m } b => false`, () => assert.strictEqual(Is[ m ](...b), false))

  it(`not.${ m } b => true`, () => assert.strictEqual(Is.not[ m ](...b), true))
  it(`not.${ m } a => false`, () => assert.strictEqual(Is.not[ m ](...a), false))

  it(`${ m }.assert => a no throw`, () => assert.doesNotThrow(() => Is[ m ].assert(...a)))
  it(`${ m }.assert => b    throw`, () => assert.throws(() => Is[ m ].assert(...be), { message }))

  it(`not.${ m }.assert => b no throw`, () => assert.doesNotThrow(() => Is.not[ m ].assert(...be, { message })))
  it(`not.${ m }.assert => a    throw`, () => assert.throws(() => Is.not[ m ].assert(...ae), { message }))
}

describe('Is', () => {
  it('Is() should return false', () => expect(Is()).eq(false))
  it('Is(null) should return false', () => expect(Is(null)).eq(false))
  it('Is(undefined) should return false', () => expect(Is(undefined)).eq(false))

  it('Is.not() should return true', () => expect(Is.not()).eq(true))
  it('Is.not(null) should return true', () => expect(Is.not(null)).eq(true))
  it('Is.not(undefined) should return true', () => expect(Is.not(undefined)).eq(true))


  it('Is.assert() should throw and Error', () => expect(() => { Is.assert() }).throws())
  it('Is.assert(null) should throw and Error', () => expect(() => { Is.assert(null) }).throws())
  it('Is.assert(undefined) should throw and Error', () => expect(() => { Is.assert(undefined) }).throws())

  it('Is.not.assert() should not throw', () => expect(() => { Is.not.assert() }).notThrow())
  it('Is.not.assert(null) should not throw', () => expect(() => { Is.not.assert(null) }).notThrow())
  it('Is.not.assert(undefined) should not throw', () => expect(() => { Is.not.assert(undefined) }).notThrow())
})

describe('Is.a', () => {
  const arr = [ 'doggo', 'bork' ]
  runner('a', [ arr ], [ undefined ])
  runner('a', [ arr ], [ 1 ])
  runner('a', [ arr ], [ 'woof' ])
  runner('a', [ arr ], [ {} ])
  runner('a', [ arr ], [ new Set ])
  runner('a', [ arr ], [ new Map ])
})

describe('Is.it', () => {
  runner('it', [ 'STRING', 'doggo' ], [ 'STRING', 2 ])
  runner('it', [ 'RegExp', /bork/ ], [ 'RegExp', undefined ])
  runner('it', [ 'error', new Error('bork') ], [ 'error', true ])
})

describe('Is.eq', () => {
  runner('eq', [  'doggo',     'doggo' ],  [  'woof', 'bork' ])
  runner('eq', [[ 'doggo' ], [ 'doggo' ]], [[ 'doggo' ], 0 ])
  runner('eq', [
    { a: { b: { c: { d: 'bork'}}}},
    { a: { b: { c: { d: 'bork'}}}},
  ], [
    { a: { b: { c: { d: 'bork'}}}},
    { a: { b: { c: { d: 'bork'}}, woof: true }},
  ])
})


describe('Is.empty', () => {
  runner('empty', [ 0     ], [ 1 ])
  runner('empty', [ ''    ], [ 'woof' ])
  runner('empty', [ null  ], [ -1 ])
  runner('empty', [ false ], [ true ])
  runner('empty', [ false ], [ true ])
  runner('empty', [ { }   ], [ { x: false } ])
  runner('empty', [ [ ]   ], [ [ 0 ] ])
})

describe('Is.get', () => {
  const a = { a: { b: { c: { bork: 1, woof: 0, d: [ 'doggo' ] }}}}
  const b = { a: { b: { c: { bork: 0, woof: 1, d: [ 'pupper' ] }}}}

  it('should return fallback if first argument is not an object', () => {
    assert.strictEqual(Is.get(null, 'a.b.c'), undefined)
    assert.strictEqual(Is.get(undefined, 'a.b.c', b), b)
  })

  it('should return fallback if missing property', () => {
    assert.strictEqual(Is.get(a, 'a.b.c.d.x.y.z', b), b)
  })

  it('should find nested property', () => {
    assert.strictEqual(Is.get(a, 'a.b.c.bork'), 1)
    assert.strictEqual(Is.get(b, 'a.b.c.bork'), 0)
    assert.strictEqual(Is.get(a, 'a.b.c.d.0'), 'doggo')
    assert.strictEqual(Is.get(b, 'a.b.c.d.0'), 'pupper')
  })
})
