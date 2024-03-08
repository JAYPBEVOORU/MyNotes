"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidUser = void 0;
class InvalidUser extends Error {
    constructor(msg) {
        super(msg);
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, InvalidUser.prototype);
        this.name = "Invalid User";
    }
}
exports.InvalidUser = InvalidUser;
