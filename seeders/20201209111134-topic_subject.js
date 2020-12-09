'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('topic_subject',[
      {
      topic_id:1,
      subject_id:1
    },
    {
      topic_id:2,
      subject_id:1
    },
    {
      topic_id:3,
      subject_id:1
    },
    {
      topic_id:1,
      subject_id:2
    },
    {
      topic_id:2,
      subject_id:2
    },
    {
      topic_id:3,
      subject_id:2
    },
    {
      topic_id:4,
      subject_id:2
    },
    {
      topic_id:5,
      subject_id:1
    },
    {
      topic_id:5,
      subject_id:3
    }
    ])
  },
  down: async (queryInterface, Sequelize) => {
  
  }
};
