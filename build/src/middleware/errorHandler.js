"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const tsoa_1 = require("tsoa");
const UserAlreadyExists_1 = require("../exceptions/UserAlreadyExists");
const InvalidUser_1 = require("../exceptions/InvalidUser");
const AccessTokenNotFound_1 = require("../exceptions/AccessTokenNotFound");
const InvalidToken_1 = require("../exceptions/InvalidToken");
const NoteAlreadyExists_1 = require("../exceptions/NoteAlreadyExists");
const errorHandler = (err, req, res, next) => {
    if (err instanceof tsoa_1.ValidateError) {
        console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
        return res.status(422).json({
            message: "Validation Failed",
            details: err?.fields,
        });
    }
    if (err instanceof UserAlreadyExists_1.UserAlreadyExists) {
        return res.status(409).json({
            message: err.message,
        });
    }
    if (err instanceof NoteAlreadyExists_1.NoteAlreadyExists) {
        return res.status(409).json({
            message: err.message,
        });
    }
    if (err instanceof InvalidUser_1.InvalidUser) {
        return res.status(401).json({
            message: err.message,
        });
    }
    if (err instanceof AccessTokenNotFound_1.AccessTokenNotFound) {
        return res.status(400).json({
            message: err.message,
        });
    }
    if (err instanceof InvalidToken_1.InvalidToken) {
        return res.status(401).json({
            message: err.message,
        });
    }
    if (err instanceof Error) {
        console.log(err);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
    next();
};
exports.errorHandler = errorHandler;
