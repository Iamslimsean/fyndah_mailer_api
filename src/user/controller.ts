import { Request, Response } from "express";
import mongoose from "mongoose";

import { MessageResponse } from "../utils/enum";
import { CustomRequest } from "../utils/interface";
import { userService } from "../user/service";
import { subscriptionPlanService } from "../subscriptionPlans/service";

class UserController {
  public async fetchUserData(req: Request, res: Response) {
    const { user_id } = req as CustomRequest;

    console.log(user_id);

    let user = await userService.findUserById(user_id);
    let retrivedSubscription;
    if (!user) {
      return res.status(404).json({
        message: MessageResponse.Error,
        description: `User not found!`,
        data: null,
      });
    }

    if (user.subscribed === true) {
      const subPlanId = new mongoose.Types.ObjectId(
        user.subscriptionPlanId!.toString()
      );
      retrivedSubscription = await subscriptionPlanService.findSubscriptionById(
        subPlanId
      );
    }

    const now = new Date();

    const lastEmailSentDate = new Date(user.lastEmailSentDate ?? now);

    if (now.getDate() !== lastEmailSentDate.getDate()) {
       // Reset daily email count if a new day
       user.dailyEmailsSent = 0;
       user.lastEmailSentDate = now;
       user = await user.save();
      }

    return res.status(200).json({
      message: MessageResponse.Success,
      description: "User information fetched",
      data: { userData: user, retrivedSubscription: retrivedSubscription },
    });
  }
}

export const userController = new UserController();
