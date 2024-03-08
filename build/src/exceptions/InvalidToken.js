"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidToken = void 0;
class InvalidToken extends Error {
    constructor(msg) {
        super(msg);
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, InvalidToken.prototype);
    }
}
exports.InvalidToken = InvalidToken;
