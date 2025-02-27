'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('invite_links', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      unique_link_part: {
        type: Sequelize.STRING
      },
      created_at: {
        type: Sequelize.DATE
      },
      max_number:{
        type:Sequelize.SMALLINT
      },
      current_number:{
        type:Sequelize.SMALLINT,
        defaultValue:0
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('invite_links');
  }
};