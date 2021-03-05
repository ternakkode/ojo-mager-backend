'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('articles', 'user_id', {
      type: Sequelize.STRING(22),
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('articles', 'user_id')
  }
};
