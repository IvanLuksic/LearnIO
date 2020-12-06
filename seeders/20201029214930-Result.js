'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert('result',[
     {
       grade:3,
       result_array_by_columns:[4,5,4],
       booleanblue:false,
     subject_id:1,
      course_id:1,
      topic_id: 1,
      student_id: 3
     },
     {
      grade:2,
      result_array_by_columns:[4,3,4],
      booleanblue:false,
     subject_id:1,
      course_id:2,
     topic_id: 2,
    student_id:4,
     },
     {
      grade:1,
      result_array_by_columns:[0,0,0],
      booleanblue:false,
     subject_id:1,
     course_id:1,
     topic_id: 1,
     student_id: 5
     },
     {
     grade:4,
     result_array_by_columns:[5,5,5],
      booleanblue:false,
      subject_id:1,
      course_id:1,
     topic_id: 2,
     student_id: 3
     }
   ]);
  },

  down: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkDelete('result', null, {});
    
  }
};
