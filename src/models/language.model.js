'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Language extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
    }
  }
  Language.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      lang_code: DataTypes.STRING,
      lang_name: DataTypes.STRING,
      native_name: DataTypes.STRING,
      text_direction: DataTypes.STRING,
      fallback_code: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'tb_language',
      tableName: 'tb_language',
      timestamps: false,
    }
  );
  return Language;
};
