'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert('Teacher-Subject',[
     {
       subject_id:1,
       teacher_id:2
     },
     {
      subject_id:2,
      teacher_id:2
    },
    {
      subject_id:3,
      teacher_id:2
    },
   ])
  },

  down: async (queryInterface, Sequelize) => {
  
     await queryInterface.bulkDelete('Teacher-Subject', null, {});
     
  }
};
