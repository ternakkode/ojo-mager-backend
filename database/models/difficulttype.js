'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DifficultType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Program, { foreignKey: 'difficulty_type_id'})
    }
  };
  DifficultType.init({
    name: DataTypes.STRING
  }, {
      sequelize,
      tableName:"difficult_types",
      modelName: 'DifficultType',
  });
  return DifficultType;
};