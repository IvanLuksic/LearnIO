'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Topic,{foreignKey: 'subject_id'});
      this.belongsToMany(models.Course,{through: 'Course-Subject'},{foreignKey: 'subject_id'});
      this.belongsToMany(models.Asessment_objective,{through: 'Subject-Asessment'},{foreignKey: 'subject_id'});
      this.belongsToMany(models.Class,{through: 'Class-Subject'},{foreignKey: 'subject_id'});
      this.belongsToMany(models.User,{through: 'Teacher-Subject'},{foreignKey: 'subject_id'});
      this.hasMany(models.Result,{foreignKey: 'subject_id'});
    }
   
  }
  Subject.init({
    name: DataTypes.STRING,
    column_number: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Subject',
    freezeTableName: true,
    timestamps: false
  });
 
  return Subject;
};