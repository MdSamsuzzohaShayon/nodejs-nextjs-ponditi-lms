const { Model } = require('sequelize');
const { types, scheduledClassStatus, tuitionmedums } = require('../config/keys');

const { ONLINE } = types;
const { PENDING } = scheduledClassStatus;
const { BANGLA } = tuitionmedums;

module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
      /**
       * @relation many to many
       * This will create an extra table it self and hold user id and another table id that user is going to make relation with
       */
      Customer.belongsToMany(models.ClassType, { through: 'CustomerToClasstype' });
      Customer.belongsToMany(models.Subject, { through: 'CustomerToSubject' });
      Customer.belongsToMany(models.Tuitionm, { through: 'UniqueCustomerTuitionm' });

      /**
       * @relation one to many
       */
      // CustomerId as senderId (since we are making multiple relation between same two table) will be added as foreign key in ScheduledClass as Sender
      Customer.hasMany(models.ScheduledClass, {
        foreignKey: 'senderId',
        as: 'Sender',
      });
      // CustomerId as receverId (since we are making multiple relation between same two table) will be added as foreign key in ScheduledClass as Recever
      Customer.hasMany(models.ScheduledClass, {
        foreignKey: 'receverId',
        as: 'Recever',
      });
      // CustomerId as reviewerId (since we are making multiple relation between same two table) will be added as foreign key in Review as Reviewer
      Customer.hasMany(models.Review, {
        foreignKey: 'reviewerId',
        as: 'Reviewer',
      });
      // CustomerId as reviewtakerId (since we are making multiple relation between same two table) will be added as foreign key in Review as Reviewtaker
      Customer.hasMany(models.Review, {
        foreignKey: 'reviewtakerId',
        as: 'Reviewtaker',
      });
      // CustomerId will be added as foreign key in Notification
      Customer.hasMany(models.Notification);
      // CustomerId will be added as foreign key in Education
      Customer.hasMany(models.Education);
    }
  }

  Customer.init(
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
      },
      password: {
        type: new DataTypes.STRING(255),
      },
      phone: {
        type: new DataTypes.STRING(100),
        // unique: true,
      },
      image: {
        type: new DataTypes.STRING(255),
      },
      // cc = country code
      cc: {
        type: new DataTypes.STRING(100),
      },
      email: {
        type: new DataTypes.STRING(255),
        // unique: true,
      },
      district: {
        type: new DataTypes.STRING(255),
      },
      presentaddress: {
        type: new DataTypes.STRING(255),
      },
      role: {
        type: new DataTypes.STRING(100),
      },

      age: {
        type: DataTypes.INTEGER,
      },

      /**
       * @profession for teachers or students
       */
      profession: {
        type: new DataTypes.STRING(100),
      },
      institution: {
        type: new DataTypes.STRING(225),
      },
      experience: {
        type: new DataTypes.STRING(100),
      },
      /**
       * @auth data fields
       */
      otp: {
        type: new DataTypes.STRING(100),
      },
      isActive: {
        // by admin
        type: new DataTypes.STRING(50),
        defaultValue: PENDING,
        allowNull: false,
      },
      isVerified: {
        // once they verify
        type: new DataTypes.BOOLEAN(),
        defaultValue: false,
        allowNull: false,
      },

      /**
       * @additional
       * Added later on
       */
      tutionplace: {
        type: new DataTypes.STRING(70),
        defaultValue: ONLINE,
      },
      tuitionmedium: {
        type: new DataTypes.STRING(70),
        defaultValue: BANGLA,
      },
      // isAvailable: true / false
      isAvailable: {
        type: new DataTypes.BOOLEAN(),
        defaultValue: true,
      },
      // Different rates for differet tuition styles
      tl_rate: {
        type: DataTypes.INTEGER,
      },
      sl_rate: {
        type: DataTypes.INTEGER,
      },
      ol_rate: {
        type: DataTypes.INTEGER,
      },
      totalHours: {
        type: DataTypes.INTEGER,
      },
      ref: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      tableName: 'Customer',
    }
  );

  return Customer;
};
