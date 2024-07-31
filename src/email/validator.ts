import Joi from "joi";
import { Request, Response, NextFunction } from "express";

import { MessageResponse } from "../utils/enum";

class SendEmailValidator {
  public async sendEmail(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const schema = Joi.object({
      email: Joi.string().email().required().messages({
        "string.email": "Please enter a valid email address",
        "any.required": "Email address is required",
      }),
      replyto: Joi.string().email().required().messages({
        "string.email": "Please enter a valid replyTo email address",
        "any.required": "replyTo Email address is required",
      }),
      subject: Joi.string().required().messages({
        "string.base": "Email must be text",
        "any.required": "Email is required.",
      }),
      html: Joi.string().required().messages({
        "string.base": "Html template must be text",
        "any.required": "Html template is required.",
      }),
    });

    const { error } = schema.validate(req.body);

    if (!error) {
      return next();
    } else {
      console.log(error);
      return res.status(400).json({
        message: MessageResponse.Error,
        description: error.details[0].message,
        data: null,
      });
    }
  }
}

export const sendEmailValidator = new SendEmailValidator();