'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NewsTag extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
    }
  }
  NewsTag.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
      total_news: DataTypes.INTEGER,
      color: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
      created_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'tb_news_tag',
      tableName: 'tb_news_tag',
      timestamps: false,
    }
  );
  return NewsTag;
};
