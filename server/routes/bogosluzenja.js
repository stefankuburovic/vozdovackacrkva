const mysql = require("mysql2");

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

module.exports = function(app) {

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
    app.get(['/api/bogosluzenja/start_date/:startDate/end_date/:endDate', '/api/bogosluzenja/date/:date'], (req, res) => {
        const { startDate, endDate, date } = req.params;

        con.connect(function(err) {
            if (err) throw err;
            if(startDate && endDate) {
                const sql = `SELECT * FROM bogosluzenja WHERE datum_bogosluzenja BETWEEN ? AND ?`;
                con.query(sql, [startDate, endDate], function (err, result) {
                    if (err) throw err;
                    res.json(result);
                });
            } else if (date) {
                const sql = `SELECT * FROM bogosluzenja WHERE datum_bogosluzenja = ?`;
                con.query(sql, [date], function (err, result) {
                    if (err) throw err;
                    res.json(result);
                });
            }
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
};