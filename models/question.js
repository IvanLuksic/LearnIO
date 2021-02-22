'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.save,{foreignKey: 'question_id'});
      this.belongsTo(models.topic,{foreignKey: 'topic_id'});
    }
  };
 question.init({
    text: DataTypes.TEXT,
    solution: DataTypes.STRING,
   question_type: DataTypes.SMALLINT,
    row_D: DataTypes.SMALLINT,
    column_A: DataTypes.SMALLINT,
    image_path: DataTypes.STRING,
    mime_type: DataTypes.STRING,
    image_size: DataTypes.INTEGER,
    answer_a: DataTypes.STRING,
    answer_b: DataTypes.STRING,
    answer_c: DataTypes.STRING,
    answer_d: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'question',
    freezeTableName: true,
    timestamps: false
  });
  return question;
};