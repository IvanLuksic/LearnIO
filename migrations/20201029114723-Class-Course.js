'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'Class-Course',//ime tablice isto kao ono u through
      {
        class_id:{
          type: Sequelize.INTEGER,
          primaryKey:true,
          references:{
            model: 'Class',
            key: 'id',
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        },
       course_id:{
          type: Sequelize.INTEGER,
          primaryKey:true,
          references:{
            model: 'Course',
            key: 'id',
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        }
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Class-Course');
  }
};
