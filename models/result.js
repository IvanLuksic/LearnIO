'use strict';
const { DataType } = require('ajv/dist/compile/validate/dataType');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class result extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.subject,{foreignKey: 'subject_id'});
      this.belongsTo(models.course,{foreignKey: 'course_id'});
      this.belongsTo(models.user, {foreignKey: 'student_id'});
      this.belongsTo(models.topic,{foreignKey: 'topic_id'});
      this.belongsTo(models.clas,{foreignKey:'class_id'});
    }
  };
  result.init({
    grade: DataTypes.INTEGER,
    result_array_by_columns: DataTypes.ARRAY(DataTypes.DECIMAL),
    status:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'result',
    freezeTableName: true,
    timestamps: false
  });
  return result;
};