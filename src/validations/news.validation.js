const Joi = require('joi');

//----------------------------------ADMIN-------------------------------------
// CREATE NEWS
const adminCreateNews = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'Name must be a string.',
    'string.empty': 'Name is required.',
    'any.required': 'Name cannot be empty.',
  }),
  image_url: Joi.string().required().messages({
    'string.base': 'Image URL must be a string.',
    'string.empty': 'Image URL is required.',
    'any.required': 'Image URL cannot be empty.',
  }),
  redirect_url: Joi.string().optional().allow('', null).messages({
    'string.base': 'Redirect URL must be a string.',
  }),
  is_pinned: Joi.boolean().optional().messages({
    'boolean.base': 'Is pinned must be a boolean value.',
  }),
  type: Joi.string().required().valid('NEWS').messages({
    'string.base': 'Type must be a string.',
    'any.only': 'Type must be NEWS.',
    'any.required': 'Type is required.',
    'string.empty': 'Type cannot be empty.',
  }),
  published_at: Joi.date().optional().allow(null).messages({
    'date.base': 'Published at must be a valid date.',
  }),
});

// CREATE NEWS TRANSLATION
const adminCreateTranslation = Joi.object({
  lang_code: Joi.string().required().messages({
    'string.base': 'Language code must be a string.',
    'string.empty': 'Language code is required.',
    'any.required': 'Language code cannot be empty.',
  }),
  title: Joi.string().required().messages({
    'string.base': 'Title must be a string.',
    'string.empty': 'Title is required.',
    'any.required': 'Title cannot be empty.',
  }),
  summary: Joi.string().required().messages({
    'string.base': 'Summary must be a string.',
    'string.empty': 'Summary is required.',
    'any.required': 'Summary cannot be empty.',
  }),
  content: Joi.string().required().messages({
    'string.base': 'Content must be a string.',
    'string.empty': 'Content is required.',
    'any.required': 'Content cannot be empty.',
  }),
  banner_image_url: Joi.string().optional().allow(null).messages({
    'string.base': 'Banner image URL must be a string.',
  }),
  seo_title: Joi.string().optional().allow(null).messages({
    'string.base': 'SEO title must be a string.',
  }),
  seo_description: Joi.string().optional().allow(null).messages({
    'string.base': 'SEO description must be a string.',
  }),
});

// UPDATE NEWS
const adminUpdateNews = Joi.object({
  name: Joi.string().optional().messages({
    'string.base': 'Name must be a string.',
  }),
  image_url: Joi.string().optional().messages({
    'string.base': 'Image URL must be a string.',
  }),
  redirect_url: Joi.string().optional().allow('', null).messages({
    'string.base': 'Redirect URL must be a string.',
  }),
  is_pinned: Joi.boolean().optional().messages({
    'boolean.base': 'Is pinned must be a boolean value.',
  }),
  type: Joi.string().optional().valid('NEWS').messages({
    'string.base': 'Type must be a string.',
    'any.only': 'Type must be NEWS.',
  }),
  published_at: Joi.date().optional().allow(null).messages({
    'date.base': 'Published at must be a valid date.',
  }),
  active: Joi.boolean().optional().messages({
    'boolean.base': 'Active must be a boolean value.',
  }),
});

// UPDATE NEWS TRANSLATION
const adminUpdateTranslation = Joi.object({
  title: Joi.string().optional().messages({
    'string.base': 'Title must be a string.',
  }),
  summary: Joi.string().optional().messages({
    'string.base': 'Summary must be a string.',
  }),
  content: Joi.string().optional().messages({
    'string.base': 'Content must be a string.',
  }),
  banner_image_url: Joi.string().optional().allow(null).messages({
    'string.base': 'Banner image URL must be a string.',
  }),
  seo_title: Joi.string().optional().allow(null).messages({
    'string.base': 'SEO title must be a string.',
  }),
  seo_description: Joi.string().optional().allow(null).messages({
    'string.base': 'SEO description must be a string.',
  }),
  active: Joi.boolean().optional().messages({
    'boolean.base': 'Active must be a boolean value.',
  }),
});

//----------------------------------CLIENT-------------------------------------
// GET NEWS
const getNews = Joi.object({
  page: Joi.number().optional(),
  limit: Joi.number().optional(),
  keyword: Joi.string().optional(),
  lang: Joi.string().optional(),
});

// GET NEWS PINNED
const getNewsPinned = Joi.object({
  lang: Joi.string().optional(),
});

module.exports = {
  adminCreateNews,
  adminCreateTranslation,
  adminUpdateNews,
  adminUpdateTranslation,
  getNews,
  getNewsPinned,
};
