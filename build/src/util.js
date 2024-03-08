"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDuplicateDocError = void 0;
const isDuplicateDocError = (err) => err.name === "MongoServerError" &&
    err.message.includes("duplicate key error");
exports.isDuplicateDocError = isDuplicateDocError;
