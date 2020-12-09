'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('topic_subject', {
      subject_id: {
        type: Sequelize.INTEGER,
        primaryKey:true,
        references:{
          model: 'subject',
          key: 'id',
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      topic_id: {
        type: Sequelize.INTEGER,
        primaryKey:true,
        references:{
          model: 'topic',
          key: 'id',
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('topic_subject');
  }
};