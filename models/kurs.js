'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kursevi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Predmet,{through: 'Kursevi_iz_predmeta'},{foreignKey: 'kurs_id'});
      this.hasMany(models.Rezultati);
      this.belongsToMany(models.Razred,{through: 'Kursevi_razreda'},{foreignKey: 'kurs_id'});
      this.hasMany(models.Spremanje);
      this.belongsToMany(models.Topic,{through:'Topici_kursevi'},{foreignKey: 'kurs_id'});
    }
  };
  Kursevi.init({
    naziv: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Kursevi',
    freezeTableName: true,
  });
  return Kursevi;
};