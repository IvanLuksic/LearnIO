'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('course_topic', {
      course_id:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        references:{
          model: 'course',
          key: 'id',
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    topic_id:{
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
    await queryInterface.dropTable('course_topic');
  }
};