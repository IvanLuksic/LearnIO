'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert('topic_assesment',[
    {
      topic_id:1,
      asessment_id:1
    },
    {
      topic_id:1,
      asessment_id:2
    },
    {
      topic_id:1,
      asessment_id:3
    },
    {
      topic_id:2,
      asessment_id:1
    },
    {
      topic_id:2,
      asessment_id:2
    },
    {
      topic_id:2,
      asessment_id:3
    }
  ]);
  },

  down: async (queryInterface, Sequelize) => {
  
     await queryInterface.bulkDelete('topic_assesment', null, {});
     
  }
};
