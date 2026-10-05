module.exports = {
  development: {
    username: 'root',
    password: '<dein-passwort>',
    database: 'bewertungsapp_db',
    host: process.env.DB_HOST || '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
    seederStorage: 'sequelize'
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql'
  }
};
