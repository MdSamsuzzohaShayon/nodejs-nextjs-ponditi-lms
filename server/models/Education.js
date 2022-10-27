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
      Education.belongsTo(models.User);
    }
  }
  Education.init(
    {
      level: {
        type: DataTypes.STRING,
      },
      group: {
        type: DataTypes.STRING,
      },
      institution: {
        type: DataTypes.STRING,
      },
      grade: {
        type: DataTypes.STRING,
      },
      cgpa: {
        type: DataTypes.STRING,
      },
      passing_year: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      tableName: 'Education',
      freezeTableName: true,
    }
  );
  return Education;
};
