'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GrantCategory extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
    }
  }
  GrantCategory.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      grant_category: DataTypes.STRING,
      full_name: DataTypes.STRING,
      email: DataTypes.STRING,
      ton_wallet_address: DataTypes.STRING,
      website: DataTypes.STRING,
      pitch_deck: DataTypes.STRING,
      twitter: DataTypes.STRING,
      github_link: DataTypes.STRING,
      title: DataTypes.STRING,
      idea: DataTypes.STRING,
      details: DataTypes.STRING,
      team_description: DataTypes.STRING,
      traction: DataTypes.STRING,
      competitor: DataTypes.STRING,
      target_user: DataTypes.STRING,
      technology_stack: DataTypes.STRING,
      created_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'tb_grant_category',
      tableName: 'tb_grant_category',
      timestamps: false,
    }
  );
  return GrantCategory;
};
