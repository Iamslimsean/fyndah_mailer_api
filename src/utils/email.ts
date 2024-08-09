import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { Request } from "express";
//const sgMail = require('@sendgrid/mail')
import sgMail from "@sendgrid/mail";

import { ISendEmail } from "./interface";

dotenv.config();

export const sendEmail = async (input: ISendEmail) => {
  const { receiverEmail, subject, emailTemplate, replyto } = input;


  
sgMail.setApiKey(process.env.SENDGRID_API_KEY!.toString())
const msg = {
  to: receiverEmail, // Change to your recipient
  from: `Afrilab <${process.env.FROM}>`, // Change to your verified sender
  subject: subject,
  replyTo: replyto,
 // text: 'and easy to do anywhere, even with Node.js',
  html: emailTemplate,
}
sgMail.send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.log(error);
    new Error(error);
  })

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
