import { Request, Response } from "express";

import { MessageResponse } from "../utils/enum";
import { sendSingleEmail } from "../utils/email";
import { CustomRequest } from "../utils/interface";
import { adminService } from "../admin/service";

class EmailController {
  public async sendEmail(req: Request, res: Response) {
    const { email } = req.body;

    await sendSingleEmail(req);

    return res.status(200).json({
      message: MessageResponse.Success,
      description: `Email sent to ==> ${email}`,
      data: null,
    });
  }

  public async sendAuthEmail(req: Request, res: Response) {
    const { user_id } = req as CustomRequest;
    const { email } = req.body;

    let user = await adminService.findUserById(user_id);

    if (!user) {
      return res.status(404).json({
        message: MessageResponse.Error,
        description: `User not found!`,
        data: null,
      });
    }

    const currentDate = new Date();
    const lastEmailSentDate = new Date(user.lastEmailSentDate);
    console.log(currentDate, lastEmailSentDate)

    if (lastEmailSentDate < currentDate) {
      user.totalNumberOfEmailSentToday += 1;
    } else {
      user.lastEmailSentDate = new Date();
      user.totalNumberOfEmailSentToday = 0;
    }

   
    await user.save();

    if (lastEmailSentDate < currentDate && user.totalNumberOfEmailSentToday < 5000) {
      await sendSingleEmail(req);
      

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
