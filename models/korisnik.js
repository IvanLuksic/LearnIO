'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Korisnik extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Predmet,{through: 'Uciteljevi_predmeti'},{foreignKey: 'ucitelj_id'});
      this.hasMany(models.Rezultati);
      this.belongsToMany(models.Razred,{through:' Ucenici_iz_razreda'},{foreignKey: 'ucenik_id'});
      this.hasMany(models.Session);
      this.hasMany(models.Spremanje);
      this.belongsToMany(models.Razred,{through:'Uciteljevi_razredi'},{foreignKey: 'ucitelj_id'});
    }
  };
  Korisnik.init({
    ime: DataTypes.STRING,
    prezime: DataTypes.STRING,
    mail: DataTypes.STRING,
    datum_rodenja: DataTypes.DATEONLY,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    created_at: DataTypes.DATE,
    user_type: DataTypes.SMALLINT
  }, {
    sequelize,
    modelName: 'Korisnik',
    freezeTableName: true,
  });
  return Korisnik;
};