'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'Teacher-Subject',//ime tablice isto kao ono u through
      {
       subject_id:{
          type: Sequelize.INTEGER,
          primaryKey:true,
          references:{
            model: 'Subject',
            key: 'id',
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        },
      teacher_id:{
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
    await queryInterface.dropTable('Teacher-Subject');
  }
};
