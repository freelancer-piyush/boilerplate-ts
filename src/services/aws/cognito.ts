import {
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserSession,
} from "amazon-cognito-identity-js";
import * as AWS from "aws-sdk/global";
require("aws-sdk/lib/maintenance_mode_message").suppress = true;
import {
  confirmRegisterUser,
  loginUser,
  registerUser,
} from "../types/cognito.types";
import { userPool, region } from "../../configs/aws/cognito";
import CONSTANTS from "../../constants";

export const signUp = async (user: registerUser) => {
  const attributeList: CognitoUserAttribute[] = [];
  attributeList.push(
    new CognitoUserAttribute({ Name: "email", Value: user.email })
  );
  attributeList.push(
    new CognitoUserAttribute({ Name: "name", Value: user.name })
  );
  try {
    const userSignOut = await new Promise<CognitoUserSession>(
      (resolve, reject) => {
        userPool.signUp(
          user.email,
          user.password,
          attributeList,
          [],
          function (err, result: any) {
            if (err) {
              reject(err);
              return;
            }
            resolve(result);
          }
        );
      }
    );
    return userSignOut;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const confirmRegistration = async (user: confirmRegisterUser) => {
  const userData = {
    Username: user.email,
    Pool: userPool,
  };
  var cognitoUser = new CognitoUser(userData);
  try {
    const userDate = await new Promise<CognitoUserSession>(
      (resolve, reject) => {
        cognitoUser.confirmRegistration(user.otp, true, function (err, result) {
          if (err) return reject(err);
          resolve(result);
          console.log("call result: " + JSON.stringify(result));
        });
      }
    );
    console.log(userDate);
    return userDate;
  } catch (error) {
    throw error;
  }
};

export const regUserLogin = async (user: loginUser) => {
  const userData = {
    Username: user.email,
    Pool: userPool,
  };
  const cognitoUser = new CognitoUser(userData);
  const authenticationData = {
    Username: user.email,
    Password: user.password,
  };
  const authenticationDetails = new AuthenticationDetails(authenticationData);
  try {
    const session = await new Promise<CognitoUserSession>((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
          AWS.config.region = region;
          AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: CONSTANTS.AWS.COGNITO.IDENTITY_POOL_ID, // your identity pool id here
            Logins: {
              // Change the key below according to the specific region your user pool is in.
              [`cognito-idp.${region}.amazonaws.com/${CONSTANTS.AWS.COGNITO.USER_POOL_ID}`]:
                result.getIdToken().getJwtToken(),
            },
          });
          (AWS.config.credentials as any).refresh((error: any) => {
            if (error) {
              console.error(error);
            } else {
              console.log("Successfully logged!");
            }
          });
          resolve(result);
        },
        onFailure: function (err) {
          reject(err);
        },
      });
    });
    const accessToken = session.getAccessToken().getJwtToken();
    const refreshToken = session.getRefreshToken().getToken();
    const idToken = session.getIdToken().getJwtToken();

    return {
      idToken,
      accessToken,
      refreshToken,
    };
  } catch (error) {
    throw error;
  }
};

export const signOut = async (email: string) => {
  const userData = {
    Username: email,
    Pool: userPool,
  };
  const cognitoUser = new CognitoUser(userData);
  try {
    await cognitoUser.signOut();
    return;
  } catch (error) {
    throw error;
  }
};

export const getUserDetails = async (email: string) => {
  const userData = {
    Username: email,
    Pool: userPool,
  };
  const cognitoUser = new CognitoUser(userData);
  try {
    const userDetails = await new Promise((resolve, reject) => {
      cognitoUser.globalSignOut({
        onSuccess: function (result) {
          console.log(result, "result");
          resolve(result);
        },
        onFailure: function (err) {
          console.log(err.message || JSON.stringify(err));
          resolve(err);
        },
      });
    });
    console.log(userDetails);
  } catch (error) {
    throw error;
  }
};
