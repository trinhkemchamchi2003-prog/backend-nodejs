const Joi = require('joi');

const adminCreateLanguage = Joi.object({
  lang_code: Joi.string().required().messages({
    'string.base': 'Lang code must be a string.',
    'string.empty': 'Lang code is required.',
    'any.required': 'Lang code cannot be empty.',
  }),
  lang_name: Joi.string().required().messages({
    'string.base': 'Lang name must be a string.',
    'string.empty': 'Lang name is required.',
    'any.required': 'Lang name cannot be empty.',
  }),
  native_name: Joi.string().required().messages({
    'string.base': 'Native name must be a string.',
    'string.empty': 'Native name is required.',
    'any.required': 'Native name cannot be empty.',
  }),
  text_direction: Joi.string().required().messages({
    'string.base': 'Text direction must be a string.',
    'string.empty': 'Text direction is required.',
    'any.required': 'Text direction cannot be empty.',
  }),
  fallback_code: Joi.string().allow('').optional().messages({
    'string.base': 'Fallback code must be a string.',
    'string.empty': 'Fallback code is required.',
    'any.required': 'Fallback code cannot be empty.',
  }),
});

const adminUpdateLanguage = Joi.object({
  lang_code: Joi.string().optional(),
  lang_name: Joi.string().optional(),
  native_name: Joi.string().optional(),
  text_direction: Joi.string().optional(),
  fallback_code: Joi.string().optional().allow(''),
  active: Joi.boolean().optional(),
});

module.exports = {
  adminCreateLanguage,
  adminUpdateLanguage,
};
