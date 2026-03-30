const newsServices = require('../services/news.service');
const { serverError, badRequest, handleResponse } = require('../utils/handleResponse.util');
const newsSchema = require('../validations/news.validation');

//----------------------------------ADMIN-------------------------------------
// ADMIN GET NEWS
const adminGetNews = async (req, res) => {
  try {
    const response = await newsServices.adminGetNews(req.query);
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// ADMIN GET NEWS DETAIL
const adminGetNewsDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const { lang } = req.query;
    const response = await newsServices.adminGetNewsDetail({ id, lang });
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// ADMIN CREATE NEWS
const adminCreateNews = async (req, res) => {
  try {
    const { error } = newsSchema.adminCreateNews.validate(req.body);
    if (error) return badRequest(error.details[0].message, res);
    const response = await newsServices.adminCreateNews(req.body);
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// ADMIN CREATE NEWS
const adminCreateTranslation = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = newsSchema.adminCreateTranslation.validate(req.body);
    if (error) return badRequest(error.details[0].message, res);
    const response = await newsServices.adminCreateTranslation({ id, ...req.body });
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// ADMIN UPDATE NEWS
const adminUpdateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = newsSchema.adminUpdateNews.validate(req.body);
    if (error) return badRequest(error.details[0].message, res);
    const response = await newsServices.adminUpdateNews({ id, ...req.body });
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// ADMIN UPDATE TRANSLATION
const adminUpdateTranslation = async (req, res) => {
  try {
    const { transId } = req.params;
    const { error } = newsSchema.adminUpdateTranslation.validate(req.body);
    if (error) return badRequest(error.details[0].message, res);
    const response = await newsServices.adminUpdateTranslation({ transId, ...req.body });
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// ADMIN UPDATE NEWS
const adminDestroyNews = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await newsServices.adminDestroyNews(id);
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// ADMIN UPDATE TRANSLATION
const adminDestroyTranslation = async (req, res) => {
  try {
    const { transId } = req.params;
    const response = await newsServices.adminDestroyTranslation(transId);
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// ADMIN GET CATEGORY
const adminGetCategory = async (req, res) => {
  try {
    const response = await newsServices.adminGetCategory();
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};
//----------------------------------COMMON-------------------------------------
// GET NEWS
const getNews = async (req, res) => {
  try {
    const { error } = newsSchema.getNews.validate(req.query);
    if (error) return badRequest(error.details[0].message, res);
    const response = await newsServices.getNews(req.query);
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// GET NEWS PINNED
const getNewsPinned = async (req, res) => {
  try {
    const { error } = newsSchema.getNews.validate(req.query);
    if (error) return badRequest(error.details[0].message, res);
    const response = await newsServices.getNewsPinned(req.query);
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

module.exports = {
  adminGetNews,
  adminGetNewsDetail,
  adminGetCategory,
  adminCreateNews,
  adminCreateTranslation,
  adminUpdateNews,
  adminUpdateTranslation,
  adminDestroyNews,
  adminDestroyTranslation,
  getNews,
  getNewsPinned,
};
