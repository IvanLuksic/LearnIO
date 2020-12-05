'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert('class_course',[
    {
      class_id:1,
      course_id:1
    },
    {
     class_id:1,
      course_id:2
    },
    {
      class_id:2,
      course_id:1
    },
    {
    class_id:3,
    course_id:1
    },
    {
      class_id:3,
     course_id:2
    }
  ])
  },

  down: async (queryInterface, Sequelize) => {
  
     await queryInterface.bulkDelete('class_course', null, {});
     
  }
};
