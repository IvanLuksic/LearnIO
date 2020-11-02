'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Topic',[
      {
        naziv:'Zbrajanje',
        retci_D: 7,
        broj_stupaca:3,
        predmet_id:1
      },
      {
      naziv:'Mnozenje',
      retci_D: 5,
      broj_stupaca:3,
      predmet_id:1
    },
    {
    naziv:'Dijeljenje',
    retci_D: 6,
    broj_stupaca:3,
    predmet_id:1
  },
  {
  naziv:'Fluidi',
  retci_D: 5,
  broj_stupaca:3,
  predmet_id:2
  },
  {
    naziv:'Booleova algebra',
  retci_D: 6,
  broj_stupaca:4,
  predmet_id:3
  }
    ])
  },

  down: async (queryInterface, Sequelize) => {
  
     await queryInterface.bulkDelete('Topic', null, {});
     
  }
};
