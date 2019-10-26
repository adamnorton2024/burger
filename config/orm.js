// Import MySQL connection
var connection = require("../config/connections.js");

// Helper function for SQL syntax
function printQuestionMarks(num){
    var arr = [];
    for (let i = 0; i < num; i++) {
      arr.push("?");
    }
    return arr.toString();
};

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];
    //loop through the keys and push the key/value as a string int arr
    for (var key in ob){
        var value = ob[key];
        // check to skip hidden properties
        if(Object.hasOwnProperty.call(ob, key)){
            // if string with space, add quotations (Lana Del Grey => 'Lana Del Grey')
            if(typeof value === "string" && value.indexOf(" ") >= 0){
                value = "'" + value + "'";
            }
            // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
            // e.g. {sleepy: true} => ["sleepy=true"]
            arr.push(key + "=" + value); 
        }
    }
    // translate array to strings to a single comma-separated string
    return arr.toString();
};

var orm = {
    //All Burgers
    selectAll: function(table, cb){
        var queryString = `SELECT * FROM ${table};`;
        connection.query(queryString, function(err, result){
            if(err){
                throw err;
            }
            cb(result);
        });
    },

    // Insert a burger
    insertOne: function(table, cols, vals, cb){
        var queryString = `INSERT INTO ${table} (${cols.toString()}) VALUES (${printQuestionMarks(vals.length)});`;
        connection.query(queryString, vals, function(err, result){
            if(err) {
                throw err
            }
            cb(result);
        });
    },

    // Devour Burger
    updateOne: function(table, objColVals, condition, cb){
        var queryString = `UPDATE ${table} SET ${objToSql(objColVals)} WHERE ${condition}`;
        connection.query(queryString, function(err, result){
            if(err){
                throw err;
            };
            cb(result);
        });
    }

};

module.exports = orm;