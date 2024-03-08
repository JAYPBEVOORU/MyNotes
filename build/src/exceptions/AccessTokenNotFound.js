"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessTokenNotFound = void 0;
class AccessTokenNotFound extends Error {
    constructor(msg) {
        super(msg);
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, AccessTokenNotFound.prototype);
    }
}
exports.AccessTokenNotFound = AccessTokenNotFound;
