import assert from 'assert'

const Yep = {
  ok(x, m) { assert.ok(x, m) },
  eq(...a) { assert.strictEqual(...a) },
  eql(...a) { assert.deepStrictEqual(...a) },
  throws(...a) { assert.throws(...a) },
  rejects(...a) { assert.rejects(...a) },
  match(...a) { assert.match(...a) },
}

const Nope = {
  ok(x, m) { assert.ok(!x, m) },
  eq(...a) { assert.notStrictEqual(...a) },
  eql(...a) { assert.notDeepStrictEqual(...a) },
  throws(...a) { assert.doesNotThrow(...a) },
  rejects(...a) { assert.doesNotReject(...a) },
  match(...a) { assert.doesNotMatch(...a) },
}


export const expect = (a, asrt=Yep) => {
  const resolve = (name, e, m) => {
    asrt[ name ](a, e, m)
    return expect(a)
  }

  return {

    get to() { return this },
    get be() { return this },
    get and() { return this },
    get not() { return expect(a, Nope) },

    ok(m) { return resolve('ok', m) },
    eq(e, m) { return resolve('eq', e, m) },
    eql(e, m) { return resolve('eql', e, m) },
    throws(e, m) { return resolve('throws', e, m) },
    rejects(e, m) { return resolve('rejects', e, m) },
    match(e, m) { return resolve('match', e, m) },
    fail(m) { assert.fail(m) },

  }
}

