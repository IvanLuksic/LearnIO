'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('topic_assesment', {
     topic_id:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        references:{
          model: 'topic',
          key: 'id',
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
     asessment_id:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        references:{
          model: 'asessment_objective',
          key: 'id',
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('topic_assesment');
  }
};