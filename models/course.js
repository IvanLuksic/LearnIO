'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Subject,{through: 'Course-Subject'},{foreignKey: 'course_id'});
      this.hasMany(models.Result,{foreignKey: 'course_id'});//POTREBNO NAPISATI ime foregin keya u oba modela kako sequeliza kod querya nebi automatski generira imena foreign keyova
      this.belongsToMany(models.Class,{through: 'Class-Course'},{foreignKey: 'course_id'});
      this.hasMany(models.Save,{foreignKey: 'course_id'});
      this.belongsToMany(models.Topic,{through:'Course-Topic'},{foreignKey: 'course_id'});
    }
  };
  Course.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Course',
    freezeTableName: true,
    timestamps: false
  });
  return Course;
};