var mySql = require("mysql");
var inquirer = require("inquirer");

var connection = mySql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "deadeye22",
    database: "bamazon_db"
});

function showInventory() {
    console.log(`\nAs the Manager of Bamazon, you have the ability to view all the current statistics below...\n`);
    inquirer.prompt([
        {
            type: "list",
            message: "Which action would you like to take?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
            name: "managerSearch"
        }
    ]).then(function(response){
        if (response.managerSearch === "View Products for Sale") {
            products();
        }
        if (response.managerSearch === "View Low Inventory") {
            lowInventory();
        }
        if (response.managerSearch === "Add to Inventory") {
            addInvetory();
        }
        if (response.managerSearch === "Add New Product") {
            newProduct();
        }
    })
};

function managerMode () {
    inquirer.prompt([
        {
            type: "list",
            message: "Would you like to take additional actions for the store?",
            choices: ["Yes", "No, I'm done with work"],
            name: "managerChoice"
        }
    ]).then(function(response){
        if (response.managerChoice === "Yes") {
            showInventory();
        } else {
            console.log(`\nClock Out has been recorded`)
            connection.end();
        }
    })
}

function products () {
    connection.query("SELECT * FROM products", function (err, data){
        if (err) throw err;
        for (var i = 0; i < data.length; i++) {
            console.log(`\nItem ID: ${data[i].item_id}\nProduct Name: ${data[i].product_name}\nPrice of Product: $${data[i].price}\nAmount in Stock: ${data[i].stock}\n--------------------------------------------`)
        }
        managerMode();
    })
};

function lowInventory () {

};

function addInvetory () {

};

function newProduct () {

};

connection.connect(function (err) {
    if (err) throw err;
    console.log(`Connected as ID ${connection.threadId}\n\nWelcome to the Manager Portal for Bamazon`);
    showInventory();
});