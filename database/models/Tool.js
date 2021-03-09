'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tool extends Model {
    static associate(models) {
      this.belongsToMany(models.Program, { as: 'ToolsInProgram',through: models.ProgramTool, foreignKey: 'tool_id' });
    }
  };
  Tool.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'tools',
    modelName: 'Tool',
  });
  return Tool;
};