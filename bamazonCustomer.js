var mySql = require("mysql");
var inquirer = require("inquirer");

var connection = mySql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "deadeye22",
    database: "bamazon_db"
});



connection.connect(function(err){
    if (err) throw err;
    console.log(`Connected as ID ${connection.threadId}`);
});