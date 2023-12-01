import express, { Request, Response, NextFunction, Express } from "express";
import chalk from "chalk";
import "dotenv/config";

import CONSTANTS from "./constants/index";
import reqMiddleware from "./middlewares/app/req";
import resMiddleware from "./middlewares/app/res";
import routes from "./routes";

const app = express();
reqMiddleware(app);
resMiddleware(app.response);

app.use("/", routes);

app.use((req, res, next) => {
  return res.pageNotFound();
});

app.listen(CONSTANTS.APP.PORT, () => {
  console.log(
    chalk.blueBright(`
  App environment: ${chalk.yellowBright(CONSTANTS.APP.ENVIRONMENT)} 
  Server is running on port: ${chalk.yellowBright(CONSTANTS.APP.PORT)}
  `)
  );
});
