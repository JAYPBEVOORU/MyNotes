import express, { Response as ExResponse, Request as ExRequest, Application } from "express";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "../build/routes";
import { startMongo } from "./mongo/mongoDB";
import { errorHandler } from "./middleware/errorHandler";
import { notFoundHandler } from "./middleware/notFoundHandler";
import appConfig from "./config";

const app: Application = express();
const PORT: number = appConfig.app.port ?? 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  return res.send(swaggerUi.generateHTML(await import("../build/swagger.json")));
});

RegisterRoutes(app);

app.use(notFoundHandler);

app.use(errorHandler);

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
