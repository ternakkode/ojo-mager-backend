'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'is_subscribe_newsletter', {
      type: Sequelize.BOOLEAN,
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'is_subscribe_newsletter')
  }
};
