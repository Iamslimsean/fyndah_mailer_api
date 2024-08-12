import Joi from "joi";
import { Request, Response, NextFunction } from "express";import mongoose from "mongoose";


import { MessageResponse } from "../utils/enum";

class SubscriptionPlanValidator {
  public async  createSubscription(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const schema = Joi.object({
        name: Joi.string().required().messages({
        "string.email": "Please enter a valid Plan Name",
        "any.required": "Plan Name is required",
      }),
      
      type: Joi.string().valid('monthly', 'yearly').required().messages({
        'string.base': 'Type must be a string',
        'any.required': 'Type is required',
        'any.only': 'Type should be either yearly or monthly!',
      }),
      amount: Joi.number().required().messages({
        "number.base": "Please enter a valid amount",
        "any.required": "Amount is required",
      }),
      dailyLimit: Joi.number().required().messages({
        "number.base": "Please enter a valid daily limit",
        "any.required": "Daily limit is required",
      }),
      monthlyLimit: Joi.number().required().messages({
        "number.base": "Please enter a valid Monthly limit",
        "any.required": "Monthly limit is required",
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

  public subscribe(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      id: Joi.string().custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.message({
            custom: "ID must be a valid ObjectId",
          });
        }
        return value;
      }).required().messages({
        'string.base': 'ID must be a string',
        'any.required': 'ID is required',
      }),
    });

    const { error } = schema.validate(req.params);

    if (!error) {
      return next();
    } else {
      return res.status(400).json({
        message: MessageResponse.Error,
        description: error.details[0].message,
        data: null,
      });
    }
  }
  
}

export const subscriptionPlanValidator = new SubscriptionPlanValidator();