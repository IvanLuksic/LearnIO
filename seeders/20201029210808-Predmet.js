'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
     await queryInterface.bulkInsert('Predmet', [{
       naziv: 'Matematika',
       broj_stupaca: 3
     }
      ,
      {
        naziv: 'Fizika',
        broj_stupaca: 3
      },
      {
        naziv: 'Informatika',
        broj_stupaca: 4
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('Predmet',null,{});
   
  }
};
