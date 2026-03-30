const contactServices = require('../services/contact.service');
const { serverError, badRequest, handleResponse } = require('../utils/handleResponse.util');
const {
  sendContactSchema,
  sendContactDAppSchema,
  sendContactGrantSchema,
  createContactPartnerSchema,
} = require('../validations/contact.validation');

// SEND CONTACT
const sendContact = async (req, res) => {
  try {
    const { error } = sendContactSchema.validate(req.body);
    if (error) return badRequest(error.details[0].message, res);
    const response = await contactServices.sendContact(req.body);
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// SEND CONTACT DAPP
const sendContactDApp = async (req, res) => {
  try {
    const { error } = sendContactDAppSchema.validate(req.body);
    if (error) return badRequest(error.details[0].message, res);
    const response = await contactServices.sendContactDApp(req.body);
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// LIST TYPE SEND CONTACT DAPP
const listTypeDApp = async (req, res) => {
  try {
    const { keyword, page, limit } = req.query;
    const response = await contactServices.listTypeDApp(keyword, limit, page);
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// SEND CONTACT GRANT CATEGORY
const sendContactGrantCategory = async (req, res) => {
  try {
    const { error } = sendContactGrantSchema.validate(req.body);
    if (error) return badRequest(error.details[0].message, res);
    const response = await contactServices.sendContactGrantCategory(req.body);
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// CREATE CONTACT PARTNER
const createContactPartner = async (req, res) => {
  try {
    const { error } = createContactPartnerSchema.validate(req.body);
    if (error) return badRequest(error.details[0].message, res);
    const response = await contactServices.createContactPartner(req.body);
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

module.exports = {
  listTypeDApp,
  sendContact,
  sendContactDApp,
  sendContactGrantCategory,
  createContactPartner,
};
