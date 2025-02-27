'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert('tags_of_topic',[
    {
      source_topic:2,
      associated_topic:1,
      required_level:3
    },
    {
      source_topic:3,
      associated_topic:1,
      required_level:5
    },
    {
      source_topic:5,
      associated_topic:2,
      required_level:3
    },
    {
    source_topic:5,
    associated_topic:3,
    required_level:3
  }
  ]);
},

  down: async (queryInterface, Sequelize) => {
  
     await queryInterface.bulkDelete('tags_of_topic', null, {});
    
  }
};
