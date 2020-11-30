'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Subject,{through: 'Class-Subject'},{foreignKey: 'class_id'});
      this.belongsToMany(models.User,{through: 'Class-Student'},{foreignKey: 'class_id'});
      this.belongsToMany(models.Course,{through: 'Class-Course'},{foreignKey: 'class_id'});
      this.belongsToMany(models.User,{through:'Class_of_Teacher'},{foreignKey: 'class_id'});
    }
  };
  Class.init({
    school_year: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Class',
    freezeTableName: true,
    timestamps: false
  });
  return Class;
};