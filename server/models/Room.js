const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //   has many Scheduled Class
      // has many users
      Room.belongsTo(models.Customer, {
        foreignKey: 'invitorId',
        as: 'Roominvitor',
      });
      Room.belongsTo(models.Customer, {
        foreignKey: 'invitereceverId',
        as: 'Inviterecever',
      });
      Room.hasMany(models.Message);
    }
  }
  Room.init(
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
      },
      // Make a serial number to serielize message
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: 'Room',
    },
  );
  return Room;
};
