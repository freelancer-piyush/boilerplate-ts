import { Router } from "express";
import * as userAuthControllers from "../../controllers/users/auth.controller";
import { schemaUserLogin } from "../../validations/user/auth/login";
import { validateData } from "../../middlewares/validations";
import { schemaSingUp } from "../../validations/user/auth/sign-up";
import { schemaConfirmRegister } from "../../validations/user/auth/confirm";
import { verifyAuth } from "../../middlewares/aws/auth";

const routes = Router();

routes.post(
  "/login",
  validateData(schemaUserLogin),
  userAuthControllers.userLogin
);

routes.post(
  "/sign-up",
  validateData(schemaSingUp),
  userAuthControllers.userSignUp
);

routes.post(
  "/confirm",
  validateData(schemaConfirmRegister),
  userAuthControllers.confirmUserSignUp
);

routes.delete("/sign-out", verifyAuth, userAuthControllers.signOut);

export default routes;
