import { Request } from "express";

import User from "./entity";
import { CustomRequest } from "../utils/interface";

class UserService {
  public async findByUserNameAndSiteName(req: Request) {
    const { userName, site_id } = req.body;

    const user = await User.findOne({
      userName: userName,
      site_id: site_id
    });

    return user;
  }


  public async checkUserPassword(req: Request) {
    const { password } = req.body;

    const user = await User.findOne({
      password: password,
    });

    return user;
  }

  public async findUserById(user_id: string) {
    const user = await User.findById(user_id);

    return user;
  }

  public async addEmailSendingLimitByOne(req: Request) {
    const { userName } = req.body;

    const user = await User.findOne({
      userName: userName,
    });

    return user;
  }
}

export const userService = new UserService();
