// mysql integration
var mysql = require('mysql');
// inquirer integration
var inquirer = require('inquirer');

// display the full products table to user

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

});