"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAlreadyExists = void 0;
class UserAlreadyExists extends Error {
    constructor(msg) {
        super(msg);
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, UserAlreadyExists.prototype);
    }
}
exports.UserAlreadyExists = UserAlreadyExists;
