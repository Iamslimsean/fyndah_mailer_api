import { Request, Response } from "express";

import { MessageResponse, SitesId } from "../utils/enum";
import {
  sendEmailForFyndah,
  sendEmailForFyndahNewsLetter,
  sendEmailForCrackMailer
} from "../utils/email";
import { CustomRequest } from "../utils/interface";
import { userService } from "../user/service";

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
    const lastEmailSentDate = new Date(user.lastEmailSentDate);
    // console.log(currentDate, lastEmailSentDate);

    if (lastEmailSentDate < currentDate) {
      user.totalNumberOfEmailSentToday += 1;
    } else {
      user.lastEmailSentDate = new Date();
      user.totalNumberOfEmailSentToday = 0;
    }

    await user.save();

    if (
      lastEmailSentDate < currentDate &&
      user.totalNumberOfEmailSentToday < 5000
    ) {
      if (user.site_id === SitesId.FyndahMailer) {
        await sendEmailForFyndah(req);
      } else if (user.site_id === SitesId.FyndahMailerNewsletter) {
        await sendEmailForFyndahNewsLetter(req);
      } else if (user.site_id === SitesId.CrackMailer) {
        await sendEmailForCrackMailer(req);
      } else {
        return res.status(400).json({
          message: MessageResponse.Error,
          description: `Invalid website`,
          data: null,
        });
      }

      return res.status(200).json({
        message: MessageResponse.Success,
        description: `Email sent to ==> ${email}`,
        data: null,
      });
    }

    return res.status(400).json({
      message: MessageResponse.Error,
      description: `Daily Limit Exceeded!`,
      data: null,
    });
  }
}

export const emailController = new EmailController();
