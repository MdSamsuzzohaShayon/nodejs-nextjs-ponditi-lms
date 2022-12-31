module.exports = {
  HOST: process.env.MSSQL_HOST,
  USER: process.env.MSSQL_USER,
  PASSWORD: process.env.MSSQL_PASSWORD,
  DB: process.env.MSSQL_DATABASE,
  // PORT: parseInt(process.env.MSSQL_PORT, 10),
  dialect: process.env.DB_DIALECT,

  /*
  // MySQL Connection
  HOST: '174.138.166.194',
  USER: 'ryansoftcom_ponditi_user',
  // USER: 'shayon',
  PASSWORD: 'Ponditi2022',
  // PASSWORD: 'Test1234',
  DB: 'ryansoftcom_ponditi_db',
  dialect: "mysql",
  */


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
