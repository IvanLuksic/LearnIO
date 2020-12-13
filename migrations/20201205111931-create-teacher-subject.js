'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('teacher_subject', {
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
    teacher_id:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        references:{
          model: 'user',
          key: 'id',
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('teacher_subject');
  }
};