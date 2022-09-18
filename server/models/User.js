const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // User.hasOne(models.Contest, { foreignKey: "ContestId" });
      // User.hasOne(models.Contest);
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      firstname: {
        type: new DataTypes.STRING(100),
        allowNull: false,
      },

      lastname: {
        type: new DataTypes.STRING(100),
        allowNull: false,
      },
      password: {
        type: new DataTypes.STRING(255),
        allowNull: false,
      },
      phone: {
        type: new DataTypes.STRING(100),
        allowNull: true,
        unique: true
      },
      email: {
        type: new DataTypes.STRING(255),
        allowNull: false,
        unique: true
      },
      role: {
        type: new DataTypes.STRING(100),
        allowNull: false,
      },

      age: {
        type: new DataTypes.INTEGER,
        allowNull: false,
      },

      // Profession
      profession: {
        type: new DataTypes.STRING(100),
        allowNull: false,
      },

      institution: {
        type: new DataTypes.STRING(100),
        allowNull: false,
      },

      subjects: {
        type: new DataTypes.STRING(100),
        allowNull: false,
      },

      experience: {
        type: new DataTypes.STRING(100),
        allowNull: false,
      },

      location: {
        type: new DataTypes.STRING(100),
        allowNull: false,
      },
      otp: {
        type: new DataTypes.STRING(100),
      },
      isActive:{
        type: new DataTypes.BOOLEAN
      },

      degree: {
        type: new DataTypes.STRING(100),
      },

      major: {
        type: new DataTypes.STRING(100),
      },

      passing_year: {
        type: new DataTypes.INTEGER,
      },

      cgpa: {
        type: new DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      tableName: "User",
    }
  );

  return User;
};
