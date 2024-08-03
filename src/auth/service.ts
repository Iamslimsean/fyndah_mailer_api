import { Request } from "express";

import Admin from "../admin/enity";

class AuthService {
  public async createAdmin(req: Request) {
    const { userName, password } = req.body;


    const admin = new Admin({
      userName,
      password
    });

    const adminData = await admin.save();

    return adminData;
  }

}

export const authService = new AuthService();
