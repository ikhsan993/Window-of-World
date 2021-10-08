'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      transferProof: {
        type: Sequelize.TEXT
      },
      remainingActive: {
        type: Sequelize.INTEGER
      },
      userStatus: {
        type: Sequelize.STRING,
        defaultValue : 'Pending'
      },
      paymentStatus: {
        type: Sequelize.STRING,
        defaultValue : 'Pending'
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
    await queryInterface.dropTable('transactions');
  }
};