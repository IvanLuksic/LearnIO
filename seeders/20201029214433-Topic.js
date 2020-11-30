'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Topic',[
      {
        name:'Zbrajanje',
        rows_D: 7,
        column_numbers:3,
        subject_id:1
      },
      {
      name:'Mnozenje',
      rows_D: 5,
      column_numbers:3,
      subject_id:1
    },
    {
    name:'Dijeljenje',
    rows_D: 6,
    column_numbers:3,
    subject_id:1
  },
  {
  name:'Fluidi',
  rows_D: 5,
  column_numbers:3,
  subject_id:2
  },
  {
    name:'Booleova algebra',
  rows_D: 6,
  column_numbers:4,
  subject_id:3
  }
    ])
  },

  down: async (queryInterface, Sequelize) => {
  
     await queryInterface.bulkDelete('Topic', null, {});
     
  }
};
