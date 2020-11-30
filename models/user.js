'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Subject,{through: 'Teacher-Subject'},{foreignKey: 'teacher_id'});
      this.hasMany(models.Result,{foreignKey: 'student_id'});
      this.belongsToMany(models.Class,{through:' Class-Student'},{foreignKey: 'student_id'});
      this.hasMany(models.Session,{foreignKey: 'user_id'});
      this.hasMany(models.Save,{foreignKey: 'student_id'});
      this.belongsToMany(models.Class,{through:'Class_of_Teacher'},{foreignKey: 'teacher_id'});
    }
  };
  User.init({
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
    modelName: 'User',
    freezeTableName: true,
    timestamps: false
  });
  return User;
};