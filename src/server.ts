import { Application } from "express";
import appConfig from "./config";
import { startMongo } from "./mongo/mongoDB";

const PORT: number = appConfig.app.port ?? 8080;

export const startServer = (app: Application) => {
  startMongo().then(() => {
    console.log(`started mongo`);
  });
  app
    .listen(PORT, "localhost", function () {
      console.log(`Server is running on port ${PORT}.`);
    })
    .on("error", (err: any) => {
      console.log(err);
    });
};
