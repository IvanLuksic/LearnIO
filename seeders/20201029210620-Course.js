'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('course',
    [{
      name:'Algebra'
    },
    {
      name:'Geometrija'
    },
    {
      name:'Mehanika'
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('course',null,{})//drugi clan je where->ako ocemo sve izbirsat onda ga stavimo na null-> nema uvjeta,treci clan su dodatne opcije->ako ih nema stavimo prazan objekt
  }
};
