'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      author: {
        type: Sequelize.STRING
      },
      publicationDate: {
        type: Sequelize.DATEONLY
      },
      pages: {
        type: Sequelize.INTEGER
      },
      isbn: {
        type: Sequelize.STRING
      },
      cover: {
        type: Sequelize.TEXT
      },
      bookFile: {
        type: Sequelize.TEXT
      },
      about: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('books');
  }
};