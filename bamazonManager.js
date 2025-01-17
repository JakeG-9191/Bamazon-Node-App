// Require mySql and inquirer to be installed to continue with use of application 
var mySql = require("mysql");
var inquirer = require("inquirer");

var connection = mySql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "deadeye22",
    database: "bamazon_db"
});

// Function that prompts user to select 1 of 4 options using inquirer
function showInventory() {
    console.log(`\nAs the Manager of Bamazon, you have the ability to engage in all the actions listed below...\n`);
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

// Once one of the actions has been completed, manager has option to continue with more options to to end connection with database
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
            console.log(`\nClock Out has been recorded, thank you`)
            connection.end();
        }
    })
}

// Function that shows a list of all products and subsequent data
function products () {
    connection.query("SELECT * FROM products", function (err, data){
        if (err) throw err;
        for (var i = 0; i < data.length; i++) {
            console.log(`\nItem ID: ${data[i].item_id}\nProduct Name: ${data[i].product_name}\nPrice of Product: $${data[i].price}\nAmount in Stock: ${data[i].stock}\n--------------------------------------------`)
        }
        managerMode();
    })
};

// Function that shows user what items have a stock of less than 5
function lowInventory () {
    connection.query("SELECT * FROM products WHERE stock < 5", function (err, data){
        if (err) throw err;
        console.log(`\nThe following items have a low inventory (Less than 5 in stock)\nCorporate would recommend ordering inventory for these items soon!\n`)
        for (var i = 0; i < data.length; i++) {
            console.log(`Item Name: ${data[i].product_name}\nItem Quantity: ${data[i].stock}\n`)
        }
        managerMode();
    })
};

// Function that offers user ability to update inventory if they feel it is too low or high, they can remove inventory by putting a negative value in the second inquirer prompt, though a valid ID is needed to choose a certain item
function addInvetory () {
    inquirer.prompt([
        {
            type: "number",
            message: "Which item would you like to add additional inventory to?\nA valid item ID should be provided: ",
            name: "inventory",
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
            message: "How much more inventory would you like to add of this product?\nA valid figure should be provided: ",
            name: "amountInventory",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                console.log(`\nMust enter a number for amount of inventory to add!`)
                return false;
            }
        }
    ]).then(function(response){
        connection.query("SELECT * FROM products WHERE item_id =?", [response.inventory], function (err, data){
            if (err) throw err;
            connection.query("UPDATE products SET ? WHERE ?",
            [
                {
                    stock: data[0].stock + response.amountInventory
                },
                {
                    item_id: response.inventory
                }
            ])
            console.log(`\nYou were able to add ${response.amountInventory} of ${data[0].product_name} to the Bamazon store!`);
            managerMode();
        })
    })
};

// Function that allows the user to add a completely new product to database, an item ID is generated behind the scenes in MySQL
function newProduct () {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the product you would like to add to Bamazon?",
            name: "newName"
        },
        {
            type: "input",
            message: "Which Department does this product belong in?",
            name: "newDept"
        },
        {
            type: "number",
            message: "What is the price for one unit of this product?",
            name: "newPrice",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                console.log(`\nMust enter a number for the price of this new product!`)
                return false;
            }
        },
        {
            type: "number",
            message: "How much inventory of this product will be added to the Bamazon store?",
            name: "newStock",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                console.log(`\nMust enter a number for amount of inventory to add for new product!`)
                return false;
            }
        }
    ]).then(function(response){
        connection.query(
            "INSERT INTO products SET ?",
            {
                product_name: response.newName,
                department_name: response.newDept,
                price: response.newPrice,
                stock: response.newStock
            }, function (err) {
                if (err) throw err;
                console.log(`\nCongratulations, you have successfully added a new product to the ever growing Bamazon store!\n`)
                managerMode();
            }
        )
    })
};

// Shows initial connection was successful, then calls for the inventory to be displayed
connection.connect(function (err) {
    if (err) throw err;
    console.log(`\nWelcome to the Manager Portal for Bamazon`);
    showInventory();
});