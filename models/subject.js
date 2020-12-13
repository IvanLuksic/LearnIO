'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class subject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.course,{through: 'course_subject',as:'courses_subject',foreignKey: 'subject_id'});
      this.belongsToMany(models.asessment_objective,{through: 'subject_assesment',as:'Asessments_subject',foreignKey: 'subject_id'});
      this.belongsToMany(models.clas,{through: 'class_subject',as:'classes_subject',foreignKey: 'subject_id'});
      this.belongsToMany(models.user,{through: 'teacher_subject',as:'Teachers_subject',foreignKey: 'subject_id'});
      this.hasMany(models.result,{foreignKey: 'subject_id'});
      this.hasMany(models.save,{foreignKey: 'subject_id'});
      this.belongsToMany(models.topic,{through:'topic_subject',as:'topic_subjects',foreignKey:'topic_id'});
    }
   
  }
  subject.init({
    name: DataTypes.STRING,
    column_number: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'subject',
    freezeTableName: true,
    timestamps: false
  });
 
  return subject;
};