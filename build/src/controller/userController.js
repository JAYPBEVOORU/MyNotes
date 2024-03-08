"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const tsoa_1 = require("tsoa");
const userService_1 = require("../service/userService");
let UserController = class UserController extends tsoa_1.Controller {
    async register(user) {
        return await (0, userService_1.createUser)(user);
    }
    async login(user) {
        return await (0, userService_1.loginUser)(user);
    }
};
exports.UserController = UserController;
__decorate([
    (0, tsoa_1.SuccessResponse)(201, "User created"),
    (0, tsoa_1.Response)(409, "User already exists"),
    (0, tsoa_1.Post)("register"),
    (0, tsoa_1.Example)({
        email: "hello@hello.com",
        password: "don't tell anybody",
    }),
    __param(0, (0, tsoa_1.Body)())
], UserController.prototype, "register", null);
__decorate([
    (0, tsoa_1.SuccessResponse)(200, "Login success"),
    (0, tsoa_1.Response)(401, "Invalid credentials"),
    (0, tsoa_1.Post)("login"),
    (0, tsoa_1.Example)({
        email: "hello@hello.com",
        password: "don't tell anybody",
    }),
    __param(0, (0, tsoa_1.Body)())
], UserController.prototype, "login", null);
exports.UserController = UserController = __decorate([
    (0, tsoa_1.Route)("users")
], UserController);
