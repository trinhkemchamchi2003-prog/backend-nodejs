'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PartnerField extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
    }
  }
  PartnerField.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'tb_partner_field',
      tableName: 'tb_partner_field',
      timestamps: false,
    }
  );
  return PartnerField;
};
