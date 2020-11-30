'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User,{foreignKey: 'user_id'});
    }
  };
  Session.init({
    timestamp_LOGIN: DataTypes.DATE,
    timestamp_LOGOUT: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Session',
    freezeTableName: true,
    timestamps: false
  });
  return Session;
};