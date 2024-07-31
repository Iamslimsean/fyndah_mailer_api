import { Request, Response } from "express";

import { MessageResponse } from "../utils/enum";
import { sendSingleEmail } from "../utils/email";

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
}

export const emailController = new EmailController();
