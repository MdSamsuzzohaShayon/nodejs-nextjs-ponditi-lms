// If everything is okay move this to scheduled class

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      //   has many Scheduled Class
      // has many users
      Review.belongsTo(models.User);
      Review.belongsTo(models.ScheduledClass);
    }
  }

  Review.init(
    {
      /**
       * @info personal
       * */
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      comment: {
        type: new DataTypes.TEXT(),
      },
    },
    {
      sequelize,
      freezeTableName: true,
      tableName: 'Review',
    },
  );

  return Review;
};
