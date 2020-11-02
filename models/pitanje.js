'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pitanje extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Spremanje);
      this.belongsTo(models.Topic,{foreignKey: 'topic_id'});
    }
  };
  Pitanje.init({
    tekst: DataTypes.STRING,
    rjesenje: DataTypes.STRING,
    tip_pitanja: DataTypes.SMALLINT,
    redak_D: DataTypes.SMALLINT,
    stupac_A: DataTypes.SMALLINT,
    slika_path: DataTypes.STRING,
    odgovor_a: DataTypes.STRING,
    odgovor_b: DataTypes.STRING,
    odgovor_c: DataTypes.STRING,
    odgovor_d: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pitanje',
    freezeTableName: true,
  });
  return Pitanje;
};