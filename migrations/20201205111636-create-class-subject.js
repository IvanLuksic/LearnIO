'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('class_subject', {
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
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('class_subject');
  }
};