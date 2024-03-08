import mongoose, { Model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { encrypt } from "../crypto";

/**
 * @example{
 * email: "hello@hello.com",
 * password: "don't tell anybody"
 * }
 */
interface IUser {
  _id: string;
  email: string;
  password: string;
}

interface IDisplayUser extends Omit<IUser, "password"> {}

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, "email can't be empty"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "password can't be empty"],
    trim: true,
  },
});

UserSchema.pre("save", function (next) {
  this.password = encrypt(this.password);
  next();
});

type UserCredentials = Pick<IUser, "email" | "password">;

const User = mongoose.model<IUser>("UserSchema", UserSchema);

export { IUser, UserCredentials, IDisplayUser, User, UserSchema };
