/*
const sequelize = new Sequelize('mssql://shayon2022:Ponditi2022@103.125.255.88/Ponditi', {
  // host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  dialectOptions: {
    options: {
      encrypt: false,
    },
  },
  // port : null,
  pool: dbConfig.pool,
});
*/

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const config = require('../config/config');
const db = {};

let dbConfig = config.development;

if (process.env.NODE_ENV === 'production') {
  dbConfig = config.production;
} else if (process.env.NODE_ENV === 'test') {
  dbConfig = config.test;
}

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  // host: dbConfig.host,
  dialect: dbConfig.dialect,
  storage: dbConfig.storage
});

const testDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
testDatabase();


fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
