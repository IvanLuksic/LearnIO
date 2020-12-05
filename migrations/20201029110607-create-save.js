'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('save', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      row_D: {
        type: Sequelize.SMALLINT
      },
      column_A: {
        type: Sequelize.SMALLINT
      },
      status: {
        type: Sequelize.SMALLINT
      },
     
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('save');
  }
};