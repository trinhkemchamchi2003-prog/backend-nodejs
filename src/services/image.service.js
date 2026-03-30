/* eslint-disable no-unused-vars */
const { TYPE_IMAGE } = require('../constant/config.constant');
const { generateFileName } = require('../utils/common.ulti');
const { handleFailed, handleSuccess } = require('../utils/handleResponse.util');
const _ = require('lodash');
const path = require('path');
const fs = require('fs');
const { processImage } = require('../utils/file.util');

//----------------------------------ADMIN-------------------------------------
// GET TYPE IMAGE
const getTypeImage = async () => {
  try {
    const response = _.map(TYPE_IMAGE, 'name');
    return handleSuccess(response, 'Get type image successfully!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// GET TYPE IMAGE
const getFolderImage = async (type) => {
  try {
    const imageType = _.find(TYPE_IMAGE, { name: type });
    if (!imageType) return handleFailed('Type invalid!');

    const folderPath = path.join(__dirname, imageType.path);
    if (!fs.existsSync(folderPath)) return handleFailed('Folder not found!');

    const files = fs.readdirSync(folderPath);
    const images = _.map(files, (element) => `/${type}/${element}`);

    const response = {
      type: imageType.name,
      images,
    };

    return handleSuccess(response, 'Get type image successfully!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// DESTROY IMAGE
const destroyImage = async (type, filename) => {
  try {
    const imagePath = path.join(__dirname, '..', 'images', type, filename);
    if (!imagePath) return handleFailed('Image not found!');

    await fs.promises.unlink(imagePath);
    return handleSuccess(null, 'Destroy image successfully!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//----------------------------------CLIENT-------------------------------------
// UPLOAD IMAGE
const uploadImage = async ({ file, type }) => {
  try {
    const imageType = _.find(TYPE_IMAGE, { name: type });
    if (!imageType) return handleFailed('Type invalid!');

    const destFolder = path.join(__dirname, imageType.path);
    if (!fs.existsSync(destFolder)) fs.mkdirSync(destFolder, { recursive: true });

    let bufferToSave = file.buffer;

    if (imageType.resize) {
      bufferToSave = await processImage(file, {
        width: imageType.width,
        height: imageType.height,
        type: imageType.name,
      });
    }

    const imageName = generateFileName(file.originalname);
    const fullPath = path.join(destFolder, imageName);
    await fs.promises.writeFile(fullPath, bufferToSave);

    const response = {
      fileName: imageName,
      path: `/${type}/${imageName}`,
    };
    return handleSuccess(response, 'Upload successfully!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  uploadImage,
  getTypeImage,
  getFolderImage,
  destroyImage,
};
