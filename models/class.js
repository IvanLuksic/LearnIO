'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class clas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.result,{foreignKey:'class_id'});
      this.hasMany(models.save,{foreignKey:'class_id'});
      this.belongsToMany(models.subject,{through: 'class_subject',as: 'subject_class',foreignKey: 'class_id'});//KOD BELONGSTOMANY ASOCIJACIJA ALIAS SE ODNOSI NA TARGET MODEL-> U OVOM SLUCAJU NA SUBJECT MODEL I TAJ ALIAS KORISTIMO KADA U ASOCIJACIJAMA S RAZREDOM INCLUDEAMO SUBJECT , KAKO RAZRED PRIPADA VISE SUBJECTA(BELONGSTOMAY) ONDA SE FOREIGN KEY OD RAZREDA(U OVOM SLUCAJU EKSPLICITNO DEFINIRAN class_id) POSTAVLJA U TARGETU ODNOSNO U OVOM SLUČAJU U VEZNU(THROUGH) TABLICU
      this.belongsToMany(models.user,{through: 'class_student',as:'Students_class',foreignKey: 'class_id'});//U BELONGSTOMANY SE ALIAS ODNOSI NA TARGET MODELLL ODNOSNO NA USER U OVON SLUCAJU
      this.belongsToMany(models.user,{through:'class_of_teacher',as:'Teachers_class',foreignKey: 'class_id'});
      this.hasMany(models.invite_links,{foreignKey:'class_id'});
    }
  };
  clas.init({
    school_year: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'clas',
    freezeTableName: true,
    timestamps: false
  });
  return clas;
};