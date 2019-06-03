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
});
// Function to display current stock
function displayProducts() {
    connection.query("SELECT * FROM products", function (error, results) {
        if (error) throw error;
        console.log("Complete stock")
        // Using table npm to display stock
        var table = new Table({
            head: ['Product ID', 'Product Name', 'Department', 'Price', 'Quantity']
            , colWidths: [10, 10, 20, 10, 10],
            colAligns: ["center", "left", "left", "right", "center"],
            style: {
                head: ["teal"],
                compact: true
            }
        });
        for (let i = 0; i < results.length; i++) {
            table.push([results[i].id, results[i].product_name, results[i].department_name, results[i].price, results[i].stock_quantity]);
        }
        console.log(table.toString());
        // saleProducts()
    })
}
// Function for products that can be sold
function saleProducts() {
    connection.query("SELECT * FROM products WHERE stock_quantity > 0", function (error, results) {
        if (error) throw error;
        console.log("bAmazon Store Inventory");

        // Using table npm to display stock
        var table = new Table({
            head: ['Product ID', 'Product Name', 'Department', 'Price', 'Quantity']
            , colWidths: [10, 10, 20, 10, 10],
            colAligns: ["center", "left", "left", "right", "center"],
            style: {
                head: ["teal"],
                compact: true
            }
        });
        for (let i = 0; i < results.length; i++) {
            table.push([results[i].id, results[i].product_name, results[i].department_name, results[i].price, results[i].stock_quantity]);
        }
        console.log(table.toString());
        initialPrompt();

    });
};
// Function to display low inventory
function lowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5 ", function(error, results) {
        if (error) throw error;
        console.log("Low Inventory")

        // Using table npm to display stock
        var table = new Table({
            head: ['Product ID', 'Product Name', 'Department', 'Price', 'Quantity']
            , colWidths: [10, 10, 20, 10, 10],
            colAligns: ["center", "left", "left", "right", "center"],
            style: {
                head: ["teal"],
                compact: true
            }
        });
        for (let i = 0; i < results.length; i++) {
            table.push([results[i].id, results[i].product_name, results[i].department_name, results[i].price, results[i].stock_quantity]);
        }
        console.log(table.toString());
        initialPrompt();
    });
};
// Function to add inventory
function addInventory() {
    inquirer.prompt({
        name: "item",
        type: "input",
        message: "What is the id number of the product for?"
    }).then(function(answer) {
        var selection = answer.item;
        connection.query("SELECT * FROM products WHERE id = ?", selection, function(err,res) {
            if (err) throw err;
            if (res.length === 0) {
                console.log("That product doesn't exist");
                addInventory();
            }else {
                inquirer.prompt({
                    name: "quantity",
                    type: "input",
                    message: "How many items do you want to add?"
                }).then(function(answers2) {
                    var amount = answers2.quantity;
                    if (amount < 0) {
                        console.log("Please enter a number higher than 0");
                        addInventory();
                    } else {
                        connection.query("UPDATE products SET stock_quantity = " + amount + "WHERE id = " + res[0].id, function(err, resUpdate) {
                            if (err) throw err;
                            console.log("Quantity has been updated");
                            console.log(amount + "items added to" + res[0].product_name);
                            initialPrompt()
                        });
                    };
                });
            };
        });
    });
};
// Function to add new products to the store 
function addNewProduct() {
    inquirer.prompt([
        {  
        type: "input",
        name: "deptName",
        message: "Please enter the new products name"
        },
        {
            type: "input",
            name: "deptAdd",
            message: "What department does this item belong to?"
        },
        {
           type: "input",
           name: "deptPrice",
           message: "Please enter the price of the new item." 
        },
        {
            type: "input",
            name: "deptStock",
            message: "Please enter a stock quantity of this item"
        }
    ]). then(function(data) {
        var name = data.deptName;
        var department = data.deptAdd;
        var price = data.deptPrice;
        var stock = data.deptStock;
        // adding connection query
        connection.query("INSERT INTO products SET ?", {
            product_name: name,
            department_name: department,
            price: price,
            stock_quantity: stock
        },
        function(err, insertResult) {
            if (err) throw err;
            console.log("New product " + name + "has been added.");
            initialPrompt();
        }
        );
    });
};