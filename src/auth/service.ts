import { Request } from "express";

import User from "../user/entity";

class AuthService {
  public async createUser(req: Request) {
    const { userName, password, site_id, email } = req.body;


    const user = new User({
      userName,
      password,
      site_id,
      email
    });

    const userData = await user.save();

    return userData;
  }

}

export const authService = new AuthService();
