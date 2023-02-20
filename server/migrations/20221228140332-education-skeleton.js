'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction((t) => Promise.all([
      // queryInterface.removeColumn('Education', 'board', { transaction: t })
    ])),
};
