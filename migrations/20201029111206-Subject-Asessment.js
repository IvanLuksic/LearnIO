'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'Subject-Asessment',//ime tablice isto kao ono u through
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
       asessment_id:{
          type: Sequelize.INTEGER,
          primaryKey:true,
          references:{
            model: 'Asessment_objective',
            key: 'id',
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        }
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Subject-Asessment');
  }
};
