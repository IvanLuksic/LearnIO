'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class invite_links extends Model {
   
    static associate(models) {
      this.belongsTo(models.user,{foreignKey: 'creator_id'});
      this.belongsTo(models.clas,{foreignKey:'class_id'});
    }
  };
  invite_links.init({
    unique_link_part: DataTypes.STRING,
    created_at:DataTypes.DATE
  }, {
    sequelize,
    modelName: 'invite_links',
    freezeTableName: true,
    timestamps: false
  });
  return invite_links;
};