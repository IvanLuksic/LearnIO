'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await Promise.all([
     queryInterface.addColumn(
     'invite_links',
     'creator_id',
     {
        type:Sequelize.INTEGER,
        references: {
          model: 'user' ,
          key:'id',
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
    }
   ),
   queryInterface.addColumn(
    'invite_links',
    'class_id',
    {
       type:Sequelize.INTEGER,
       references: {
         model: 'clas' ,
         key:'id',
       },
       onUpdate: "CASCADE",
       onDelete: "SET NULL",
   }
  )
  ]);
  },

  down: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.removeColumn(
        'invite_links',
        'creator_id'
      ),
      queryInterface.removeColumn(
        'invite_links',
        'class_id'
      )
    ]);
  }
};
