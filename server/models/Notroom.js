const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Notroom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //   has many Scheduled Class
      // has many users
      Notroom.belongsTo(models.Customer, {
        foreignKey: 'notroominvitorId',
        as: 'Notroominvitor',
      });
      Notroom.belongsTo(models.Customer, {
        foreignKey: 'invitereceiverId',
        as: 'Invitereceiver',
      });
    }
  }
  Notroom.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      // Initialized / running /closed
      status: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'RUNNING',
      },
      // Make a serial number to serielize message
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: 'Notroom',
    },
  );
  return Notroom;
};
