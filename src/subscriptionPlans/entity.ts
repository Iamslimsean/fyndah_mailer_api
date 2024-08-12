import mongoose, { Schema } from "mongoose";

import { ISubscriptionPlan } from "./interface";

const subscripionPlanSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["monthly", "yearly"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  dailyLimit: {
    type: Number,
    required: true,
  },
  monthlyLimit: {
    type: Number,
    required: true,
  },
});

const SubscriptionPlan = mongoose.model<ISubscriptionPlan>(
  "SubscriptionPlan",
  subscripionPlanSchema
);

export default SubscriptionPlan;
