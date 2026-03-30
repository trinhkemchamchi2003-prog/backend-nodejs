const Joi = require('joi');

const updateConfigSchema = Joi.object({
  value: Joi.string().required().messages({
    'string.base': 'value must be a string type',
    'any.required': 'value is required',
  }),
});

module.exports = {
  updateConfigSchema,
};
