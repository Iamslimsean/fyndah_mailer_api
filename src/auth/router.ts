import { Router } from "express";

// import { authController } from "./controller";
import { wrapAsync } from "../utils";
import { authValidator } from "./validator";

export const AuthRouter = Router();

// AuthRouter.post(
//   "/signin",
//   [authValidator.log_in],
//   wrapAsync(authController.sign_in)
// );

