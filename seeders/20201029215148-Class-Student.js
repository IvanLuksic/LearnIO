'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Class-Student',[
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
  
     await queryInterface.bulkDelete('Class-Student', null, {});
     
  }
};
