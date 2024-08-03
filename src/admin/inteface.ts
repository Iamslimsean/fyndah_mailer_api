import { Document } from "mongoose";


export interface IAdmin extends Document {
  userName: string;
  password: string;
  totalNumberOfEmailSentToday: number;
  lastEmailSentDate: Date;
}