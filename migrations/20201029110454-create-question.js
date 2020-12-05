'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('question', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      text: {
        type: Sequelize.STRING
      },
      solution: {
        type: Sequelize.STRING
      },
     question_type: {
        type: Sequelize.SMALLINT
      },
      row_D: {
        type: Sequelize.SMALLINT
      },
      column_A: {
        type: Sequelize.SMALLINT
      },
      image_path: {
        type: Sequelize.STRING,
        defaultValue:null
      },
      answer_a: {
        type: Sequelize.STRING,
        defaultValue:null
      },
      answer_b: {
        type: Sequelize.STRING,
        defaultValue:null
      },
      answer_c: {
        type: Sequelize.STRING,
        defaultValue:null
      },
      answer_d: {
        type: Sequelize.STRING,
        defaultValue:null
      },
    
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('question');
  }
};