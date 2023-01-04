const { Model } = require('sequelize');
const { types, scheduledClassStatus, tuitionmedums } = require('../config/keys');

const { ONLINE } = types;
const { PENDING } = scheduledClassStatus;
const { BANGLA } = tuitionmedums;

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      /**
       * @relation many to many
       * This will create an extra table it self and hold user id and another table id that user is going to make relation with
       */
      User.belongsToMany(models.ClassType, { through: 'UserToClasstype' });
      User.belongsToMany(models.Subject, { through: 'UserToSubject' });
      User.belongsToMany(models.Tuitionm, { through: 'UniqueUserTuitionm' });

      /**
       * @relation one to many
       */
      // UserId as senderId (since we are making multiple relation between same two table) will be added as foreign key in ScheduledClass as Sender
      User.hasMany(models.ScheduledClass, {
        foreignKey: 'senderId',
        as: 'Sender',
      });
      // UserId as receverId (since we are making multiple relation between same two table) will be added as foreign key in ScheduledClass as Recever
      User.hasMany(models.ScheduledClass, {
        foreignKey: 'receverId',
        as: 'Recever',
      });
      // UserId as reviewerId (since we are making multiple relation between same two table) will be added as foreign key in Review as Reviewer
      User.hasMany(models.Review, {
        foreignKey: 'reviewerId',
        as: 'Reviewer',
      });
      // UserId as reviewtakerId (since we are making multiple relation between same two table) will be added as foreign key in Review as Reviewtaker
      User.hasMany(models.Review, {
        foreignKey: 'reviewtakerId',
        as: 'Reviewtaker',
      });
      // UserId will be added as foreign key in Notification
      User.hasMany(models.Notification);
      // UserId will be added as foreign key in Education
      User.hasMany(models.Education);
    }
  }

  User.init(
    {
      /**
       * @info personal
       * */
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: new DataTypes.STRING(100),
      },
      password: {
        type: new DataTypes.STRING(255),
      },
      phone: {
        type: new DataTypes.STRING(100),
        // unique: true,
      },
      image: {
        type: new DataTypes.STRING(255),
      },
      // cc = country code
      cc: {
        type: new DataTypes.STRING(100),
      },
      email: {
        type: new DataTypes.STRING(255),
        // unique: true,
      },
      district: {
        type: new DataTypes.STRING(255),
      },
      presentaddress: {
        type: new DataTypes.STRING(255),
      },
      role: {
        type: new DataTypes.STRING(100),
      },

      age: {
        type: DataTypes.INTEGER,
      },

      /**
       * @profession for teachers or students
       */
      profession: {
        type: new DataTypes.STRING(100),
      },
      institution: {
        type: new DataTypes.STRING(225),
      },
      experience: {
        type: new DataTypes.STRING(100),
      },
      /**
       * @auth data fields
       */
      otp: {
        type: new DataTypes.STRING(100),
      },
      isActive: {
        // by admin
        type: new DataTypes.STRING(50),
        defaultValue: PENDING,
        allowNull: false,
      },
      isVerified: {
        // once they verify
        type: new DataTypes.BOOLEAN(),
        defaultValue: false,
        allowNull: false,
      },

      /**
       * @additional
       * Added later on
       */
      tutionplace: {
        type: new DataTypes.STRING(70),
        defaultValue: ONLINE,
      },
      tuitionmedium: {
        type: new DataTypes.STRING(70),
        defaultValue: BANGLA,
      },
      // isAvailable: true / false
      isAvailable: {
        type: new DataTypes.BOOLEAN(),
        defaultValue: true,
      },
      // Different rates for differet tuition styles
      tl_rate: {
        type: DataTypes.INTEGER,
      },
      sl_rate: {
        type: DataTypes.INTEGER,
      },
      ol_rate: {
        type: DataTypes.INTEGER,
      },
      totalHours: {
        type: DataTypes.INTEGER,
      },
      ref: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      tableName: 'User',
    }
  );

  return User;
};
