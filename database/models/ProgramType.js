'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProgramType extends Model {
    static associate(models) {
      this.hasMany(models.Program, {
        as:'types',
        foreignKey: 'program_type_id'
      })
    }
  };
  ProgramType.init({
    name: DataTypes.STRING,
    button_color_code: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'program_types',
    modelName: 'ProgramType',
  });
  return ProgramType;
};