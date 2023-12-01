import Joi from "joi";

export const schemaUserLogin = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Please enter a valid email address",
      "string.empty": "Email is required",
    }),
  password: Joi.string()
    .disallow(" ")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,30}$)/)
    .required()
    .messages({
      "string.disallow": "space is not allowed",
      "string.pattern.base": "Please enter a valid password",
      "string.empty": "Password is required",
    }),
});
