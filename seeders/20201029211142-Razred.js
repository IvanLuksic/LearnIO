'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Razred',
    [{
      skolska_godina:'2018/2019',
      naziv:'8.b'
    },
    {
      skolska_godina:'2017/2018',
      naziv:'7.b'
    },
    {
      skolska_godina:'2019/2020',
      naziv:'8.c'
    }]);
  },

  down: async (queryInterface, Sequelize) => {
  
     await queryInterface.bulkDelete('Razred', null, {});
    
  }
};
