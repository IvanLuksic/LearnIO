'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('class_course', {
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
    await queryInterface.dropTable('class_course');
  }
};