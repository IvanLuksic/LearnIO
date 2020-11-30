'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('User',
    [{"name":"Adriane","surname":"Lightoller","mail":"alightoller0@state.gov","date_of_birth":"2020/02/08","username":"alightoller0","password":"c6TYXm3","created_at":"2020/01/24","user_type":1},
    {"name":"Clemmie","surname":"Blasl","mail":"cblasl1@weibo.com","date_of_birth":"2020/08/26","username":"cblasl1","password":"dxkYR264y","created_at":"2020/07/27","user_type":2},
    {"name":"Brittani","surname":"Holworth","mail":"bholworth2@cloudflare.com","date_of_birth":"2020/07/04","username":"bholworth2","password":"rS8zOWK","created_at":"2020/10/10","user_type":3},
    {"name":"Ervin","surname":"Ellwood","mail":"eellwood3@kickstarter.com","date_of_birth":"2020/08/05","username":"eellwood3","password":"sfIUdUdmca","created_at":"2020/06/24","user_type":3},
    {"name":"Andi","surname":"Gunther","mail":"agunther4@wikimedia.org","date_of_birth":"2020/08/15","username":"agunther4","password":"5qwEF4fwNWl1","created_at":"2020/02/02","user_type":3}]
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('User',null,{})//drugi clan je where->ako ocemo sve izbirsat onda ga stavimo na null-> nema uvjeta,treci clan su dodatne opcije->ako ih nema stavimo prazan objekt
  }
};
