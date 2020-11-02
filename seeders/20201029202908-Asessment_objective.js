'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Asessment_objective',
    [{
      naziv:'Applying'
    },
    {
      naziv:'Reasoning'
    },
    {
      naziv:'Problem solving'
    }]);
  },

  down: async (queryInterface, Sequelize) => {
   await queryInterface.bulkDelete('Asessment_objective',null,{})//drugi clan je where->ako ocemo sve izbirsat onda ga stavimo na null-> nema uvjeta,treci clan su dodatne opcije->ako ih nema stavimo prazan objekt
  }
};
