'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'Predmeti_od_razreda',//ime tablice isto kao ono u through
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
    await queryInterface.dropTable('Predmeti_od_razreda');
  }
};
