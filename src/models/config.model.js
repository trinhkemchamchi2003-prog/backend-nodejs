'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Config extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
    }
  }
  Config.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      value: DataTypes.STRING,
      note: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'tb_config',
      tableName: 'tb_config',
      timestamps: false,
    }
  );
  return Config;
};
