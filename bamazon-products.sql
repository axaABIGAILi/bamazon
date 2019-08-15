DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;
CREATE TABLE products (
	item_id INTEGER NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30),
    department_name VARCHAR(30),
    price INTEGER,
    stock_quantity INTEGER
    PRIMARY KEY (item_id)
);

INSERT products (product_name, department_name, price, stock_quantity)
VALUES ("Lavender Sachet", "Home Decor", 15, 10);

INSERT products (product_name, department_name, price, stock_quantity)
VALUES("Heatable Llama Plush", "Health & Beauty Care", 20, 7);

INSERT products (product_name, department_name, price, stock_quantity)
VALUES("Cooling Eye Sleep Mask", "Health & Beauty Care", 11, 10);

INSERT products (product_name, department_name, price, stock_quantity)
VALUES("Aloe Infused Fuzzy Socks", "Health & Beauty Care", 22, 15);

INSERT products (product_name, department_name, price, stock_quantity)
VALUES("Jasmine Pearl Tea", "Food", 15, 11);

INSERT products (product_name, department_name, price, stock_quantity)
VALUES("Eucalyptus Oil", "Health & Beauty Care", 17, 10);

INSERT products (product_name, department_name, price, stock_quantity)
VALUES("Blush Linen Duvet Cover", "Home Textiles", 78, 20);

INSERT products (product_name, department_name, price, stock_quantity)
VALUES("Jade Face Roller", "Health & Beauty Care", 21, 25);

INSERT products (product_name, department_name, price, stock_quantity)
VALUES("Waffle Knit Robe", "Home Textiles", 22, 10);

INSERT products (product_name, department_name, price, stock_quantity)
VALUES("Survival Knife", "Sport & Outdoors", 75, 20);