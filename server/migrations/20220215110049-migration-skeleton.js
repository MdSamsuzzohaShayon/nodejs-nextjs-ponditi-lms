/* eslint-disable indent */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    /*
    return queryInterface.sequelize.transaction((t) => Promise.all([
        queryInterface.addColumn(
          'User',
          'classes',
          {
            type: Sequelize.DataTypes.STRING,
          },
          { transaction: t },
        ),
      ]),
    );
    */

    return queryInterface.sequelize.transaction((t) => Promise.all([
        /*
        queryInterface.addColumn(
          'Review',
          'stars',
          {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
          },
          { transaction: t },
        ),
        */
        queryInterface.addColumn(
          'Review',
          'publish',
          {
            type: Sequelize.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
          },
          { transaction: t },
        ),
      ]),
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
