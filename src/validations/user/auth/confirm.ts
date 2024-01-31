import Joi from "joi";

export const schemaConfirmRegister = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Please enter a valid email address",
      "string.empty": "Email is required",
    }),
  otp: Joi.string()
    .length(6)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      "string.pattern.base": "otp .",
      "string.empty": "OTP is required",
      "string.length": "OTP must have 6 digits.",
    }),
});
