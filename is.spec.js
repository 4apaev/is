const assert = require('assert')
const Is = require('./is')

const run = (name, okArgs, nopeArgs) => {
  describe(`Is.${ name }`, () => {

    const message = name

    for (const x of okArgs) {

      it(`OK: Is.${ name }`, () => assert.equal(Is[ name ](x), true))
      it(`OK: Is.not.${ name }`, () => assert.equal(Is.not[ name ](x), false))

      it(`OK: Is.${ name }.assert`, () => {
        assert.doesNotThrow(() => Is[ name ].assert(x))
      })

      it(`OK: Is.not.${ name }.assert`, () => {
        assert.throws(() => Is.not[ name ].assert(x, message), { message })
      })
    }

    for (const x of nopeArgs) {
      it(`NOPE: Is.${ name }`, () => assert.equal(Is[ name ](x), false))
      it(`NOPE: Is.not.${ name }`, () => assert.equal(Is.not[ name ](x), true))

      it(`NOPE: Is.${ name }.assert`, () => {
        assert.throws(() => Is[ name ].assert(x, message), { message })
      })

      it(`NOPE: Is.not.${ name }.assert`, () => {
        assert.doesNotThrow(() => Is.not[ name ].assert(x))
      })
    }
  })
}

run('num',[
    0, .5, -.5
], [
  '0', true, false
])

run('arr', [
  [], [1], 'qwerty'.split('')
],[
  'qwerty', new Set([1,2]), new Map([[1,2]]), (function() { return arguments })()
])

run('obj',[
  [], {}, /./, new Date, new Set, new Map, Promise.resolve(1), (function() { return arguments })()
],[
  'qwerty', () => {}, 1, true, null, undefined
])

run('Obj',[
  {}, { a: 1 }
],[
  'qwerty', () => {}, 1, true, null, undefined, [], /./, new Date, new Set, new Map, Promise.resolve(1), (function() { return arguments })()
])

run('str',[
  'qwerty', ''
],[
  1, /./
])

run('fnc',[
    () => {}
], [
  '0', true, false, 0, .5, -.5, null, undefined, [], /./, new Date, new Set, new Map, Promise.resolve(1), (function() { return arguments })()
])

run('bol',[
    true, false
], [
  '0', 0, .5, -.5, null, undefined, [], /./, new Date, new Set, new Map, Promise.resolve(1), (function() { return arguments })()
])

run('empty',[
  0, false, null, undefined, [], {}, ''
], [
  '0', 1, .1, -.1, [ 1 ], { a: 1 }, true
])

describe('Is.eql', () => {

  it('Is.eql(1, 1) ', () => {

    const a = 1
    const b = 1

    assert.equal(Is.eql(a, b), true)
    assert.equal(Is.not.eql(a, b), false)
    assert.doesNotThrow(() => Is.eql.assert(a, b))
    assert.throws(() => Is.not.eql.assert(a, b))
  })

  it('Is.eql([ 1 ], [ 1 ]) ', () => {
    const a = [ 1 ]
    const b = [ 1 ]
    assert.equal(Is.eql(a, b), true)
    assert.equal(Is.not.eql(a, b), false)
    assert.doesNotThrow(() => Is.eql.assert(a, b))
    assert.throws(() => Is.not.eql.assert(a, b))
  })

  it('Is.eql({ a: [ 1 ] }, { a: [ 1 ] }) ', () => {
    const a = { a: [ 1 ] }
    const b = { a: [ 1 ] }
    assert.equal(Is.eql(a, b), true)
    assert.equal(Is.not.eql(a, b), false)
    assert.doesNotThrow(() => Is.eql.assert(a, b))
    assert.throws(() => Is.not.eql.assert(a, b))
  })

  it('Is.eql(func, func) ', () => {
    const a = console.log
    const b = console.log
    assert.equal(Is.eql(a, b), true)
    assert.equal(Is.not.eql(a, b), false)
    assert.doesNotThrow(() => Is.eql.assert(a, b))
    assert.throws(() => Is.not.eql.assert(a, b))
  })

  it('Is.eql(Date, Date) ', () => {
    const a = new Date(2018, 1, 1)
    const b = new Date(2018, 1, 1)
    assert.equal(Is.eql(a, b), true)
    assert.equal(Is.not.eql(a, b), false)
    assert.doesNotThrow(() => Is.eql.assert(a, b))
    assert.throws(() => Is.not.eql.assert(a, b))
  })

  it('Is.eql(Regex, Regex) ', () => {
    const a = /.*/
    const b = /.*/
    assert.equal(Is.eql(a, b), true)
    assert.equal(Is.not.eql(a, b), false)
    assert.doesNotThrow(() => Is.eql.assert(a, b))
    assert.throws(() => Is.not.eql.assert(a, b))
  })

  it('Is.not.eql({ a: [ 1 ] }, { a: [ 2 ] }) ', () => {
    const a = { a: [ 1 ] }
    const b = { a: [ 2 ] }
    assert.equal(Is.eql(a, b), false)
    assert.equal(Is.not.eql(a, b), true)
    assert.throws(() => Is.eql.assert(a, b))
    assert.doesNotThrow(() => Is.not.eql.assert(a, b))
  })

  it('Is.not.eql(true, "true") ', () => {
    const a = true
    const b = "true"
    assert.equal(Is.eql(a, b), false)
    assert.equal(Is.not.eql(a, b), true)
    assert.throws(() => Is.eql.assert(a, b))
    assert.doesNotThrow(() => Is.not.eql.assert(a, b))
  })

  it('Is.not.eql(1, 2) ', () => {
    const a = 1
    const b = 2
    assert.equal(Is.eql(a, b), false)
    assert.equal(Is.not.eql(a, b), true)
    assert.throws(() => Is.eql.assert(a, b))
    assert.doesNotThrow(() => Is.not.eql.assert(a, b))
  })
})

describe('Is', () => {
  it('Is(undefine)', () => {
    const x = undefined
    assert.equal(Is(x), false)
    assert.equal(Is.not(x), true)
    assert.throws(() => Is.assert(x))
    assert.doesNotThrow(() => Is.not.assert(x))
  })

  it('Is(null)', () => {
    const x = null
    assert.equal(Is(x), false)
    assert.equal(Is.not(x), true)
    assert.throws(() => Is.assert(x))
    assert.doesNotThrow(() => Is.not.assert(x))
  })

  it('Is(1)', () => {
    const x = 1
    assert.equal(Is(x), true)
    assert.equal(Is.not(x), false)
    assert.throws(() => Is.not.assert(x))
    assert.doesNotThrow(() => Is.assert(x))
  })

})

describe('Is.it', () => {

  it('Is.it(Promise.resolve(), Promise)', () => {
    const a = Promise.resolve()
    const b = 'Promise'

    assert.equal(Is.it(a, b), true)
    assert.doesNotThrow(() => Is.it.assert(a, b))

    assert.equal(Is.not.it(a, b), false)
    assert.throws(() => Is.not.it.assert(a, b))
  })

  it('Is.it(new Date, Date)', () => {
    const a = new Date
    const b = 'Object'

    assert.equal(Is.it(a, b), false)
    assert.throws(() => Is.it.assert(a, b))

    assert.equal(Is.not.it(a, b), true)
    assert.doesNotThrow(() => Is.not.it.assert(a, b))
  })

})

describe('Is.assert', () => {
  const x = undefined
  const message = 'Epic Fail'

  it('NOPE: Is.assert(undefined)', () => {
    assert.throws(() => {
      Is.assert(x, message)
    }, { message })
  })

  it('OK: Is.not.assert(undefined)', () => {
    assert.doesNotThrow(() => {
      Is.not.assert(x, message)
    }, { message })
  })

})