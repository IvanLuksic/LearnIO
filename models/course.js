'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.subject,{through: 'course_subject',as: "subjects_course",foreignKey: 'course_id'});
      this.hasMany(models.result,{foreignKey: 'course_id'});//POTREBNO NAPISATI ime foregin keya u oba modela kako sequeliza kod querya nebi automatski generira imena foreign keyova
      this.belongsToMany(models.clas,{through: 'class_course',as:'classes_course',foreignKey: 'course_id'});
      this.hasMany(models.save,{foreignKey: 'course_id'});
      this.belongsToMany(models.topic,{through:'course_topic',as:'topics_course',foreignKey: 'course_id'});
    }
  };
  course.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'course',
    freezeTableName: true,
    timestamps: false
  });
  return course;
};