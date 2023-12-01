import { Router } from "express";
import * as userAuthControllers from "../../controllers/users/auth.controller";
import { schemaUserLogin } from "../../validations/user/auth/login";
import * as Joi from "joi";
import { validateData } from "../../middlewares/validations";
import { schemaSingUp } from "../../validations/user/auth/sign-up";

const routes = Router();

routes.post(
  "/login",
  validateData(schemaUserLogin),
  userAuthControllers.userLogin
);
routes.post(
  "/sign-up",
  validateData(schemaSingUp),
  userAuthControllers.userLogin
);

export default routes;
