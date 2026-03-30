/* eslint-disable no-unused-vars */
const db = require('../models/index.model');
const { handleSuccess, handleFailed } = require('../utils/handleResponse.util');
const { Op, Sequelize } = require('sequelize');
const _ = require('lodash');

//----------------------------------ADMIN-------------------------------------
// ADMIN GET PARTNER
const adminGetPartner = async ({ page = 1, limit = 10, keyword = '' }) => {
  try {
    let offset = (page - 1) * limit;
    const response = await db.tb_partner.findAndCountAll({
      where: {
        [Op.or]: [{ name: { [Sequelize.Op.like]: `%${keyword}%` } }],
      },

      offset: Number(offset),
      limit: Number(limit),
    });

    for (const element of response.rows) {
      element.field_id = JSON.parse(element.field_id);
      element.field_name = JSON.parse(element.field_name);
    }

    return handleSuccess(response, 'Get list partner successfuly !!!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// ADMIN GET PARTNER FIELD
const adminGetField = async () => {
  try {
    const response = await db.tb_partner_field.findAll();
    return handleSuccess(response, 'Get list partner field successfuly !!!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// ADMIN CREATE PARTNER
const adminCreatePartner = async (data) => {
  try {
    const field = await db.tb_partner_field.findAll({
      where: {
        id: { [Op.in]: data.field_id },
      },
      order: [[Sequelize.literal(`FIELD(id, ${data.field_id.join(',')})`)]],
    });

    if (!field || field.length !== data.field_id.length) return handleFailed('Field not found!');
    const fieldName = _.map(field, 'name');

    data.field_id = JSON.stringify(data.field_id);
    data.field_name = JSON.stringify(fieldName);

    await db.tb_partner.create(data);
    return handleSuccess(null, 'Create partner successfully!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// ADMIN CREATE PARTNER FIELD
const adminCreateField = async (data) => {
  try {
    await db.tb_partner_field.create(data);
    return handleSuccess(null, 'Create partner field successfully!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// ADMIN UPDATE PARTNER
const adminUpdatePartner = async ({ id, field_id, ...data }) => {
  try {
    const response = await db.tb_partner.findByPk(id);
    if (!response) return handleFailed('Partner not found!');

    if (field_id && field_id.length) {
      const field = await db.tb_partner_field.findAll({
        where: {
          id: { [Op.in]: field_id },
        },
        order: [[Sequelize.literal(`FIELD(id, ${field_id.join(',')})`)]],
      });

      if (!field || field.length !== field_id.length) return handleFailed('Field not found!');

      const fieldName = _.map(field, 'name');
      data.field_id = JSON.stringify(field_id);
      data.field_name = JSON.stringify(fieldName);
    }

    await db.tb_partner.update(data, { where: { id } });
    return handleSuccess(null, 'Update partner successfully!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// ADMIN DESTROY PARTNER
const adminDestroyPartner = async (id) => {
  try {
    const response = await db.tb_partner.findByPk(id);
    if (!response) return handleFailed('Partner not found!');
    await response.destroy();
    return handleSuccess(null, 'Delete partner successfully!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// ADMIN DESTROY PARTNER FIELD
const adminDestroyField = async (id) => {
  try {
    const response = await db.tb_partner_field.findByPk(id);
    if (!response) return handleFailed('Partner field not found!');
    await response.destroy();
    return handleSuccess(null, 'Delete partner field successfully!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//----------------------------------CLIENT-------------------------------------
// GET PARTNER
const getPartner = async ({ page = 1, limit = 10, keyword = '' }) => {
  try {
    let offset = (page - 1) * limit;
    const response = await db.tb_partner.findAndCountAll({
      where: {
        [Op.or]: [{ name: { [Sequelize.Op.like]: `%${keyword}%` } }],
        active: true,
      },

      offset: Number(offset),
      limit: Number(limit),
    });

    for (const element of response.rows) {
      element.field_id = JSON.parse(element.field_id);
      element.field_name = JSON.parse(element.field_name);
    }

    return handleSuccess(response, 'Get list partner successfuly !!!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  adminGetPartner,
  adminGetField,
  adminCreatePartner,
  adminCreateField,
  adminUpdatePartner,
  adminDestroyPartner,
  adminDestroyField,
  getPartner,
};
