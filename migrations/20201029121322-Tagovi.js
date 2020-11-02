'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'Tagovi',//ime tablice isto kao ono u through
      {
      source_topic:{
          type: Sequelize.INTEGER,
          primaryKey:true,
          references:{
            model: 'Topic',
            key: 'id',
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        },
        povezani_topic:{
          type: Sequelize.INTEGER,
          primaryKey:true,
          references:{
            model: 'Topic',
            key: 'id',
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        },
        zahtjevana_ocjena:{
          type:Sequelize.SMALLINT

        }
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
   await queryInterface.dropTable('Tagovi');
  }
};
