"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidNote = void 0;
class InvalidNote extends Error {
    constructor(msg) {
        super(msg);
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, InvalidNote.prototype);
    }
}
exports.InvalidNote = InvalidNote;
