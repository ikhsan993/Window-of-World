'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('bookLists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bookId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'books',
          key : 'id',
        },
        onUpdate : 'CASCADE',
        onDelete : 'CASCADE',
      },
      userId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'users',
          key : 'id',
        },
        onUpdate : 'CASCADE',
        onDelete : 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('bookLists');
  }
};