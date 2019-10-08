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
            console.log(`\nClock Out has been recorded, thank you`)
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
    connection.query("SELECT item_ID FROM products GROUP BY stock HAVING MAX(stock) = 5", function (err, data){
        if (err) throw err;
        for (var i = 0; i < data.length; i++) {
            console.log(`${data[i].product_name}`)
        }
        managerMode();
    })
};

function addInvetory () {
    inquirer.prompt([
        {
            type: "number",
            message: "Which item would you like to add additional inventory to?\nA valid item ID should be provided: ",
            name: "inventory"
        },
        {
            type: "number",
            message: "How much more inventory would you like to add of this product?\nA valid value should be provided: ",
            name: "amountInventory"
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
            console.log(`\nYou were able to add ${response.amountInventory} of ${data[0].product_name} to the bamazon store!`);
            managerMode();
        })
    })
};

function newProduct () {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the product you would like to add to bamazon?",
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
            name: "newPrice"
        },
        {
            type: "number",
            message: "How much inventory of this product will be added to the bamazon store?",
            name: "newStock"
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
                console.log(`\nCongratulations, you have successfully added a new product to the ever growing bamazon store!\n`)
                managerMode();
            }
        )
    })
};

connection.connect(function (err) {
    if (err) throw err;
    console.log(`Connected as ID ${connection.threadId}\n\nWelcome to the Manager Portal for Bamazon`);
    showInventory();
});