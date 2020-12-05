'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert('course_topic',[
    {
      course_id:1,
      topic_id:1
    },
    {
      course_id:1,
      topic_id:2
    },
    {
      course_id:1,
      topic_id:3
    },
    {
     course_id:2,
      topic_id:1
    },
    {
      course_id:3,
      topic_id:4
    }
  ])
  },

  down: async (queryInterface, Sequelize) => {
   
     await queryInterface.bulkDelete('course_topic', null, {});
    
  }
};
