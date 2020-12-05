'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class topic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.subject,{foreignKey: 'subject_id'});
      this.hasMany(models.result,{foreignKey: 'topic_id'});
      this.hasMany(models.save,{foreignKey: 'topic_id'});
      this.hasMany(models.question,{foreignKey: 'topic_id'});
     /* this.belongsToMany(models.topic,{through: models.tags_of_topic,as: 'Sources',foreignKey: 'associated_topic'});
      this.belongsToMany(models.topic,{through: models.tags_of_topic,as: 'Associateds',foreignKey: 'source_topic'});*/
      this.belongsToMany(models.course,{through:'course_topic',as:'courses_topic',foreignKey: 'topic_id'});
    }
  }
  topic.init({
    name: DataTypes.STRING,
    rows_D: DataTypes.INTEGER,
    column_numbers: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'topic',
    freezeTableName: true,
    timestamps: false
  });
  return topic;
};