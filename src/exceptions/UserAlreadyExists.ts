export class UserAlreadyExists extends Error {
  constructor(msg: string) {
    super(msg);
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, UserAlreadyExists.prototype);
  }
}
