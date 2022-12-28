const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Education extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Education.belongsTo(models.User); // This will create a UserId column in Education table
    }
  }
  Education.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      level: {
        // Exam title
        type: DataTypes.STRING,
        allowNull: false,
      },
      major: {
        type: DataTypes.STRING,
      },
      institution: {
        type: DataTypes.STRING,
      },
      board: {
        type: DataTypes.STRING,
      },
      passing_year: {
        type: DataTypes.INTEGER,
      },
      running_study: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      // group: {
      //   type: DataTypes.STRING,
      // },
      // grade: {
      //   type: DataTypes.STRING,
      // },
      // cgpa: {
      //   type: DataTypes.STRING,
      // },
    },
    {
      sequelize,
      tableName: 'Education',
      freezeTableName: true,
    }
  );
  return Education;
};
