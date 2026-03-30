'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NewsTranslation extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
    }
  }
  NewsTranslation.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      news_id: DataTypes.INTEGER,
      lang_code: DataTypes.STRING,
      title: DataTypes.STRING,
      summary: DataTypes.STRING,
      content: DataTypes.STRING,
      banner_image_url: DataTypes.INTEGER,
      seo_title: DataTypes.STRING,
      seo_description: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
      created_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'tb_news_translation',
      tableName: 'tb_news_translation',
      timestamps: false,
    }
  );
  return NewsTranslation;
};
