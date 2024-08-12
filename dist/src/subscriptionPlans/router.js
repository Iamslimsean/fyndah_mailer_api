"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionPlanRouter = void 0;
const express_1 = require("express");
const utils_1 = require("../utils");
const validator_1 = require("./validator");
const controller_1 = require("./controller");
exports.SubscriptionPlanRouter = (0, express_1.Router)();
exports.SubscriptionPlanRouter.post("/create/subscription/plan", [validator_1.subscriptionPlanValidator.createSubscription], (0, utils_1.wrapAsync)(controller_1.sendubscriptionPlanController.createSubscription));
// SubscriptionPlanRouter.post(
//   "/purchase/subscription/plan",
//   [isAuth],
//   wrapAsync(sendubscriptionPlanController.purchaseSubscription)
// );
