'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
      News.hasMany(models.tb_news_translation, {
        foreignKey: 'news_id',
        as: 'translation',
      });
    }
  }
  News.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
      image_url: DataTypes.STRING,
      redirect_url: DataTypes.STRING,
      is_pinned: DataTypes.BOOLEAN,
      active: DataTypes.BOOLEAN,
      type: DataTypes.STRING,
      published_at: DataTypes.DATE,
      created_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'tb_news',
      tableName: 'tb_news',
      timestamps: false,
    }
  );
  return News;
};
