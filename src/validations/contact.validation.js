const Joi = require('joi');

// SEND CONTACT
const sendContactSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Name is required.',
    'any.required': 'Name field cannot be empty.',
  }),
  email: Joi.string().required().email().messages({
    'string.empty': 'Email is required.',
    'string.email': 'Invalid email format.',
    'any.required': 'Email field cannot be empty.',
  }),
  subject: Joi.string().required().messages({
    'string.empty': 'Subject is required.',
    'any.required': 'Subject field cannot be empty.',
  }),
  message: Joi.string().required().messages({
    'string.empty': 'Message is required.',
    'any.required': 'Message field cannot be empty.',
  }),
});

// SEND CONTACT DAPP
const sendContactDAppSchema = Joi.object({
  your_name: Joi.string().required(),
  email: Joi.string().required().email().messages({
    'string.empty': 'Email is required.',
    'string.email': 'Invalid email format.',
    'any.required': 'Email field cannot be empty.',
  }),
  project_summary: Joi.string().required(),
  project_type: Joi.string().required(),
  project_website: Joi.string().required(),
  dapp_link: Joi.string().required(),
  social_link: Joi.string().required(),
  relevant_contract_address: Joi.string().required(),
  investor: Joi.string().required(),
});

// SEND CONTACT GRANT CATEGORY
const sendContactGrantSchema = Joi.object({
  grant_category: Joi.string().required(),
  full_name: Joi.string().required(),
  email: Joi.string().email().required().messages({
    'string.base': 'email key must be email type',
    'string.empty': 'email key is required',
    'any.required': 'email key is required',
  }),
  ton_wallet_address: Joi.string().optional(),
  website: Joi.string().required(),
  pitch_deck: Joi.string().required(),
  twitter: Joi.string().required(),
  github_link: Joi.string().optional(),
  title: Joi.string().required(),
  idea: Joi.string().required(),
  details: Joi.string().required(),
  team_description: Joi.string().required(),
  traction: Joi.string().required(),
  competitor: Joi.string().optional(),
  target_user: Joi.string().optional(),
  technology_stack: Joi.string().required(),
});

// CREATE CONTACT PARTNER SCHEMA
const createContactPartnerSchema = Joi.object({
  first_name: Joi.string().required().messages({
    'string.empty': 'First name is required.',
    'any.required': 'First name cannot be empty.',
  }),
  last_name: Joi.string().required().messages({
    'string.empty': 'Last name is required.',
    'any.required': 'Last name cannot be empty.',
  }),
  title: Joi.string().required().messages({
    'string.empty': 'Title is required.',
    'any.required': 'Title cannot be empty.',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address.',
    'string.empty': 'Email is required.',
    'any.required': 'Email cannot be empty.',
  }),
  phone_number: Joi.string()
    .pattern(/^[0-9+\-\s()]{6,20}$/)
    .required()
    .messages({
      'string.pattern.base': 'Phone number must be valid.',
      'string.empty': 'Phone number is required.',
      'any.required': 'Phone number cannot be empty.',
    }),
  organization_name: Joi.string().required().messages({
    'string.empty': 'Organization name is required.',
    'any.required': 'Organization name cannot be empty.',
  }),
  organization_location: Joi.string().required().messages({
    'string.empty': 'Organization location is required.',
    'any.required': 'Organization location cannot be empty.',
  }),
  industry: Joi.string().required().messages({
    'string.empty': 'Industry is required.',
    'any.required': 'Industry cannot be empty.',
  }),
  organization_size: Joi.string().required().messages({
    'string.empty': 'Organization size is required.',
    'any.required': 'Organization size cannot be empty.',
  }),
  field_id: Joi.array().min(1).items(Joi.number()).required().messages({
    'array.base': 'Field IDs must be an array of numbers.',
    'any.required': 'Field ID is required.',
  }),
  message: Joi.string().required().messages({
    'string.empty': 'Message is required.',
    'any.required': 'Message cannot be empty.',
  }),
});

module.exports = {
  sendContactSchema,
  sendContactDAppSchema,
  sendContactGrantSchema,
  createContactPartnerSchema,
};
