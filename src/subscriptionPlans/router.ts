import { Router } from "express";

import { wrapAsync } from "../utils";
import { subscriptionPlanValidator } from "./validator";
import { sendubscriptionPlanController } from "./controller";
import { isAuth } from "../middleware/is_auth";
import { userValidator } from "../user/validator";

export const SubscriptionPlanRouter = Router();

SubscriptionPlanRouter.post(
  "/create/subscription/plan",
  [subscriptionPlanValidator.createSubscription],
  wrapAsync(sendubscriptionPlanController.createSubscription)
);

// SubscriptionPlanRouter.post(
//   "/purchase/subscription/plan",
//   [isAuth],
//   wrapAsync(sendubscriptionPlanController.purchaseSubscription)
// );

