'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserCode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserCode.belongsTo(models.User, {
        foreignKey: "user_id"
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