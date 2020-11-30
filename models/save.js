'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Save extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Course,{foreignKey: 'course_id'});
      this.belongsTo(models.Topic,{foreignKey: 'topic_id'});
      this.belongsTo(models.User,{foreignKey: 'student_id'});
      this.belongsTo(models.Question,{foreignKey: 'question_id'});
    }
  };
  Save.init({
    button_id: DataTypes.STRING,
    status: DataTypes.SMALLINT
  }, {
    sequelize,
    modelName: 'Save',
    freezeTableName: true,
    timestamps: false,
  });
  return Save;
};