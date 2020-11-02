'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert('Uciteljevi_razredi',[
    {
      ucitelj_id:2,
      razred_id:1
    },
    {
      ucitelj_id:2,
      razred_id:2
    }
  ])
  },

  down: async (queryInterface, Sequelize) => {
   
     await queryInterface.bulkDelete('Uciteljevi_razredi', null, {});
    
  }
};
