'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Education', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      level: {
        // Exam title
        type: Sequelize.STRING,
        allowNull: false,
      },
      major: {
        // Exam title
        type: Sequelize.STRING,
      },
      institution: {
        type: Sequelize.STRING,
      },
      passing_year: {
        type: Sequelize.INTEGER,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Education');
  },
};
