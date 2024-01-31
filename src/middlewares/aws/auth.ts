import { Request, Response, NextFunction } from "express";
import { CognitoJwtVerifier } from "aws-jwt-verify";
import User, { UserDocument } from "../../modules/users";
import CONSTANTS from "../../constants";

export const verifyAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token: string = req?.headers["authorization"] as string;
  token = token?.split(" ")?.at(1) as string;
  if (!token) return res.unauthorizedUser("Token is missing");

  try {
    const verifier = CognitoJwtVerifier.create({
      userPoolId: CONSTANTS.AWS.COGNITO.USER_POOL_ID,
      tokenUse: "access",
      clientId: CONSTANTS.AWS.COGNITO.CLIENT_ID,
    });
    const payload = await verifier.verify(token);
    const user = await User.findOne({ username: payload?.username });
    req.user = user as UserDocument;
    next();
  } catch (error: any) {
    return res.unauthorizedUser(error?.message as string);
  }
};
