'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert('Predmet-Asessment',[
    {
      predmet_id:1,
      asessment_id:1
    },
    {
      predmet_id:1,
      asessment_id:2
    },
    {
      predmet_id:1,
      asessment_id:3
    },
    {
      predmet_id:2,
      asessment_id:1
    },
    {
      predmet_id:2,
      asessment_id:2
    },
    {
      predmet_id:2,
      asessment_id:3
    }
  ]);
  },

  down: async (queryInterface, Sequelize) => {
  
     await queryInterface.bulkDelete('Predmet-Asessment', null, {});
     
  }
};
