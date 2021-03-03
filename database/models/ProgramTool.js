'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProgramTool extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProgramTool.belongsTo(models.programs, { foreignKey: 'program_id', targetKey: 'id', as: 'Program' });
      ProgramTool.belongsTo(models.tools, { foreignKey: 'tool_id', targetKey: 'id', as: 'Tool' });
    }
  };
  ProgramTool.init({
    program_id: DataTypes.STRING,
    tool_id: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'program_tools',
    modelName: 'ProgramTool',
  });
  return ProgramTool;
};