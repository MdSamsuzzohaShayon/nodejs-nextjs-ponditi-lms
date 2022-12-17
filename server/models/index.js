const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const dbConfig = require('../config/mssql-config');

const basename = path.basename(__filename);

const db = {};

// DATABASE CONNECTION

/*
const sequelize = new Sequelize(
  'mssql://shayon2022:Ponditi2022@server.ryansoftbd.com/Ponditi',
  {
    // host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    dialectOptions: {
      options: {
        encrypt: false,
      },
    },
    // port : null,
    pool: dbConfig.pool,
  }
);
*/

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  // operatorsAliases: false,
  operatorsAliases: 0,
  dialectOptions: {
    options: {
      encrypt: false,
    },
  },
  pool: dbConfig.pool,
});
/*
const sequelize = new Sequelize('Ponditi', 'shayon2022', 'Ponditi2022', {
  host: 'server.ryansoftbd.com',
  dialect: 'mssql'

});
*/
sequelize
  .authenticate()
  .then(() => {
    console.log('MSSQL is connected successfully');
  })
  .catch((err) => {
    console.log(err);
  });
fs.readdirSync(__dirname)
  .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach((file) => {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
    // console.log(model);
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
    // await db[modelName].sync({ force: true });
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
