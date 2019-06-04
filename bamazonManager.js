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
            case "Add new Products":
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
            validate: function(inputId) {
                if(!isNaN(inputId)) {
                    return true;
                }
                console.log("Please enter a valid Id");
                return false;
            }
        },{
            type: "input",
            name: "quantity",
            message: "How many would you like to add to the inventory?",
            // Enter a number
            validate: function(inputQuan) {
                if (!isNaN(inputQuan)) {
                    return true;
                }
                console.log("Please enter a valid quantity.");
                return false;
            }
        }
    ]).then(function(answers) {
        connection.query("SELECT * FROM products", function (err, res) {
            if (err) throw err;
            // If user enter an item Id outside the total items range, throw err
            if((parseInt(answers.itemId) > res.length) || (parseInt(answers.itemId) <= 0)) {
                console.log("Please enter a valid ID");
            }
            // Proceed to loop through the data and find matched Id
            var chooseItem = "";
            for (let i = 0; i < res.length; i ++) {
                if(res[i].id === parseInt(answers.itemId)) {
                    chooseItem = res[i];
                }
            }
            // Update the quantity of the selected Id
            connection.query("UPDATE products SET ? WHERE ?", [{
                stock_quantity: chooseItem.stock_quantity += parseInt(answers.quantity)
            },{
                id: chooseItem.id
            }
        ], function(error) {
            if (error) throw error;
            console.log("You Successfully update/added" + answers.quantity + "" + chooseItem.product_name + "to the inventory");
            display()
        }
        );
        });
    });
};
// Function to add new products
function addProduct() {
    inquirer.prompt([
        {
            type: "input",
            name: "newProduct",
            message: "What is the name of the product you would like to add?"
        }, {
            type: "list",
            name: "department",
            message: "Which department does this product fall into?",
            choices: ["Electronics", "Bedding", "Food","Personal Care", "Home Decor"]
        }, {
            type: "input",
            name: "cost",
            message: "How much does it cost",
            validate: function(cost) {
                if(!isNaN(cost)) {
                    return true;
                }
                console.log("Please enter a valid cost.");
                return false;
            }
        }, {
            type: "input",
            name: "invQuantity",
            message: "How many do we have?",
            validate: function(invQuantity) {
                if (!isNaN(invQuantity)) {
                    return true;
                }
                console.log("Please enter a valid quantity");
                return false;
            }
        }
    ]).then(function(answer2) {
        // Grabbing the new product and insert into table
        var queryString = "INSERT INTO products SET ?";
        connection.query(queryString, {
            product_name: answer2.newProduct,
            department_name: answer2.department,
            price: answer2.cost,
            stock_quantity: answer2.invQuantity,
        })
        // Message to confirm product has been added 
        console.log(answer2.newProduct + "has been added to bAmazon.");
        display();
    });
};
// Function to quit the program
function quitManager() {
    connection.end();
};