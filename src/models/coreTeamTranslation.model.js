'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CoreTeamTranslation extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
    }
  }
  CoreTeamTranslation.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      core_team_id: DataTypes.INTEGER,
      lang_id: DataTypes.INTEGER,
      lang_code: DataTypes.STRING,
      position: DataTypes.STRING,
      description: DataTypes.STRING,
      experience: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
      created_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'tb_core_team_translation',
      tableName: 'tb_core_team_translation',
      timestamps: false,
    }
  );
  return CoreTeamTranslation;
};
