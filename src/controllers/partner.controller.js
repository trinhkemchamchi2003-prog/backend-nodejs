const partnerServices = require('../services/partner.service');
const { serverError, handleResponse, badRequest } = require('../utils/handleResponse.util');
const {
  createPartnerSchema,
  createFieldSchema,
  updatePartnerSchema,
} = require('../validations/partner.validation');

//----------------------------------ADMIN-------------------------------------
// ADMIN GET PARTNER
const adminGetPartner = async (req, res) => {
  try {
    const response = await partnerServices.adminGetPartner(req.query);
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// ADMIN GET PARTNER FIELD
const adminGetField = async (req, res) => {
  try {
    const response = await partnerServices.adminGetField();
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// ADMIN CREATE PARTNER
const adminCreatePartner = async (req, res) => {
  try {
    const { error } = createPartnerSchema.validate(req.body);
    if (error) return badRequest(error.details[0].message, res);
    const response = await partnerServices.adminCreatePartner(req.body);
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// ADMIN CREATE PARTNER
const adminCreateField = async (req, res) => {
  try {
    const { error } = createFieldSchema.validate(req.body);
    if (error) return badRequest(error.details[0].message, res);
    const response = await partnerServices.adminCreateField(req.body);
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// ADMIN UPDATE PARTNER
const adminUpdatePartner = async (req, res) => {
  try {
    const id = req.params.id;
    const { error } = updatePartnerSchema.validate(req.body);
    if (error) return badRequest(error.details[0].message, res);
    const response = await partnerServices.adminUpdatePartner({ id, ...req.body });
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// ADMIN DESTROY PARTNER
const adminDestroyPartner = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await partnerServices.adminDestroyPartner(id);
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// ADMIN DESTROY PARTNER FIELD
const adminDestroyField = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await partnerServices.adminDestroyField(id);
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

//----------------------------------CLIENT-------------------------------------
// GET PARTNER
const getPartner = async (req, res) => {
  try {
    const response = await partnerServices.getPartner(req.query);
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

const getPartnerField = async (req, res) => {
  try {
    const response = await partnerServices.adminGetField();
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

module.exports = {
  adminGetPartner,
  adminGetField,
  adminCreatePartner,
  adminCreateField,
  adminUpdatePartner,
  adminDestroyField,
  adminDestroyPartner,
  getPartner,
  getPartnerField,
};
