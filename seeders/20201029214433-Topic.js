'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('topic',[
      {
        name:'Zbrajanje',
        rows_D: 5,
        column_numbers:3,
        description:'Koliko imate jabuka ako vam je Ante dao 3 jabuke,Mate polovicu jedne jabuke, a Stipe 4 jabuke i jednu trećinu jedne? Nakon ovog poglavlja lako ćete odgovoriti na ovo pitanje jer ćete naučiti zbrajati prirodne i cijele brojeve te racionalne brojeve u decimalnim zapisima i u o obliku razlomka uz primjenu na situacije iz stvarnog života.'
      },
      {
      name:'Mnozenje',
      rows_D: 5,
      column_numbers:3,
      description:'U ovom poglavlju ćete naučiti množiti ......'
    },
    {
    name:'Dijeljenje',
    rows_D: 6,
    column_numbers:3,
    description:'U ovom poglavlju ćete naučiti dijleiti ......'
  },
  {
  name:'Fluidi',
  rows_D: 5,
  column_numbers:3,
  description:'U ovom poglavlju ćete sve o dinamici i statici fluida ......'
  },
  {
  name:'Booleova algebra',
  rows_D: 6,
  column_numbers:4,
  description:'U ovom poglavlju ćete naučiti osnove Booleove lagebre na kojoj počiva digitalna tehonolgija ......'
  }
    ])
  },

  down: async (queryInterface, Sequelize) => {
  
     await queryInterface.bulkDelete('topic', null, {});
     
  }
};
