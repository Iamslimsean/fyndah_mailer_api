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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriptionPlanService = void 0;
const entity_1 = __importDefault(require("./entity"));
class SubscriptionPlanService {
    createSubscriptionPlan(amount, name, type, dailyLimit, monthlyLimit) {
        return __awaiter(this, void 0, void 0, function* () {
            const subscription = new entity_1.default({
                amount,
                name,
                type,
                dailyLimit,
                monthlyLimit,
            });
            yield subscription.save();
            return subscription;
        });
    }
    findSubscriptionById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const subscription = yield entity_1.default.findById(id);
            return subscription;
        });
    }
}
exports.subscriptionPlanService = new SubscriptionPlanService();
