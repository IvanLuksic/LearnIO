'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Predmet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Topic);
      this.belongsToMany(models.Kursevi,{through: 'Kursevi_iz_predmeta'},{foreignKey: 'predmet_id'});
      this.belongsToMany(models.Asessment_objective,{through: 'Predmet-Asessment'},{foreignKey: 'predmet_id'});
      this.belongsToMany(models.Razred,{through: 'Predmeti_od_razreda'},{foreignKey: 'predmet_id'});
      this.belongsToMany(models.Korisnik,{through: 'Uciteljevi_predmeti'},{foreignKey: 'predmet_id'});
      this.hasMany(models.Rezultati);
    }
   
  }
  Predmet.init({
    naziv: DataTypes.STRING,
    broj_stupaca: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Predmet',
    freezeTableName: true,
  });
 
  return Predmet;
};