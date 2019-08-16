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
        console.table(response)
    });

    connection.end();
}
// run the function on app startup
displayTable();

// create a function for the buying process
function customerBuy (){
    // prompt with inquirer to
    inquirer.prompt([
        {
            type: 'input',
            message:'What would you like to buy?',
            name: 'userBuyItem',
            // validation function to assure input is a proper ID number
            validate: function(input){
                // code
            }
        },
        {
            type: 'input',
            message: 'How many units would you like to buy?',
            name: 'unitBuy',
            // validation function to assure input is an integer
            validate: function(input){
                // code
                if (Number.isInteger(input)) { continue }
                else { return 'Please put in a valid number' }
            }

        }

    ]).then(function(response){
        // check user input versus database values

        // inform user if they have ordered more units than are available - log "insuffic qty" or something similar if not enough units available

        // if enough units, update SQL database values
        // display total cost of order to user
        // display updated items table (?)

    })
}