// mysql integration
var mysql = require('mysql');
// inquirer integration
var inquirer = require('inquirer');

// create connection with database
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'bamazon_db'
});


// display the full products table to user and store in a function
function displayTable (){
    connection.query('SELECT item_id, product_name, price  FROM products', function(error, response){
        if (error) {throw error};
        for (var i=0; i < response.length; i++) {
            console.log(response[i].item_id+' || '+response[i].product_name+' || $'+response[i].price);
        }

        //connection.end();
    });
    
}

displayTable();
setTimeout(customerBuy, 1000);

// create a function for the buying process
function customerBuy (){

        inquirer.prompt([
            {
                type: 'input',
                message:'Input the ID of the item you would like to buy:',
                name: 'userBuyItem',
                // validation function to assure input is a proper ID number
                validate: function(input){
                    // code
                    if (isNaN(input)) {
                        return ('Please put in a vald ID number')
                    } else {
                        return true;
                    }
                }
            },
            {
                type: 'input',
                message: 'How many units would you like to buy?',
                name: 'unitBuy',
                // validation function to assure input is an integer
                validate: function(input){
                    if (isNaN(input)) {
                        return ('Please put in a vald ID number')
                    } else {
                        return true;
                    }
                }

            }
        ]).then(function(answer){
            connection.query('SELECT * FROM products', function(error, res){
                if (error) { throw error };

            // store the corresponding item object in a variable
            var chosenItem = res[answer.userBuyItem - 1];
            var stockQty = chosenItem.stock_quantity;
            // inform user if they have ordered more units than are available - log "insuffic qty" or something similar if not enough units available
            if (answer.unitBuy > chosenItem.stock_quantity) {
                console.log ('Insufficient quantity!')
                customerBuy();
            } else {
                stockQty = stockQty-answer.unitBuy;
            }
            // if enough units, update SQL database values
            connection.query('UPDATE products SET ? WHERE ?', [{
                stock_quantity: stockQty
            }], function(err,res){
                // display total cost of order to user
                if (err) {throw err};
                console.log('The price of your order is $'+(answer.unitBuy*chosenItem.price));
            });
            connection.end();
        });
    })
}