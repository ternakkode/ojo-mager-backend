'use strict';
const { Model } = require('sequelize');
const bcryptHelper = require('../../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.UserCode, {
        as: 'codes',
        foreignKey: "user_id"
      })
      User.hasMany(models.Article, {
        as: "articles",
        foreignKey: "user_id"
      })
      User.belongsToMany(models.Program, {
        through: models.FavoriteProgram,
        foreignKey: 'user_id'
      });
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      set(value) {
        const encryptedPassword = bcryptHelper.encryptPassword(value);
        this.setDataValue('password', encryptedPassword);
      },
    },
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