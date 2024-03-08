"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("config"));
const appConfig = {
    secrets: config_1.default.get("secrets"),
    app: config_1.default.get("app"),
};
exports.default = appConfig;
