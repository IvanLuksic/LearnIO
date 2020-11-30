'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'Class-Student',//ime tablice isto kao ono u through
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
      student_id:{
          type: Sequelize.INTEGER,
          primaryKey:true,
          references:{
            model: 'User',
            key: 'id',
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        }
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable( 'Class-Student');
  }
};
