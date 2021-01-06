'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.subject,{through: 'teacher_subject',as:'subjects_teacher',foreignKey: 'teacher_id'});
      this.hasMany(models.result,{foreignKey: 'student_id'});
      this.belongsToMany(models.clas,{through:'class_student',as:'classes_student',foreignKey: 'student_id'});
      this.hasMany(models.session,{foreignKey: 'user_id'});
      this.hasMany(models.save,{foreignKey: 'student_id'});
      this.belongsToMany(models.clas,{through:'class_of_teacher',as:'classes_teacher',foreignKey: 'teacher_id'});
      this.hasMany(models.invite_links,{foreignKey: 'creator_id'});
    }
  };
  user.init({
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    mail: DataTypes.STRING,
    date_of_birth: DataTypes.DATEONLY,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    created_at: DataTypes.DATE,
    user_type: DataTypes.SMALLINT
  }, {
    sequelize,
    modelName: 'user',
    freezeTableName: true,
    timestamps: false
  });
  return user;
};