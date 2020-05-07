/*jshint esversion: 6 */
const Sequelize = require('sequelize');
const connection = new Sequelize('guiaperguntas', 'root', '123456AbC!', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;