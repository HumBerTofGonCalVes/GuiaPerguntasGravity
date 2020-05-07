/*jshint esversion: 6 */

const Sequelize = require('sequelize');
const connection = require('./database');

const Pergunta = connection.define('perguntas', {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
    },
    pergunta: {
        type: Sequelize.TEXT,
        allowNull: false,
        required: true
    }
});

Pergunta.sync({
    force: false
}).then(() => {});

module.exports = Pergunta;