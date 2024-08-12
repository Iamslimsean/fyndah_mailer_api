import Joi from "joi";
import { Request, Response, NextFunction } from "express";

import { MessageResponse } from "../utils/enum";

class AuthValidator {
  public async auth(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      email: Joi.string().email().required().messages({
        "string.email": "Please enter a valid email address",
        "any.required": "Email address is required",
      }),
      userName: Joi.string().required().messages({
        "string.base": "SiteId must be text",
        "any.required": "SiteId is required.",
      }),
      site_id: Joi.string().required().messages({
        "string.base": "SiteId must be text",
        "any.required": "SiteId is required.",
      }),
      password: Joi.string().required().messages({
        "any.required": "Password is required.",
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


  public async signIn(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      userName: Joi.string().required().messages({
        "string.base": "SiteId must be text",
        "any.required": "SiteId is required.",
      }),
      site_id: Joi.string().required().messages({
        "string.base": "SiteId must be text",
        "any.required": "SiteId is required.",
      }),
      password: Joi.string().required().messages({
        "any.required": "Password is required.",
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

export const authValidator = new AuthValidator();
