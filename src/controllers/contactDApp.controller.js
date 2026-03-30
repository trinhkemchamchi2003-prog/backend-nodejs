const contactDAppServices = require('../services/contactDApp.service');
const { handleResponse, serverError } = require('../utils/handleResponse.util');

//----------------------------------ADMIN-------------------------------------
const listSendDApp = async (req, res) => {
  try {
    const { keyword, page, limit } = req.query;
    const response = await contactDAppServices.listSendDApp(keyword, limit, page);
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

const deleteSendDApp = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await contactDAppServices.deleteSendDApp(id);
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

module.exports = {
  listSendDApp,
  deleteSendDApp,
};
