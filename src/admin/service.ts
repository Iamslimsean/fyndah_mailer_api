import { Request } from "express";

import Admin from "./enity";
import { CustomRequest } from "../utils/interface";

class AdminService {
  public async findByUserName(req: Request) {
    const { userName } = req.body;

    const user = await Admin.findOne({
      userName: userName,
    });

    return user;
  }


  public async checkAdminPassword(req: Request) {
    const { password } = req.body;

    const user = await Admin.findOne({
      password: password,
    });

    return user;
  }

  public async findUserById(user_id: string) {
    const user = await Admin.findById(user_id);

    return user;
  }

  public async addEmailSendingLimitByOne(req: Request) {
    const { userName } = req.body;

    const user = await Admin.findOne({
      userName: userName,
    });

    return user;
  }
}

export const adminService = new AdminService();
