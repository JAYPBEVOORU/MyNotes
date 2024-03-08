"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.getSignedToken = void 0;
const config_1 = __importDefault(require("./config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getSignedToken = (user, expiresIn = "5m") => {
    return jsonwebtoken_1.default.sign({ userEmail: user.email, userId: user._id }, config_1.default.secrets.jwt_key, { expiresIn });
};
exports.getSignedToken = getSignedToken;
const verifyToken = async (token, callback) => {
    return jsonwebtoken_1.default.verify(token, config_1.default.secrets.jwt_key, callback);
};
exports.verifyToken = verifyToken;
