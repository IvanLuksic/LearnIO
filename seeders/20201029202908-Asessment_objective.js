'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('asessment_objective',
    [{
      name:'Applying'
    },
    {
      name:'Reasoning'
    },
    {
      name:'Problem solving'
    }]);
  },

  down: async (queryInterface, Sequelize) => {
   await queryInterface.bulkDelete('asessment_objective',null,{})//drugi clan je where->ako ocemo sve izbirsat onda ga stavimo na null-> nema uvjeta,treci clan su dodatne opcije->ako ih nema stavimo prazan objekt
  }
};
