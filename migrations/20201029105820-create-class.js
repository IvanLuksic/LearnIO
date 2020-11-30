'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Class', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      school_year: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
    
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Class');
  }
};