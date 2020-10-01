/**
* @class Claim
* @extends Promise
* */
export default class Claim extends Promise {
  /**
   * @constructs Claim
   * @param {function(*=)} cb
   * @return {Claim}
   */
  static it(cb) {
    return new Claim(cb)
  }

  /**
   * sleep set timeout for ms
   * @param {number} ms
   * @param {...*} [a] - rest arguments
   * @return {Claim}
   */
  static sleep(ms, ...a) {
    return Claim.it(done => setTimeout(done, ms, a))
  }

  /**
   * @param {function} fn
   * @param {number} ms
   * @param {...*} [a] - rest arguments
   * @return {PromiseLike}
   */
  static delay(fn, ms, ...a) {
    return Claim.sleep(ms, ...a).then(fn)
  }

  /**
   * @param {*} x
   * @return {PromiseLike}
   */
  static done(x) {
    return Promise.resolve(x)
  }

  /**
   * @param {*} x
   * @return {PromiseRejectedResult}
   */
  static fail(x) {
    return Promise.reject(x)
  }

  /**
   * @param {string} message
   * @return {PromiseLike}
   */
  static raise(message) {
    return Promise.reject(new Error(message))
  }
}
