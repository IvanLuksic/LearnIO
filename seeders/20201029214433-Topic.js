'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('topic',[
      {
        name:'Zbrajanje',
        rows_D: 5,
        column_numbers:3,
      },
      {
      name:'Mnozenje',
      rows_D: 5,
      column_numbers:3,
    },
    {
    name:'Dijeljenje',
    rows_D: 6,
    column_numbers:3
  },
  {
  name:'Fluidi',
  rows_D: 5,
  column_numbers:3,
  },
  {
    name:'Booleova algebra',
  rows_D: 6,
  column_numbers:4,
  }
    ])
  },

  down: async (queryInterface, Sequelize) => {
  
     await queryInterface.bulkDelete('topic', null, {});
     
  }
};
