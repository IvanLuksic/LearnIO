'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.addColumn(
    'one_time_password',
    'user_id',
    {
      type:Sequelize.INTEGER,
      references:{
        model:'user',
        key:'id'
      },
      onUpdate:'CASCADE',
      onDelete:'SET NULL'
    }
   )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      'one_time_password',
      'user_id',
    )
  }
};
