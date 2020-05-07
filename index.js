/*jshint esversion: 6 */

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

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
    res.render("./index");
});

app.get("/perguntar", (req, res) => {
    res.render("./perguntar");
});

app.post("/saveQuestion", (req, res) => {
    let titulo = req.body.titulo;
    let pergunta = req.body.pergunta;
    res.send("Formulário recebido! Título: " + titulo + "; Descrição: " + pergunta);
});
//Server
app.listen(8080, (req, res) => {
    console.log("Servidor a trabalhar...");
});