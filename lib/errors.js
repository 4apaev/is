/**
 * @class Fail
 * @extends Error
 * */
export default class Fail extends Error {
  /**
   * @constructs Fail
   * @param {string} msg
   * @return {Fail}
   */
  constructor(msg) {
    super(msg)
    this.name = 'Fail'
    Error.captureStackTrace(this, this.constructor)
  }

  /**
   * @param {string} msg
   * @throws {Fail}
   */
  static throw(msg) {
    throw Reflect.construct(this, [ msg ])
  }

  /**
   * @param {any} x
   * @param {string} msg
   */
  static assert(x, msg) {
    if (!x)
      this.throw(msg)
  }
}

