'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_codes', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(22)
      },
      user_id: {
        allowNull: false,
        type: Sequelize.STRING(22)
      },
      type: {
        allowNull: false,
        type: Sequelize.ENUM('verification', 'forgot-password')
      },
      code: {
        type: Sequelize.STRING(100)
      },
      is_available: {
        allowNull: false,
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('user_codes');
  }
};