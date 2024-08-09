import { Document } from "mongoose";


export interface IUser extends Document {
  userName: string;
  password: string;
  site_id: string;
  totalNumberOfEmailSentToday: number;
  lastEmailSentDate: Date;
}