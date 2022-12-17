const { Model } = require('sequelize');
const { types, scheduledClassStatus, tuitionmedums } = require('../config/keys');

const { ONLINE } = types;
const { PENDING } = scheduledClassStatus;
const { BANGLA } = tuitionmedums;

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // User.hasOne(models.ClassType, { foreignKey: 'classTypeId' });
      // User.belongsTo(models.ClassType);
      // User.belongsTo(models.Subject);
      // User.hasOne(models.Subject, { foreignKey: 'subjectId' });

      User.belongsToMany(models.ClassType, { through: 'UserToClasstype' });
      User.belongsToMany(models.Subject, { through: 'UserToSubject' });
      // User.belongsToMany(models.Medium, { through: 'UserToMedium' });
      User.belongsToMany(models.Tuitionm, { through: 'UniqueUserTuitionm' });

      User.hasMany(models.ScheduledClass, {
        foreignKey: 'senderId',
        as: 'Sender',
      });
      User.hasMany(models.ScheduledClass, {
        foreignKey: 'receverId',
        as: 'Recever',
      });

      User.hasMany(models.Review, {
        foreignKey: 'reviewerId',
        as: 'Reviewer',
      });
      User.hasMany(models.Review, {
        foreignKey: 'reviewtakerId',
        as: 'Reviewtaker',
      });

      // User.hasMany(models.Review);
      User.hasMany(models.Notification);
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
        type: new DataTypes.STRING(100),
      },

      experience: {
        type: new DataTypes.STRING(100),
      },
      running_study: {
        type: new DataTypes.BOOLEAN(),
        defaultValue: false,
        allowNull: true,
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
       * @education data fields
       */
      /*
      // Made a new model for it and making relationship
      //  result instifute group
      degree: {
        type: new DataTypes.STRING(100),
      },

      institute: {
        type: new DataTypes.STRING(255),
      },
      group: {
        type: new DataTypes.STRING(100),
      },

      passing_year: {
        type: DataTypes.INTEGER,
      },

      cgpa: {
        type: new DataTypes.STRING(80),
      },
      */

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
      rate: {
        type: DataTypes.INTEGER,
        // defaultValue: 150, // per hour
      },
      totalHours: {
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
