const mysql = require('mysql2');
const inquirer = require('inquirer');
require('dotenv').config();

// CREATE A CONNECTION TO THE DATABASE
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: 3306,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});


// CONNECT TO THE DATABASE
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database.');
  // Call the function to start the application
  startApp();
});

// Function to start the application
function startApp() {
  
  console.log('Welcome to the Employee Tracker!');
  // Prompt the user to choose an action
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View all employees',
        'View all departments',
        'View all roles',
        'Add an employee',
        'Add a department',
        'Add a role',
        'Update an employee role',
        'Exit',
      ],
    })
    .then((answer) => {
      // Perform action based on user's choice
      switch (answer.action) {
        case 'View all employees':
          viewAllEmployees();
          break;
        case 'View all departments':
          viewAllDepartments();
          break;
        case 'View all roles':
          viewAllRoles();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Update an employee role':
          updateEmployeeRole();
          break;
        case 'Exit':
          connection.end();
          console.log('Goodbye!');
          break;
        default:
          console.log('Invalid choice. Please try again.');
          startApp();
      }
    });
}

                                  // IMPLEMENT THE FUNCTIONS FOR EACH CHOICE

//VIEW ALL EMPLOYEES

function viewAllEmployees() {
 
  // RETRIEVE ALL EMPLOYEES FROM THE DATABASE
  connection.query('SELECT * FROM employees', (err, res) => {
    if (err) throw err;
    
    //DISPLAY EMPLOYEES IN A TABLE
    console.table(res);

    // Go back to the main menu
    startApp();
  });
}



