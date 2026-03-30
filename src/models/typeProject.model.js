'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TypeProject extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
    }
  }
  TypeProject.init(
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
      modelName: 'tb_type_project',
      tableName: 'tb_type_project',
      timestamps: false,
    }
  );
  return TypeProject;
};
