'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.createTable(
    'class_of_teacher',//ime tablice isto kao ono u through
    {
     teacher_id:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        references:{
          model: 'user',
          key: 'id',
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    class_id:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        references:{
          model: 'clas',
          key: 'id',
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      }
    }
  )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('class_of_teacher');
  }
};
