var mySql = require("mysql");
var inquirer = require("inquirer");

var connection = mySql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "deadeye22",
    database: "bamazon_db"
});

function showInventory () {
    connection.query("SELECT * FROM products", function (err, data) {
        if (err) throw err;
        for (var i = 0; i < data.length; i++) {
            console.log(`\nItem ID: ${data[i].item_id}\nProduct Name: ${data[i].product_name}\nPrice of Product: $${data[i].price}\nAmount in Stock: ${data[i].stock}\nDepartment of Product: ${data[i].department_name}\n--------------------------------------------`)
        }
        shopper();
    })
};

function shopper() {
    inquirer.prompt([
        {
            type: "number",
            message: "To proceed with your purchase, please enter the item ID for the product you wish to buy",
            name: "itemID",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                console.log(`\nMust enter a number for the item ID`)
                return false;
            }
        },
        {
            type: "number",
            message: "Thank you for your selection, please indicate how many units of this product you would like to purchase",
            name: "itemUnits",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                console.log(`\nMust enter a value for units of product you wish to purchase`)
                return false;
            }
        }
    ])
};

connection.connect(function(err){
    if (err) throw err;
    console.log(`Connected as ID ${connection.threadId}`);
    showInventory();
});