import { Request, NextFunction, Response } from "express";
import * as cognitoService from "../../services/aws/cognito";
import {
  confirmRegisterUser,
  loginUser,
  registerUser,
} from "../../services/types/cognito.types";
import User from "../../modules/users";
import Opt from "../../modules/opt";

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: loginUser = {
      email: req.body.email,
      password: req.body.password,
    };
    const cognitoRes = await cognitoService.regUserLogin(user);
    return res.success("login Successfully", cognitoRes);
  } catch (error) {
    return res.error("Error at Amazon", error);
  }
};

export const userSignUp = async (req: Request, res: Response) => {
  try {
    const user: registerUser = {
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
    };
    const allReadyUser = await User.findOne({ email: req.body.email })
      .lean()
      .exec();
    if (allReadyUser) return res.badRequest("User AllReady registered");
    const opt = await Opt.findOne({ email: req.body.email }).lean().exec();
    if (opt)
      return res.badRequest(
        "An OTP has been all ready generated for this email kindly try after 10 minutes"
      );

    const cognitoResp: any = await cognitoService.signUp(user);
    const ops = new Opt({
      email: req.body.email,
      name: req.body.name,
      username: cognitoResp.userSub,
    });
    await ops.save();
    return res.success("Sign Up Initiated");
  } catch (error) {
    return res.error("Error at Amazon", error);
  }
};

export const confirmUserSignUp = async (req: Request, res: Response) => {
  try {
    const confirmRegister: confirmRegisterUser = {
      email: req.body.email,
      otp: req.body.otp,
    };
    const cognito = await cognitoService.confirmRegistration(confirmRegister);
    const opt = await Opt.findOne({ email: req.body.email }).lean().exec();
    if (opt) {
      const user = new User({
        email: opt.email,
        username: opt.username,
        name: opt.name,
      });
      await user.save();
      await Opt.findOneAndDelete({ email: req.body.email }).lean().exec();
      return res.success("Sign Up Successfully");
    }
    return res.unauthorizedUser(
      `Not Fount in our record.\n if you generate the otp 10 min ago. Please re-generate the OTP.`
    );
  } catch (error) {
    return res.error("Error at Amazon", error);
  }
};

export const signOut = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await cognitoService.getUserDetails(req?.user?.email);
    return res.success("sign out Successfully");
  } catch (error) {
    return res.error("Error at Amazon", error);
  }
};
