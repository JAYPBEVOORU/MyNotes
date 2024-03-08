"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compare = exports.encrypt = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const encrypt = (plainText) => {
    const salt = bcrypt_1.default.genSaltSync(10);
    return bcrypt_1.default.hashSync(plainText, salt);
};
exports.encrypt = encrypt;
const compare = (plainText, hashedString) => {
    return bcrypt_1.default.compareSync(plainText, hashedString);
};
exports.compare = compare;
