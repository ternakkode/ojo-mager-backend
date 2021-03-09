'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserCode extends Model {
    static associate(models) {
      UserCode.belongsTo(models.User, {
        as: 'user',
        foreignKey: "user_id",
      })
    }
  };
  UserCode.init({
    user_id: DataTypes.STRING,
    type: DataTypes.ENUM('verification', 'forgot-password'),
    code: DataTypes.STRING,
    is_available: DataTypes.BOOLEAN
  }, {
    sequelize,
    tableName: 'user_codes',
    modelName: 'UserCode',
  });
  return UserCode;
};