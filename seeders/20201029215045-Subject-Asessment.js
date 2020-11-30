'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert('Subject-Asessment',[
    {
      subject_id:1,
      asessment_id:1
    },
    {
     subject_id:1,
      asessment_id:2
    },
    {
     subject_id:1,
      asessment_id:3
    },
    {
      subject_id:2,
      asessment_id:1
    },
    {
      subject_id:2,
      asessment_id:2
    },
    {
      subject_id:2,
      asessment_id:3
    }
  ]);
  },

  down: async (queryInterface, Sequelize) => {
  
     await queryInterface.bulkDelete('Subject-Asessment', null, {});
     
  }
};
