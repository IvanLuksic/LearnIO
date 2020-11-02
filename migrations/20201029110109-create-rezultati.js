'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Rezultati', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ocjena: {
        type: Sequelize.INTEGER
      },
      niz_rezultata_postupcima: {
        type: Sequelize.ARRAY(Sequelize.DECIMAL)
      },
      booleanblue: {
        type: Sequelize.BOOLEAN,
        defaultValue:true
      },
     
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Rezultati');
  }
};