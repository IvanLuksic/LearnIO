'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert('Predmeti_od_razreda',[
    {
      predmet_id:1,
      razred_id:1
    },
    {
      predmet_id:2,
      razred_id:1
    },
    {
      predmet_id:1,
      razred_id:2
    },
    {
      predmet_id:1,
      razred_id:3
    }
  ])
  },

  down: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkDelete('Predmeti_od_razreda', null, {});
     
  }
};
