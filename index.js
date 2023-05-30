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

//VIEW ALL DEPARTMENTS

function viewAllDepartments() {

  // RETRIEVE ALL DEPARTMENTS FROM THE DATABASE
  connection.query('SELECT * FROM departments', (err, res) => {
    if (err) throw err;

    // Display DEPARTMENTS in a table
    console.table(res);

    // Go back to the main menu
    startApp();
  });
}

// VIEW ALL ROLES

function viewAllRoles() {

  // RETRIEVE ALL ROLES FROM THE DATABASE
  connection.query('SELECT * FROM roles', (err, res) => {
    if (err) throw err;

    //DISPLAY ROLES IN A TABLE
    console.table(res);

    // Go back to the main menu
    startApp();
  });
}

// ADD AN EMPLOYEE

function addEmployee() {
  
  // Prompt user for employee details
  inquirer
    .prompt([
      {
        name: 'first_name',
        type: 'input',
        message: "Enter the employee's first name:",
      },
      {
        name: 'last_name',
        type: 'input',
        message: "Enter the employee's last name:",
      },
      {
        name: 'role_id',
        type: 'input',
        message: "Enter the employee's role ID:",
      },
      {
        name: 'manager_id',
        type: 'input',
        message: "Enter the employee's manager ID:",
      },
    ])
    .then((answers) => {
      // Perform database query to add the employee
      connection.query(
        'INSERT INTO employees SET ?',
        answers,
        (err, res) => {
          if (err) throw err;
          console.log('Employee added successfully!');
          // Go back to the main menu
          startApp();
        }
      );
    });
}

