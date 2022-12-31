'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('User', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(100),
      },
      password: {
        type: Sequelize.STRING(255),
      },
      phone: {
        type: Sequelize.STRING(100),
      },
      image: {
        type: Sequelize.STRING(255),
      },
      // cc = country code
      cc: {
        type: Sequelize.STRING(100),
      },
      email: {
        type: Sequelize.STRING(255),
      },
      district: {
        type: Sequelize.STRING(255),
      },
      presentaddress: {
        type: Sequelize.STRING(255),
      },
      role: {
        type: Sequelize.STRING(100),
      },

      age: {
        type: Sequelize.INTEGER,
      },
      profession: {
        type: Sequelize.STRING(100),
      },
      experience: {
        type: Sequelize.STRING(100),
      },
      /**
       * @auth data fields
       */
      otp: {
        type: Sequelize.STRING(100),
      },
      isActive: {
        // by admin
        type: Sequelize.STRING(50),
        defaultValue: 'PENDING',
        allowNull: false,
      },
      isVerified: {
        // once they verify
        type: Sequelize.BOOLEAN(),
        defaultValue: false,
        allowNull: false,
      },

      /**
       * @additional
       * Added later on
       */
      tutionplace: {
        type: Sequelize.STRING(70),
        defaultValue: 'ONLINE',
      },
      tuitionmedium: {
        type: Sequelize.STRING(70),
        defaultValue: 'BANGLA',
      },
      isAvailable: {
        type: Sequelize.BOOLEAN(),
        defaultValue: true,
      },
      tl_rate: {
        type: Sequelize.INTEGER,
      },
      sl_rate: {
        type: Sequelize.INTEGER,
      },
      ol_rate: {
        type: Sequelize.INTEGER,
      },
      totalHours: {
        type: Sequelize.INTEGER,
      },
      ref: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('User');
  },
};
