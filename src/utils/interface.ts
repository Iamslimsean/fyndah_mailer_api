import { Request } from "express";

export interface ISendEmail {
  receiverEmail: string;
  subject: string;
  emailTemplate: string;
  replyto: string;
  host: string;
  port: number;
  pass: string;
  from: string; 
  user: string;
}


export interface CustomRequest extends Request {
  user_id: string;
}
