DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products(
id INTEGER NOT NULL AUTO_INCREMENT,
PRIMARY KEY (id),
product_name VARCHAR(20),
department_name VARCHAR(100),
price DECIMAL(10,2) NULL,
stock_quantity INT NULL
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Galaxy S10', 'Electronics', 800.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Comforter', 'Bedding', 75.00, 22);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Taco Shells', 'Food', 2.68, 35);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Tooth Paste', 'Personal Care', 3.45, 18);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('T.V', 'Electronics', 246.78, 17);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Chicken', 'Food', 9.00, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Yankee Candle', 'Home Decor', 19.99, 21);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Pillows', 'Bedding', 12.63, 9);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Sunglasses', 'Personal Care', 33.00, 11);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Ice Cream', 'Food', 3.29, 47);

SELECT * FROM products; 