import Joi from "joi";

export const schemaSingUp = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Please enter a valid email address",
      "string.empty": "Email is required",
    }),
  name: Joi.string().min(3).max(30).required().messages({
    "string.disallow": "space is not allowed",
    "string.pattern.base": "Please enter a valid password",
    "string.empty": "Password is required",
  }),
  password: Joi.string()
    .disallow(" ")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,30}$)/)
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, one numeric and one special character.",
      "string.empty": "Password is required",
      "string.max": `Password should have a maximum length of 30.`,
      "string.min": `Password should have a minimum length of 8.`,
    }),
});
