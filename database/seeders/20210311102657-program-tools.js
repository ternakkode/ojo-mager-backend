'use strict';

const { Program, Tool } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const programs = await Program.findAll();
    
    programs.forEach(program => {
      Tool.findAll({
        order: Sequelize.literal('random()'),
        limit: Math.floor(Math.random() * 10)
      }).then(tool => {
        program.addTools(tool);
      })
    })
  }
  ,down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('program_tools', null, {});
  }
};
