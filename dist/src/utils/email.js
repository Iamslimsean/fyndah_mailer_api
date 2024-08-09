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
//const sgMail = require('@sendgrid/mail')
const mail_1 = __importDefault(require("@sendgrid/mail"));
dotenv_1.default.config();
const sendEmail = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const { receiverEmail, subject, emailTemplate, replyto } = input;
    mail_1.default.setApiKey(process.env.SENDGRID_API_KEY.toString());
    const msg = {
        to: receiverEmail, // Change to your recipient
        from: `Afrilab <${process.env.FROM}>`, // Change to your verified sender
        subject: subject,
        replyTo: replyto,
        // text: 'and easy to do anywhere, even with Node.js',
        html: emailTemplate,
    };
    mail_1.default.send(msg)
        .then(() => {
        console.log('Email sent');
    })
        .catch((error) => {
        console.log(error);
        new Error(error);
    });
    // const TransportMailService = async (transporter: any, mailOptions: any) => {
    //   return new Promise((resolve, reject) => {
    //     transporter.sendMail(mailOptions, function (error: any, info: any) {
    //       if (error) {
    //         reject(false);
    //       } else {
    //         resolve(info.response);
    //       }
    //     });
    //   });
    // };
    // const transporter = nodemailer.createTransport({
    //   host: process.env.HOST,
    //   port: Number(process.env.EMAIL_SSL_PORT),
    //   secure: true,
    //   auth: {
    //     user:  process.env.USER,
    //     pass:  process.env.PASSWORD,
    //   },
    // });
    // const mailOptions = {
    //   from: `Afrilab <${process.env.FROM}>`,
    //   to: receiverEmail,
    //   subject,
    //   html: emailTemplate,
    //   replyTo: replyto
    // };
    // await TransportMailService(transporter, mailOptions);
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
