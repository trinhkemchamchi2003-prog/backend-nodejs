'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Partner extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
    }
  }
  Partner.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      logo_url: DataTypes.STRING,
      field_id: DataTypes.STRING,
      field_name: DataTypes.STRING,
      website_url: DataTypes.STRING,
      twitter_url: DataTypes.STRING,
      discord_url: DataTypes.STRING,
      telegram_url: DataTypes.STRING,
      youtube_url: DataTypes.STRING,
      facebook_url: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
      created_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'tb_partner',
      tableName: 'tb_partner',
      timestamps: false,
    }
  );
  return Partner;
};
