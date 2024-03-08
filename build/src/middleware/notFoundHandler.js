"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = void 0;
const notFoundHandler = (_req, res) => {
    res.status(404).send({
        message: "Not Found",
    });
};
exports.notFoundHandler = notFoundHandler;
