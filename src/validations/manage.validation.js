const Joi = require('joi');

const mailContactSchema = Joi.object({
  page: Joi.number().allow('').min(1),
  limit: Joi.number().allow('').min(1).max(50),
  keyword: Joi.string().allow(''),
  status: Joi.string().valid('', 'PENDING', 'SUCCESS').messages({
    'string.base': 'Status must be a string.',
    'any.only': 'Status must be one of: PENDING, SUCCESS, or empty.',
  }),
});

module.exports = {
  mailContactSchema,
};
