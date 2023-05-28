// Import and require mysql2
const mysql = require('mysql2');

// Import and require inquirer
const inquirer = require('inquirer');

inquirer
  .prompt([
    {
        type: 'list',
        message: 'Choose an option',
        name: 'top menu',
        choices: ['view all departments' , 'view all roles' , 'view all employees' , 'add a department ', 'add a role' , ' add an employee ', 'update an employee role' , 'quit'],
    }
])