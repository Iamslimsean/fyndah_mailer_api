import { Request } from "express";

import User from "./entity";
import { CustomRequest } from "../utils/interface";

class UserService {
  public async findByUserNameAndSiteName(req: Request) {
    const { userName, site_id } = req.body;

    const user = await User.findOne({
      userName: userName,
      site_id: site_id
    }).select("-password");

    return user;
  }

  public async findUserByEmail(email: string) {

  const user = await User.findOne({email});

  return user;
  }

  public async findUserName(userName: string) {

    const user = await User.findOne({userName});
  
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
    const user = await User.findById(user_id).select("-password");

    return user;
  }

  public async addEmailSendingLimitByOne(req: Request) {
    const { userName } = req.body;

    const user = await User.findOne({
      userName: userName,
    });

    return user;
  }

  public async findUserBySubscriptionTxRef(subscriptionTxRef: string) {
    const user = await User.findOne({subscriptionTxRef});

    return user;
  }


  public async purchaseSubscriptionPlan(
    subscriptionTxRef: string
  ) {
    // const pricingId = new mongoose.Types.ObjectId(subscriptionPlanId);
    // const subscription = await subscriptionPlanService.findSubscriptionById(
    //   pricingId
    // );

    let user = await userService.findUserBySubscriptionTxRef(subscriptionTxRef);

    if (!user) {
      return;
    }

    let currentDate = new Date();
    let oneMonthExpiryDate = new Date(currentDate);
    oneMonthExpiryDate.setDate(currentDate.getDate() + 30);

    user.subscribed = true;
    user.expired = false;
    user.subscriptionExpiryDate = oneMonthExpiryDate;
    user.lastEmailSentDate = currentDate;

    user = await user.save();

    return user;
  }
}

export const userService = new UserService();
