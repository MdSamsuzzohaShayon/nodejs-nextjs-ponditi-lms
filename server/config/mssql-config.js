module.exports = {
  HOST: process.env.MSSQL_HOST,
  USER: process.env.MSSQL_USER,
  PASSWORD: process.env.MSSQL_PASSWORD,
  DB: process.env.MSSQL_DATABASE,
  dialect: 'mssql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },

  dialectOptions: {
    // Observe the need for this nested `options` field for MSSQL
    options: {
      // Your tedious options here
      useUTC: false,
      dateFirst: 1,
    },
  },
};
