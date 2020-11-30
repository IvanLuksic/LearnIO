'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'Course-Topic',//ime tablice isto kao ono u through
      {
        course_id:{
          type: Sequelize.INTEGER,
          primaryKey:true,
          references:{
            model: 'Course',
            key: 'id',
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        },
      topic_id:{
          type: Sequelize.INTEGER,
          primaryKey:true,
          references:{
            model: 'Topic',
            key: 'id',
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        }
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(  'Course-Topic');
  }
};
