'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'Uciteljevi_predmeti',//ime tablice isto kao ono u through
      {
        predmet_id:{
          type: Sequelize.INTEGER,
          primaryKey:true,
          references:{
            model: 'Predmet',
            key: 'id',
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        },
      ucitelj_id:{
          type: Sequelize.INTEGER,
          primaryKey:true,
          references:{
            model: 'Korisnik',
            key: 'id',
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        }
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Uciteljevi_predmeti');
  }
};
