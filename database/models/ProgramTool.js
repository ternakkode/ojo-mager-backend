'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProgramTool extends Model {
    static associate(models) {
      this.belongsTo(models.Program, { foreignKey: 'program_id', targetKey: 'id', as: 'Program'});
      this.belongsTo(models.Tool, { foreignKey: 'tool_id', targetKey: 'id', as: 'Tool'});
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