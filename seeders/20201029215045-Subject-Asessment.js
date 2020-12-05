'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert('subject_assesment',[
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
  
     await queryInterface.bulkDelete('subject_assesment', null, {});
     
  }
};
