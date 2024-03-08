export class InvalidToken extends Error {
  constructor(msg: string) {
    super(msg);
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, InvalidToken.prototype);
  }
}
