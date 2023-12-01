import { Request, NextFunction, Response } from "express";

export const userLogin = (req: Request, res: Response, next: NextFunction) => {
  return res.success("login Successfully");
};

export const userSignUp = (req: Request, res: Response, next: NextFunction) => {
  return res.success("Sign Up Successfully");
};
