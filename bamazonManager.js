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