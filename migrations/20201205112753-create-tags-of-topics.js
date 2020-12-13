'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tags_of_topic', {
      source_topic:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        references:{
          model: 'topic',
          key: 'id',
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      associated_topic:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        references:{
          model: 'topic',
          key: 'id',
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      required_level:{
        type:Sequelize.SMALLINT

      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tags_of_topic');
  }
};