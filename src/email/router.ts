import { Router } from "express";

import { emailController } from "./controller";
import { wrapAsync } from "../utils";
import { sendEmailValidator } from "./validator";
import { isAuth } from "../middleware/is_auth";

export const EmailRouter = Router();

EmailRouter.post(
  "/send-email",
  [sendEmailValidator.sendEmail],
  wrapAsync(emailController.sendEmail)
);

EmailRouter.post(
  "/send/auth/email",
  [isAuth, sendEmailValidator.sendEmail],
  wrapAsync(emailController.sendAuthEmail)
);

