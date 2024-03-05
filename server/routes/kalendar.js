const mysql = require("mysql2");

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

module.exports = function(app) {

// API calls from kalendar.js
//------------------------------------------------GET KALENDAR RECORDS------------------------------------------------

/**
 * The dates should be in the 'YYYY-MM-DD' format.
 *  @desc Get all kalendar records
 *  @route GET /api/kalendar
 *  @access Public
 *  @type JSON
 *  @data kalendar
* */
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
 /**
  *  @desc Post a new kalendar record
  *  @route POST /api/kalendar/
  *  @access Public
  *  @type JSON
  *  @data kalendar
  *  @params praznik, stari, novi, post, ime_dana, mesec, ime_sedmice, godina, datum, crveno_slovo
  *  @type string
  * */
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
/**
 *  @desc Get kalendar records by start and end date
 *  @route GET /api/kalendar/start_date/:startDate/end_date/:endDate
 *  @access Public
 *  @type JSON
 *  @data kalendar
 *  @params startDate, endDate
 *  @type string
 * */
    app.get('/api/kalendar/start_date/:startDate/end_date/:endDate', (req, res) => {
        const { startDate, endDate } = req.params;
        console.log(startDate,endDate);
        con.connect(function(err) {
            if (err) console.error(err);
            var sql = `SELECT * FROM kalendar WHERE datum >= ? AND datum <= ?`;
            con.query(sql, [startDate, endDate], function (err, result) {
                if (err) console.error(err);
                res.json(result);
            });
        });
    });

    /**
    * @desc Get kalendar records by date
    * @route GET /api/kalendar/date/:date
    * @access Public
     * @type JSON
     * @data kalendar
     * @params mesec
    * */
    app.get('/api/kalendar/:mesec', (req, res) => {
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
};