'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CoreTeam extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
      CoreTeam.hasMany(models.tb_core_team_translation, {
        foreignKey: 'core_team_id',
        as: 'translation',
      });
    }
  }
  CoreTeam.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      avatar_url: DataTypes.STRING,
      website_url: DataTypes.STRING,
      telegram_url: DataTypes.STRING,
      linkedin_url: DataTypes.STRING,
      facebook_url: DataTypes.STRING,
      twitter_url: DataTypes.STRING,
      type: DataTypes.STRING,
      level: DataTypes.INTEGER,
      active: DataTypes.BOOLEAN,
      created_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'tb_core_team',
      tableName: 'tb_core_team',
      timestamps: false,
    }
  );
  return CoreTeam;
};
