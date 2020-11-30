'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert('Class_of_Teacher',[
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
   
     await queryInterface.bulkDelete('Class_of_Teacher', null, {});
    
  }
};
