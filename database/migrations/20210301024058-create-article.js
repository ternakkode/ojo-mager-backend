'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('articles', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(22)
      },
      slug: {
        allowNull: false,
        type: Sequelize.STRING(120)
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      category_id: {
        allowNull: false,
        type: Sequelize.STRING(22)
      },
      image_url: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      content: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('articles');
  }
};