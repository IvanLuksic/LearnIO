'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert('Tagovi',[
    {
      source_topic:2,
      povezani_topic:1,
      zahtjevana_ocjena:3
    },
    {
      source_topic:3,
      povezani_topic:2,
      zahtjevana_ocjena:2
    },
    {
      source_topic:5,
      povezani_topic:2,
      zahtjevana_ocjena:3
    },
    {
    source_topic:5,
    povezani_topic:3,
    zahtjevana_ocjena:3
  }
  ]);
},

  down: async (queryInterface, Sequelize) => {
  
     await queryInterface.bulkDelete('Tagovi', null, {});
    
  }
};
