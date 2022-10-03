const { Model } = require('sequelize');
const { types } = require('../config/keys');

const { ONLINE } = types;

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // User.hasOne(models.ClassType, { foreignKey: 'classTypeId' });
      // User.belongsTo(models.ClassType);
      // User.belongsTo(models.Subject);
      // User.hasOne(models.Subject, { foreignKey: 'subjectId' });

      User.belongsToMany(models.ClassType, { through: 'UserToClasstype' });
      User.belongsToMany(models.Subject, { through: 'UserToSubject' });

      User.hasMany(models.ScheduledClass, {
        foreignKey: 'senderId',
        as: 'Sender',
      });
      User.hasMany(models.ScheduledClass, {
        foreignKey: 'receverId',
        as: 'Recever',
      });

      User.hasMany(models.Review);
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
      firstname: {
        type: new DataTypes.STRING(100),
      },

      lastname: {
        type: new DataTypes.STRING(100),
      },
      password: {
        type: new DataTypes.STRING(255),
      },
      phone: {
        type: new DataTypes.STRING(100),
        unique: true,
      },
      // cc = country code
      cc: {
        type: new DataTypes.STRING(100),
      },
      email: {
        type: new DataTypes.STRING(255),
        unique: true,
      },
      role: {
        type: new DataTypes.STRING(100),
      },

      age: {
        type: new DataTypes.INTEGER(),
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

      location: {
        type: new DataTypes.STRING(100),
      },
      /**
       * @auth data fields
       */
      otp: {
        type: new DataTypes.STRING(100),
      },
      isActive: {
        type: new DataTypes.BOOLEAN(),
      },

      /**
       * @education data fields
       */
      degree: {
        type: new DataTypes.STRING(100),
      },

      major: {
        type: new DataTypes.STRING(100),
      },

      passing_year: {
        type: new DataTypes.INTEGER(),
      },

      cgpa: {
        type: new DataTypes.INTEGER(),
      },

      /**
       * @additional
       * Added later on
       */
      status: {
        // Online offline teacher's location
        type: new DataTypes.STRING(70),
        defaultValue: ONLINE,
      },
      rate: {
        type: new DataTypes.INTEGER(10),
        defaultValue: 150, // per hour
      },
      totalHours: {
        type: new DataTypes.INTEGER(10),
      }
    },
    {
      sequelize,
      freezeTableName: true,
      tableName: 'User',
    }
  );

  return User;
};
