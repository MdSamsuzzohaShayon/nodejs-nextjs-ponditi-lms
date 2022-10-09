const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Notification.belongsTo(models.User);
      // Notification.belongsTo(models.ScheduledClass); // will have one review
    }
  }
  Notification.init(
    {
      type: {
        type: new DataTypes.STRING(),
        allowNull: false, // new request /
      },
      comment: {
        type: DataTypes.STRING,
      },
      // need to check review completed or not
      viewed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      tableName: 'Notification',
    },
  );
  return Notification;
};
