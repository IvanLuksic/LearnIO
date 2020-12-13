'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class asessment_objective extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.subject,{through: 'subject_assesment',as: "subjects_assesments",foreignKey:'asessment_id'});/*navodimo ovo da izbjegnemo slucaj u kojem ce sequelize korisititi svoja defaultna imena 
      za foreign keyove jer su njihova imena specificirana u migracijama a on ucitava samo modele pa s ovim overwritamo automatski geneirana sequelize imena FK,to nam inace stvara problem kod querya*/
    }
  };
  asessment_objective.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'asessment_objective',
    freezeTableName: true,
    timestamps: false
  });
  return asessment_objective;
};