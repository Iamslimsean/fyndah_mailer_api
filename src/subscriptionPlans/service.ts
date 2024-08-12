import mongoose from "mongoose";
import SubscriptionPlan from "./entity";
import { CustomRequest } from "../utils/interface";
import { userService } from "../user/service";

class SubscriptionPlanService {
  public async createSubscriptionPlan(
    amount: number,
    name: string,
    type: string,
    dailyLimit: number,
    monthlyLimit: number
  ) {
    const subscription = new SubscriptionPlan({
      amount,
      name,
      type,
      dailyLimit,
      monthlyLimit,
    });

    await subscription.save();

    return subscription;
  }

  public async findSubscriptionById(id: mongoose.Types.ObjectId) {
    const subscription = await SubscriptionPlan.findById(id);

    return subscription;
  }

  
}

export const subscriptionPlanService = new SubscriptionPlanService();
