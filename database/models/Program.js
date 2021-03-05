'use strict';
const ApiErrorHandler = require('../../helpers/ApiErrorHandler')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Program extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Tool, {
        as: 'ProgramsForTool',
        through: models.ProgramTool,
        foreignKey: 'program_id'
      });
      this.belongsTo(models.ProgramType, {
        as: 'type',
        foreignKey: 'program_type_id'
      });
      this.belongsTo(models.DifficultType, {
        as: 'difficult',
        foreignKey: 'difficulty_type_id'
      });
    }
  };

  Program.init({
    slug: DataTypes.STRING,
    title: DataTypes.STRING,
    image_url: DataTypes.STRING,
    video_url: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    program_type_id: DataTypes.STRING,
    difficulty_type_id: DataTypes.STRING,
    parsed_duration: {
      type: DataTypes.VIRTUAL,
      get() {
        const seconds = this.duration;
        
        let minutes = Math.floor(seconds/60);
        let second = seconds%60;
        let result = "";

        if (minutes) {
          result += `${minutes} menit`;
          if (second) {
            result += ` `;
          }
        }

        if (second) {
          result += `${second} detik`;
        }

        return result;
      },
      set(value) {
        throw new ApiErrorHandler(400, 'Do not try to set the `parsed_duration` value!')
      }
    }
  }, {
    sequelize,
    tableName: 'programs',
    modelName: 'Program',
  });
  return Program;
};