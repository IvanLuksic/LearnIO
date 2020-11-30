'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Promise.all([queryInterface.addColumn(
      'Save', // name of the Source model/table
      'course_id', // name of the key to be added
      {
        type: Sequelize.INTEGER,
        allowNull: false,
      
        references: {
          model: "Course", // name of the Target model/table
          key: "id", // key/field in the Target table
        },
        onUpdate: "CASCADE",//kada se promijeni vrijednost PK u tablici Subjects onda ce se vrijednost fk u tablici topics automatski updateati s novom vrijednosti
        onDelete: "SET NULL",//kada se izbirse redak sa primarnin kljucen koji se nalazi kao FK u tblici Topics onda će se na njegovim mjestima di se on pojavljuje u tablici Topics staviti null
      }
    ),
   queryInterface.addColumn(
      'Save', // name of the Source model/table
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
      'Save', // name of the Source model/table
      "student_id", // name of the key to be added
      {
        type: Sequelize.INTEGER,
        allowNull: false,
    
        references: {
          model: "User", // name of the Target model/table
          key: "id", // key/field in the Target table
        },
        onUpdate: "CASCADE",//kada se promijeni vrijednost PK u tablici Subjects onda ce se vrijednost fk u tablici topics automatski updateati s novom vrijednosti
        onDelete: "SET NULL",//kada se izbirse redak sa primarnin kljucen koji se nalazi kao FK u tblici Topics onda će se na njegovim mjestima di se on pojavljuje u tablici Topics staviti null
      }
    ),
     queryInterface.addColumn(
      'Save', // name of the Source model/table
      "question_id", // name of the key to be added
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Question", // name of the Target model/table
          key: "id", // key/field in the Target table
        },
        onUpdate: "CASCADE",//kada se promijeni vrijednost PK u tablici Subjects onda ce se vrijednost fk u tablici topics automatski updateati s novom vrijednosti
        onDelete: "SET NULL",//kada se izbirse redak sa primarnin kljucen koji se nalazi kao FK u tblici Topics onda će se na njegovim mjestima di se on pojavljuje u tablici Topics staviti null
      }
    )]);
  },

  down: async (queryInterface, Sequelize) => {
    await Promise.all([queryInterface.removeColumn(
      "Save", // name of Source model
      "topic_id" // key we want to remove
    ),
    queryInterface.removeColumn(
      "Save", // name of Source model
      "course_id" // key we want to remove
    ),
    queryInterface.removeColumn(
      "Save", // name of Source model
      "student_id" // key we want to remove
    ),
    queryInterface.removeColumn(
      "Save", // name of Source model
      "question_id" // key we want to remove
    )
  ]);
  }
};
