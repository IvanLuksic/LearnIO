'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rezultati extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Predmet,{foreignKey: 'predmet_id'});
      this.belongsTo(models.Kursevi,{foreignKey: 'kurs_id'});
      this.belongsTo(models.Korisnik, {foreignKey: 'ucenik_id'});
      this.belongsTo(models.Topic,{foreignKey: 'topic_id'});
    }
  };
  Rezultati.init({
    ocjena: DataTypes.INTEGER,
    niz_rezultata_postupcima: DataTypes.ARRAY(DataTypes.DECIMAL),
    booleanblue: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Rezultati',
    freezeTableName: true,
  });
  return Rezultati;
};