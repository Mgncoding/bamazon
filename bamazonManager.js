// Getting my require
const Table = require('cli-table3')
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
connection.connect(function (err) {
    if (err) throw err;
    start()
});
// Function to give the mangers choices
function start() {
    inquirer.prompt([
        {
            type: "list",
            name: "task",
            message: "What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add new Products", "Quit"]
        }
    ]).then(function(answer) {
        // Switch caste statements to call different functions for above choices
        switch (answer.task) {
            case "View Products for Sale":
                display();
                break;
            case "View Low Inventory":
                viewLowInv();
                break;
            case "Add to Inventory":
                addInv();
                break;
            case "Add to Inventory":
                addProduct();
                break;
            case "Quit":
                quitManager();
        };
    });
};
// Function to View Products for Sale
function display() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        var table = new Table ({
            head: ['Product ID', 'Product Name', 'Department', 'Price', 'Quantity']
            , colWidths: [10, 10, 20, 10, 10],
            colAligns: ["center", "left", "left", "right", "center"],
            style: {
                head: ["blue"],
                compact: true
            }
        });
        for(let i = 0; i < res.length; i++) {
            table.push([res[i].id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity])
        }
        console.log(table.toString());
        start();
    });
};
// Function to View Low Inventory
function viewLowInv() {
    // View low inventory if below 5
    var query = "SELECT * FROM products WHERE stock_quantity <=5";
    connection.query(query, function(err, res) {
        if (err) throw err;
// Table 
        var table = new Table ({
            head: ['Product ID', 'Product Name', 'Department', 'Price', 'Quantity']
            , colWidths: [10, 10, 20, 10, 10],
            colAligns: ["center", "left", "left", "right", "center"],
            style: {
                head: ["blue"],
                compact: true
            }
        });
        for(let i = 0; i < res.length; i++) {
            table.push([res[i].id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity])
        }
        console.log(table.toString());
        start(); 
    });
};
// function to Add to the inventory
function addInv(){
    inquirer.prompt([
        {
            type: "input",
            name: "itemId",
            message: "What is the Id of the item you would like to add more quantity?",
            // User need to enter number
        }
    ])
}
