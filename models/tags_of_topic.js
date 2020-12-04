'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TagsOfTopic extends Model {
    static associate(models) {}
  }
  
  TagsOfTopic.init({
    source_topic: DataTypes.INTEGER,
    associated_topic: DataTypes.INTEGER,
    required_level: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tags_of_topic',
    freezeTableName: true,
    timestamps: false
  });
  return TagsOfTopic;
};