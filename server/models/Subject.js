const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Subject extends Model {
    static associate(models) {
      // Subject.belongsTo(models.ClassType);
      Subject.belongsToMany(models.ClassType, {
        through: 'SubjectToClasstype',
      });
      // Subject.belongsTo(models.Customer);
      // Subject.hasOne(models.Customer);
      Subject.belongsToMany(models.Customer, { through: 'CustomerToSubject' });
      Subject.hasMany(models.ScheduledClass);
    }
  }

  Subject.init(
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
      tableName: 'Subject',
    },
  );

  return Subject;
};
