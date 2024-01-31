import { CognitoUserPool } from "amazon-cognito-identity-js";

import CONSTANTS from "../../constants";

export const region = "ap-south-1";

export const poolData = {
  UserPoolId: CONSTANTS.AWS.COGNITO.USER_POOL_ID, // Your user pool id here
  ClientId: CONSTANTS.AWS.COGNITO.CLIENT_ID, // Your client id here
};

export const userPool = new CognitoUserPool(poolData);
