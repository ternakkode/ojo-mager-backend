'use strict';
const bcryptHelper = require('../../helpers/bcrypt');
const { nanoid } = require('nanoid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let users = [
      {
        id: nanoid(),
        name: 'M. Firhan Azmi Nor',
        email: 'muhammd.firhan.azmi@gmail.com',
        password: await bcryptHelper.encryptPasswordAsync('@Rahasia123'),
        role: 'user',
        is_verified: true,
        is_subscribe_newsletter: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: nanoid(),
        name: 'M. Firhan Azmi Nor',
        email: 'ojomagersynrgy@gmail.com',
        password: await bcryptHelper.encryptPasswordAsync('@Rahasia123'),
        role: 'admin',
        is_verified: true,
        is_subscribe_newsletter: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('users', users, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
