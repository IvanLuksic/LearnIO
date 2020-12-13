'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class topic_subject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  topic_subject.init({
    subject_id: DataTypes.INTEGER,
    topic_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'topic_subject',
    freezeTableName: true,
    timestamps: false
  });
  return topic_subject;
};