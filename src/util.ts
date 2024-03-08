export const isDuplicateDocError = (err: Error) =>
  err.name === "MongoServerError" && err.message.includes("duplicate key error");
