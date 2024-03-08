import appConfig from "./config";
import { IUser } from "./model/user";
import jwt from "jsonwebtoken";

const getSignedToken = (user: IUser, expiresIn: string = "5m") => {
  return jwt.sign(
    { userEmail: user.email, userId: user._id },
    appConfig.secrets.jwt_key,
    { expiresIn }
  );
};

const verifyToken = async (
  token: string,
  callback: (err: any, decoded: any) => void
) => {
  return jwt.verify(token, appConfig.secrets.jwt_key, callback);
};

export { getSignedToken, verifyToken };
