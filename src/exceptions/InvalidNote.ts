export class InvalidNote extends Error {
  constructor(msg: string) {
    super(msg);
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, InvalidNote.prototype);
  }
}
