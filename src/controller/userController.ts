import {
  Body,
  Controller,
  Post,
  Route,
  SuccessResponse,
  Response,
  Example,
} from "tsoa";
import { UserCredentials } from "../model/user";
import { createUser, loginUser } from "../service/userService";

@Route("users")
export class UserController extends Controller {
  @SuccessResponse(201, "User created")
  @Response(409, "User already exists")
  @Post("register")
  @Example<UserCredentials>({
    email: "hello@hello.com",
    password: "don't tell anybody",
  })
  public async register(
    @Body() user: UserCredentials
  ): Promise<string | undefined> {
    return await createUser(user);
  }

  @SuccessResponse(200, "Login success")
  @Response(401, "Invalid credentials")
  @Post("login")
  @Example<UserCredentials>({
    email: "hello@hello.com",
    password: "don't tell anybody",
  })
  public async login(@Body() user: UserCredentials): Promise<string> {
    return await loginUser(user);
  }
}
