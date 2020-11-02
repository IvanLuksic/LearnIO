'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert('Kursevi_iz_predmeta',[
    {
      predmet_id:1,
      kurs_id:1
    },
    {
    predmet_id:1,
      kurs_id:2
    },
    {
      predmet_id:2,
      kurs_id:1
    },
    {
    predmet_id:2,
      kurs_id:2
    },
    {
      predmet_id:2,
      kurs_id:3
    }
  ])
  },

  down: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkDelete('Kursevi_iz_predmeta', null, {});
    
  }
};
