import { Router } from "express";

import { wrapAsync } from "../utils";
import { isAuth } from "../middleware/is_auth";
import { paymentValidator } from "./validator";
import { paymentController } from "./controller";

export const PaymentRouter = Router();

PaymentRouter.post(
  "/pay/:subPlanId",
  [isAuth, paymentValidator.pay],
  wrapAsync(paymentController.payment)
);

PaymentRouter.post(
  "/verify/payment/:transactionId",
  [paymentValidator.verifyPayment],
  wrapAsync(paymentController.verifyPayment)
);
