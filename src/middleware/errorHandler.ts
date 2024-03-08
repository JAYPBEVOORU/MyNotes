import { Response, Request, NextFunction } from "express";
import { ValidateError } from "tsoa";
import { UserAlreadyExists } from "../exceptions/UserAlreadyExists";
import { InvalidUser } from "../exceptions/InvalidUser";
import { AccessTokenNotFound } from "../exceptions/AccessTokenNotFound";
import { InvalidToken } from "../exceptions/InvalidToken";
import { NoteAlreadyExists } from "../exceptions/NoteAlreadyExists";

export const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction): Response | void => {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: "Validation Failed",
      details: err?.fields
    });
  }
  if (err instanceof UserAlreadyExists) {
    return res.status(409).json({
      message: err.message
    });
  }

  if (err instanceof NoteAlreadyExists) {
    return res.status(409).json({
      message: err.message
    });
  }

  if (err instanceof InvalidUser) {
    return res.status(401).json({
      message: err.message
    });
  }
  if (err instanceof AccessTokenNotFound) {
    return res.status(400).json({
      message: err.message
    });
  }
  if (err instanceof InvalidToken) {
    return res.status(401).json({
      message: err.message
    });
  }
  if (err instanceof Error) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
  next();
};
