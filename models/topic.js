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
      this.belongsTo(models.Predmet,{foreignKey: 'predmet_id'});
      this.hasMany(models.Rezultati);
      this.hasMany(models.Spremanje);
      this.hasMany(models.Pitanje);
      this.belongsToMany(models.Topic,{through: 'Tagovi',as: 'source_topic'},{foreignKey: 'source_topic'});
      this.belongsToMany(models.Topic,{through: 'Tagovi',as: 'associated_topic'},{foreignKey: 'povezani_topic'});
      this.belongsToMany(models.Kursevi,{through:'Topici_kursevi'},{foreignKey: 'topic_id'});
    }
  }
  Topic.init({
    naziv: DataTypes.STRING,
    retci_D: DataTypes.INTEGER,
    broj_stupaca: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Topic',
    freezeTableName: true,
  });
  return Topic;
};