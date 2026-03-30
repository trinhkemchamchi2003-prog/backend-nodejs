const Joi = require('joi');

const loginAdmin = Joi.object({
  username: Joi.string().required().max(50).messages({
    'string.base': 'username must be a string type',
    'any.required': 'username is required',
    'string.max': 'username should not exceed 50 characters',
  }),
  password: Joi.string().required().max(50).min(6).messages({
    'string.base': 'Password must be a string type',
    'any.required': 'Password is required',
    'string.max': 'Password should not exceed 50 characters',
  }),
});

const changePasswordAdmin = Joi.object({
  password: Joi.string().required().max(50).min(6).messages({
    'string.base': 'Password must be a string type',
    'any.required': 'Password is required',
    'string.max': 'Password should not exceed 50 characters',
    'string.min': 'Password must be at least 6 characters long',
  }),
  newPassword: Joi.string().required().max(50).min(6).messages({
    'string.base': 'new password must be a string type',
    'any.required': 'new password is required',
    'string.min': 'new password must be at least 6 characters long',
    'string.max': 'new password should not exceed 50 characters',
  }),
});

module.exports = {
  loginAdmin,
  changePasswordAdmin,
};
