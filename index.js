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
        'View employees by manager',
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
          case 'View employees by manager':
          viewEmployeesByManager();
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

// VIEW ALL EMPLOYEES
function viewAllEmployees() {
  // RETRIEVE ALL EMPLOYEES FROM THE DATABASE
  connection.query('SELECT * FROM employees', (err, res) => {
    if (err) throw err;
    // DISPLAY EMPLOYEES IN A TABLE
    console.table(res);
    // Go back to the main menu
    startApp();
  });
}
                                                  // --- -BONUS POINTS- --- //
// VIEW EMPLOYEES BY MANAGER
function viewEmployeesByManager() {
  // Prompt user for manager ID
  inquirer
    .prompt({
      name: 'manager_id',
      type: 'input',
      message: 'Enter the manager ID:',
    })
    .then((answer) => {
      // RETRIEVE EMPLOYEES BY MANAGER ID FROM THE DATABASE
      connection.query(
        'SELECT * FROM employees WHERE manager_id = ?',
        answer.manager_id,
        (err, res) => {
          if (err) throw err;
          // DISPLAY EMPLOYEES IN A TABLE
          console.table(res);
          // Go back to the main menu
          startApp();
        }
      );
    });
}

// VIEW ALL DEPARTMENTS
function viewAllDepartments() {
  // RETRIEVE ALL DEPARTMENTS FROM THE DATABASE
  connection.query('SELECT * FROM departments', (err, res) => {
    if (err) throw err;
    // DISPLAY DEPARTMENTS IN A TABLE
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
    // DISPLAY ROLES IN A TABLE
    console.table(res);
    // Go back to the main menu
    startApp();
  });
}

// ADD AN EMPLOYEE
function addEmployee() {
  // Prompt user for action
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: ['Add an employee', 'Go Back'],
    })
    .then((answer) => {
      if (answer.action === 'Add an employee') {
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

            // --- -BONUS POINTS- --- //
            {
              name: 'manager_id',
              type: 'input',
              message: "Enter the employee's manager ID (leave empty if none):",
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
      } else if (answer.action === 'Go Back') {
        // Go back to the main menu
        startApp();
      }
    });
}

// ADD A DEPARTMENT
function addDepartment() {
  // Prompt user for action
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: ['Add a department', 'Go Back'],
    })
    .then((answer) => {
      if (answer.action === 'Add a department') {
        // Prompt user for department details
        inquirer
          .prompt({
            name: 'name',
            type: 'input',
            message: 'Enter the department name:',
          })
          .then((answer) => {
            // Perform database query to add the department
            connection.query(
              'INSERT INTO departments SET ?',
              answer,
              (err, res) => {
                if (err) throw err;
                console.log('Department added successfully!');
                // Go back to the main menu
                startApp();
              }
            );
          });
      } else if (answer.action === 'Go Back') {
        // Go back to the main menu
        startApp();
      }
    });
}

// ADD A ROLE
function addRole() {
  // Prompt user for action
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: ['Add a role', 'Go Back'],
    })
    .then((answer) => {
      if (answer.action === 'Add a role') {
        // Prompt user for role details
        inquirer
          .prompt([
            {
              name: 'title',
              type: 'input',
              message: 'Enter the role title:',
            },
            {
              name: 'salary',
              type: 'input',
              message: 'Enter the role salary:',
            },
            {
              name: 'department_id',
              type: 'input',
              message: 'Enter the department ID:',
            },
          ])
          .then((answers) => {
            // Perform database query to add the role
            connection.query('INSERT INTO roles SET ?', answers, (err, res) => {
              if (err) throw err;
              console.log('Role added successfully!');
              // Go back to the main menu
              startApp();
            });
          });
      } else if (answer.action === 'Go Back') {
        // Go back to the main menu
        startApp();
      }
    });
}

// UPDATE AN EMPLOYEE ROLE
function updateEmployeeRole() {
  // Prompt user for action
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: ['Update an employee role', 'Go Back'],
    })
    .then((answer) => {
      if (answer.action === 'Update an employee role') {
        // Prompt user for employee and role details
        inquirer
          .prompt([
            {
              name: 'employee_id',
              type: 'input',
              message: "Enter the employee's ID:",
            },
            {
              name: 'role_id',
              type: 'input',
              message: 'Enter the new role ID:',
            },
          ])
          .then((answers) => {
            // Perform database query to update the employee's role
            connection.query(
              'UPDATE employees SET role_id = ? WHERE id = ?',
              [answers.role_id, answers.employee_id],
              (err, res) => {
                if (err) throw err;
                console.log('Employee role updated successfully!');
                // Go back to the main menu
                startApp();
              }
            );
          });
      } else if (answer.action === 'Go Back') {
        // Go back to the main menu
        startApp();
      }
    });
}
