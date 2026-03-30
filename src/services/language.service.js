const db = require('../models/index.model');
const { handleSuccess, handleFailed } = require('../utils/handleResponse.util');

//----------------------------------ADMIN-------------------------------------
// ADMIN GET LANGUAGE SUPPORT
const adminGetLanguage = async () => {
  try {
    const response = await db.tb_language.findAll();
    return handleSuccess(response, 'Get language support successfully!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// ADMIN CREATE LANGUAGE SUPPORT
const adminCreateLanguage = async (data) => {
  try {
    const response = await db.tb_language.findOne({
      where: { lang_code: data.lang_code, lang_name: data.lang_name },
    });
    if (response) return handleFailed('Language already exists!');
    if (!data.fallback_code) data.fallback_code = null;

    await db.tb_language.create(data);
    return handleSuccess(null, 'Create new language successfully!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// ADMIN UPDATE LANGUAGE SUPPORT
const adminUpdateLanguage = async ({ id, ...data }) => {
  try {
    const response = await db.tb_language.findByPk(id);
    if (!response) return handleFailed('Language not found!');

    await db.tb_language.update(data, { where: { id } });
    return handleSuccess(null, 'Update language successfully!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// ADMIN DESTROY LANGUAGE SUPPORT
const adminDestroyLanguage = async (id) => {
  try {
    const response = await db.tb_language.findByPk(id);
    if (!response) return handleFailed('Language not found!');

    await response.destroy();
    return handleSuccess(null, 'Destroy language successfully!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//----------------------------------CLIENT-------------------------------------
// GET LANGUAGE SUPPORT
const getLanguage = async () => {
  try {
    const response = await db.tb_language.findAll({
      where: { active: true },
    });
    return handleSuccess(response, 'Get language support successfully!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  adminGetLanguage,
  adminCreateLanguage,
  adminUpdateLanguage,
  adminDestroyLanguage,
  getLanguage,
};
