'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class course_topic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  course_topic.init({
    course_id: DataTypes.INTEGER,
    topic_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'course_topic',
    freezeTableName: true,
    timestamps: false
  });
  return course_topic;
};