import mongoose, { Schema } from "mongoose";

import { IUser } from "./inteface";

const userSchema: Schema = new Schema({
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
  totalNumberOfEmailSentToday: {
    type: Number,
    default: 0,
  },
  lastEmailSentDate: { type: Date, default: Date.now },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
