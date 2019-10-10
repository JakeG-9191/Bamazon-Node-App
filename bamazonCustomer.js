// Require mySql and inquirer to be installed to continue with use of application 
var mySql = require("mysql");
var inquirer = require("inquirer");

// Create connection with SQL server
var connection = mySql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "deadeye22",
    database: "bamazon_db"
});

// Function that shows inventory to user, for loop through all products and calls shopper function
function showInventory () {
    connection.query("SELECT * FROM products", function (err, data) {
        if (err) throw err;
        for (var i = 0; i < data.length; i++) {
            console.log(`\nItem ID: ${data[i].item_id}\nProduct Name: ${data[i].product_name}\nPrice of Product: $${data[i].price}\nAmount in Stock: ${data[i].stock}\nDepartment of Product: ${data[i].department_name}\n--------------------------------------------`)
        }
        shopper();
    })
};

// Function that is called after purchase or notification that there is not enough inventory to meet request, asks user if they would like to cotinue shopping or if they woudl like to end the experience and cut the connection to database
function shopAgain () {
    inquirer.prompt([
        {
            type: "list",
            message: "Would you like to see the current inventory and make another purchase?",
            choices: ["Yes, I Would", "No, Thank You"],
            name: "shopAgain"
        }
    ]).then(function(response){
        if (response.shopAgain === "Yes, I Would") {
            showInventory();
        } else {
            console.log(`\nThank you for shopping with us today!`)
            connection.end();
        }
    })
};

// Function that asks user what they want to purchase, requires input of item ID and then quantity of that product, after user enters information, request is made to MySQL to make sure there is enough inventory to proceed with purchase 
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
    ]).then(function(response){
        connection.query("SELECT * FROM products WHERE item_id =?", [response.itemID], function (err, data){
            if (err) throw err;
            if (data[0].stock >= response.itemUnits) {
                connection.query("UPDATE products SET ? WHERE ?",
                [
                    {
                        stock: data[0].stock - response.itemUnits
                    },
                    {
                        item_id: response.itemID
                    }
                ])
                console.log (`\nYou were able to successfully purchase ${data[0].product_name}, and you have purchased ${response.itemUnits} units of this product.\nThis cost you $${data[0].price * response.itemUnits}\n`);
                shopAgain();
            } else if (data[0].stock < response.itemUnits) {
                console.log (`\nApologies, there is currently not enough inventory of this product to fulfill your order\n`);
                shopAgain();
            }
        })
    })
};

// Shows inital connection and confirms that user wants to continue shopping 
connection.connect(function(err){
    if (err) throw err;
    console.log(`\nWelcome to the Customer Portal for Bamazon\n`);
    inquirer.prompt([
        {
            type: "list",
            message: "Would you like to shop with us today?",
            choices: ["Yes I Would", "No, Thank You"],
            name: "customerGo"
        }
    ]).then(function(response){
        if (response.customerGo === "Yes I Would") {
            showInventory();
        } else {
            console.log(`\nWe hope to see you another time!`)
            connection.end();
        }
    })
});