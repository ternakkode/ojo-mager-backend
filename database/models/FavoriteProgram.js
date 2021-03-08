'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FavoriteProgram extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id', targetKey: 'id', as: 'user'});
      this.belongsTo(models.Program, { foreignKey: 'program_id', targetKey: 'id', as: 'program'});
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