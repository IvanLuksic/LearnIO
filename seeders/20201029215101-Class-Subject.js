'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert('class_subject',[
    {
      subject_id:1,
      class_id:1
    },
    {
      subject_id:2,
     class_id:1
    },
    {
      subject_id:1,
      class_id:2
    },
    {
      subject_id:1,
      class_id:3
    }
  ])
  },

  down: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkDelete('class_subject', null, {});
     
  }
};
