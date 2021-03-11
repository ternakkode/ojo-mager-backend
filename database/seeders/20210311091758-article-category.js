'use strict';
const { nanoid } = require('nanoid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let articleCategories = [
      {
        id: nanoid(),
        name: 'Kata Pakar',
      },
      {
        id: nanoid(),
        name: 'Nutrisi',
      },
    ]

    await queryInterface.bulkInsert('article_categories', articleCategories, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('article_categories', null, {});
  }
};
