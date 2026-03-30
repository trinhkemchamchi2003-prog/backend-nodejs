const db = require('../models/index.model');
const { createSlug } = require('../utils/common.ulti');
const { handleSuccess, handleFailed } = require('../utils/handleResponse.util');
const dayjs = require('dayjs');
const { Op } = require('sequelize');

//----------------------------------ADMIN-------------------------------------
// ADMIN GET NEWS
const adminGetNews = async ({ page = 1, limit = 10, keyword = '' }) => {
  try {
    let offset = (page - 1) * limit;
    const response = await db.tb_news.findAndCountAll({
      where: {
        ...(keyword && { name: { [Op.like]: `%${keyword}%` } }),
      },
      include: [
        {
          model: db.tb_news_translation,
          as: 'translation',
          required: false,
          attributes: ['id'],
        },
      ],
      offset: Number(offset),
      limit: Number(limit),
      distinct: true,
      order: [
        ['is_pinned', 'DESC'],
        ['published_at', 'DESC'],
      ],
    });

    for (const element of response.rows) {
      if (element.translation.length) element.dataValues.translation = true;
      else element.dataValues.translation = false;
    }

    return handleSuccess(response, 'Get news successfully!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// ADMIN GET NEWS
const adminGetNewsDetail = async ({ id, lang = 'en' }) => {
  try {
    const response = await db.tb_news.findOne({
      where: {
        id,
      },
      include: [
        {
          model: db.tb_news_translation,
          as: 'translation',
          where: { lang_code: lang },
          required: false,
        },
      ],
    });

    if (!response) return handleFailed('News not found!');
    return handleSuccess(response, 'Get news detail successfully!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// ADMIN CREATE NEWS
const adminCreateNews = async (data) => {
  try {
    const slug = createSlug(data.name);
    data.slug = slug;
    if (data.published_at === null) delete data.published_at;

    const response = await db.tb_news.create(data);
    return handleSuccess(response, 'Create news successfully!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// ADMIN CREATE TRANSLATION
const adminCreateTranslation = async ({ id, ...data }) => {
  try {
    const checkNews = await db.tb_news.findByPk(id);
    if (!checkNews) return handleFailed('News not found!');

    const checkLang = await db.tb_language.findOne({
      where: { lang_code: data.lang_code, active: true },
    });
    if (!checkLang) return handleFailed('Language not supported!');

    const checkTranslation = await db.tb_news_translation.findOne({
      where: { news_id: id, lang_code: data.lang_code },
    });
    if (checkTranslation) return handleFailed('Translation already existed!');

    const response = await db.tb_news_translation.create({
      news_id: id,
      ...data,
    });

    return handleSuccess(response, 'Create news successfully!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// ADMIN UPDATE NEWS
const adminUpdateNews = async ({ id, ...data }) => {
  try {
    const response = await db.tb_news.findByPk(id);
    if (!response) return handleFailed('News not found!');

    if (data?.name) data.slug = createSlug(data.name);
    await db.tb_news.update(data, { where: { id } });

    return handleSuccess(null, 'Update news successfully!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// ADMIN UPDATE TRANSLATION
const adminUpdateTranslation = async ({ transId, ...data }) => {
  try {
    const response = await db.tb_news_translation.findByPk(transId);
    if (!response) return handleFailed('News not found!');

    await db.tb_news_translation.update(data, { where: { id: transId } });

    return handleSuccess(null, 'Update news translation successfully!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// ADMIN DESTROY NEWS
const adminDestroyNews = async (id) => {
  try {
    const response = await db.tb_news.findByPk(id);
    if (!response) return handleFailed('News not found!');

    await response.destroy();
    await db.tb_news_translation.destroy({ where: { news_id: id } });

    return handleSuccess(null, 'Destroy news successfully!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// ADMIN DESTROY NEWS
const adminDestroyTranslation = async (transId) => {
  try {
    const response = await db.tb_news_translation.findByPk(transId);
    if (!response) return handleFailed('Translation not found!');

    await response.destroy();

    return handleSuccess(null, 'Destroy news translation successfully!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// ADMIN NEWS CATEGORY
const adminGetCategory = async ({ page = 1, limit = 10, keyword = '' }) => {
  try {
    let offset = (page - 1) * limit;

    const response = await db.tb_news_category.findAllCountAll({
      where: {
        ...(keyword && { name: { [Op.like]: `%${keyword}%` } }),
      },
      offset: Number(offset),
      limit: Number(limit),
      distinct: true,
      order: [['name', 'ASC']],
    });

    return handleSuccess(response, 'Get news category successfully!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// ADMIN NEWS TAG
const adminGetTag = async () => {
  try {
    const response = await db.tb_news_category.findAll();

    return handleSuccess(response, 'Get news category successfully!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//----------------------------------COMMON-------------------------------------
// GET NEWS
const getNews = async ({ page = 1, limit = 10, keyword = '', lang = 'en' }) => {
  try {
    let offset = (page - 1) * limit;
    const now = dayjs().toDate();

    const response = await db.tb_news.findAndCountAll({
      where: {
        active: true,
        published_at: { [Op.lte]: now },
        ...(keyword && { name: { [Op.like]: `%${keyword}%` } }),
      },
      include: [
        {
          model: db.tb_news_translation,
          as: 'translation',
          where: {
            active: true,
            lang_code: lang,
            [Op.or]: [
              { title: { [Op.like]: `%${keyword}%` } },
              { summary: { [Op.like]: `%${keyword}%` } },
            ],
          },
          required: false,
        },
      ],
      offset: Number(offset),
      limit: Number(limit),
      distinct: true,
      order: [
        ['is_pinned', 'DESC'],
        ['published_at', 'DESC'],
      ],
    });
    return handleSuccess(response, 'Get news successfully!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// GET NEWS PINNED
const getNewsPinned = async ({ lang = 'en' }) => {
  try {
    const now = dayjs().toDate();

    const response = await db.tb_news.findAll({
      where: {
        active: true,
        published_at: { [Op.lte]: now },
        is_pinned: true,
      },
      include: [
        {
          model: db.tb_news_translation,
          as: 'translation',
          where: {
            active: true,
            lang_code: lang,
          },
          required: false,
          attributes: ['id', 'news_id', 'lang_code', 'banner_image_url', 'active'],
        },
      ],
      distinct: true,
      order: [
        ['published_at', 'DESC'],
        ['id', 'DESC'],
      ],
    });
    return handleSuccess(response, 'Get news pinned successfully!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  adminGetNews,
  adminGetNewsDetail,
  adminGetCategory,
  adminGetTag,
  adminCreateNews,
  adminCreateTranslation,
  adminUpdateNews,
  adminUpdateTranslation,
  adminDestroyNews,
  adminDestroyTranslation,
  getNews,
  getNewsPinned,
};
