'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert('class_of_teacher',[
    {
      teacher_id:2,
      class_id:1
    },
    {
      teacher_id:2,
      class_id:2
    }
  ])
  },

  down: async (queryInterface, Sequelize) => {
   
     await queryInterface.bulkDelete('class_of_teacher', null, {});
    
  }
};
