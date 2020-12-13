'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class subject_assesment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  };
  subject_assesment.init({
    subject_id: DataTypes.INTEGER,
    asessment_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'subject_assesment',
    freezeTableName: true,
    timestamps: false
  });
  return subject_assesment;
};