// Connect Node to MySQL.
var mysql = require("mysql");

var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "C5pkhi6r12!",
        database: "burgers_db"
    });


connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

// Export the connection.
module.exports = connection;