'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Korisnik', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ime: {
        type: Sequelize.STRING
      },
      prezime: {
        type: Sequelize.STRING
      },
      mail: {
        type: Sequelize.STRING
      },
      datum_rodenja: {
        type: Sequelize.DATEONLY
      },
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      created_at: {
        type: Sequelize.DATE
      },
      user_type: {
        type: Sequelize.SMALLINT,
        allowNull:false
      },
     
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Korisnik');
  }
};