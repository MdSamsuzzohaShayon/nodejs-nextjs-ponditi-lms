module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.sequelize.transaction((t) => Promise.all([
      queryInterface.addColumn(
        'Room',
        'invitorId',
        {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          references: { model: 'Customer', key: 'id' },
        },
        { transaction: t },
      ),
      queryInterface.addColumn(
        'Room',
        'invitereceverId',
        {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          references: { model: 'Customer', key: 'id' },
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
