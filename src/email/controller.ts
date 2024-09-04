import { Request, Response } from "express";
import mongoose from "mongoose";

import { MessageResponse, SitesId } from "../utils/enum";
import {
  sendEmailForFyndah,
  sendEmailForFyndahNewsLetter,
  sendEmailForCrackMailer,
} from "../utils/email";
import { CustomRequest } from "../utils/interface";
import { userService } from "../user/service";
import { subscriptionPlanService } from "../subscriptionPlans/service";

class EmailController {
  public async sendEmail(req: Request, res: Response) {
    const { email } = req.body;

    //await sendSingleEmail(req);

    return res.status(200).json({
      message: MessageResponse.Success,
      description: `Email sent to ==> ${email}`,
      data: null,
    });
  }

  public async sendEmailWithCrackMailer(req: Request, res: Response) {
    const { user_id } = req as CustomRequest;
    const { email } = req.body;

    console.log(user_id);

    let user = await userService.findUserById(user_id);

    if (!user) {
      return res.status(404).json({
        message: MessageResponse.Error,
        description: `User not found!`,
        data: null,
      });
    }

    if (user.freeEmailSendingForNewUsers !== 0) {
      user.freeEmailSendingForNewUsers -= 1;

      await user.save();

      await sendEmailForCrackMailer(req);

      return res.status(200).json({
        message: MessageResponse.Success,
        description: `Email sent to ==> ${email}`,
        data: { userData: user },
      });
    }

    if (user.subscribed === false) {
      return res.status(400).json({
        message: MessageResponse.Error,
        description: "Please upgrade to continue sending email.",
        data: null,
      });
    }

    if (user.expired === true) {
      return res.status(400).json({
        message: MessageResponse.Error,
        description: "Your subscription has expired.",
        data: null,
      });
    }

    const retrivedSubscription =
      await subscriptionPlanService.findSubscriptionById(
        user.subscriptionPlanId as mongoose.Types.ObjectId
      );

    if (!retrivedSubscription) {
      return res.status(404).json({
        message: MessageResponse.Error,
        description: "This subscription plan does not exits or deleted",
        data: null,
      });
    }

    const now = new Date();

    const subscriptionExpiryDate = new Date(
      user.subscriptionExpiryDate as Date
    );

    if (subscriptionExpiryDate < now) {
      user.expired = true;

      await user.save();

      return res.status(400).json({
        message: MessageResponse.Error,
        description: "Your subscription has expired.",
        data: null,
      });
    }

    if (user.totalEmailsSent > retrivedSubscription.monthlyLimit) {
      user.expired = true;
      await user.save();

      return res.status(400).json({
        message: MessageResponse.Error,
        description: "Your have hit your monthly limit, please subscribe.",
        data: null,
      });
    }

    //We check if it has no daily limit
    if (retrivedSubscription.dailyLimit !== 0) {
      const lastEmailSentDate = new Date(user.lastEmailSentDate as Date);

      if (now.getDate() === lastEmailSentDate.getDate()) {
        if (user.dailyEmailsSent > retrivedSubscription.dailyLimit) {
          return res.status(429).json({
            message: MessageResponse.Error,
            description:
              "Daily email limit exceeded. Please try again tomorrow.",
            data: null,
          });
        } else {
          user.dailyEmailsSent += 1;
        }
      } else {
        // Reset daily email count if a new day
        user.dailyEmailsSent = 1;
        user.lastEmailSentDate = now;
      }
    }

    user.totalEmailsSent += 1;
    await user.save();

    await sendEmailForCrackMailer(req);

    return res.status(200).json({
      message: MessageResponse.Success,
      description: `Email sent to ==> ${email}`,
      data: { userData: user, retrivedSubscription: retrivedSubscription },
    });
  }

  //   if (now.getDate() === lastEmailSentDate.getDate() && user.dailyEmailsSent < retrivedSubscription.dailyLimit) {
  //     user.dailyEmailsSent += 1;
  //     user.totalEmailsSent += 1;
  //     user.lastEmailSentDate = currentDate;
  //     await user.save();
  //   // await sendEmailForCrackMailer(req);
  //   } else {
  //     user.lastEmailSentDate = currentDate;
  //     user.dailyEmailsSent = 0;
  //     await user.save();
  //   }

  //   return res.status(200).json({
  //     message: MessageResponse.Success,
  //     description: `Email sent to ==> ${email}`,
  //     data: null,
  //   });
  // }

  public async sendAuthEmail(req: Request, res: Response) {
    const { user_id } = req as CustomRequest;
    const { email } = req.body;

    let user = await userService.findUserById(user_id);

    if (!user) {
      return res.status(404).json({
        message: MessageResponse.Error,
        description: `User not found!`,
        data: null,
      });
    }

    const currentDate = new Date();
    const lastEmailSentDate = new Date(user.lastEmailSentDate as Date);
    // console.log(currentDate, lastEmailSentDate);

    // if (lastEmailSentDate < currentDate) {
    //   if (user.dailyEmailsSent < 5000) {
    //     user.dailyEmailsSent += 1;
    //   }
    // } else {
    //   user.lastEmailSentDate = new Date();
    //   user.dailyEmailsSent = 0;
    // }

    if (currentDate.getDate() === lastEmailSentDate.getDate()) {
      const dailyLimit = user.site_id === SitesId.FyndahMailer ? 5000 : 10000;
      if (user.dailyEmailsSent > dailyLimit) {
        return res.status(429).json({
          message: MessageResponse.Error,
          description: "Daily email limit exceeded. Please try again tomorrow.",
          data: null,
        });
      } else {
        user.dailyEmailsSent += 1;
      }
    } else {
      // Reset daily email count if a new day
      user.dailyEmailsSent = 1;
      user.lastEmailSentDate = currentDate;
    }

    user.totalEmailsSent += 1;
    await user.save();

    if (lastEmailSentDate < currentDate && user.dailyEmailsSent < 5000) {
    if (user.site_id === SitesId.FyndahMailer) {
      await sendEmailForFyndah(req);
    } else if (user.site_id === SitesId.FyndahMailerNewsletter) {
      await sendEmailForFyndahNewsLetter(req);
    } else if (user.site_id === SitesId.CrackMailer) {
      await sendEmailForCrackMailer(req);
    } else if (user.site_id === SitesId.Toolzbox) {
      await sendEmailForFyndah(req);
    }  else {
      return res.status(400).json({
        message: MessageResponse.Error,
        description: `Invalid website`,
        data: null,
      });
    }

    return res.status(200).json({
      message: MessageResponse.Success,
      description: `Email sent to ==> ${email}`,
      data: { userData: user }
    });
     }

    // return res.status(400).json({
    //   message: MessageResponse.Error,
    //   description: `Daily Limit Exceeded!`,
    //   data: null,
    // });
  }
}

export const emailController = new EmailController();
