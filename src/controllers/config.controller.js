const configServices = require('../services/config.service');
const { serverError, badRequest, handleResponse } = require('../utils/handleResponse.util');
const { updateConfigSchema } = require('../validations/config.validation');

// GET CONFIG
const getConfig = async (req, res) => {
  try {
    const response = await configServices.getConfig();
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// UPDATE CONFIG
const updateConfig = async (req, res) => {
  try {
    const id = req.params.id;
    const { error } = updateConfigSchema.validate(req.body);
    if (error) return badRequest(error.details[0].message, res);
    const response = await configServices.updateConfig({ id, ...req.body });
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

module.exports = {
  getConfig,
  updateConfig,
};
