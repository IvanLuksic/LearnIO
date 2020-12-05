'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('class_student',[
      {
        class_id:1,
        student_id:3
      },
      {
        class_id:1,
        student_id:4
      },
      {
        class_id:2,
       student_id:5
      },
      {
        class_id:3,
        student_id:5
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
  
     await queryInterface.bulkDelete('class_student', null, {});
     
  }
};
