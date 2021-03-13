'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ArticleCategory extends Model {
    static associate(models) {
      ArticleCategory.hasMany(models.Article, {
        as: "categories",
        foreignKey: "category_id"
      })
    }
  };
  ArticleCategory.init({
    name: DataTypes.STRING,
    button_color_code: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'article_categories',
    modelName: 'ArticleCategory',
  });
  return ArticleCategory;
};