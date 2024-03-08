import * as express from "express";
import * as jwt from "jsonwebtoken";
import { verifyToken } from "../jwt";
import { InvalidToken } from "../exceptions/InvalidToken";
import { AccessTokenNotFound } from "../exceptions/AccessTokenNotFound";

export function expressAuthentication(
  request: express.Request,
  securityName: string,
  scopes?: string[]
): Promise<any> {
  if (securityName === "jwt") {
    const token = request.query["_accessToken"] as string;
    return new Promise((resolve, reject) => {
      if (!token) {
        reject(new AccessTokenNotFound("No _accessToken provided"));
      } else {
        verifyToken(token, function (err: any, decoded: any) {
          if (err) {
            reject(new InvalidToken("Invalid token"));
          } else {
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
