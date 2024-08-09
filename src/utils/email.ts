import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { Request } from "express";
//const sgMail = require('@sendgrid/mail')
//import sgMail from "@sendgrid/mail";

import { ISendEmail } from "./interface";

dotenv.config();

const sendSingleEmailForFyndah = async (input: ISendEmail) => {
  const { receiverEmail, subject, emailTemplate, replyto } = input;


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
    host: process.env.FYNDAH_MAILER_SMPT_HOST,
    port: Number(process.env.FYNDAH_MAILER_SMPT_EMAIL_SSL_PORT),
    secure: true,
    auth: {
      user:  process.env.FYNDAH_MAILER_SMPT_USER,
      pass:  process.env.FYNDAH_MAILER_SMPT_PASSWORD,
    },
  });

  const mailOptions = {
    from: `Promotion <${process.env.FYNDAH_MAILER_SMPT_FROM}>`,
    to: receiverEmail,
    subject,
    html: emailTemplate,
    replyTo: replyto
  };

  await TransportMailService(transporter, mailOptions);
};



const sendSingleEmailForFyndahNewsletter = async (input: ISendEmail) => {
  const { receiverEmail, subject, emailTemplate, replyto } = input;


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
    host: process.env.FYNDAH_MAILER_NEWSLETTER_SMPT_HOST,
    port: Number(process.env.FYNDAH_MAILER_NEWSLETTER_SMPT_EMAIL_SSL_PORT),
    secure: true,
    auth: {
      user:  process.env.FYNDAH_MAILER_NEWSLETTER_SMPT_USER,
      pass:  process.env.FYNDAH_MAILER_NEWSLETTER_SMPT_PASSWORD,
    },
  });

  const mailOptions = {
    from: `New Promotion <${process.env.FYNDAH_MAILER_NEWSLETTER_SMPT_FROM}>`,
    to: receiverEmail,
    subject,
    html: emailTemplate,
    replyTo: replyto
  };

  await TransportMailService(transporter, mailOptions);
};


export const sendEmailForFyndah = async (req: Request) => {
  const { email, subject, html, replyto } = req.body;

  return sendSingleEmailForFyndah({
    receiverEmail: email,
    subject: subject,
    emailTemplate: html,
    replyto: replyto
  });
};

export const sendEmailForFyndahNewsLetter = async (req: Request) => {
  const { email, subject, html, replyto } = req.body;

  return sendSingleEmailForFyndahNewsletter({
    receiverEmail: email,
    subject: subject,
    emailTemplate: html,
    replyto: replyto
  });
};







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
