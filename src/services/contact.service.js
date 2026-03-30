/* eslint-disable no-unused-vars */
const db = require('../models/index.model');
const dayjs = require('dayjs');
const { handleSuccess, handleFailed } = require('../utils/handleResponse.util');
const { sendMail } = require('../utils/email.util');
const { TEMPLATE } = require('../constant/template.constant');
const { Op, Sequelize } = require('sequelize');
const _ = require('lodash');
const { CONFIG } = require('../constant/config.constant');

// USER SEND MAIL CONTACT
const sendContact = async (data) => {
  try {
    await db.tb_contact.create(data);
    const dataSuport = {
      ...data,
      time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    };

    // Send from support team
    await sendMail(TEMPLATE.CONTACT, dataSuport, process.env.MAIL_USER, `Contact Pione Chain`);

    // Response user
    await sendMail(
      TEMPLATE.RESPONSE_CONTACT,
      { name: data.name },
      data.email,
      `Pione Chain Support | Contact`
    );
    return handleSuccess(null, 'Create contact successfuly !!!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// SEND CONTACT DAPP
const sendContactDApp = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const dataMail = {
        project_website: data.project_website,
        summary_of_project: data.summary_of_project,
        type_of_project: data.type_of_project,
        your_name: data.your_name,
        your_role_at_this_project: data.your_role_at_this_project,
        contact_email_or_telegram: data.contact_email_or_telegram,
        project_discord: data.project_discord,
        project_github: data.project_github,
        project_audits: data.project_audits,
        project_twitter: data.project_twitter,
        other_socials: data.other_socials,
        other_link: data.other_link,
        d_app_on_link: data.d_app_on_link,
        d_app_wallet: data.d_app_wallet,
        relevant_contract_address: data.relevant_contract_address,
        investor: data.investor,
        status_project: 0,
        founding_date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        email: data.email,
      };
      await db.tb_contact_d_app.create(data);
      await sendMail(TEMPLATE.CONTACT_DAPP, dataMail, process.env.MAIL_USER, `CONTACT`);
      await sendMail(TEMPLATE.CONTACT_DAPP, dataMail, data.email, `CONTACT`);
      return resolve(handleSuccess(null, 'Send contact successfully !'));
    } catch (error) {
      reject(error);
    }
  });

// LIST TYPE DAPP
const listTypeDApp = (keyword = '', limit = 10, page = 1) =>
  new Promise(async (resolve, reject) => {
    try {
      let offset = (page - 1) * limit;
      const data = await db.tb_type_project.findAndCountAll({
        where: {
          [Sequelize.Op.or]: [{ name: { [Sequelize.Op.like]: `%${keyword}%` } }],
        },
        offset: Number(offset),
        limit: Number(limit),
      });
      return resolve(handleSuccess(data, 'Send contact successfully !'));
    } catch (error) {
      reject(error);
    }
  });

// SEND CONTACT GRANT CATEGORY
const sendContactGrantCategory = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const dataMail = {
        grant_category: data.grant_category,
        full_name: data.full_name,
        email: data.email,
        ton_wallet_address: data.ton_wallet_address,
        personal_telegram_handle: data.personal_telegram_handle,
        website: data.website,
        pitch_deck: data.pitch_deck,
        twitter: data.twitter,
        github_link: data.github_link,
        title: data.title,
        idea: data.idea,
        details: data.details,
        add_milestones: data.add_milestones,
        detail_for_milestones: data.detail_for_milestones,
        deadline_for_milestone: data.deadline_for_milestone,
        funding_ask_for_this_milestone: data.funding_ask_for_this_milestone,
        how_project_implement_ton: data.how_project_implement_ton,
        describe_your_team_composition: data.describe_your_team_composition,
        indicate_your_current_traction: data.indicate_your_current_traction,
        who_are_your_competitors: data.who_are_your_competitors,
        please_describe_your_user: data.please_describe_your_user,
        who_is_your_target_user: data.who_is_your_target_user,
        what_is_your_vision: data.what_is_your_vision,
        overview_of_the_technology_stack: data.overview_of_the_technology_stack,
      };
      await db.tb_grant_category.create(data);
      await sendMail(TEMPLATE.CONTACT_GRANT_CATEGORY, dataMail, process.env.MAIL_USER, `CONTACT`);
      await sendMail(TEMPLATE.CONTACT_GRANT_CATEGORY, dataMail, data.email, `CONTACT`);
      return resolve(handleSuccess(null, 'Send contact successfully !'));
    } catch (error) {
      reject(error);
    }
  });

// CREATE CONTACT PARTNER
const createContactPartner = async ({ ...data }) => {
  try {
    const field = await db.tb_partner_field.findAll({
      where: {
        id: { [Op.in]: data.field_id },
      },
    });

    if (!field || field.length !== data.field_id.length) return handleFailed('Field not found!');
    const fieldName = _.map(field, 'name');

    data.field_id = JSON.stringify(data.field_id);
    data.field_name = JSON.stringify(fieldName);

    await db.tb_contact_partner.create(data);

    // send mail
    const name = data.first_name + ' ' + data.last_name;
    await sendMail(
      TEMPLATE.RESPONSE_CONTACT_PARTNER,
      { name },
      data.email,
      'Pione Chain | Partnership Inquiry Confirmation'
    );

    // send mail admin
    const mailAdmin = await db.tb_config.findOne({
      where: { name: CONFIG.PARTNER_CONTACT },
    });

    if (!mailAdmin) return handleFailed('Config not found!');
    await sendMail(
      TEMPLATE.CONTACT_PARTNER,
      { ...data, time: dayjs() },
      mailAdmin.value,
      'Pione Chain Notification | Partnership Inquiry Confirmation'
    );
    return handleSuccess(null, 'Send contact partner successfuly !!!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  listTypeDApp,
  sendContact,
  sendContactDApp,
  sendContactGrantCategory,
  createContactPartner,
};
