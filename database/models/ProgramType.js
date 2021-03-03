'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProgramType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProgramType.hasMany(models.programs, { foreignKey: 'id' })
    }
  };
  ProgramType.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'program_types',
    modelName: 'ProgramType',
  });
  return ProgramType;
};