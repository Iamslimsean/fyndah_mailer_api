"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const enum_1 = require("../utils/enum");
const service_1 = require("./service");
const service_2 = require("../user/service");
dotenv_1.default.config();
class AuthController {
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const emailExist = yield service_2.userService.findUserByEmail(body.email);
            if (emailExist) {
                return res.status(404).json({
                    message: enum_1.MessageResponse.Error,
                    description: "Email is taken!",
                    data: null,
                });
            }
            const userNameExist = yield service_2.userService.findUserName(body.userName);
            if (userNameExist) {
                return res.status(404).json({
                    message: enum_1.MessageResponse.Error,
                    description: "Username is taken!",
                    data: null,
                });
            }
            const user = yield service_1.authService.createUser(req);
            return res.status(201).json({
                message: enum_1.MessageResponse.Success,
                description: "User creation completed!",
                data: null,
            });
        });
    }
    sign_in(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user_exists = yield service_2.userService.findByUserNameAndSiteName(req);
            if (!user_exists) {
                return res.status(400).json({
                    message: enum_1.MessageResponse.Error,
                    description: "Wrong user credentials!",
                    data: null,
                });
            }
            const password_exists = yield service_2.userService.checkUserPassword(req);
            if (!password_exists) {
                return res.status(400).json({
                    message: enum_1.MessageResponse.Error,
                    description: "Wrong user credentials!",
                    data: null,
                });
            }
            const token = jsonwebtoken_1.default.sign({ userId: user_exists._id }, process.env.JWT_SECRET, {
                expiresIn: process.env.TOKEN_EXPIRY,
            });
            return res.status(200).json({
                message: enum_1.MessageResponse.Success,
                description: "Logged in successfully",
                data: {
                    token,
                },
            });
        });
    }
}
exports.authController = new AuthController();
