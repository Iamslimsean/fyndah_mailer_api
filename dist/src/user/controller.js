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
exports.userController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const enum_1 = require("../utils/enum");
const service_1 = require("../user/service");
const service_2 = require("../subscriptionPlans/service");
class UserController {
    fetchUserData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { user_id } = req;
            console.log(user_id);
            let user = yield service_1.userService.findUserById(user_id);
            let retrivedSubscription;
            if (!user) {
                return res.status(404).json({
                    message: enum_1.MessageResponse.Error,
                    description: `User not found!`,
                    data: null,
                });
            }
            if (user.subscribed === true) {
                const subPlanId = new mongoose_1.default.Types.ObjectId(user.subscriptionPlanId.toString());
                retrivedSubscription = yield service_2.subscriptionPlanService.findSubscriptionById(subPlanId);
            }
            const now = new Date();
            const lastEmailSentDate = new Date((_a = user.lastEmailSentDate) !== null && _a !== void 0 ? _a : now);
            if (now.getDate() !== lastEmailSentDate.getDate()) {
                // Reset daily email count if a new day
                user.dailyEmailsSent = 0;
                user.lastEmailSentDate = now;
                user = yield user.save();
            }
            return res.status(200).json({
                message: enum_1.MessageResponse.Success,
                description: "User information fetched",
                data: { userData: user, retrivedSubscription: retrivedSubscription },
            });
        });
    }
}
exports.userController = new UserController();
