"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const utils_1 = require("../utils");
const is_auth_1 = require("../middleware/is_auth");
exports.UserRouter = (0, express_1.Router)();
exports.UserRouter.get("/user/data", [is_auth_1.isAuth], (0, utils_1.wrapAsync)(controller_1.userController.fetchUserData));
// UserRouter.post(
//   "/subscribe/:id",
//   [isAuth, userValidator.subscribe],
//   wrapAsync(authController.sign_in)
// );
