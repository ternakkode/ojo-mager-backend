'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.UserCode, {
        foreignKey: "user_id"
      })
      User.hasMany(models.Article, {
        as: "articles",
        foreignKey: "user_id"
      })
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.ENUM('admin', 'user'),
    is_verified: DataTypes.BOOLEAN,
    is_subscribe_newsletter: DataTypes.BOOLEAN
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};