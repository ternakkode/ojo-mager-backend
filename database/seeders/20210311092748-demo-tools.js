'use strict';
const { nanoid } = require('nanoid');
const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const TOTAL_DATA = 10;

    let tools = [];
    for (let i = 0; i < TOTAL_DATA; i++) {
      tools.push({
        id: nanoid(),
        name: faker.lorem.word(),
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }

    await queryInterface.bulkInsert('tools', tools, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('tools', null, {});
  }
};
