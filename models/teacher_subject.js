'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class teacher_subject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  teacher_subject.init({
    subject_id: DataTypes.INTEGER,
    teacher_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'teacher_subject',
    freezeTableName: true,
    timestamps: false
  });
  return teacher_subject;
};