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

    return queryInterface.sequelize.transaction((t) =>
      Promise.all([
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
        /*
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
        */
        /*
        queryInterface.addColumn(
          'User',
          'isActive',
          {
            type: new Sequelize.DataTypes.STRING(50),
            defaultValue: "PENDING",
            allowNull: false,
          },
          { transaction: t }
        ),
        */
        /*
        queryInterface.addColumn(
          'User',
          'district',
          {
            type: new Sequelize.DataTypes.STRING(255)
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          'User',
          'presentaddress',
          {
            type: new Sequelize.DataTypes.STRING(255)
          },
          { transaction: t }
        ),
        */
        /*
        queryInterface.addColumn(
          'User',
          'institute',
          {
            type: new Sequelize.DataTypes.STRING(255)
          },
          { transaction: t }
        ), 
        queryInterface.addColumn(
          'User',
          'group',
          {
            type: new Sequelize.DataTypes.STRING(100)
          },
          { transaction: t }
        ),   
        */
        /*
        queryInterface.addColumn(
          'User',
          'cgpa',
          {
            type: new Sequelize.DataTypes.STRING(80)
          },
          { transaction: t }
        ), 
        */
        /*
        queryInterface.addColumn(
          'ScheduledClass',
          'startprocess',
          {
            type: new Sequelize.DataTypes.DATE(),
          },
          { transaction: t }
        ), 
        */
        /*
       queryInterface.addColumn(
          'User',
          'image',
          {
            type: Sequelize.DataTypes.STRING,
          },
          { transaction: t }
        ),
        */
       /*
        queryInterface.addColumn(
          'User',
          'name',
          {
            type: Sequelize.DataTypes.STRING,
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          'User',
          'running_study',
          {
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
          },
          { transaction: t }
        ),
        */
      ])
    );
  },

  down: (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction((t) =>
      Promise.all([
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        // queryInterface.removeColumn('User', 'isActive', { transaction: t }),
        // queryInterface.removeColumn('ScheduledClass', 'hours', { transaction: t }),
        // queryInterface.removeColumn('User', 'location', { transaction: t }),
        // queryInterface.removeColumn('User', 'status', { transaction: t }),
        // queryInterface.removeColumn('User', 'major', { transaction: t }),
        // queryInterface.removeColumn('User', 'cgpa', { transaction: t }),
        // queryInterface.removeColumn('ScheduledClass', 'processstart', { transaction: t }),
        // queryInterface.removeColumn('User', 'firstname', { transaction: t }),
        // queryInterface.removeColumn('User', 'lastname', { transaction: t }),
      ])
    ),
};
