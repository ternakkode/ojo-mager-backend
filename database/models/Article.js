'use strict';
const ApiErrorHandler = require('../../helpers/ApiErrorHandler');
const timeUtils = require('../../utils/time');

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
    truncated_content: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.content.substring(0,130) + '...';
      },
      set(value) {
        throw new ApiErrorHandler('Do not try to set the `truncated_content` value!');
      }
    },
    published_at: {
      type: DataTypes.VIRTUAL,
      get() {
        const parsedDate = new Date(this.createdAt)
        return timeUtils.indonesianDateFormat(parsedDate)
      },
      set(value) {
        throw new ApiErrorHandler('Do not try to set the `published_at` value!');
      }
    }
  }, {
    sequelize,
    tableName: 'articles',
    modelName: 'Article',
  });
  return Article;
};