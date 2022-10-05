// CREATE COLUMN 
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
            //     queryInterface.addColumn('Contest', 'UserId', {
            //         type: Sequelize.DataTypes.STRING
            //     }, { transaction: t }),
            //     queryInterface.addColumn('User', 'ContestId', {
            //         type: Sequelize.DataTypes.STRING,
            //     }, { transaction: t })
            ]);
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                // queryInterface.removeColumn('Person', 'petName', { transaction: t }),
                // queryInterface.removeColumn('Person', 'favoriteColor', { transaction: t })
            ]);
        });
    }
};