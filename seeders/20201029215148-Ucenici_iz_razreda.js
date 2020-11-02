'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Ucenici_iz_razreda',[
      {
        razred_id:1,
        ucenik_id:3
      },
      {
        razred_id:1,
        ucenik_id:4
      },
      {
        razred_id:2,
        ucenik_id:5
      },
      {razred_id:3,
        ucenik_id:5
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
  
     await queryInterface.bulkDelete('Ucenici_iz_razreda', null, {});
     
  }
};
