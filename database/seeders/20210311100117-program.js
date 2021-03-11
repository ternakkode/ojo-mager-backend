'use strict';

const faker = require('faker');
const generateSlug = require('../../utils/slug');
const { ProgramType } = require('../models')
const { nanoid } = require('nanoid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let programTypes = await ProgramType.findAll();

    let programs = [];
    programTypes.forEach(programType => {
      const TOTAL_DATA = 10;

      for (let i = 0; i < TOTAL_DATA; i++) {
        let program = new Object();

        program.id = nanoid();
        program.title = faker.lorem.words(8);
        program.slug = generateSlug(program.title);
        program.description = faker.lorem.paragraph();
        program.image_url = 'https://images.unsplash.com/photo-1544717684-1243da23b545';
        program.video_url = 'https://www.youtube.com/embed/bZ3MrRWxmFY';
        program.duration = Math.floor(Math.random() * 3600);
        program.program_type_id = programType.dataValues.id;
        program.createdAt = new Date();
        program.updatedAt = new Date();

        programs.push(program);
      }
    });
    await queryInterface.bulkInsert('programs', programs, {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('programs', null, {});
  }
};
