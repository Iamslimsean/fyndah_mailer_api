import mongoose, { Schema} from "mongoose";

import { IAdmin } from "./inteface";


const adminSchema: Schema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  totalNumberOfEmailSentToday: {
    type: Number,
    default: 0
  },
  lastEmailSentDate: { type: Date, default: Date.now },
});

const User = mongoose.model<IAdmin>("Admin", adminSchema);

export default User;
