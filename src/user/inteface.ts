import mongoose from "mongoose";

export interface IUser {
  email: string;
  userName: string;
  password: string;
  site_id: string;
  dailyEmailsSent: number;
  lastEmailSentDate: Date | null;
  subscriptionPlanId: mongoose.Types.ObjectId | null;
  subscribed: boolean;
  freeEmailSendingForNewUsers: number;
  expired: boolean;
  lastMonthlyEmailReset: Date;
  subscriptionExpiryDate: Date | null;
  totalEmailsSent: number;
  subscriptionTxRef: string
}