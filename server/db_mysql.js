const mysql = require('mysql2');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "ura3!3007",
    database: "vzdcrkva"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE vzdcrkva", function (err, result) {
        if (err) throw err;
        console.log("Database created");
    });
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = `CREATE TABLE bogosluzenja (
                        praznik VARCHAR(2000), 
                        datum VARCHAR(255), 
                        vreme VARCHAR(255), 
                        datum_bdenija VARCHAR(255), 
                        vreme_bdenija VARCHAR(255)
                    )`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });
});
