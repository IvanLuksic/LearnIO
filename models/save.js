'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class save extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.course,{foreignKey: 'course_id'});
      this.belongsTo(models.topic,{foreignKey: 'topic_id'});
      this.belongsTo(models.user,{foreignKey: 'student_id'});
      this.belongsTo(models.question,{foreignKey: 'question_id'});
      this.belongsTo(models.clas,{foreignKey: 'class_id'});
      this.belongsTo(models.subject,{foreignKey: 'subject_id'});
    }
  };
  save.init({
    row_D: DataTypes.SMALLINT,
    column_A: DataTypes.SMALLINT,
    status: DataTypes.SMALLINT,
    user_answer:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'save',
    freezeTableName: true,
    timestamps: false,
  });
  return save;
};