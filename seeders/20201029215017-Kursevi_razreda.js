'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert('Kursevi_razreda',[
    {
      razred_id:1,
      kurs_id:1
    },
    {
      razred_id:1,
      kurs_id:2
    },
    {
      razred_id:2,
      kurs_id:1
    },
    {
      razred_id:3,
      kurs_id:1
    },
    {
      razred_id:3,
      kurs_id:2
    }
  ])
  },

  down: async (queryInterface, Sequelize) => {
  
     await queryInterface.bulkDelete('Kursevi_razreda', null, {});
     
  }
};
