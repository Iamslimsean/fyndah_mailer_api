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
exports.sendSingleEmail = exports.sendEmail = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const nodemailer_1 = __importDefault(require("nodemailer"));
dotenv_1.default.config();
const sendEmail = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const { receiverEmail, subject, emailTemplate, replyto } = input;
    const TransportMailService = (transporter, mailOptions) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    reject(false);
                }
                else {
                    resolve(info.response);
                }
            });
        });
    });
    const transporter = nodemailer_1.default.createTransport({
        host: process.env.HOST,
        port: Number(process.env.EMAIL_SSL_PORT),
        secure: true,
        auth: {
            user: process.env.USER,
            pass: process.env.PASSWORD,
        },
    });
    const mailOptions = {
        from: `Afrilab <${process.env.FROM}>`,
        to: receiverEmail,
        subject,
        html: emailTemplate,
        replyTo: replyto
    };
    yield TransportMailService(transporter, mailOptions);
});
exports.sendEmail = sendEmail;
const sendSingleEmail = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, subject, html, replyto } = req.body;
    return (0, exports.sendEmail)({
        receiverEmail: email,
        subject: subject,
        emailTemplate: html,
        replyto: replyto
    });
});
exports.sendSingleEmail = sendSingleEmail;
