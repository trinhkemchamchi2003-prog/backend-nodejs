const languageServices = require('../services/language.service');
const { serverError, handleResponse, badRequest } = require('../utils/handleResponse.util');
const languageSchema = require('../validations/language.validation');

//----------------------------------ADMIN-------------------------------------
// ADMIN GET LANGUAGE SUPPORT
const adminGetLanguage = async (req, res) => {
  try {
    const response = await languageServices.adminGetLanguage();
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// ADMIN CREATE LANGUAGE SUPPORT
const adminCreateLanguage = async (req, res) => {
  try {
    const { error } = languageSchema.adminCreateLanguage.validate(req.body);
    if (error) return badRequest(error.details[0].message, res);
    const response = await languageServices.adminCreateLanguage(req.body);
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// ADMIN UPDATE LANGUAGE SUPPORT
const adminUpdateLanguage = async (req, res) => {
  try {
    const id = req.params.id;
    const { error } = languageSchema.adminUpdateLanguage.validate(req.body);
    if (error) return badRequest(error.details[0].message, res);
    const response = await languageServices.adminUpdateLanguage({ id, ...req.body });
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// ADMIN DESTROUY LANGUAGE SUPPORT
const adminDestroyLanguage = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await languageServices.adminDestroyLanguage(id);
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

//----------------------------------CLIENT-------------------------------------
// GET LANGUAGE SUPPORT
const getLanguage = async (req, res) => {
  try {
    const response = await languageServices.getLanguage();
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

module.exports = {
  adminGetLanguage,
  adminCreateLanguage,
  adminUpdateLanguage,
  adminDestroyLanguage,
  getLanguage,
};
