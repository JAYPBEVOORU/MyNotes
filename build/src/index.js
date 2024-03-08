"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const routes_1 = require("../build/routes");
const mongoDB_1 = require("./mongo/mongoDB");
const errorHandler_1 = require("./middleware/errorHandler");
const notFoundHandler_1 = require("./middleware/notFoundHandler");
const config_1 = __importDefault(require("./config"));
const app = (0, express_1.default)();
const PORT = config_1.default.app.port ?? 8080;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/docs", swagger_ui_express_1.default.serve, async (_req, res) => {
    return res.send(swagger_ui_express_1.default.generateHTML(await Promise.resolve().then(() => __importStar(require("../build/swagger.json")))));
});
(0, routes_1.RegisterRoutes)(app);
app.use(notFoundHandler_1.notFoundHandler);
app.use(errorHandler_1.errorHandler);
(0, mongoDB_1.startMongo)().then(() => {
    console.log(`started mongo`);
});
app
    .listen(PORT, "localhost", function () {
    console.log(`Server is running on port ${PORT}.`);
})
    .on("error", (err) => {
    console.log(err);
});
