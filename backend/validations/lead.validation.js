const Joi = require("joi");
const { categories } = require("../lib/constants/index.constant");

const craeteLeadSchema = Joi.object({
  email: Joi.string().email().required(),
  description: Joi.string().min(50).max(256).optional(),
  category: Joi.string()
    .valid(...categories)
    .required()
    .messages({
      "any.only": "Please select a valid category.",
    }),
}).required();

module.exports = { craeteLeadSchema };
