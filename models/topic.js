'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Topic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Subject,{foreignKey: 'subject_id'});
      this.hasMany(models.Result,{foreignKey: 'topic_id'});
      this.hasMany(models.Save,{foreignKey: 'topic_id'});
      this.hasMany(models.Question,{foreignKey: 'topic_id'});
      this.belongsToMany(models.Topic, {through: 'Tags_of_topic', as: 'associated', foreignKey: 'source_topic'});
      this.belongsToMany(models.Topic, {through: 'Tags_of_topic', as: 'source', foreignKey: 'associated_topic'});
      this.belongsToMany(models.Course,{through:'Course-Topic'},{foreignKey: 'topic_id'});
    }
  }
  Topic.init({
    name: DataTypes.STRING,
    rows_D: DataTypes.INTEGER,
    column_numbers: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Topic',
    freezeTableName: true,
    timestamps: false
  });
  return Topic;
};