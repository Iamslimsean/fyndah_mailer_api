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
exports.emailController = void 0;
const enum_1 = require("../utils/enum");
const email_1 = require("../utils/email");
const service_1 = require("../user/service");
const service_2 = require("../subscriptionPlans/service");
class EmailController {
    sendEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            //await sendSingleEmail(req);
            return res.status(200).json({
                message: enum_1.MessageResponse.Success,
                description: `Email sent to ==> ${email}`,
                data: null,
            });
        });
    }
    sendEmailWithCrackMailer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user_id } = req;
            const { email } = req.body;
            console.log(user_id);
            let user = yield service_1.userService.findUserById(user_id);
            if (!user) {
                return res.status(404).json({
                    message: enum_1.MessageResponse.Error,
                    description: `User not found!`,
                    data: null,
                });
            }
            if (user.freeEmailSendingForNewUsers !== 0) {
                user.freeEmailSendingForNewUsers -= 1;
                yield user.save();
                // await sendEmailForCrackMailer(req);
                return res.status(200).json({
                    message: enum_1.MessageResponse.Success,
                    description: `Email sent to ==> ${email}`,
                    data: null,
                });
            }
            if (user.subscribed === false) {
                return res.status(400).json({
                    message: enum_1.MessageResponse.Error,
                    description: "Please upgrade to continue sending email.",
                    data: null,
                });
            }
            if (user.expired === true) {
                return res.status(400).json({
                    message: enum_1.MessageResponse.Error,
                    description: "Your subscription has expired.",
                    data: null,
                });
            }
            const retrivedSubscription = yield service_2.subscriptionPlanService.findSubscriptionById(user.subscriptionPlanId);
            if (!retrivedSubscription) {
                return res.status(404).json({
                    message: enum_1.MessageResponse.Error,
                    description: "This subscription plan does not exits or deleted",
                    data: null,
                });
            }
            const now = new Date();
            const subscriptionExpiryDate = new Date(user.subscriptionExpiryDate);
            if (subscriptionExpiryDate < now) {
                user.expired = true;
                yield user.save();
                return res.status(400).json({
                    message: enum_1.MessageResponse.Error,
                    description: "Your subscription has expired.",
                    data: null,
                });
            }
            if (user.totalEmailsSent > retrivedSubscription.monthlyLimit) {
                user.expired = true;
                yield user.save();
                return res.status(400).json({
                    message: enum_1.MessageResponse.Error,
                    description: "Your have hit your monthly limit, please subscribe.",
                    data: null,
                });
            }
            const lastEmailSentDate = new Date(user.lastEmailSentDate);
            if (now.getDate() === lastEmailSentDate.getDate()) {
                if (user.dailyEmailsSent > retrivedSubscription.dailyLimit) {
                    return res.status(429).json({
                        message: enum_1.MessageResponse.Error,
                        description: "Daily email limit exceeded. Please try again tomorrow.",
                        data: null,
                    });
                }
                else {
                    user.dailyEmailsSent += 1;
                }
            }
            else {
                // Reset daily email count if a new day
                user.dailyEmailsSent = 1;
                user.lastEmailSentDate = now;
            }
            user.totalEmailsSent += 1;
            yield user.save();
            // await sendEmailForCrackMailer(req);
            return res.status(200).json({
                message: enum_1.MessageResponse.Success,
                description: `Email sent to ==> ${email}`,
                data: null,
            });
        });
    }
    //   if (now.getDate() === lastEmailSentDate.getDate() && user.dailyEmailsSent < retrivedSubscription.dailyLimit) {
    //     user.dailyEmailsSent += 1;
    //     user.totalEmailsSent += 1;
    //     user.lastEmailSentDate = currentDate;
    //     await user.save();
    //   // await sendEmailForCrackMailer(req);
    //   } else {
    //     user.lastEmailSentDate = currentDate;
    //     user.dailyEmailsSent = 0;
    //     await user.save();
    //   }
    //   return res.status(200).json({
    //     message: MessageResponse.Success,
    //     description: `Email sent to ==> ${email}`,
    //     data: null,
    //   });
    // }
    sendAuthEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user_id } = req;
            const { email } = req.body;
            let user = yield service_1.userService.findUserById(user_id);
            if (!user) {
                return res.status(404).json({
                    message: enum_1.MessageResponse.Error,
                    description: `User not found!`,
                    data: null,
                });
            }
            const currentDate = new Date();
            const lastEmailSentDate = new Date(user.lastEmailSentDate);
            // console.log(currentDate, lastEmailSentDate);
            if (lastEmailSentDate < currentDate) {
                if (user.dailyEmailsSent < 5000) {
                    user.dailyEmailsSent += 1;
                }
            }
            else {
                user.lastEmailSentDate = new Date();
                user.dailyEmailsSent = 0;
            }
            yield user.save();
            if (lastEmailSentDate < currentDate && user.dailyEmailsSent < 5000) {
                if (user.site_id === enum_1.SitesId.FyndahMailer) {
                    yield (0, email_1.sendEmailForFyndah)(req);
                }
                else if (user.site_id === enum_1.SitesId.FyndahMailerNewsletter) {
                    yield (0, email_1.sendEmailForFyndahNewsLetter)(req);
                }
                else if (user.site_id === enum_1.SitesId.CrackMailer) {
                    yield (0, email_1.sendEmailForCrackMailer)(req);
                }
                else {
                    return res.status(400).json({
                        message: enum_1.MessageResponse.Error,
                        description: `Invalid website`,
                        data: null,
                    });
                }
                return res.status(200).json({
                    message: enum_1.MessageResponse.Success,
                    description: `Email sent to ==> ${email}`,
                    data: null,
                });
            }
            return res.status(400).json({
                message: enum_1.MessageResponse.Error,
                description: `Daily Limit Exceeded!`,
                data: null,
            });
        });
    }
}
exports.emailController = new EmailController();
