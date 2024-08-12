import Joi from "joi";
import { Request, Response, NextFunction } from "express";import mongoose from "mongoose";


import { MessageResponse } from "../utils/enum";

class PaymentValidator {

  public verifyPayment(req: Request, res: Response, next: NextFunction) {
    // Schema for validating req.params
    const paramsSchema = Joi.object({
      transactionId: Joi.string().required().messages({
        'string.base': 'Transaction Id must be a string',
        'any.required': 'Transaction Id is required',
      }),
    });
  
    // Schema for validating req.body
    const bodySchema = Joi.object({
      txRef: Joi.string().required().messages({
        'string.base': 'Transaction reference must be a string',
        'any.required': 'Transaction reference is required',
      }),
    });
  
    // Validate params
    const { error: paramsError } = paramsSchema.validate(req.params);
  
    // Validate body
    const { error: bodyError } = bodySchema.validate(req.body);
  
    // If there is a validation error in either params or body, return a 400 error
    if (paramsError) {
      return res.status(400).json({
        message: MessageResponse.Error,
        description: paramsError.details[0].message,
        data: null,
      });
    }
  
    if (bodyError) {
      return res.status(400).json({
        message: MessageResponse.Error,
        description: bodyError.details[0].message,
        data: null,
      });
    }
  
    // If no validation errors, proceed to the next middleware
    return next();
  }

    // public verifyPayment(req: Request, res: Response, next: NextFunction) {
    //     const schema = Joi.object({
    //         transactionId: Joi.string().required().messages({
    //         'string.base': 'Transaction Id id must be a string',
    //         'any.required': 'Transaction Id id is required',
    //       }),
    //     });
    
    //     const { error } = schema.validate(req.params);
    
    //     if (!error) {
    //       return next();
    //     } else {
    //       return res.status(400).json({
    //         message: MessageResponse.Error,
    //         description: error.details[0].message,
    //         data: null,
    //       });
    //     }
    //   }


  public pay(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      subPlanId: Joi.string().custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.message({
            custom: "Subscription plan id must be a valid ObjectId",
          });
        }
        return value;
      }).required().messages({
        'string.base': 'Subscription plan id must be a string',
        'any.required': 'Subscription plan id is required',
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

export const paymentValidator = new PaymentValidator();