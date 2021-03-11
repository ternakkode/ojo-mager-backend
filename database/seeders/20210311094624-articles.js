'use strict';

const faker = require('faker');
const generateSlug = require('../../utils/slug');
const { ArticleCategory, User } = require('../models')
const { nanoid } = require('nanoid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let user = await User.findOne({where: { role : 'admin' }})
    let articleCategories = await ArticleCategory.findAll();

    let articles = [];
    articleCategories.forEach(articleCategory => {
      const TOTAL_DATA = 10;
      
      for (let i = 0; i < TOTAL_DATA; i++) {
        let article = new Object();
        
        article.id = nanoid();
        article.title = faker.lorem.words(8);
        article.slug = generateSlug(article.title);
        article.category_id = articleCategory.dataValues.id;
        article.user_id = user.id;
        article.image_url = 'https://images.unsplash.com/photo-1581009137042-c552e485697a';
        article.content = faker.lorem.paragraphs(10, '\n\n');
        article.createdAt = new Date();
        article.updatedAt = new Date();

        articles.push(article);
      }
    });

    await queryInterface.bulkInsert('articles', articles, {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('articles', null, {});
  }
};
