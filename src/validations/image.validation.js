const Joi = require('joi');
const { TYPE_IMAGE } = require('../constant/config.constant');

const validTypes = TYPE_IMAGE.map((t) => t.name);

// UPLOAD IMAGE SCHEMA
const uploadImageSchema = Joi.object({
  type: Joi.string()
    .valid(...validTypes)
    .required()
    .messages({
      'any.only': `Type must be one of: ${validTypes.join(', ')}`,
      'string.empty': 'Type is required.',
      'any.required': 'Type field cannot be empty.',
    }),
});

module.exports = {
  uploadImageSchema,
};
