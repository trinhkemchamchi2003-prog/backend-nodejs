const Joi = require('joi');

// CREATE PARTNER SCHEMA
const createPartnerSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Name is required.',
    'any.required': 'Name field cannot be empty.',
  }),
  description: Joi.string().required().messages({
    'string.empty': 'Description is required.',
    'any.required': 'Description field cannot be empty.',
  }),
  logo_url: Joi.string().required().messages({
    'string.empty': 'Logo URL is required.',
    'string.uri': 'Logo URL must be a valid string.',
    'any.required': 'Logo URL field cannot be empty.',
  }),
  field_id: Joi.array().min(1).items(Joi.number()).required().messages({
    'array.base': 'Field IDs must be an array of numbers.',
    'any.required': 'Field ID is required.',
  }),
  website_url: Joi.string().uri().required().messages({
    'string.empty': 'Website URL is required.',
    'string.uri': 'Website URL must be a valid URL.',
    'any.required': 'Website URL field cannot be empty.',
  }),
  twitter_url: Joi.string().uri().optional().allow('').messages({
    'string.uri': 'Twitter URL must be a valid URL.',
  }),
  discord_url: Joi.string().uri().optional().allow('').messages({
    'string.uri': 'Discord URL must be a valid URL.',
  }),
  telegram_url: Joi.string().uri().optional().allow('').messages({
    'string.uri': 'Telegram URL must be a valid URL.',
  }),
  youtube_url: Joi.string().uri().optional().allow('').messages({
    'string.uri': 'YouTube URL must be a valid URL.',
  }),
  facebook_url: Joi.string().uri().optional().allow('').messages({
    'string.uri': 'Facebook URL must be a valid URL.',
  }),
});

// UPDATE PARTNER SCHEMA
const updatePartnerSchema = Joi.object({
  name: Joi.string().optional().messages({
    'string.base': 'Name must be a string.',
  }),
  description: Joi.string().optional().messages({
    'string.base': 'Description must be a string.',
  }),
  logo_url: Joi.string().optional().messages({
    'string.uri': 'Logo URL must be a string.',
  }),
  field_id: Joi.array().items(Joi.number()).optional().messages({
    'array.base': 'Field IDs must be an array of numbers.',
    'array.includes': 'Each Field ID must be a number.',
  }),
  website_url: Joi.string().uri().optional().messages({
    'string.uri': 'Website URL must be a valid URL.',
  }),
  twitter_url: Joi.string().uri().optional().allow('').messages({
    'string.uri': 'Twitter URL must be a valid URL.',
  }),
  discord_url: Joi.string().uri().optional().allow('').messages({
    'string.uri': 'Discord URL must be a valid URL.',
  }),
  telegram_url: Joi.string().uri().optional().allow('').messages({
    'string.uri': 'Telegram URL must be a valid URL.',
  }),
  youtube_url: Joi.string().uri().optional().allow('').messages({
    'string.uri': 'YouTube URL must be a valid URL.',
  }),
  facebook_url: Joi.string().uri().optional().allow('').messages({
    'string.uri': 'Facebook URL must be a valid URL.',
  }),
  active: Joi.boolean().optional().messages({
    'boolean.base': 'Active must be true or false.',
  }),
});

// CREATE PARTNER FIELD SCHEMA
const createFieldSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Name is required.',
    'any.required': 'Name field cannot be empty.',
  }),
});

module.exports = {
  createPartnerSchema,
  createFieldSchema,
  updatePartnerSchema,
};
