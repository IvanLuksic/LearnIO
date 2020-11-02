'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
   await queryInterface.bulkInsert('Session',
   [{"timestamp_LOGOUT":"2020-08-08T00:01:52Z","korisnik_id":1,"timestamp_LOGIN":"2020-03-31T15:59:05Z"},
   {"timestamp_LOGOUT":"2020-07-19T04:26:56Z","korisnik_id":2,"timestamp_LOGIN":"2020-05-24T11:06:27Z"},
   {"timestamp_LOGOUT":"2020-10-20T15:28:46Z","korisnik_id":3,"timestamp_LOGIN":"2020-03-23T19:36:02Z"},
   {"timestamp_LOGOUT":"2020-05-16T09:14:40Z","korisnik_id":4,"timestamp_LOGIN":"2020-10-19T14:06:41Z"},
   {"timestamp_LOGOUT":"2020-02-16T18:51:05Z","korisnik_id":5,"timestamp_LOGIN":"2020-06-07T17:49:33Z"},
   {"timestamp_LOGOUT":"2020-06-17T09:59:53Z","korisnik_id":3,"timestamp_LOGIN":"2020-02-15T03:26:27Z"}]
     );
   
  },

  down: async (queryInterface, Sequelize) => {
  
     await queryInterface.bulkDelete('Session', null, {});
     
  }
};
