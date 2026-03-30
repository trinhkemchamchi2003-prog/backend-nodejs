const imageServices = require('../services/image.service');
const { serverError, badRequest, handleResponse } = require('../utils/handleResponse.util');
const { uploadImageSchema } = require('../validations/image.validation');
const path = require('path');
const fs = require('fs');

// GET TYPE IMAGE
const getTypeImage = async (req, res) => {
  try {
    const response = await imageServices.getTypeImage();
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res);
  }
};

// GET IMAGE
const getFolderImage = async (req, res) => {
  try {
    const type = req.params.type;
    const response = await imageServices.getFolderImage(type);
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res);
  }
};

// UPLOAD IMAGE
const uploadImage = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return badRequest('File is required!', res);

    const { error } = uploadImageSchema.validate(req.body);
    if (error) return badRequest(error.details[0].message, res);
    const response = await imageServices.uploadImage({ file, ...req.body });
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res);
  }
};

// UPLOAD IMAGE
const destroyImage = async (req, res) => {
  try {
    const { type, filename } = req.params;
    const response = await imageServices.destroyImage(type, filename);
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res);
  }
};

// GET IMAGE
const getImage = (req, res) => {
  const { type, filename } = req.params;
  const imagePath = path.join(__dirname, '..', 'images', type, filename);

  if (fs.existsSync(imagePath)) {
    res.sendFile(imagePath);
  } else {
    res.status(404).send('Not found');
  }
};

module.exports = {
  uploadImage,
  getTypeImage,
  getFolderImage,
  getImage,
  destroyImage,
};
