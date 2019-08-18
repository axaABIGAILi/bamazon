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
    });
    
}
// Run displayTable first
displayTable();
// Prevent customerBuy from prematurely running with timeout
setTimeout(customerBuy, 1000);

// create a function for the buying process
function customerBuy (){
        // prompt customer to ask what items they want to order and how many
        inquirer.prompt([
            {
                type: 'input',
                message:'Input the ID of the item you would like to buy:',
                name: 'userBuyItem',
                // validation function to assure input is a number
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
                // validation function to assure input is a number
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
            // inform user if they have ordered more units than are available 
            if (answer.unitBuy > chosenItem.stock_quantity) {
                console.log ('Insufficient quantity in stock! Your order cannot be fulfilled.');
                // ask user if they wish to make another purchase
                inquirer
                    .prompt([
                    {
                        type: 'confirm',
                        message: 'Would you like to buy something else?',
                        choices: ['Yes','No'],
                        name: 'tryAgain'
                    }]).then(function(ans){
                        if (ans.tryAgain) {
                            customerBuy(); 
                        } else { 
                            console.log ('Alright. Come again!') 
                            // end connection in teh case that user doesn't wish to continue with purchase process
                            connection.end();}
                    });
            } else {
                stockQty = stockQty-answer.unitBuy;
            
            // if enough units, update SQL database values
            connection.query('UPDATE products SET ? WHERE ?', [{
                stock_quantity: stockQty
            }, {
                item_id: answer.userBuyItem
            }], function(err,res){
                // display total cost of order to user
                if (err) {throw err};
                console.log('The price of your order is $'+(answer.unitBuy*chosenItem.price+' - thank you for shopping with us!'));
                // end connection in the case of a successful purchase
                connection.end();
            });
        }
            
        });
    })
}