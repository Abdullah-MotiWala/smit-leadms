const Joi = require("joi");
const { passwordRegex } = require("../lib/regex/auth.regex");

const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).pattern(passwordRegex).required().messages({
    "string.pattern.base":
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
  }),
});

const signinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = { signupSchema, signinSchema };
