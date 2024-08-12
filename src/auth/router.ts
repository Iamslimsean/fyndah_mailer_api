import { Router } from "express";

import { authController } from "./controller";
import { wrapAsync } from "../utils";
import { authValidator } from "./validator";

export const AuthRouter = Router();

AuthRouter.post(
  "/auth/signin",
  [authValidator.signIn],
  wrapAsync(authController.sign_in)
);

AuthRouter.post(
  "/auth/signup",
  [authValidator.auth],
  wrapAsync(authController.signUp)
);

