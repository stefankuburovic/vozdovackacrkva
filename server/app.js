const express = require("express");
const cors = require('cors');
const {join, resolve} = require("path");
require('dotenv').config();

const app = express();

app.use('/assets', express.static(resolve(__dirname, '../build', 'assets')));
app.use('/css', express.static(resolve(__dirname, '../build', 'css')));
app.use('/js', express.static(resolve(__dirname, '../build', 'js')));
app.use('/static', express.static(resolve(__dirname, '../build', 'static')));
app.use('/', express.static(resolve(__dirname, '../build', '')));

app.use(cors());
app.use(express.json());

app.get('/', function(req, res){
    res.sendFile(join(__dirname, '../build', 'index.html'));
});

module.exports = app;