/*jshint esversion: 6 */

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require('./database/database');
const Pergunta = require('./database/Pergunta');
const Resposta= require('./database/Resposta');

//Database
connection.authenticate().then(() => {
    console.log('Conexão realizada com o banco de dados.');
}).catch((e) => {
    console.log('Ocorreu um erro: ' + e);
});

//Render HTML
app.set('view engine', 'ejs');
app.use(express.static('public'));

//Body-Parser
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//Routes
app.get("/", (req, res) => {
    Pergunta.findAll({
        raw: true,
        order: [
            ['id', 'DESC']
        ]
    }).then((perguntas) => {
        res.render("./index", {
            perguntas: perguntas
        });
    });
});

app.get("/perguntar", (req, res) => {
    res.render("./perguntar");
});

app.post("/saveQuestion", (req, res) => {
    let titulo = req.body.titulo;
    let pergunta = req.body.pergunta;
    Pergunta.create({
        titulo: titulo,
        pergunta: pergunta
    }).then(() => {
        res.redirect('/');
    }).catch((e) => {
        console.log("Ocorreu um erro ao guardar os dados na base de dados: " + e);
    });
});

app.get('/question/:id', (req, res) => {
    let id = req.params.id;
    Pergunta.findOne({
        where: {
            id: id
        }
    }).then((pergunta) => {
        if (pergunta != undefined) {
            res.render('./pergunta', {
                pergunta: pergunta
            });
        } else {
            res.redirect('/');
        }
    });
});

//Server
app.listen(8080, (req, res) => {
    console.log("Servidor a trabalhar...");
});