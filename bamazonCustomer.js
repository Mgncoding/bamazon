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

    // console.log("Connect as id " + connection.threadId);
});
// Displaying the products columns in a table npm
var showProducts = function() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log("----------------------" + "\n" + "Enjoy bAmazon..or Don't..Buy something.!" + "\n" + "--------------------" + "\n" + "Search for your Product.!" + "\n");  
    // });
    var table = new Table({
        head: ['Product ID', 'Product Name', 'Department', 'Price', 'Quantity']
      , colWidths: [10, 10, 20, 10, 10],
      colAligns: ["center", "left", "left", "left", "center"],
      style: {
          head: ["teal"],
          compact: true
      }
    });
    for(let i = 0; i < res.length; i++) {
        table.push([res[i].id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity])
    }
    console.log(table.toString());
    // console.log("");
    beginShop();

});
};

var beginShop = function() {
    inquirer.prompt({
        name: "productBuy",
        type: "input",
        message: "Please, please buy something..Select an ID!"
    })
    // Choosing an item id to purchase
    .then(function(answers) {
        var selection = answers.productBuy;
        connection.query("SELECT * FROM products WHERE id = ?", selection, function(err, res) {
            if (err) throw err;
            if (res.length === 0) {
                console.log("That Product doesn't exist, Please enter a product from the list above.");
                beginShop();
            }else {
                // console.log("All is okay!");
                inquirer.prompt({
                    name: "newQuantity",
                    type: "input",
                    message: "How many items would you like to buy?"
                })
                // Telling the buyer if we have that much in stock
                .then(function(answers2) {
                    var amount = answers2.newQuantity;
                    if (amount > res[0].stock_quantity) {
                        console.log("Sorry we only have " + res[0].stock_quantity + " items of the selected product");
                        beginShop()
                    }else {
                        // console.log("");
                        console.log(res[0].product_name + " bought");
                        console.log(amount + " qty @ $" + res[0].price )

                        var adjusted = res[0].stock_quantity - amount;
                        connection.query("UPDATE products SET stock_quantity = " + adjusted + " WHERE id = " + res[0].id, function(err, resUpdate) {
                            if (err) throw err;
                            // console.log("");
                            console.log("Your Order has been accepted");
                            console.log("Enjoy your new item.?!");
                            // console.log("");
                            connection.end();
                        })


                    }
                })
            }
        }); 
    });
};


showProducts();