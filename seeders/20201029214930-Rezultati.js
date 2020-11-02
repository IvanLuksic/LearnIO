'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert('Rezultati',[
     {
       ocjena:3,
       niz_rezultata_postupcima:[4,5,4],
       booleanblue:false,
       predmet_id:1,
       kurs_id:1,
      topic_id: 1,
      ucenik_id: 3
     },
     {
      ocjena:2,
      niz_rezultata_postupcima:[4,3,4],
      booleanblue:false,
      predmet_id:1,
      kurs_id:2,
     topic_id: 2,
     ucenik_id:4,
     },
     {
      ocjena:1,
      niz_rezultata_postupcima:[0,0,0],
      booleanblue:true,
      predmet_id:1,
      kurs_id:1,
     topic_id: 1,
     ucenik_id: 5
     },
     {
      ocjena:4,
      niz_rezultata_postupcima:[5,5,5],
      booleanblue:false,
      predmet_id:1,
      kurs_id:1,
     topic_id: 2,
     ucenik_id: 3
     }
   ]);
  },

  down: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkDelete('Rezultati', null, {});
    
  }
};
