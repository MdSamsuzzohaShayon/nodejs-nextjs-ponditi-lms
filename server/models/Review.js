// If everything is okay move this to scheduled class

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      //   has many Scheduled Class
      // has many users
      Review.belongsTo(models.User, {
        foreignKey: 'reviewerId',
        as: 'Reviewer',
      });
      Review.belongsTo(models.User, {
        foreignKey: 'reviewtakerId',
        as: 'Reviewtaker',
      });
      Review.belongsTo(models.ScheduledClass); // will have one review
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
      stars: {
        type: new DataTypes.INTEGER(),
        allowNull: false,
      },
      comment: {
        type: new DataTypes.TEXT(),
        allowNull: false,
      },
      // need to check review completed or not
      publish: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
