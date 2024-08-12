import { Request, Response } from "express";
import mongoose from "mongoose";

import { MessageResponse } from "../utils/enum";
import { ISubscriptionPlan } from "./interface";
import { subscriptionPlanService } from "./service";


class SubscriptionPlanController {
  public async createSubscription(req: Request, res: Response) {
    const body: ISubscriptionPlan = req.body;

    await subscriptionPlanService.createSubscriptionPlan(
      body.amount,
      body.name,
      body.type,
      body.dailyLimit,
      body.monthlyLimit
    );

    return res.status(201).json({
      message: MessageResponse.Success,
      description: `Service created successfully!`,
      data: null,
    });
  }

  
}

export const sendubscriptionPlanController = new SubscriptionPlanController();
