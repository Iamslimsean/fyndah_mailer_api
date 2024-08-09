"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const utils_1 = require("../utils");
const validator_1 = require("./validator");
exports.AuthRouter = (0, express_1.Router)();
exports.AuthRouter.post("/auth/signin", [validator_1.authValidator.auth], (0, utils_1.wrapAsync)(controller_1.authController.sign_in));
exports.AuthRouter.post("/auth/signup", [validator_1.authValidator.auth], (0, utils_1.wrapAsync)(controller_1.authController.admin_sign_up));
