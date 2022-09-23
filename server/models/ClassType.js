const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ClassType extends Model {
    static associate(models) {
      // ClassType.hasMany(models.Subject);
      ClassType.belongsToMany(models.Subject, {
        through: 'subject_to_classtype',
      });
      ClassType.belongsTo(models.User);
    }
  }

  ClassType.init(
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
