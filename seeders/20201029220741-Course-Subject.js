'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert('course_subject',[
    {
      subject_id:1,
     course_id:1
    },
    {
    subject_id:1,
      course_id:2
    },
    {
      subject_id:2,
      course_id:1
    },
    {
    subject_id:2,
      course_id:2
    },
    {
     subject_id:2,
      course_id:3
    }
  ])
  },

  down: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkDelete('course_subject', null, {});
    
  }
};
