'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'Topici_kursevi',//ime tablice isto kao ono u through
      {
        kurs_id:{
          type: Sequelize.INTEGER,
          primaryKey:true,
          references:{
            model: 'Kursevi',
            key: 'id',
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        },
      topic_id:{
          type: Sequelize.INTEGER,
          primaryKey:true,
          references:{
            model: 'Topic',
            key: 'id',
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        }
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(  'Topici_kursevi');
  }
};
