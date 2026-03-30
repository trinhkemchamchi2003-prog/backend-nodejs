const coreTeamServices = require('../services/coreTeam.service');
const { serverError, badRequest, handleResponse } = require('../utils/handleResponse.util');
const coreTeamSchema = require('../validations/coreTeam.validation');

//----------------------------------ADMIN-------------------------------------
// ADMIN GET MEMBER
const adminGetMember = async (req, res) => {
  try {
    const response = await coreTeamServices.adminGetMember(req.query);
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// ADMIN GET MEMBER DETAIL
const adminGetMemberDetail = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await coreTeamServices.adminGetMemberDetail(id);
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// ADMIN CREATE MEMBER
const adminCreateMember = async (req, res) => {
  try {
    const { error } = coreTeamSchema.adminCreateMember.validate(req.body);
    if (error) return badRequest(error.details[0].message, res);
    const response = await coreTeamServices.adminCreateMember(req.body);
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// ADMIN CREATE MEMBER TRANSLATION
const adminCreateTranslation = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = coreTeamSchema.adminCreateTranslation.validate(req.body);
    if (error) return badRequest(error.details[0].message, res);
    const response = await coreTeamServices.adminCreateTranslation({ id, ...req.body });
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// //ADMIN UPDATE MEMBER
const adminUpdateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = coreTeamSchema.adminUpdateMember.validate(req.body);
    if (error) return badRequest(error.details[0].message, res);
    const response = await coreTeamServices.adminUpdateMember({ id, ...req.body });
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// ADMIN UPDATE MEMBER TRANSLATION
const adminUpdateTranslation = async (req, res) => {
  try {
    const { coreTeamId } = req.params;
    const { error } = coreTeamSchema.adminUpdateTranslation.validate(req.body);
    if (error) return badRequest(error.details[0].message, res);
    const response = await coreTeamServices.adminUpdateTranslation({ coreTeamId, ...req.body });
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// //ADMIN DESTROY MEMBER
const adminDestroyMember = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await coreTeamServices.adminDestroyMember(id);
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// //ADMIN DESTROY MEMBER
const adminDestroyTranslation = async (req, res) => {
  try {
    const { coreTeamId } = req.params;
    const response = await coreTeamServices.adminDestroyTranslation(coreTeamId);
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

//----------------------------------CLIENT-------------------------------------
// GET MEMBER
const getMember = async (req, res) => {
  try {
    const { error } = coreTeamSchema.getMember.validate(req.query);
    if (error) return badRequest(error.details[0].message, res);
    const response = await coreTeamServices.getMember(req.query);
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

module.exports = {
  adminGetMember,
  adminGetMemberDetail,
  adminCreateMember,
  adminCreateTranslation,
  adminUpdateMember,
  adminUpdateTranslation,
  adminDestroyMember,
  adminDestroyTranslation,
  getMember,
};
