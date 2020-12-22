'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
     await queryInterface.bulkInsert('subject', [{
       name: 'Matematika',
     }
      ,
      {
        name: 'Fizika',
      },
      {
        name: 'Informatika',
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('subject',null,{});
   
  }
};
