'use strict';
const hash=require('../services/crypto');//funkcina za hashiranje
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let hashes=new Array(6);
    try {
      hashes[0]=await hash('c6TYXm3');
      hashes[1]=await hash('xkYR264y');
      hashes[2]=await hash('rS8zOWK');
      hashes[3]=await hash('sfIUdUdmca');
      hashes[4]=await hash('5qwEF4fwNWl1');
      hashes[5]=await hash('d+gFtSp2UP');
    } catch (error) {
      console.log('Error in hashing password while seeding '+error);
      throw(error);
    }
    await queryInterface.bulkInsert('user',
    [{"name":"Adriane","surname":"Lightoller","mail":"alightoller0@state.gov","date_of_birth":"2020/02/08","username":"alightoller0","password":hashes[0],"created_at":"2020/01/24","user_type":1},
    {"name":"Clemmie","surname":"Blasl","mail":"cblasl1@weibo.com","date_of_birth":"2020/08/26","username":"cblasl1","password":hashes[1],"created_at":"2020/07/27","user_type":2},
    {"name":"Brittani","surname":"Holworth","mail":"bholworth2@cloudflare.com","date_of_birth":"2020/07/04","username":"bholworth2","password":hashes[2],"created_at":"2020/10/10","user_type":3},
    {"name":"Ervin","surname":"Ellwood","mail":"eellwood3@kickstarter.com","date_of_birth":"2020/08/05","username":"eellwood3","password":hashes[3],"created_at":"2020/06/24","user_type":3},
    {"name":"Andi","surname":"Gunther","mail":"agunther4@wikimedia.org","date_of_birth":"2020/08/15","username":"agunther4","password":hashes[4],"created_at":"2020/02/02","user_type":3},
    {"name":"Ante","surname":"Bartulović","mail":null,"date_of_birth":null,"username":"anteb321","password":hashes[5],"created_at":"2020/02/12","user_type":1}]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user',null,{})//drugi clan je where->ako ocemo sve izbirsat onda ga stavimo na null-> nema uvjeta,treci clan su dodatne opcije->ako ih nema stavimo prazan objekt
  }
};
