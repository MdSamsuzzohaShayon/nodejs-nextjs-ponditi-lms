const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ClassType extends Model {
    static associate(models) {
      ClassType.belongsToMany(models.Tuitionm, {
        through: 'TuitionmToClasstype',
      });
      ClassType.belongsToMany(models.Subject, {
        through: 'SubjectToClasstype',
      });
      ClassType.belongsToMany(models.User, { through: 'UserToClasstype' });
      ClassType.hasMany(models.ScheduledClass);
    }
  }

  ClassType.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: new DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      tableName: 'ClassType',
    },
  );

  return ClassType;
};
