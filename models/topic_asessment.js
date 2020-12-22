'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class topic_assesment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  };
 topic_assesment.init({
    topic_id: DataTypes.INTEGER,
    asessment_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'topic_assesment',
    freezeTableName: true,
    timestamps: false
  });
  return topic_assesment;
};