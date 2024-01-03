const express = require("express");
const {response} = require("express");
const {join, resolve} = require("path");
const mysql = require("mysql2");

const PORT = process.env.port || 3001;

const app = express();
app.use('/assets', express.static(resolve(__dirname, '../build', 'assets')));
app.use('/css', express.static(resolve(__dirname, '../build', 'css')));
app.use('/js', express.static(resolve(__dirname, '../build', 'js')));
app.use('/static', express.static(resolve(__dirname, '../build', 'static')));
app.use('/', express.static(resolve(__dirname, '../build', '')));

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "ura3!3007",
    database: "vzdcrkva"
});

app.get('/', function(req, res){
    res.sendFile(join(__dirname, '../build', 'index.html'));
});

app.get([`/api/bogosluzenja/:id`, `/api/bogosluzenja/`], (req, res) => {

    con.connect(function(err) {
        if (err) throw err;
        con.query(`SELECT * FROM bogosluzenja ${req.params.id && `WHERE id=${req.params.id}`}`, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
})

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
})

