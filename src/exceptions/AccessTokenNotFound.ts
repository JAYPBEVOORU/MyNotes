export class AccessTokenNotFound extends Error {
  constructor(msg: string) {
    super(msg);
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, AccessTokenNotFound.prototype);
  }
}
