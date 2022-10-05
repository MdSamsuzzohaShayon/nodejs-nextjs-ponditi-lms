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
      ScheduledClass.belongsTo(models.User, {
        foreignKey: 'senderId',
        as: 'Sender',
      }); // one sender
      ScheduledClass.belongsTo(models.User, {
        foreignKey: 'receverId',
        as: 'Recever',
      }); // one reciver

      ScheduledClass.belongsTo(models.ClassType); // one class type
      ScheduledClass.belongsTo(models.Subject); // one subject

      ScheduledClass.hasMany(models.Review); // will have two review, one for teacher and one for student
    }
  }

  ScheduledClass.init(
    {
      /**
       * @info personal
       * */
      id: {
        type: new DataTypes.INTEGER(),
        autoIncrement: true,
        primaryKey: true,
      },
      desc: {
        type: new DataTypes.TEXT(),
      },
      types: {
        type: new DataTypes.STRING(100),
        allowNull: false,
      },
      status: {
        /**
         * @process step by step
         * 1. PENDING - initialize class
         * 2. RUNNIN / REJECT - when teacher accept or reject the request
         * 3. WAITING - IF time is up and teacher await for completation and reviews
         * 4. COMPLETED - Student mark as completed and send a review
        */
        type: new DataTypes.STRING(100),
        allowNull: false,
      },
      // date
      start: {
        type: new DataTypes.DATE(),
      },
      // not necessary
      perHourRate: {
        type: new DataTypes.INTEGER(10),
      },
      // hours
      hours: {
        type: new DataTypes.INTEGER(10),
      },
      // bill
      // total hours
      // reviews
    },
    {
      sequelize,
      freezeTableName: true,
      tableName: 'ScheduledClass',
    }
  );

  return ScheduledClass;
};
