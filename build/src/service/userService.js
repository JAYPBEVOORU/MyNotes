"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.createUser = void 0;
const crypto_1 = require("../crypto");
const InvalidUser_1 = require("../exceptions/InvalidUser");
const UserAlreadyExists_1 = require("../exceptions/UserAlreadyExists");
const jwt_1 = require("../jwt");
const log_1 = require("../log");
const user_1 = require("../model/user");
const util_1 = require("../util");
/**
 *
 * @param user
 * @returns doc id of created user
 */
const createUser = async (user) => {
    try {
        const createdUser = await user_1.User.create(user);
        log_1.logger.debug(`created user ${createdUser.id}`);
        return createdUser.id;
    }
    catch (err) {
        if (err instanceof Error && (0, util_1.isDuplicateDocError)(err)) {
            throw new UserAlreadyExists_1.UserAlreadyExists(`user with email ${user.email} already exists`);
        }
        else {
            throw err;
        }
    }
};
exports.createUser = createUser;
/**
 *
 * @param user
 * @returns signed token for an authenticated user
 */
const loginUser = async (user) => {
    const dbUser = await user_1.User.findOne({ email: user.email });
    if (dbUser && (0, crypto_1.compare)(user.password, dbUser.password)) {
        log_1.logger.debug(`returning signed token for user ${dbUser.email}`);
        return (0, jwt_1.getSignedToken)(dbUser);
    }
    else {
        throw new InvalidUser_1.InvalidUser("Invalid credentials");
    }
};
exports.loginUser = loginUser;
