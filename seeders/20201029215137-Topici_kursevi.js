'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert('Topici_kursevi',[
    {
      kurs_id:1,
      topic_id:1
    },
    {
      kurs_id:1,
      topic_id:2
    },
    {
      kurs_id:1,
      topic_id:3
    },
    {
      kurs_id:2,
      topic_id:1
    },
    {
      kurs_id:3,
      topic_id:4
    }
  ])
  },

  down: async (queryInterface, Sequelize) => {
   
     await queryInterface.bulkDelete('Topici_kursevi', null, {});
    
  }
};
