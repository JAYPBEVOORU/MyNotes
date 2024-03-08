export class NoteAlreadyExists extends Error {
  constructor(msg: string) {
    super(msg);
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, NoteAlreadyExists.prototype);
  }
}
