'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('save', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      row_D: {
        type: Sequelize.SMALLINT
      },
      column_A: {
        type: Sequelize.SMALLINT
      },
      status: {//1->Plavo,2->Žuto(tek otključano),3->Crveno->zaključano,4->Zeleno->Točno rješeno
        type: Sequelize.SMALLINT
      },
     
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('save');
  }
};