"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailRouter = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const utils_1 = require("../utils");
const validator_1 = require("./validator");
exports.EmailRouter = (0, express_1.Router)();
exports.EmailRouter.post("/send-email", [validator_1.sendEmailValidator.sendEmail], (0, utils_1.wrapAsync)(controller_1.emailController.sendEmail));
