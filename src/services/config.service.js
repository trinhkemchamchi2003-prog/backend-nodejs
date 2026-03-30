/* eslint-disable no-unused-vars */
const db = require('../models/index.model');
const { handleSuccess, handleFailed } = require('../utils/handleResponse.util');

// GET CONFIG
const getConfig = async () => {
  try {
    const response = await db.tb_config.findAll();
    return handleSuccess(response, 'Get config successfully!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// UPDATE CONFIG
const updateConfig = async ({ id, ...data }) => {
  try {
    const response = await db.tb_config.findOne({
      where: { id },
    });
    if (!response) return handleFailed('Config not found!');

    await db.tb_config.update(data, { where: { id } });
    return handleSuccess(null, 'Update config successfully!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  getConfig,
  updateConfig,
};
