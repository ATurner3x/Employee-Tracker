const mysql = require('mysql2');
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