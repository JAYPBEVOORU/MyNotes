"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startMongo = void 0;
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongoose_1 = __importDefault(require("mongoose"));
const startMongo = async () => {
    const mongoDB = await mongodb_memory_server_1.MongoMemoryServer.create();
    mongoose_1.default.connect(mongoDB.getUri());
};
exports.startMongo = startMongo;
