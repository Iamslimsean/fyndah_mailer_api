import { Router } from "express";

import { userController } from "./controller";
import { wrapAsync } from "../utils";
import { isAuth } from "../middleware/is_auth";

export const UserRouter = Router();

UserRouter.get("/user/data", [isAuth], wrapAsync(userController.fetchUserData));

// UserRouter.post(
//   "/subscribe/:id",
//   [isAuth, userValidator.subscribe],
//   wrapAsync(authController.sign_in)
// );
