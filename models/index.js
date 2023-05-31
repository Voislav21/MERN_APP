const dbConfig = require('../config/db');
const Sequelize = require('sequelize');

const sequelize= new Sequelize(dbConfig.DATABASE, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT
});

sequelize.authenticate()
.then(()=> {
    console.log('connected to Database')
})
.catch(err => {
    console.log('Error' + err)
});

const db = {};
db.sequelize = sequelize;
db.models = {},
db.models.User = require('./user')(sequelize, Sequelize.DataTypes);

module.exports = db;