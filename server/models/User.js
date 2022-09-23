const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.ClassType, { foreignKey: 'classTypeId' });
      User.hasOne(models.Subject, { foreignKey: 'subjectId' });
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
    },
    {
      sequelize,
      freezeTableName: true,
      tableName: 'User',
    },
  );

  return User;
};
