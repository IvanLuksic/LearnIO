'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class one_time_password extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.user,{foreignKey: 'user_id'});
    }
  };
  one_time_password.init({
    otp: DataTypes.STRING,
    used: DataTypes.BOOLEAN,//pratit jeli se logira s njim-> dopuštamo samo 1 login-> treba nam to jer ne možemo brisat OTP nakon logina jer pomoću njega kasnije mijenja password pa ga tek nakon toga možemo mijenjat
    created_at: DataTypes.DATE
  }, {
    sequelize,
    freezeTableName: true,
    timestamps: false,
    modelName: 'one_time_password',
  });
  return one_time_password;
};