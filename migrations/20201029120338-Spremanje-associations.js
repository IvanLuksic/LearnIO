'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Promise.all([queryInterface.addColumn(
      'Spremanje', // name of the Source model/table
      'kurs_id', // name of the key to be added
      {
        type: Sequelize.INTEGER,
        allowNull: false,
      
        references: {
          model: "Kursevi", // name of the Target model/table
          key: "id", // key/field in the Target table
        },
        onUpdate: "CASCADE",//kada se promijeni vrijednost PK u tablici Subjects onda ce se vrijednost fk u tablici topics automatski updateati s novom vrijednosti
        onDelete: "SET NULL",//kada se izbirse redak sa primarnin kljucen koji se nalazi kao FK u tblici Topics onda će se na njegovim mjestima di se on pojavljuje u tablici Topics staviti null
      }
    ),
   queryInterface.addColumn(
      'Spremanje', // name of the Source model/table
      "topic_id", // name of the key to be added
      {
        type: Sequelize.INTEGER,
        allowNull: false,
       
        references: {
          model: "Topic", // name of the Target model/table
          key: "id", // key/field in the Target table
        },
        onUpdate: "CASCADE",//kada se promijeni vrijednost PK u tablici Subjects onda ce se vrijednost fk u tablici topics automatski updateati s novom vrijednosti
        onDelete: "SET NULL",//kada se izbirse redak sa primarnin kljucen koji se nalazi kao FK u tblici Topics onda će se na njegovim mjestima di se on pojavljuje u tablici Topics staviti null
      }
    ),
    queryInterface.addColumn(
      'Spremanje', // name of the Source model/table
      "ucenik_id", // name of the key to be added
      {
        type: Sequelize.INTEGER,
        allowNull: false,
    
        references: {
          model: "Korisnik", // name of the Target model/table
          key: "id", // key/field in the Target table
        },
        onUpdate: "CASCADE",//kada se promijeni vrijednost PK u tablici Subjects onda ce se vrijednost fk u tablici topics automatski updateati s novom vrijednosti
        onDelete: "SET NULL",//kada se izbirse redak sa primarnin kljucen koji se nalazi kao FK u tblici Topics onda će se na njegovim mjestima di se on pojavljuje u tablici Topics staviti null
      }
    ),
     queryInterface.addColumn(
      'Spremanje', // name of the Source model/table
      "pitanje_id", // name of the key to be added
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Pitanje", // name of the Target model/table
          key: "id", // key/field in the Target table
        },
        onUpdate: "CASCADE",//kada se promijeni vrijednost PK u tablici Subjects onda ce se vrijednost fk u tablici topics automatski updateati s novom vrijednosti
        onDelete: "SET NULL",//kada se izbirse redak sa primarnin kljucen koji se nalazi kao FK u tblici Topics onda će se na njegovim mjestima di se on pojavljuje u tablici Topics staviti null
      }
    )]);
  },

  down: async (queryInterface, Sequelize) => {
    await Promise.all([queryInterface.removeColumn(
      "Spremanje", // name of Source model
      "topic_id" // key we want to remove
    ),
    queryInterface.removeColumn(
      "Spremanje", // name of Source model
      "kurs_id" // key we want to remove
    ),
    queryInterface.removeColumn(
      "Spremanje", // name of Source model
      "ucenik_id" // key we want to remove
    ),
    queryInterface.removeColumn(
      "Spremanje", // name of Source model
      "pitanje_id" // key we want to remove
    )
  ]);
  }
};
