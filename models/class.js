'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class clas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.result,{foreignKey:'class_id'});
      this.hasMany(models.save,{foreignKey:'class_id'});
      this.belongsToMany(models.subject,{through: 'class_subject',as: 'subject_class',foreignKey: 'class_id'});
      this.belongsToMany(models.user,{through: 'class_student',as:'Students_class',foreignKey: 'class_id'});
      this.belongsToMany(models.course,{through: 'class_course',as:'courses_class',foreignKey: 'class_id'});
      this.belongsToMany(models.user,{through:'class_of_teacher',as:'Teachers_class',foreignKey: 'class_id'});
    }
  };
  clas.init({
    school_year: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'clas',
    freezeTableName: true,
    timestamps: false
  });
  return clas;
};