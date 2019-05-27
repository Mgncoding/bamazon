const inquirer = require("inquirer");
const mysql = require("mysql");
// Create Connection to mysql
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_db"
});
// Connect to mysql datbase
connection.connect(function(err) {
    if (err) throw err;

    console.log("Connect as id " + connection.threadId);
    showProducts();
});
// Making Prompts for user interaction

var productPurchase = {
    type: 'input',
    message: "Please selct the ID of the product you'd like to buy:",
    name: 'productBought'
};
var productQuantity = {
    type: 'input',
    message: 'How many units would you like?',
    name: 'newQuantity'
};
var newPurchase = {
    type: 'list',
    message: 'Did you need anything else?',
    choices: ["Yes","No"],
    name: "productRestart"
};
// Displayin the current inventory from DB
var showProducts = function() {
    connection.query("SELECT * FROM products", function(err,res) {
        console.log("DISPLAYING INVENTORY: " + "\n" + "-----------------");
        for(var i = 0; i < res.length;i++) {
            console.log("Item ID:" + res[i].id + "\n" + "Product Name:" + res[i].product_name + "\n" + "Department:" + res[i].department_name + "\n" + "Price:" + res[i].price + "\n" + "Available Quantity:" + res[i].stock_quantity + "\n-----------------------")
        };
        // Customer interact with Inventory
        customerPrompt();
    });
};
var customerPrompt = function(res) {
    inquirer.prompt([productPurchase]).then(function(answers) {
        // Turning answers into integers
        var chooseProductId = parseInt(answers.productBought);
        for (var i = 0; i < res.length; i++) {
            if(res[i].id === chooseProductId ) {
            
            }
            // Making sure the quantity can't go below 0

        }
    })
}