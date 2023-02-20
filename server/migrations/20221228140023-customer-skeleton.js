/* eslint-disable indent */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    return queryInterface.sequelize.transaction((t) =>
      Promise.all([
        /*  
      queryInterface.addColumn(
          'Customer',
          'ref',
          {
            type: Sequelize.DataTypes.INTEGER,
          },
          { transaction: t },
        ),
        */
        queryInterface.addColumn(
          'Customer',
          'id_proof',
          {
            type: Sequelize.DataTypes.STRING(15),
          },
          { transaction: t },
        ),
      ])
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
