'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Program extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Program.belongsToMany(models.Tool, { as: 'ToolsInProgram', through: models.ProgramTool, foreignKey: 'program_id' });
      Program.hasOne(models.program_types, { foreignKey: 'program_type_id'});
      Program.hasOne(models.difficult_types, { foreignKey: 'difficulty_type_id'});
    }
  };

  Program.init({
    slug: DataTypes.STRING,
    title: DataTypes.STRING,
    image_url: DataTypes.STRING,
    video_url: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    program_type_id: DataTypes.STRING,
    difficulty_type_id: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'programs',
    modelName: 'Program',
  });
  return Program;
};