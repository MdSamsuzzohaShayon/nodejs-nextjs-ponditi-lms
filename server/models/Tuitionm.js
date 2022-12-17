const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  // Tuitionm => Tuition m => tuition medium 
  class Tuitionm extends Model {
    static associate(models) {
      Tuitionm.belongsToMany(models.ClassType, {
        through: 'TuitionmToClasstype',
      });
      Tuitionm.belongsToMany(models.User, { through: 'UserToTuitionm' });
      // Tuitionm.belongsToMany(models.User, { through: 'UniqueUserTuitionm' });
    }
  }

  Tuitionm.init(
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
      tableName: 'Tuitionm',
    }
  );

  return Tuitionm;
};
