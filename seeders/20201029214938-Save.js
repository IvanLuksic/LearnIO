'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  
     await queryInterface.bulkInsert('Save', [{
       course_id:1,
       topic_id:1,
      student_id:1,
       question_id:1,
       button_id:'button_11',
       status:1
     },
     {
      course_id:1,
      topic_id:1,
      student_id:1,
      question_id:2,
      button_id:'button_12',
      status:1
     },
     {
      course_id:1,
      topic_id:1,
     student_id:1,
      question_id:3,
      button_id:'button_13',
      status:2
     },
     {
     course_id:1,
      topic_id:1,
      student_id:1,
     question_id:4,
      button_id:'button_21',
      status:2
     },
     {
       course_id:1,
     topic_id:1,
     student_id:1,
    question_id:5,
     button_id:'button_22',
     status:3
    },
    {
     course_id:1,
      topic_id:1,
     student_id:1,
     question_id:6,
      button_id:'button_23',
      status:3
    }
    ])
   
  },

  down: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkDelete('Save', null, {});
   
  }
};
