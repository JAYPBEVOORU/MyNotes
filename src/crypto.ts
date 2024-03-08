import bcrypt from "bcrypt";

const encrypt = (plainText: string): string => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(plainText, salt);
};

const compare = (plainText: string, hashedString: string): boolean => {
  return bcrypt.compareSync(plainText, hashedString);
};

export { encrypt, compare };
