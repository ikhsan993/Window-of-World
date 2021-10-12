'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('profiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
        address: {
        type: Sequelize.TEXT,
        defaultValue :null
      },
      gender: {
        type: Sequelize.STRING,
        defaultValue :null
      },
       photo: {
        type: Sequelize.TEXT,
        defaultValue :null
      },
        phone: {
        type: Sequelize.STRING,
        defaultValue :null
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
    await queryInterface.dropTable('profiles');
  }
};