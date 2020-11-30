'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Save,{foreignKey: 'question_id'});
      this.belongsTo(models.Topic,{foreignKey: 'topic_id'});
    }
  };
  Question.init({
    text: DataTypes.STRING,
    solution: DataTypes.STRING,
    question_type: DataTypes.SMALLINT,
    row_D: DataTypes.SMALLINT,
    column_A: DataTypes.SMALLINT,
    image_path: DataTypes.STRING,
    answer_a: DataTypes.STRING,
    answer_b: DataTypes.STRING,
    answer_c: DataTypes.STRING,
    answer_d: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Question',
    freezeTableName: true,
    timestamps: false
  });
  return Question;
};