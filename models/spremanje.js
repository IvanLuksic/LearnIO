'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spremanje extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Kursevi,{foreignKey: 'kurs_id'});
      this.belongsTo(models.Topic,{foreignKey: 'topic_id'});
      this.belongsTo(models.Korisnik,{foreignKey: 'ucenik_id'});
      this.belongsTo(models.Pitanje,{foreignKey: 'pitanje_id'});
    }
  };
  Spremanje.init({
    button_id: DataTypes.STRING,
    status: DataTypes.SMALLINT
  }, {
    sequelize,
    modelName: 'Spremanje',
    freezeTableName: true,
  });
  return Spremanje;
};