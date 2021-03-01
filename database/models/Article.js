'use strict';
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
    }
  };
  Article.init({
    slug: DataTypes.STRING,
    title: DataTypes.STRING,
    category_id: DataTypes.STRING,
    image_url: DataTypes.STRING,
    content: DataTypes.TEXT
  }, {
    sequelize,
    tableName: 'articles',
    modelName: 'Article',
  });
  return Article;
};