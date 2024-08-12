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
exports.paymentController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const service_1 = __importDefault(require("./service"));
const enum_1 = require("../utils/enum");
const service_2 = require("../user/service");
const service_3 = require("../subscriptionPlans/service");
dotenv_1.default.config();
const clientUrl = process.env.CLIENT_URL;
class PaymentController {
    payment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user_id } = req;
            const params = req.params;
            const user = yield service_2.userService.findUserById(user_id);
            if (!user) {
                return res.status(404).json({
                    message: enum_1.MessageResponse.Error,
                    description: `User not found!`,
                    data: null,
                });
            }
            const subscription = yield service_3.subscriptionPlanService.findSubscriptionById(new mongoose_1.default.Types.ObjectId(params.subPlanId));
            if (!subscription) {
                return res.status(404).json({
                    message: enum_1.MessageResponse.Error,
                    description: `Subscription not found!`,
                    data: null,
                });
            }
            const paymentData = {
                tx_ref: "MC-" + Date.now(),
                amount: subscription.amount,
                currency: "NGN",
                redirect_url: `${clientUrl}/auth/payment-verification.html`,
                customer: {
                    email: user.email,
                    // phonenumber: req.body.phonenumber,
                    name: user.userName,
                },
                // customizations: {
                //   title: `Payment for ${subscription.name}`,
                //   description: "Payment for XYZ services",
                // },
            };
            const paymentResponse = yield service_1.default.initiatePayment(paymentData);
            user.subscriptionTxRef = paymentData.tx_ref;
            user.subscriptionPlanId = subscription._id;
            yield user.save();
            res.status(201).json({
                message: enum_1.MessageResponse.Success,
                description: "Payment Initiated",
                data: paymentResponse.data.data,
            });
        });
    }
    verifyPayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const transactionId = req.params.transactionId;
            const txRef = req.body.txRef;
            const user = yield service_2.userService.findUserBySubscriptionTxRef(txRef);
            if (!user) {
                return res.status(404).json({
                    message: enum_1.MessageResponse.Error,
                    description: "Transaction reference is invalid",
                    data: null,
                });
            }
            const verificationResponse = yield service_1.default.verifyPayment(transactionId);
            const currentDate = new Date();
            const oneMonthExpiryDate = new Date(currentDate);
            oneMonthExpiryDate.setDate(currentDate.getDate() + 30);
            user.subscribed = true;
            user.expired = false;
            user.subscriptionExpiryDate = oneMonthExpiryDate;
            user.lastEmailSentDate = currentDate;
            yield user.save();
            return res.status(200).json(verificationResponse);
        });
    }
}
exports.paymentController = new PaymentController();
