class ValidationError extends Error {
    constructor(msg, httpStatusCode,code) {
      super(msg);
      this.msg = msg;
      this.httpStatusCode = httpStatusCode || 500;
      this.code = code || -1;
    }
  }

module.exports = {
  ValidationError
}