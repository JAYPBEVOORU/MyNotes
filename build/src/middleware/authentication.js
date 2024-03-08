"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressAuthentication = void 0;
const jwt_1 = require("../jwt");
const InvalidToken_1 = require("../exceptions/InvalidToken");
const AccessTokenNotFound_1 = require("../exceptions/AccessTokenNotFound");
function expressAuthentication(request, securityName, scopes) {
    if (securityName === "jwt") {
        const token = request.query["_accessToken"];
        return new Promise((resolve, reject) => {
            if (!token) {
                reject(new AccessTokenNotFound_1.AccessTokenNotFound("No _accessToken provided"));
            }
            else {
                (0, jwt_1.verifyToken)(token, function (err, decoded) {
                    if (err) {
                        reject(new InvalidToken_1.InvalidToken("Invalid token"));
                    }
                    else {
                        console.log("decoded:" + JSON.stringify(decoded));
                        request.params["userEmail"] = decoded.userEmail;
                        request.params["userId"] = decoded.userId;
                        // Check if JWT contains all required scopes
                        //   for (let scope of scopes) {
                        //     if (!decoded.scopes.includes(scope)) {
                        //       reject(new Error("JWT does not contain required scope."));
                        //     }
                        //   }
                        resolve(decoded);
                    }
                });
            }
        });
    }
    return Promise.reject({});
}
exports.expressAuthentication = expressAuthentication;
