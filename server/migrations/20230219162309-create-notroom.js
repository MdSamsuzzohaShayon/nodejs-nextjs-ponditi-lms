'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Notroom', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      // Initialized / running /closed
      status: {
        type: Sequelize.STRING(20),
        allowNull: false,
        defaultValue: 'RUNNING',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      notroominvitorId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Customer',
          key: 'id',
        },
      },
      invitereceiverId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Customer',
          key: 'id',
        },
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Notroom');
  }
};