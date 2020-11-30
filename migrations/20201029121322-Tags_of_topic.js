'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'Tags_of_topic',//ime tablice isto kao ono u through
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
        associated_topic:{
          type: Sequelize.INTEGER,
          primaryKey:true,
          references:{
            model: 'Topic',
            key: 'id',
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        },
        required_level:{
          type:Sequelize.SMALLINT

        }
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
   await queryInterface.dropTable('Tags_of_topic');
  }
};
