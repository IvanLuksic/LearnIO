'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tags_of_topic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  tags_of_topic.init({
    source_topic: DataTypes.INTEGER,
    associated_topic: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tags_of_topic',
    freezeTableName: true,
    timestamps: false
  });
  return tags_of_topic;
};