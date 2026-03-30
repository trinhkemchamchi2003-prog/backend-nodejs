const db = require('../models/index.model');
const { handleSuccess, handleFailed } = require('../utils/handleResponse.util');
const { Op } = require('sequelize');

//----------------------------------ADMIN-------------------------------------
// ADMIN GET MEMBER
const adminGetMember = async ({ page = 1, limit = 19, keyword = '' }) => {
  try {
    let offset = (page - 1) * limit;
    const response = await db.tb_core_team.findAndCountAll({
      where: {
        [Op.or]: [{ name: { [Op.like]: `%${keyword}%` } }],
      },
      include: [
        {
          model: db.tb_core_team_translation,
          as: 'translation',
          required: false,
          attributes: ['id'],
        },
      ],
      offset: Number(offset),
      limit: Number(limit),
      order: [
        ['level', 'ASC'],
        ['id', 'ASC'],
      ],
    });

    for (const element of response.rows) {
      if (element.translation.length) element.dataValues.translation = true;
      else element.dataValues.translation = false;
    }

    return handleSuccess(response, 'Get list core team successfully!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// ADMIN GET MEMBER DETAIL
const adminGetMemberDetail = async (id) => {
  try {
    const response = await db.tb_core_team.findOne({
      where: { id },
      include: [
        {
          model: db.tb_core_team_translation,
          as: 'translation',
        },
      ],
    });
    if (!response) return handleFailed('Member not found!');
    return handleSuccess(response, 'Get detail member successfully!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// ADMIN CREATE MEMBER
const adminCreateMember = async (data) => {
  try {
    const response = await db.tb_core_team.create(data);
    return handleSuccess(response, 'Create member successfully!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// ADMIN CREATE MEMBER TRANSLATION
const adminCreateTranslation = async ({ id, ...data }) => {
  try {
    const member = await db.tb_core_team.findByPk(id);
    if (!member) return handleFailed('Member not found!');

    const translation = await db.tb_language.findOne({
      where: { lang_code: data.lang_code, active: true },
    });
    if (!translation) return handleFailed('Language not found!');

    const checkTranslation = await db.tb_core_team_translation.findOne({
      where: { core_team_id: id, lang_code: data.lang_code },
    });
    if (checkTranslation) return handleFailed('Translation already existed!');

    const response = await db.tb_core_team_translation.create({
      core_team_id: id,
      lang_id: translation.id,
      ...data,
    });
    return handleSuccess(response, 'Create core team translation successfully!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// ADMIN UPDATE MEMBER
const adminUpdateMember = async ({ id, ...data }) => {
  try {
    const response = await db.tb_core_team.findByPk(id);
    if (!response) return handleFailed('Member not found!');

    await db.tb_core_team.update(data, { where: { id } });
    return handleSuccess(null, 'Update member successfully!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// ADMIN UPDATE MEMBER TRANSLATION
const adminUpdateTranslation = async ({ coreTeamId, ...data }) => {
  try {
    const response = await db.tb_core_team_translation.findByPk(coreTeamId);
    if (!response) return handleFailed('Translation not found!');

    await db.tb_core_team_translation.update(data, { where: { id: coreTeamId } });
    return handleSuccess(null, 'Update translation successfully!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// ADMIN DESTROY MEMBER
const adminDestroyMember = async (id) => {
  try {
    const response = await db.tb_core_team.findByPk(id);
    if (!response) return handleFailed('Member not found!');

    await response.destroy();
    await db.tb_core_team_translation.destroy({ where: { core_team_id: id } });
    return handleSuccess(null, 'Destroy member successfully!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// ADMIN DESTROY MEMBER TRANSLATION
const adminDestroyTranslation = async (coreTeamId) => {
  try {
    const response = await db.tb_core_team_translation.findByPk(coreTeamId);
    if (!response) return handleFailed('Translation not found!');

    await response.destroy();
    return handleSuccess(null, 'Destroy translation successfully!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//----------------------------------CLIENT-------------------------------------
// GET MEMBER
const getMember = async ({ lang = 'en' }) => {
  try {
    const response = await db.tb_core_team.findAndCountAll({
      where: {
        active: true,
      },
      include: [
        {
          model: db.tb_core_team_translation,
          as: 'translation',
          where: { lang_code: lang, active: true },
          required: false,
        },
      ],
      order: [
        ['id', 'ASC'],
        ['level', 'ASC'],
      ],
    });
    return handleSuccess(response, 'Core team members fetched successfully!');
  } catch (error) {
    console.log(error);
    throw error;
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
