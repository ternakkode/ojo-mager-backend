'use strict';
const ApiErrorHandler = require('../../helpers/ApiErrorHandler');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    static associate(models) {
      Article.belongsTo(models.ArticleCategory, {
        as: "category",
        foreignKey: "category_id"
      })
      Article.belongsTo(models.User, {
        as: "publisher",
        foreignKey: "user_id"
      })
    }
  };
  Article.init({
    slug: DataTypes.STRING,
    title: DataTypes.STRING,
    user_id: DataTypes.STRING,
    category_id: DataTypes.STRING,
    image_url: DataTypes.STRING,
    content: DataTypes.TEXT,
  }, {
    sequelize,
    tableName: 'articles',
    modelName: 'Article',
  });
  return Article;
};