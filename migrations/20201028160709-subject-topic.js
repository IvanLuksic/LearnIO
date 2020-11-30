'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      "Topic", // name of the Source model/table
      "subject_id", // name of the key to be added
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Subject", // name of the Target model/table
          key: "id", // key/field in the Target table
        },
        onUpdate: "CASCADE",//kada se promijeni vrijednost PK u tablici Subjects onda ce se vrijednost fk u tablici topics automatski updateati s novom vrijednosti
        onDelete: "SET NULL",//kada se izbirse redak sa primarnin kljucen koji se nalazi kao FK u tblici Topics onda će se na njegovim mjestima di se on pojavljuje u tablici Topics staviti null
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      "Topic", // name of Source model
      "subject_id" // key we want to remove
    );
  }
};
