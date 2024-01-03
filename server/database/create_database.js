const mysql = require('mysql2');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "ura3!3007"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE vzdcrkva", function (err, result) {
        if (err) throw err;
        console.log("Database created");
    });
});