import { compare } from "../crypto";
import { InvalidUser } from "../exceptions/InvalidUser";
import { UserAlreadyExists } from "../exceptions/UserAlreadyExists";
import { getSignedToken } from "../jwt";
import { logger } from "../log";
import { User, UserCredentials } from "../model/user";
import { isDuplicateDocError } from "../util";

/**
 *
 * @param user
 * @returns doc id of created user
 */
const createUser = async (
  user: UserCredentials
): Promise<string | undefined> => {
  try {
    const createdUser = await User.create(user);
    logger.debug(`created user ${createdUser.id}`);
    return createdUser.id;
  } catch (err) {
    if (err instanceof Error && isDuplicateDocError(err as Error)) {
      throw new UserAlreadyExists(
        `user with email ${user.email} already exists`
      );
    } else {
      throw err;
    }
  }
};

/**
 *
 * @param user
 * @returns signed token for an authenticated user
 */
const loginUser = async (user: UserCredentials): Promise<string> => {
  const dbUser = await User.findOne({ email: user.email });
  if (dbUser && compare(user.password, dbUser.password)) {
    logger.debug(`returning signed token for user ${dbUser.email}`);
    return getSignedToken(dbUser);
  } else {
    throw new InvalidUser("Invalid credentials");
  }
};

export { createUser, loginUser };
