'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Result', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      grade: {
        type: Sequelize.INTEGER
      },
      result_array_by_columns: {
        type: Sequelize.ARRAY(Sequelize.DECIMAL)
      },
      booleanblue: {
        type: Sequelize.BOOLEAN,
        defaultValue:true
      },
     
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Result');
  }
};