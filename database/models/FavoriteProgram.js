'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FavoriteProgram extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id', targetKey: 'id'});
      this.belongsTo(models.Program, { foreignKey: 'program_id', targetKey: 'id'});
    }
  };
  FavoriteProgram.init({
    user_id: DataTypes.STRING,
    program_id: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'favorites_programs',
    modelName: 'FavoriteProgram',
  });
  return FavoriteProgram;
};