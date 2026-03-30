'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ContactDApp extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
    }
  }
  ContactDApp.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      your_name: DataTypes.STRING,
      email: DataTypes.STRING,
      project_summary: DataTypes.STRING,
      project_type: DataTypes.STRING,
      project_website: DataTypes.STRING,
      dapp_link: DataTypes.STRING,
      social_link: DataTypes.STRING,
      relevant_contract_address: DataTypes.STRING,
      investor: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      created_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'tb_contact_d_app',
      tableName: 'tb_contact_d_app',
      timestamps: false,
    }
  );
  return ContactDApp;
};
