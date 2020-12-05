'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  
     await queryInterface.bulkInsert('save', [{
       course_id:1,
       topic_id:1,
      student_id:1,
      question_id:1,
       row_D:1,
      column_A:1,
       status:1
     },
     {
      course_id:1,
      topic_id:1,
      student_id:1,
     question_id:2,
      row_D:1,
      column_A:2,
      status:1
     },
     {
      course_id:1,
      topic_id:1,
     student_id:1,
     question_id:3,
      row_D:1,
      column_A:3,
      status:2
     },
     {
       course_id:1,
     topic_id:1,
     student_id:1,
   question_id:5,
    row_D:2,
    column_A:2,
     status:3
    },
    {
     course_id:1,
      topic_id:1,
     student_id:1,
    question_id:6,
     row_D:2,
     column_A:3,
      status:3
    }
    ])
   
  },

  down: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkDelete('save', null, {});
   
  }
};
