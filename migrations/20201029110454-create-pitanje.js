'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Pitanje', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tekst: {
        type: Sequelize.STRING
      },
      rjesenje: {
        type: Sequelize.STRING
      },
      tip_pitanja: {
        type: Sequelize.SMALLINT
      },
      redak_D: {
        type: Sequelize.SMALLINT
      },
      stupac_A: {
        type: Sequelize.SMALLINT
      },
      slika_path: {
        type: Sequelize.STRING,
        defaultValue:null
      },
      odgovor_a: {
        type: Sequelize.STRING,
        defaultValue:null
      },
      odgovor_b: {
        type: Sequelize.STRING,
        defaultValue:null
      },
      odgovor_c: {
        type: Sequelize.STRING,
        defaultValue:null
      },
      odgovor_d: {
        type: Sequelize.STRING,
        defaultValue:null
      },
    
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Pitanje');
  }
};