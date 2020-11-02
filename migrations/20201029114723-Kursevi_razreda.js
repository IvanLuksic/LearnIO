'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'Kursevi_razreda',//ime tablice isto kao ono u through
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
       kurs_id:{
          type: Sequelize.INTEGER,
          primaryKey:true,
          references:{
            model: 'Kursevi',
            key: 'id',
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        }
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Kursevi_razreda');
  }
};
