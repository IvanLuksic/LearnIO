'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('class_student', {
      class_id:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        references:{
          model: 'clas',
          key: 'id',
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    student_id:{
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
    await queryInterface.dropTable('class_student');
  }
};