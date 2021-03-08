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
    name: DataTypes.STRING
  }, {
    sequelize,
    timestamps: false,
    tableName: 'article_categories',
    modelName: 'ArticleCategory',
  });
  return ArticleCategory;
};