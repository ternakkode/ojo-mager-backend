'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Program extends Model {
    static associate(models) {
      this.belongsToMany(models.Tool, {
        as: 'tools',
        through: models.ProgramTool,
        foreignKey: 'program_id'
      });
      this.belongsTo(models.ProgramType, {
        as: 'type',
        foreignKey: 'program_type_id'
      });
      this.belongsToMany(models.User, {
        as: 'users',
        through: models.FavoriteProgram,
        foreignKey: 'program_id'
      });
    }
  };

  Program.init({
    slug: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    image_url: DataTypes.STRING,
    video_url: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    program_type_id: DataTypes.STRING,
  }, {
    sequelize,
    tableName: 'programs',
    modelName: 'Program',
  });
  return Program;
};