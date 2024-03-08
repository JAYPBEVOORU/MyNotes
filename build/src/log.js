"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const pino_1 = __importDefault(require("pino"));
// const stream = pino.destination({
//   dest: `${__dirname}/../logs/app.log`,
// });
const stream = pino_1.default.transport({
    targets: [
        {
            level: "debug",
            target: "pino-pretty",
            options: {},
        },
        {
            level: "trace",
            target: "pino/file",
            options: { destination: `${__dirname}/../logs/app.log` },
        },
    ],
});
const logger = (0, pino_1.default)(stream);
exports.logger = logger;
logger.level = "debug";
