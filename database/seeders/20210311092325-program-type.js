'use strict';
const { nanoid } = require('nanoid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let programTypes = [
      {
        id: nanoid(),
        name: 'Cardio',
        button_color_code: '7BCBD6',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: nanoid(),
        name: 'Streching',
        button_color_code: '00B292',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]

    await queryInterface.bulkInsert('program_types', programTypes, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('program_types', null, {});
  }
};
