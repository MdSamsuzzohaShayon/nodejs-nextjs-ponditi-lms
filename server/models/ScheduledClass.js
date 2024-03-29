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
      ScheduledClass.belongsTo(models.Customer, {
        foreignKey: 'senderId',
        as: 'Sender',
      }); // one sender
      ScheduledClass.belongsTo(models.Customer, {
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
        type: DataTypes.INTEGER,
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
      // scheduled slot
      start: {
        type: new DataTypes.DATE(),
      },
      // class started at
      startedat: {
        type: new DataTypes.DATE(),
      },
      meetlink: {
        type: new DataTypes.STRING(255),
      },
      terminatedat: {
        // class started at
        type: new DataTypes.DATE(),
      },
      tuitionlocation: {
        // class started at
        type: new DataTypes.STRING(255),
      },
      // not necessary
      perHourRate: {
        type: DataTypes.INTEGER,
      },
      // hours
      // hours: {
      //   type: new DataTypes.INTEGER(10),
      // },
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
