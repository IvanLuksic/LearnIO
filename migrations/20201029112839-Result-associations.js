'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await Promise.all([queryInterface.addColumn(
      'result', // name of the Source model/table
      "subject_id", // name of the key to be added
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'subject' ,
          key:'id',
        },
        onUpdate: "CASCADE",//kada se promijeni vrijednost PK u tablici subjects onda ce se vrijednost fk u tablici topics automatski updateati s novom vrijednosti
        onDelete: "SET NULL",//kada se izbirse redak sa primarnin kljucen koji se nalazi kao FK u tblici topics onda će se na njegovim mjestima di se on pojavljuje u tablici topics staviti null
      }
    ),
   queryInterface.addColumn(
      'result', // name of the Source model/table
      "course_id", // name of the key to be added
      {
        type: Sequelize.INTEGER,
        references: {
          model: "course", // name of the Target model/table
          key: "id", // key/field in the Target table
        },
        onUpdate: "CASCADE",//kada se promijeni vrijednost PK u tablici subjects onda ce se vrijednost fk u tablici topics automatski updateati s novom vrijednosti
        onDelete: "SET NULL",//kada se izbirse redak sa primarnin kljucen koji se nalazi kao FK u tblici topics onda će se na njegovim mjestima di se on pojavljuje u tablici topics staviti null
      }
    ),
    queryInterface.addColumn(
      'result', // name of the Source model/table
      "topic_id", // name of the key to be added
      {
        type: Sequelize.INTEGER,
        references: {
          model: "topic", // name of the Target model/table
          key: "id", // key/field in the Target table
        },
        onUpdate: "CASCADE",//kada se promijeni vrijednost PK u tablici subjects onda ce se vrijednost fk u tablici topics automatski updateati s novom vrijednosti
        onDelete: "SET NULL",//kada se izbirse redak sa primarnin kljucen koji se nalazi kao FK u tblici topics onda će se na njegovim mjestima di se on pojavljuje u tablici topics staviti null
      }
    ),
    queryInterface.addColumn(
      'result', // name of the Source model/table
      "class_id", // name of the key to be added
      {
        type: Sequelize.INTEGER,
        references: {
          model: "clas", // name of the Target model/table
          key: "id", // key/field in the Target table
        },
        onUpdate: "CASCADE",//kada se promijeni vrijednost PK u tablici subjects onda ce se vrijednost fk u tablici topics automatski updateati s novom vrijednosti
        onDelete: "SET NULL",//kada se izbirse redak sa primarnin kljucen koji se nalazi kao FK u tblici topics onda će se na njegovim mjestima di se on pojavljuje u tablici topics staviti null
      }
    ),
     queryInterface.addColumn(
      'result', // name of the Source model/table
      "student_id", // name of the key to be added
      {
        type: Sequelize.INTEGER,
        references: {
          model: "user", // name of the Target model/table
          key: "id", // key/field in the Target table
        },
        onUpdate: "CASCADE",//kada se promijeni vrijednost PK u tablici subjects onda ce se vrijednost fk u tablici topics automatski updateati s novom vrijednosti
        onDelete: "SET NULL",//kada se izbirse redak sa primarnin kljucen koji se nalazi kao FK u tblici topics onda će se na njegovim mjestima di se on pojavljuje u tablici topics staviti null
      }
    )]);
  },

  down: async (queryInterface, Sequelize) => {
  await Promise.all([queryInterface.removeColumn(
    "result", // name of Source model
    "subject_id" // key we want to remove
  ),
  queryInterface.removeColumn(
    "result", // name of Source model
    "course_id" // key we want to remove
  ),
  queryInterface.removeColumn(
    "result", // name of Source model
    "topic_id" // key we want to remove
  ),
  queryInterface.removeColumn(
    "result", // name of Source model
    "student_id" // key we want to remove
  ),
  queryInterface.removeColumn(
    "result", // name of Source model
    "class_id" // key we want to remove
  )
]);
  }
};
