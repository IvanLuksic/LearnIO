'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('course_subject', {
      subject_id:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        references:{
          model: 'subject',
          key: 'id',
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      course_id:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        references:{
          model: 'course',
          key: 'id',
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('course_subject');
  }
};