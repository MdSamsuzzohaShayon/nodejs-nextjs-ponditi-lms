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
        'Message',
        'messagesenderId',
        {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          references: { model: 'Customer', key: 'id' },
        },
        { transaction: t },
      ),
      queryInterface.addColumn(
        'Message',
        'messagereceverId',
        {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          references: { model: 'Customer', key: 'id' },
        },
        { transaction: t },
      ),
      queryInterface.addColumn(
        'Message',
        'RoomId',
        {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          references: { model: 'Room', key: 'id' },
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
