const mysql = require("mysql2");

const con = mysql.createConnection({
    host: "localhost",
    password: "ura3!3007",
    user: "root",
    database: "vzdcrkva"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    const sql = `INSERT INTO bogosluzenja (praznik, datum, vreme, datum_bdenija, vreme_bdenija) VALUES ('Света Великомученица Анастасија', '04.01.2024', '9:00', '03.01.2024', '17:00')`
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
        console.log("1 record inserted");
    })
})

