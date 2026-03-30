const manageServices = require('../services/manage.service');
const { serverError, badRequest, handleResponse } = require('../utils/handleResponse.util');
const { mailContactSchema } = require('../validations/manage.validation');

// LIST MAIL CONTACT
const mailContact = async (req, res) => {
  try {
    const { error } = mailContactSchema.validate(req.query);
    if (error) return badRequest(error.details[0].message, res);
    const response = await manageServices.mailContact(req.query);
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// LIST MAIL SEND CONTACT APP
const mailContactApp = async (req, res) => {
  try {
    const response = await manageServices.mailContactApp(req.query);
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// GET MAIL CONTACT PARTNER
const mailContactPartner = async (req, res) => {
  try {
    const { error } = mailContactSchema.validate(req.query);
    if (error) return badRequest(error.details[0].message, res);
    const response = await manageServices.mailContactPartner(req.query);
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// GET MAIL CONTACT PARTNER
const updateStatusPartner = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await manageServices.updateStatusPartner(id);
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};
module.exports = {
  mailContact,
  mailContactApp,
  mailContactPartner,
  updateStatusPartner,
};
