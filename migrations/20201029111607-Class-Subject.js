'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'Class-Subject',//ime tablice isto kao ono u through
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
       class_id:{
          type: Sequelize.INTEGER,
          primaryKey:true,
          references:{
            model: 'Class',
            key: 'id',
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        }
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Class-Subject');
  }
};
