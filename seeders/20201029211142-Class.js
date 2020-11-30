'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Class',
    [{
      school_year:'2018/2019',
      name:'8.b'
    },
    {
      school_year:'2017/2018',
      name:'7.b'
    },
    {
      school_year:'2019/2020',
      name:'8.c'
    }]);
  },

  down: async (queryInterface, Sequelize) => {
  
     await queryInterface.bulkDelete('Class', null, {});
    
  }
};
