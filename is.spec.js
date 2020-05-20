import assert from 'assert'
import Is from './is.js'

const expect = a => ({
  eq(e, m) {
    assert.strictEqual(a, e, m)
  },

  throws(...e) {
    assert.throws(a, ...e)
  },

  notThrow(...e) {
    assert.doesNotThrow(a, ...e)
  }
})

describe('Is', () => {
  it('Is() should return false', () => expect(Is()).eq(false))
  it('Is(null) should return false', () => expect(Is(null)).eq(false))
  it('Is(undefined) should return false', () => expect(Is(undefined)).eq(false))

  it('Is.not() should return true', () => expect(Is.not()).eq(true))
  it('Is.not(null) should return true', () => expect(Is.not(null)).eq(true))
  it('Is.not(undefined) should return true', () => expect(Is.not(undefined)).eq(true))


  it('Is.asrt() should throw and Error', () => expect(() => { Is.asrt() }).throws())
  it('Is.asrt(null) should throw and Error', () => expect(() => { Is.asrt(null) }).throws())
  it('Is.asrt(undefined) should throw and Error', () => expect(() => { Is.asrt(undefined) }).throws())

  it('Is.not.asrt() should not throw', () => expect(() => { Is.not.asrt() }).notThrow())
  it('Is.not.asrt(null) should not throw', () => expect(() => { Is.not.asrt(null) }).notThrow())
  it('Is.not.asrt(undefined) should not throw', () => expect(() => { Is.not.asrt(undefined) }).notThrow())
})

describe('Is.a', () => {
  it('Is.a() should return false', () => expect(Is.a()).eq(false))
  it('Is.not.a() should return true', () => expect(Is.not.a()).eq(true))
  it('Is.a([]) should return true', () => expect(Is.a([])).eq(true))
  it('Is.not.a([]) should return false', () => expect(Is.not.a([])).eq(false))
  it('Is.a.asrt() should throw an Error', () => expect(() => Is.a.asrt(null, 'Must be array')).throws())
  it('Is.a.asrt([]) should not throw an Error', () => expect(() => Is.a.asrt([], 'Must be array')).notThrow())
  it('Is.not.a.asrt([]) should throw an Error', () => expect(() => Is.not.a.asrt([], 'Must not be array')).throws())
  it('Is.not.a.asrt() should not throw an Error', () => expect(() => Is.not.a.asrt(null, 'Must not be array')).notThrow())
})

describe('Is.empty', () => {
  it(`  0    - empty = true`,  () => expect(Is.empty(0)).eq(true))
  it(` " "   - empty = true`,  () => expect(Is.empty('')).eq(true))
  it(` { }   - empty = true`,  () => expect(Is.empty({})).eq(true))
  it(` [ ]   - empty = true`,  () => expect(Is.empty([])).eq(true))

  it(`   1   - empty = false`,  () => expect(Is.empty(1)).eq(false))
  it(` " * " - empty = false`,  () => expect(Is.empty('*')).eq(false))
  it(` { a } - empty = false`,  () => expect(Is.empty({a:1})).eq(false))
  it(` [ 1 ] - empty = false`,  () => expect(Is.empty([1])).eq(false))

  it(`  0  - not.empty = false`,  () => expect(Is.not.empty(0)).eq(false))
  it(` " " - not.empty = false`,  () => expect(Is.not.empty('')).eq(false))
  it(` { } - not.empty = false`,  () => expect(Is.not.empty({})).eq(false))
  it(` [ ] - not.empty = false`,  () => expect(Is.not.empty([])).eq(false))

  it(`   1   - not.empty = true`,  () => expect(Is.not.empty(1)).eq(true))
  it(` " * " - not.empty = true`,  () => expect(Is.not.empty('*')).eq(true))
  it(` { a } - not.empty = true`,  () => expect(Is.not.empty({a:1})).eq(true))
  it(` [ 1 ] - not.empty = true`,  () => expect(Is.not.empty([1])).eq(true))

  it(`  0    - empty.assert = ok`,  () => expect(() => Is.empty.asrt(0)).notThrow())
  it(` " "   - empty.assert = ok`,  () => expect(() => Is.empty.asrt('')).notThrow())
  it(` { }   - empty.assert = ok`,  () => expect(() => Is.empty.asrt({})).notThrow())
  it(` [ ]   - empty.assert = ok`,  () => expect(() => Is.empty.asrt([])).notThrow())

  it(`   1   - empty.assert = Error`,  () => expect(() => Is.empty.asrt(1)).throws())
  it(` " * " - empty.assert = Error`,  () => expect(() => Is.empty.asrt('*')).throws())
  it(` { a } - empty.assert = Error`,  () => expect(() => Is.empty.asrt({a:1})).throws())
  it(` [ 1 ] - empty.assert = Error`,  () => expect(() => Is.empty.asrt([1])).throws())

  it(`  0  - not.empty.assert = Error`,  () => expect(() => Is.not.empty.asrt(0)).throws())
  it(` " " - not.empty.assert = Error`,  () => expect(() => Is.not.empty.asrt('')).throws())
  it(` { } - not.empty.assert = Error`,  () => expect(() => Is.not.empty.asrt({})).throws())
  it(` [ ] - not.empty.assert = Error`,  () => expect(() => Is.not.empty.asrt([])).throws())

  it(`   1   - not.empty.assert = ok`,  () => expect(() => Is.not.empty.asrt(1)).notThrow())
  it(` " * " - not.empty.assert = ok`,  () => expect(() => Is.not.empty.asrt('*')).notThrow())
  it(` { a } - not.empty.assert = ok`,  () => expect(() => Is.not.empty.asrt({a:1})).notThrow())
  it(` [ 1 ] - not.empty.assert = ok`,  () => expect(() => Is.not.empty.asrt([1])).notThrow())


})
