import { Router } from "express";

import { authController } from "./controller";
import { wrapAsync } from "../utils";
import { authValidator } from "./validator";

export const AuthRouter = Router();

AuthRouter.post(
  "/admin/signin",
  [authValidator.auth],
  wrapAsync(authController.sign_in)
);

AuthRouter.post(
  "/admin/signup",
  [authValidator.auth],
  wrapAsync(authController.admin_sign_up)
);

