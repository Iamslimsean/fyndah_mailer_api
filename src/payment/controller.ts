import mongoose from "mongoose";
import dotenv from "dotenv";

import { Request, Response } from "express";

import { CustomRequest } from "../utils/interface";
import FlutterwaveService from "./service";
import { MessageResponse } from "../utils/enum";
import { userService } from "../user/service";

import { subscriptionPlanService } from "../subscriptionPlans/service";

dotenv.config();

const clientUrl = process.env.CLIENT_URL;

class PaymentController {
  public async payment(req: Request, res: Response) {
    const { user_id } = req as CustomRequest;
    const params = req.params;

    const user = await userService.findUserById(user_id);

    if (!user) {
      return res.status(404).json({
        message: MessageResponse.Error,
        description: `User not found!`,
        data: null,
      });
    }

    const subscription = await subscriptionPlanService.findSubscriptionById(
      new mongoose.Types.ObjectId(params.subPlanId)
    );

    if (!subscription) {
      return res.status(404).json({
        message: MessageResponse.Error,
        description: `Subscription not found!`,
        data: null,
      });
    }

    const paymentData = {
      tx_ref: "MC-" + Date.now(),
      amount: subscription.amount,
      currency: "NGN",
      redirect_url: `${clientUrl}/auth/payment-verification.html`,
      customer: {
        email: user.email,
        // phonenumber: req.body.phonenumber,
        name: user.userName,
      },
      // customizations: {
      //   title: `Payment for ${subscription.name}`,
      //   description: "Payment for XYZ services",
      // },
    };

    const paymentResponse = await FlutterwaveService.initiatePayment(
      paymentData
    );

    user.subscriptionTxRef = paymentData.tx_ref;
    user.subscriptionPlanId = subscription._id;

    await user.save();

    res.status(201).json({
      message: MessageResponse.Success,
      description: "Payment Initiated",
      data: paymentResponse.data.data,
    });
  }

  public async verifyPayment(req: Request, res: Response) {
    const transactionId = req.params.transactionId;
    const txRef: string = req.body.txRef;

    const user = await userService.findUserBySubscriptionTxRef(txRef);

    if (!user) {
      return res.status(404).json({
        message: MessageResponse.Error,
        description: "Transaction reference is invalid",
        data: null,
      });
    }

      const verificationResponse = await FlutterwaveService.verifyPayment(
        transactionId
      );

      const currentDate = new Date();
      const oneMonthExpiryDate = new Date(currentDate);
      oneMonthExpiryDate.setDate(currentDate.getDate() + 30);

      user.subscribed = true;
      user.expired = false;
      user.subscriptionExpiryDate = oneMonthExpiryDate;
      user.lastEmailSentDate = currentDate;

      await user.save();

      return res.status(200).json(verificationResponse);
   
  }
}

export const paymentController = new PaymentController();
