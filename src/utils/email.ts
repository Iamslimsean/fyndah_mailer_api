import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { Request } from "express";

import { ISendEmail } from "./interface";

dotenv.config();

export const sendEmail = async (input: ISendEmail) => {
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
    host: process.env.HOST,
    port: Number(process.env.EMAIL_SSL_PORT),
    secure: true,
    auth: {
      user:  process.env.USER,
      pass:  process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: `Afrilab <${process.env.FROM}>`,
    to: receiverEmail,
    subject,
    html: emailTemplate,
    replyTo: replyto
  };

  await TransportMailService(transporter, mailOptions);
};


export const sendSingleEmail = async (req: Request) => {
  const { email, subject, html, replyto } = req.body;

  return sendEmail({
    receiverEmail: email,
    subject: subject,
    emailTemplate: html,
    replyto: replyto
  });
};
