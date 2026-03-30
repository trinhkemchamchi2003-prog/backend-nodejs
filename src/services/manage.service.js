/* eslint-disable no-unused-vars */
const db = require('../models/index.model');
const { handleSuccess, handleFailed } = require('../utils/handleResponse.util');
const { Op } = require('sequelize');

// LIST MAIL CONTACT
const mailContact = async ({ page = 1, limit = 10, keyword = '', status = '' }) => {
  try {
    let offset = (page - 1) * limit;
    let where = {
      [Op.or]: [{ name: { [Op.like]: `%${keyword}%` } }, { email: { [Op.like]: `%${keyword}%` } }],
    };
    if (status) where.status = status;
    const response = await db.tb_contact.findAndCountAll({
      where,
      offset: Number(offset),
      limit: Number(limit),
      order: [['id', 'DESC']],
    });
    return handleSuccess(response, 'Get list mail contact!');
  } catch (error) {
    console.error('Error fetching contact list:', error);
    throw error;
  }
};

// LIST MAIL CONTACT APP
const mailContactApp = async ({ page = 1, limit = 10 }) => {
  try {
    let offset = (page - 1) * limit;
    const response = await db.tb_contact_d_app.findAndCountAll({
      offset: Number(offset),
      limit: Number(limit),
      order: [['id', 'DESC']],
    });
    return handleSuccess(response, 'Get list mail contact app!');
  } catch (error) {
    console.error('Error fetching contact list:', error);
    throw error;
  }
};

// GET CONTACT PARTNER
const mailContactPartner = async ({ page = 1, limit = 10, keyword = '', status = '' }) => {
  try {
    let offset = (page - 1) * limit;
    let where = {
      [Op.or]: [
        { email: { [Op.like]: `%${keyword}%` } },
        { first_name: { [Op.like]: `%${keyword}%` } },
        { last_name: { [Op.like]: `%${keyword}%` } },
      ],
    };
    if (status) where.status = status;
    const response = await db.tb_contact_partner.findAndCountAll({
      where,
      offset: Number(offset),
      limit: Number(limit),
      order: [['id', 'DESC']],
    });
    return handleSuccess(response, 'Send contact successfully !');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// UPDATE STATUS CONTACT PARTNER
const updateStatusPartner = async (id) => {
  try {
    const contact = await db.tb_contact_partner.findByPk(id);
    if (!contact || contact?.status === 'SUCCESS')
      return handleFailed('Contact partner not found!');

    contact.status = 'SUCCESS';
    await contact.save();
    return handleSuccess(null, 'Update contact partner successfully!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  mailContact,
  mailContactApp,
  mailContactPartner,
  updateStatusPartner,
};
