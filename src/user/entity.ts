import mongoose, { Schema } from "mongoose";

import { IUser } from "./inteface";

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  site_id: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  freeEmailSendingForNewUsers: {
    type: Number,
    default: 10,
  },
  subscriptionTxRef: {
    type: String,
    default: null,
  },
  subscribed: {
    type: Boolean,
    default: false,
  },
  expired: {
    type: Boolean,
    default: false,
  },
  subscriptionPlanId: {
    type: mongoose.Types.ObjectId,
    default: null,
  },
  subscriptionExpiryDate: { type: Date, default: null },
  dailyEmailsSent: {
    type: Number,
    default: 0,
  },
  totalEmailsSent: {
    type: Number,
    default: 0,
  },
  lastEmailSentDate: { type: Date, default: null },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
