'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'Ucenici_iz_razreda',//ime tablice isto kao ono u through
      {
        razred_id:{
          type: Sequelize.INTEGER,
          primaryKey:true,
          references:{
            model: 'Razred',
            key: 'id',
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        },
      ucenik_id:{
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
    await queryInterface.dropTable( 'Ucenici_iz_razreda');
  }
};
