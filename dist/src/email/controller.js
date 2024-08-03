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
const service_1 = require("../admin/service");
class EmailController {
    sendEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            yield (0, email_1.sendSingleEmail)(req);
            return res.status(200).json({
                message: enum_1.MessageResponse.Success,
                description: `Email sent to ==> ${email}`,
                data: null,
            });
        });
    }
    sendAuthEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user_id } = req;
            const { email } = req.body;
            let user = yield service_1.adminService.findUserById(user_id);
            if (!user) {
                return res.status(404).json({
                    message: enum_1.MessageResponse.Error,
                    description: `User not found!`,
                    data: null,
                });
            }
            const currentDate = new Date();
            const lastEmailSentDate = new Date(user.lastEmailSentDate);
            console.log(currentDate, lastEmailSentDate);
            if (lastEmailSentDate < currentDate) {
                user.totalNumberOfEmailSentToday += 1;
            }
            else {
                user.lastEmailSentDate = new Date();
                user.totalNumberOfEmailSentToday = 0;
            }
            yield user.save();
            if (lastEmailSentDate < currentDate && user.totalNumberOfEmailSentToday < 5000) {
                yield (0, email_1.sendSingleEmail)(req);
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
