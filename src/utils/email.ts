import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { Request } from "express";
//const sgMail = require('@sendgrid/mail')
//import sgMail from "@sendgrid/mail";

import { ISendEmail } from "./interface";

dotenv.config();

const sendEmail = async (input: ISendEmail) => {
  const { receiverEmail, subject, emailTemplate, replyto, host, port, pass, user, from } = input;


  const TransportMailService = async (transporter: any, mailOptions: any) => {
    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, function (error: any, info: any) {
        if (error) {
          reject(false);
        } else {
          resolve(info.response);
        }
      });
    });
  };

  const transporter = nodemailer.createTransport({
    host: host,
    port: port,
    secure: true,
    auth: {
      user:  user,
      pass:  pass,
    },
  });

  const mailOptions = {
    from: `Promotion <${from}>`,
    to: receiverEmail,
    subject,
    html: emailTemplate,
    replyTo: replyto
  };

  await TransportMailService(transporter, mailOptions);
};


export const sendEmailForFyndah = async (req: Request) => {
  const { email, subject, html, replyto } = req.body;

  return sendEmail({
    receiverEmail: email,
    subject: subject,
    emailTemplate: html,
    replyto: replyto,
    host: process.env.FYNDAH_MAILER_SMPT_HOST!.toString(),
    port: Number(process.env.FYNDAH_MAILER_SMPT_EMAIL_SSL_PORT),
    pass: process.env.FYNDAH_MAILER_SMPT_PASSWORD!.toString(),
    user: process.env.FYNDAH_MAILER_SMPT_USER!.toString(),
    from: process.env.FYNDAH_MAILER_SMPT_FROM!.toString()
  });
};

export const sendEmailForFyndahNewsLetter = async (req: Request) => {
  const { email, subject, html, replyto } = req.body;

  return sendEmail({
    receiverEmail: email,
    subject: subject,
    emailTemplate: html,
    replyto: replyto,
    host: process.env.FYNDAH_MAILER_NEWSLETTER_SMPT_HOST!.toString(),
    port: Number(process.env.FYNDAH_MAILER_NEWSLETTER_SMPT_EMAIL_SSL_PORT),
    pass: process.env.FYNDAH_MAILER_NEWSLETTER_SMPT_PASSWORD!.toString(),
    user: process.env.FYNDAH_MAILER_NEWSLETTER_SMPT_USER!.toString(),
    from: process.env.FYNDAH_MAILER_NEWSLETTER_SMPT_FROM!.toString()
  });
};


export const sendEmailForCrackMailer = async (req: Request) => {
  const { email, subject, html, replyto } = req.body;

  return sendEmail({
    receiverEmail: email,
    subject: subject,
    emailTemplate: html,
    replyto: replyto,
    host: process.env.CRACK_MAILER_SMPT_HOST!.toString(),
    port: Number(process.env.CRACK_MAILER_SMPT_EMAIL_SSL_PORT),
    pass: process.env.CRACK_MAILER_SMPT_PASSWORD!.toString(),
    user: process.env.CRACK_MAILER_SMPT_USER!.toString(),
    from: process.env.CRACK_MAILER_SMPT_FROM!.toString()
  });
};



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
