export default {
  APP: {
    PORT: process.env.PORT || 8080,
    ENVIRONMENT: process.env.ENVIRONMENT || "PROD",
    DB_URL: process.env.DB_URL as string,
  },
  AWS: {
    COGNITO: {
      USER_POOL_ID: process.env.COGNITO_USER_POOL_ID as string,
      CLIENT_ID: process.env.CLIENT_ID as string,
      IDENTITY_POOL_ID: process.env.IDENTITY_POOL_ID as string,
    },
  },
};
