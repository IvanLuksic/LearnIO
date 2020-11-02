'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Razred extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Predmet,{through: 'Predmeti_od_razreda'},{foreignKey: 'razred_id'});
      this.belongsToMany(models.Korisnik,{through: 'Ucenici_iz_razreda'},{foreignKey: 'razred_id'});
      this.belongsToMany(models.Kursevi,{through: 'Kursevi_razreda'},{foreignKey: 'razred_id'});
      this.belongsToMany(models.Korisnik,{through:'Uciteljevi_razredi'},{foreignKey: 'razred_id'});
    }
  };
  Razred.init({
    skolska_godina: DataTypes.STRING,
    naziv: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Razred',
    freezeTableName: true,
  });
  return Razred;
};