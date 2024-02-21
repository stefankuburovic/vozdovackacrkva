const express = require("express");
const cors = require('cors');
const {join, resolve} = require("path");
const mysql = require("mysql2");
require('dotenv').config();

const PORT = process.env.port || 3001;

const app = express();

app.use('/assets', express.static(resolve(__dirname, '../build', 'assets')));
app.use('/css', express.static(resolve(__dirname, '../build', 'css')));
app.use('/js', express.static(resolve(__dirname, '../build', 'js')));
app.use('/static', express.static(resolve(__dirname, '../build', 'static')));
app.use('/', express.static(resolve(__dirname, '../build', '')));

app.use(cors());
app.use(express.json());

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

app.get('/', function(req, res){
    res.sendFile(join(__dirname, '../build', 'index.html'));
});

// API calls from kalendar.js


app.get('/api/kalendar', (req, res) => {
    con.connect(function(err) {
        if (err) throw err;
        var sql = `SELECT * FROM kalendar`;
        con.query(sql, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
    });
});

app.post('/api/kalendar', (req, res) => {
    const { praznik, stari, novi, post, ime_dana, mesec, ime_sedmice, godina, datum, crveno_slovo} = req.body;

    con.connect(function(err) {
        if (err) throw err;
        var sql = `INSERT INTO kalendar (praznik, stari, novi, post, ime_dana, mesec, ime_sedmice, godina, datum, crveno_slovo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        con.query(sql, [praznik, stari, novi, post, ime_dana, mesec, ime_sedmice, godina, datum, crveno_slovo], function (err, result) {
            if (err) throw err;
            con.query('SELECT * FROM kalendar WHERE id = ?', [result.insertId], function(err, record) {
                if (err) throw err;
                res.json({ message: 'Record inserted', record: record[0] });
            });
        });
    });
});

app.get('/api/kalendar/:prvi_dan/:zadnji_dan', (req, res) => {
    const { prvi_dan, zadnji_dan } = req.params;
    console.log(prvi_dan,zadnji_dan);
    con.connect(function(err) {
        if (err) console.error(err);
        var sql = `SELECT * FROM kalendar WHERE datum >= ? AND datum <= ?`;
        con.query(sql, [prvi_dan, zadnji_dan], function (err, result) {
            if (err) console.error(err);
            res.json(result);
        });
    });
});

app.get('/api/kalendar/mesec/:mesec', (req, res) => {
    const { mesec } = req.params;

    con.connect(function(err) {
        if (err) throw err;
        var sql = `SELECT * FROM kalendar WHERE mesec = ?`;
        con.query(sql, [mesec], function (err, result) {
            if (err) throw err;
            res.json(result);
        });
    });
});

// API calls from bogosluzenja.js


//------------------------------------------------GET BOGOSLUZENJA------------------------------------------------
/*
* The dates should be in the 'YYYY-MM-DD' format.
* */

app.get([`/api/bogosluzenja/:id`, `/api/bogosluzenja/`], (req, res) => {

    con.connect(function(err) {
        if (err) throw err;
        con.query(`SELECT * FROM bogosluzenja ${req.params.id && `WHERE id=${req.params.id}`}`, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
})

app.get('/api/bogosluzenja/:startDate/:endDate', (req, res) => {
    const { startDate, endDate } = req.params;

    con.connect(function(err) {
        if (err) throw err;
        var sql = `SELECT * FROM bogosluzenja WHERE datum_bogosluzenja BETWEEN ? AND ?`;
        con.query(sql, [startDate, endDate], function (err, result) {
            if (err) throw err;
            res.json(result);
        });
    });
});

app.get('/api/bogosluzenja/search/:condition', (req, res) => {
    const { condition } = req.params;

    con.connect(function(err) {
        if (err) throw err;
        var sql = `SELECT * FROM bogosluzenja WHERE praznik LIKE ?`;
        con.query(sql, [`%${condition}%`], function (err, result) {
            if (err) throw err;
            res.json(result);
        });
    });
});

//------------------------------------------------DELETE BOGOSLUZENJA------------------------------------------------
app.delete('/api/bogosluzenja/:id', (req, res) => {
    const { id } = req.params;

    con.connect(function(err) {
        if (err) throw err;
        var sql = `DELETE FROM bogosluzenja WHERE id = ?`;
        con.query(sql, [id], function (err, result) {
            if (err) throw err;
            res.json({ message: 'Record deleted', result: result });
        });
    });
});

//------------------------------------------------INSERT BOGOSLUZENJA------------------------------------------------
app.post('/api/bogosluzenja', (req, res) => {
    const { praznik, datum_bogosluzenja, vreme_bogosluzenja, datum_bdenija, vreme_bdenija, dodatne_informacije } = req.body;

    con.connect(function(err) {
        if (err) throw err;
        var sql = `INSERT INTO bogosluzenja (praznik, datum_bogosluzenja, vreme_bogosluzenja, datum_bdenija, vreme_bdenija, dodatne_informacije) VALUES (?, ?, ?, ?, ?, ?)`;
        con.query(sql, [praznik, datum_bogosluzenja, vreme_bogosluzenja, datum_bdenija, vreme_bdenija, dodatne_informacije], function (err, result) {
            if (err) throw err;
            con.query('SELECT * FROM bogosluzenja WHERE id = ?', [result.insertId], function(err, record) {
                if (err) throw err;
                res.json({ message: 'Record inserted', record: record[0] });
            });
        });
    });
});

//------------------------------------------------UPDATE BOGOSLUZENJA------------------------------------------------
app.put('/api/bogosluzenja/:id', (req, res) => {
    const { id } = req.params;
    const { praznik, datum_bogosluzenja, vreme_bogosluzenja, datum_bdenija, vreme_bdenija, dodatne_informacije } = req.body;

    con.connect(function(err) {
        if (err) throw err;
        var sql = `UPDATE bogosluzenja SET praznik = ?, datum_bogosluzenja = ?, vreme_bogosluzenja = ?, datum_bdenija = ?, vreme_bdenija = ?, dodatne_informacije = ? WHERE id = ?`;
        con.query(sql, [praznik, datum_bogosluzenja, vreme_bogosluzenja, datum_bdenija, vreme_bdenija, dodatne_informacije, id], function (err, result) {
            if (err) throw err;
            con.query('SELECT * FROM bogosluzenja WHERE id = ?', [result.insertId], function(err, record) {
                if (err) throw err;
                res.json({ message: 'Record inserted', record: record[0] });
            });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});