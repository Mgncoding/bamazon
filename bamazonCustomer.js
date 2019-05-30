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

    console.log("Connect as id " + connection.threadId);
});
// Displaying the products columns in a table npm
var showProducts = function() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log("----------------------" + "\n" + "Enjoy bAmazon..or Don't..Buy something.!" + "\n" + "--------------------" + "\n" + "Search for your Product.!" + "\n");  
    // });
    var table = new Table({
        head: ['Product ID', 'Product Name', 'Department', 'Price', 'Quantity']
      , colWidths: [20, 30, 20, 10, 10],
      colAligns: ["center", "left", "left"],
      style: {
          head: ["teal"],
          compact: true
      }
    });
    for(let i = 0; i < res.length; i++) {
        table.push([res[i].id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity])
    }
    console.log(table.toString());
    console.log("")

});
};
showProducts();