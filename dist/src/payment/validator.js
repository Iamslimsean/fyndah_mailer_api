"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = __importDefault(require("mongoose"));
const enum_1 = require("../utils/enum");
class PaymentValidator {
    verifyPayment(req, res, next) {
        // Schema for validating req.params
        const paramsSchema = joi_1.default.object({
            transactionId: joi_1.default.string().required().messages({
                'string.base': 'Transaction Id must be a string',
                'any.required': 'Transaction Id is required',
            }),
        });
        // Schema for validating req.body
        const bodySchema = joi_1.default.object({
            txRef: joi_1.default.string().required().messages({
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
                message: enum_1.MessageResponse.Error,
                description: paramsError.details[0].message,
                data: null,
            });
        }
        if (bodyError) {
            return res.status(400).json({
                message: enum_1.MessageResponse.Error,
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
    pay(req, res, next) {
        const schema = joi_1.default.object({
            subPlanId: joi_1.default.string().custom((value, helpers) => {
                if (!mongoose_1.default.Types.ObjectId.isValid(value)) {
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
        }
        else {
            return res.status(400).json({
                message: enum_1.MessageResponse.Error,
                description: error.details[0].message,
                data: null,
            });
        }
    }
}
exports.paymentValidator = new PaymentValidator();
