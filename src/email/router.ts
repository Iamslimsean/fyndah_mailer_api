import { Router } from "express";

import { emailController } from "./controller";
import { wrapAsync } from "../utils";
import { sendEmailValidator } from "./validator";

export const EmailRouter = Router();

EmailRouter.post(
  "/send-email",
  [sendEmailValidator.sendEmail],
  wrapAsync(emailController.sendEmail)
);

