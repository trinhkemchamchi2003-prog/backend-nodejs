const Joi = require('joi');
const { TYPE_CORE_TEAM } = require('../constant/config.constant');

//----------------------------------ADMIN-------------------------------------
// ADMIN CREATE MEMBER SCHEMA
const adminCreateMember = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'Name must be a string.',
    'string.empty': 'Name is required.',
    'any.required': 'Name cannot be empty.',
  }),
  avatar_url: Joi.string().required().messages({
    'string.base': 'Avatar URL must be a string.',
    'string.empty': 'Avatar URL is required.',
    'any.required': 'Avatar URL cannot be empty.',
  }),
  website_url: Joi.string().optional().uri().allow('', null),
  telegram_url: Joi.string().optional().uri().allow('', null),
  linkedin_url: Joi.string().optional().uri().allow('', null),
  facebook_url: Joi.string().optional().uri().allow('', null),
  twitter_url: Joi.string().optional().uri().allow('', null),
  type: Joi.string()
    .valid(...TYPE_CORE_TEAM)
    .required()
    .messages({
      'any.only': `Type must be one of: ${TYPE_CORE_TEAM}`,
      'string.empty': 'Type is required.',
      'any.required': 'Type field cannot be empty.',
    }),
  level: Joi.number().valid(1, 2, 3, 4, 5).required().messages({
    'number.base': 'Level must be a number.',
    'any.required': 'Level is required.',
    'any.only': 'Level must be one of [1, 2, 3, 4, 5].',
  }),
});

// ADMIN CREATE MEMBER TRANSLATION SCHEMA
const adminCreateTranslation = Joi.object({
  lang_code: Joi.string().required().messages({
    'string.base': 'Lang code must be a string.',
    'string.empty': 'Lang code is required.',
    'any.required': 'Lang code cannot be empty.',
  }),
  position: Joi.string().required().messages({
    'string.base': 'Position must be a string.',
    'string.empty': 'Position is required.',
    'any.required': 'Position cannot be empty.',
  }),
  description: Joi.string().required().messages({
    'string.base': 'Description must be a string.',
    'string.empty': 'Description is required.',
    'any.required': 'Description cannot be empty.',
  }),
  experience: Joi.string().required().messages({
    'string.base': 'Experience must be a string.',
    'string.empty': 'Experience is required.',
    'any.required': 'Experience cannot be empty.',
  }),
});

// ADMIN GET CORE TEAM SCHEMA
const adminUpdateMember = Joi.object({
  name: Joi.string().optional(),
  avatar_url: Joi.string().optional(),
  website_url: Joi.string().optional().uri().allow('', null),
  telegram_url: Joi.string().optional().uri().allow('', null),
  linkedin_url: Joi.string().optional().uri().allow('', null),
  facebook_url: Joi.string().optional().uri().allow('', null),
  twitter_url: Joi.string().optional().uri().allow('', null),
  type: Joi.string()
    .valid(...TYPE_CORE_TEAM)
    .optional(),
  level: Joi.number().optional().allow(1, 2, 3, 4, 5),
  active: Joi.boolean().optional(),
});

// ADMIN GET CORE TEAM SCHEMA
const adminUpdateTranslation = Joi.object({
  position: Joi.string().optional(),
  description: Joi.string().optional(),
  experience: Joi.string().optional(),
  active: Joi.boolean().optional(),
});

//----------------------------------CLIENT-------------------------------------
// GET CORE TEAM SCHEMA
const getMember = Joi.object({
  lang: Joi.string().optional(),
});

module.exports = {
  adminCreateMember,
  adminCreateTranslation,
  adminUpdateMember,
  adminUpdateTranslation,
  getMember,
};
