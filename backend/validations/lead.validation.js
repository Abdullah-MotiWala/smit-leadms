const Joi = require("joi");
const { contactRegex } = require("../lib/regex/lead.regex");

const craeteLeadSchema = Joi.object({
  name: Joi.string().required().min(3).max(50),
  email: Joi.string().email().required(),
  description: Joi.string().min(5).max(256).optional(),
  linkedin: Joi.string().required(),
  contact: Joi.string().pattern(contactRegex).required().messages({
    "string.pattern.base":
      "Number must be following this pattern  +92311111111",
  }),
}).required();

module.exports = { craeteLeadSchema };
