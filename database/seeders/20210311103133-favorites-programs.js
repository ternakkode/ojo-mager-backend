'use strict';

const { Program, User } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await User.findAll();
    
    users.forEach(user => {
      Program.findAll({
        order: Sequelize.literal('random()'),
        limit: Math.floor(Math.random() * 20)
      }).then(programs => {
        user.addPrograms(programs)
      })
    })
  }
  ,down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('favorites_programs', null, {});
  }
};
