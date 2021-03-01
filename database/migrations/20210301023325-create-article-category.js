'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('article_categories', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(22)
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(100)
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('article_categories');
  }
};