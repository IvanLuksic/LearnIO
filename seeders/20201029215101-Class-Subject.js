'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert('Class-Subject',[
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
    
     await queryInterface.bulkDelete('Class-Subject', null, {});
     
  }
};
