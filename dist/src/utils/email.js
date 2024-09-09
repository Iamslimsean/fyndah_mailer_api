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
exports.sendEmailForCrackMailer = exports.sendEmailForFyndahNewsLetter = exports.sendEmailForFyndah = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const nodemailer_1 = __importDefault(require("nodemailer"));
dotenv_1.default.config();
// const sendEmail = async (input: ISendEmail) => {
//   const { receiverEmail, subject, emailTemplate, replyto, host, port, pass, user, from } = input;
//   const TransportMailService = async (transporter: any, mailOptions: any) => {
//     return new Promise((resolve, reject) => {
//       transporter.sendMail(mailOptions, function (error: any, info: any) {
//         if (error) {
//           reject(false);
//         } else {
//           resolve(info.response);
//         }
//       });
//     });
//   };
//   const transporter = nodemailer.createTransport({
//     host: host,
//     port: port,
//     secure: true,
//     auth: {
//       user:  user,
//       pass:  pass,
//     },
//   });
//   const mailOptions = {
//     from: `Promotion <${from}>`,
//     to: receiverEmail,
//     subject,
//     html: emailTemplate,
//     replyTo: replyto
//   };
//   await TransportMailService(transporter, mailOptions);
// };
const sendEmail = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const { receiverEmail, subject, emailTemplate, replyto, host, port, pass, user, from } = input;
    const TransportMailService = (transporter, mailOptions) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    reject(false); // Reject with false on error
                }
                else {
                    resolve(info.response); // Resolve with the response on success
                }
            });
        });
    });
    const transporter = nodemailer_1.default.createTransport({
        host: host,
        port: port,
        secure: true,
        auth: {
            user: user,
            pass: pass,
        },
    });
    const mailOptions = {
        from: `Promotion <${from}>`,
        to: receiverEmail,
        subject,
        html: emailTemplate,
        replyTo: replyto,
    };
    try {
        yield TransportMailService(transporter, mailOptions);
    }
    catch (error) {
        return;
    }
    // Any code here will only run if the email was sent successfully
    console.log('Email sent successfully.');
});
const sendEmailForFyndah = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, subject, html, replyto } = req.body;
    return sendEmail({
        receiverEmail: email,
        subject: subject,
        emailTemplate: html,
        replyto: replyto,
        host: process.env.FYNDAH_MAILER_SMPT_HOST.toString(),
        port: Number(process.env.FYNDAH_MAILER_SMPT_EMAIL_SSL_PORT),
        pass: process.env.FYNDAH_MAILER_SMPT_PASSWORD.toString(),
        user: process.env.FYNDAH_MAILER_SMPT_USER.toString(),
        from: process.env.FYNDAH_MAILER_SMPT_FROM.toString()
    });
});
exports.sendEmailForFyndah = sendEmailForFyndah;
const sendEmailForFyndahNewsLetter = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, subject, html, replyto } = req.body;
    return sendEmail({
        receiverEmail: email,
        subject: subject,
        emailTemplate: html,
        replyto: replyto,
        host: process.env.FYNDAH_MAILER_NEWSLETTER_SMPT_HOST.toString(),
        port: Number(process.env.FYNDAH_MAILER_NEWSLETTER_SMPT_EMAIL_SSL_PORT),
        pass: process.env.FYNDAH_MAILER_NEWSLETTER_SMPT_PASSWORD.toString(),
        user: process.env.FYNDAH_MAILER_NEWSLETTER_SMPT_USER.toString(),
        from: process.env.FYNDAH_MAILER_NEWSLETTER_SMPT_FROM.toString()
    });
});
exports.sendEmailForFyndahNewsLetter = sendEmailForFyndahNewsLetter;
const sendEmailForCrackMailer = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, subject, html, replyto } = req.body;
    return sendEmail({
        receiverEmail: email,
        subject: subject,
        emailTemplate: html,
        replyto: replyto,
        host: process.env.CRACK_MAILER_SMPT_HOST.toString(),
        port: Number(process.env.CRACK_MAILER_SMPT_EMAIL_SSL_PORT),
        pass: process.env.CRACK_MAILER_SMPT_PASSWORD.toString(),
        user: process.env.CRACK_MAILER_SMPT_USER.toString(),
        from: process.env.CRACK_MAILER_SMPT_FROM.toString()
    });
});
exports.sendEmailForCrackMailer = sendEmailForCrackMailer;
// const sendSingleEmailForFyndahNewsletter = async (input: ISendEmail) => {
//   const { receiverEmail, subject, emailTemplate, replyto } = input;
//   const TransportMailService = async (transporter: any, mailOptions: any) => {
//     return new Promise((resolve, reject) => {
//       transporter.sendMail(mailOptions, function (error: any, info: any) {
//         if (error) {
//           reject(false);
//         } else {
//           resolve(info.response);
//         }
//       });
//     });
//   };
//   const transporter = nodemailer.createTransport({
//     host: process.env.FYNDAH_MAILER_NEWSLETTER_SMPT_HOST,
//     port: Number(process.env.FYNDAH_MAILER_NEWSLETTER_SMPT_EMAIL_SSL_PORT),
//     secure: true,
//     auth: {
//       user:  process.env.FYNDAH_MAILER_NEWSLETTER_SMPT_USER,
//       pass:  process.env.FYNDAH_MAILER_NEWSLETTER_SMPT_PASSWORD,
//     },
//   });
//   const mailOptions = {
//     from: `New Promotion <${process.env.FYNDAH_MAILER_NEWSLETTER_SMPT_FROM}>`,
//     to: receiverEmail,
//     subject,
//     html: emailTemplate,
//     replyTo: replyto
//   };
//   await TransportMailService(transporter, mailOptions);
// };
// const sendSingleEmailForCrackMailer = async (input: ISendEmail) => {
//   const { receiverEmail, subject, emailTemplate, replyto } = input;
//   const TransportMailService = async (transporter: any, mailOptions: any) => {
//     return new Promise((resolve, reject) => {
//       transporter.sendMail(mailOptions, function (error: any, info: any) {
//         if (error) {
//           reject(false);
//         } else {
//           resolve(info.response);
//         }
//       });
//     });
//   };
//   const transporter = nodemailer.createTransport({
//     host: process.env.CRACK_MAILER_SMPT_HOST,
//     port: Number(process.env.CRACK_MAILER_SMPT_EMAIL_SSL_PORT),
//     secure: true,
//     auth: {
//       user:  process.env.CRACK_MAILER_SMPT_USER,
//       pass:  process.env.CRACK_MAILER_SMPT_PASSWORD,
//     },
//   });
//   const mailOptions = {
//     from: `<${process.env.CRACK_MAILER_SMPT_FROM}>`,
//     to: receiverEmail,
//     subject,
//     html: emailTemplate,
//     replyTo: replyto
//   };
//   await TransportMailService(transporter, mailOptions);
// };
// sgMail.setApiKey(process.env.SENDGRID_API_KEY!.toString())
// const msg = {
//   to: receiverEmail, // Change to your recipient
//   from: `Afrilab <${process.env.FROM}>`, // Change to your verified sender
//   subject: subject,
//   replyTo: replyto,
//  // text: 'and easy to do anywhere, even with Node.js',
//   html: emailTemplate,
// }
// sgMail.send(msg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.log(error);
//     new Error(error);
//   })
