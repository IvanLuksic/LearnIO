'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert('Uciteljevi_predmeti',[
     {
       predmet_id:1,
       ucitelj_id:2
     },
     {
      predmet_id:2,
      ucitelj_id:2
    },
    {
      predmet_id:3,
      ucitelj_id:2
    },
   ])
  },

  down: async (queryInterface, Sequelize) => {
  
     await queryInterface.bulkDelete('Uciteljevi_predmeti', null, {});
     
  }
};
