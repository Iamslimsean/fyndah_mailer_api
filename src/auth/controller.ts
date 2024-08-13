import { Request, Response } from "express";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { MessageResponse } from "../utils/enum";

import { authService } from "./service";
import { userService } from "../user/service";
import { IUser } from "../user/inteface";

dotenv.config();

class AuthController {
  public async signUp(req: Request, res: Response) {
    const body: IUser = req.body;

    const emailExist = await userService.findUserByEmail(body.email);

    if (emailExist) {
      return res.status(404).json({
        message: MessageResponse.Error,
        description: "Email is taken!",
        data: null,
      });
    }

    const userNameExist = await userService.findUserName(body.userName);

    if (userNameExist) {
      return res.status(404).json({
        message: MessageResponse.Error,
        description: "Username is taken!",
        data: null,
      });
    }

    const user = await authService.createUser(req);

    return res.status(201).json({
      message: MessageResponse.Success,
      description: "User creation completed!",
      data: null,
    });
  }

  public async sign_in(req: Request, res: Response) {
    const user_exists = await userService.findByUserNameAndSiteName(req);

    if (!user_exists) {
      return res.status(400).json({
        message: MessageResponse.Error,
        description: "Wrong user credentials!",
        data: null,
      });
    }

    const password_exists = await userService.checkUserPassword(req);

    if (!password_exists) {
      return res.status(400).json({
        message: MessageResponse.Error,
        description: "Wrong user credentials!",
        data: null,
      });
    }

    const token = jwt.sign(
      { userId: user_exists._id },
      process.env.JWT_SECRET!,
      {
        expiresIn: process.env.TOKEN_EXPIRY,
      }
    );

    return res.status(200).json({
      message: MessageResponse.Success,
      description: "Logged in successfully",
      data: {
        token,
        userData: user_exists
      },
    });
  }
}

export const authController = new AuthController();
