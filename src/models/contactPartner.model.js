'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ContactPartner extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
    }
  }
  ContactPartner.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      title: DataTypes.STRING,
      email: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      organization_name: DataTypes.STRING,
      organization_location: DataTypes.STRING,
      industry: DataTypes.STRING,
      organization_size: DataTypes.STRING,
      field_id: DataTypes.STRING,
      field_name: DataTypes.STRING,
      message: DataTypes.STRING,
      status: DataTypes.STRING,
      created_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'tb_contact_partner',
      tableName: 'tb_contact_partner',
      timestamps: false,
    }
  );
  return ContactPartner;
};
