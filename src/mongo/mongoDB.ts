import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

export const startMongo = async () => {
  const mongoDB = await MongoMemoryServer.create();
  mongoose.connect(mongoDB.getUri());
};
