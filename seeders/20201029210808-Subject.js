'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
     await queryInterface.bulkInsert('subject', [{
       name: 'Matematika',
       column_number: 3
     }
      ,
      {
        name: 'Fizika',
        column_number: 3
      },
      {
        name: 'Informatika',
        column_number: 4
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('subject',null,{});
   
  }
};
