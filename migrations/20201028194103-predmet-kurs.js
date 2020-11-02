'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'Kursevi_iz_predmeta',//ime tablice isto kao ono u through
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
    await queryInterface.dropTable('Kursevi_iz_predmeta');
  }
};
