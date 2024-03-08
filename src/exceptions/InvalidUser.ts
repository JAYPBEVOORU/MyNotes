export class InvalidUser extends Error {
  constructor(msg: string) {
    super(msg);
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, InvalidUser.prototype);
    this.name = "Invalid User";
  }
}
