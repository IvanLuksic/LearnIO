'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Result extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Subject,{foreignKey: 'subject_id'});
      this.belongsTo(models.Course,{foreignKey: 'course_id'});
      this.belongsTo(models.User, {foreignKey: 'student_id'});
      this.belongsTo(models.Topic,{foreignKey: 'topic_id'});
    }
  };
  Result.init({
    grade: DataTypes.INTEGER,
    result_array_by_columns: DataTypes.ARRAY(DataTypes.DECIMAL),
    booleanblue: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Result',
    freezeTableName: true,
    timestamps: false
  });
  return Result;
};