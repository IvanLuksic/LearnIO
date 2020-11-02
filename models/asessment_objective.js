'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Asessment_objective extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Predmet,{through: 'Predmet-Asessment'},{foreignKey:'asessment_id'});/*navodimo ovo da izbjegnemo slucaj u kojem ce sequelize korisititi svoja defaultna imena 
      za foreign keyove jer su njihova imena specificirana u migracijama a on ucitava samo modele pa s ovim overwritamo automatski geneirana sequelize imena FK,to nam inace stvara problem kod querya*/
    }
  };
  Asessment_objective.init({
    naziv: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Asessment_objective',
    freezeTableName: true,
  });
  return Asessment_objective;
};