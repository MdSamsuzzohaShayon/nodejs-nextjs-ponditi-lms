// If everything is okay move this to scheduled class

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  // student(one) - one to many
  // teacher(one) - one to many
  // sender - student/teacher - one to many
  // recever - student/teacher - one to many

  // ClassType (one) - one to many
  // Subject (one) - one to many
  // class time
  // types - online / offline / more
  // Status - accepted/pending
  class ScheduledClass extends Model {
    static associate(models) {
      // ScheduledClass.belongsTo(models.ClassType);
      ScheduledClass.belongsTo(models.User, { foreignKey: 'senderId' });
      ScheduledClass.belongsTo(models.User, { foreignKey: 'receverId' });

      ScheduledClass.belongsTo(models.ClassType);
      ScheduledClass.belongsTo(models.Subject);
    }
  }

  ScheduledClass.init(
    {
      /**
       * @info personal
       * */
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      types: {
        type: new DataTypes.STRING(100),
        allowNull: false,
      },
      status: {
        type: new DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      tableName: 'ScheduledClass',
    },
  );

  return ScheduledClass;
};
