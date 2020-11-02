'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.createTable(
    'Uciteljevi_razredi',//ime tablice isto kao ono u through
    {
     ucitelj_id:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        references:{
          model: 'Korisnik',
          key: 'id',
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    razred_id:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        references:{
          model: 'Razred',
          key: 'id',
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      }
    }
  )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Uciteljevi_razredi');
  }
};
