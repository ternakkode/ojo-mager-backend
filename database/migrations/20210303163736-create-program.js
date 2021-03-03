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
        type: Sequelize.STRING(200)
      },
      title: {
        type: Sequelize.STRING(200)
      },
      image_url: {
        type: Sequelize.STRING(100)
      },
      video_url: {
        type: Sequelize.STRING(100)
      },
      duration: {
        type: Sequelize.INTEGER
      },
      program_type_id: {
        type: Sequelize.STRING(22),
        primaryKey: false,
        references: {
          model: 'program_types',
          key: 'id'
        }
      },
      difficulty_type_id: {
        type: Sequelize.STRING(22),
        primaryKey: false,
        references: {
          model: 'difficult_types',
          key: 'id'
        }
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