'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('program_tools', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(22)
      },
      program_id: {
        type: Sequelize.STRING(22),
        primaryKey: false,
        relation: {
          model: 'programs',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
        unique: 'unique-program-tools'
      },
      tool_id: {
        type: Sequelize.STRING(22),
        primaryKey: false,
        relation: {
          model: 'tools',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
        unique: 'unique-program-tools'
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
    await queryInterface.dropTable('program_tools');
  }
};