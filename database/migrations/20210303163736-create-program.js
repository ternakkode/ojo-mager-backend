'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('programs', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(22)
      },
      slug: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      title: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      image_url: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      video_url: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      duration: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      program_type_id: {
        type: Sequelize.STRING(22),
        allowNull: false,
        // primaryKey: false,
        // references: {
        //   model: 'program_types',
        //   key: 'id'
        // }
      },
      difficulty_type_id: {
        type: Sequelize.STRING(22),
        allowNull: false,
        // primaryKey: false,
        // references: {
        //   model: 'difficult_types',
        //   key: 'id'
        // }
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
    await queryInterface.dropTable('programs');
  }
};