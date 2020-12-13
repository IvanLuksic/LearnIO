'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('result', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      grade: {
        type: Sequelize.INTEGER
      },
      result_array_by_columns: {
        type: Sequelize.ARRAY(Sequelize.DECIMAL)
      },
      status: {//1-> Plavo,2-> Žuto,3->Zeleno(eventualno možemo to uvest)
        type: Sequelize.INTEGER,
        defaultValue:2//po defaultu žuti oni koji su tek stavljeni u tablicu
      },
     
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('result');
  }
};