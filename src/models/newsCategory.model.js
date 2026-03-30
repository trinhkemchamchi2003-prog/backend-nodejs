'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NewsCategory extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
    }
  }
  NewsCategory.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
      description: DataTypes.STRING,
      thumbnail: DataTypes.STRING,
      total_news: DataTypes.INTEGER,
      active: DataTypes.BOOLEAN,
      created_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'tb_news_category',
      tableName: 'tb_news_category',
      timestamps: false,
    }
  );
  return NewsCategory;
};
