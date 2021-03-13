'use strict';
const { date } = require('faker');
const { nanoid } = require('nanoid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let articleCategories = [
      {
        id: nanoid(),
        name: 'Kata Pakar',
        button_color_code: '00B292',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: nanoid(),
        name: 'Nutrisi',
        button_color_code: 'FF6D1C',
        createdAt: new Date(),
        updatedAt: new Date
      },
    ]

    await queryInterface.bulkInsert('article_categories', articleCategories, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('article_categories', null, {});
  }
};
