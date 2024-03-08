"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteAlreadyExists = void 0;
class NoteAlreadyExists extends Error {
    constructor(msg) {
        super(msg);
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, NoteAlreadyExists.prototype);
    }
}
exports.NoteAlreadyExists = NoteAlreadyExists;
