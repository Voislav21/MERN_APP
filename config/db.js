const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    username: 'root',
    password: process.env.DB_PASSWORD,
    database: 'Groupomania',
    host: '127.0.0.1',
    dialect: 'mysql'
  }
};

module.exports = config[env];