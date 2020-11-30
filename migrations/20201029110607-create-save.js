'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Save', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      button_id: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.SMALLINT
      },
     
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Save');
  }
};