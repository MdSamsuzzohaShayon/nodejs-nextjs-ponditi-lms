const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //   has many Scheduled Class
      // has many users
      Message.belongsTo(models.Customer, {
        foreignKey: 'messagesenderId',
        as: 'Messagesender',
      });
      Message.belongsTo(models.Customer, {
        foreignKey: 'messagereceverId',
        as: 'Messagerecever',
      });
      Message.belongsTo(models.Room);
    }
  }
  Message.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      text: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      // need to check review completed or not
      publish: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      // Make a serial number to serielize message
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: 'Message',
    }
  );
  return Message;
};
