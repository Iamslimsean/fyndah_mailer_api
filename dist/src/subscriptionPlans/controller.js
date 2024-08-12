"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendubscriptionPlanController = void 0;
const enum_1 = require("../utils/enum");
const service_1 = require("./service");
class SubscriptionPlanController {
    createSubscription(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            yield service_1.subscriptionPlanService.createSubscriptionPlan(body.amount, body.name, body.type, body.dailyLimit, body.monthlyLimit);
            return res.status(201).json({
                message: enum_1.MessageResponse.Success,
                description: `Service created successfully!`,
                data: null,
            });
        });
    }
}
exports.sendubscriptionPlanController = new SubscriptionPlanController();
