--  Set up the employees Database

DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;
USE employee_tracker_db;

-- Create departments table
CREATE TABLE departments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

-- Create roles table
CREATE TABLE roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  -- role title
  title VARCHAR(30) NOT NULL,
  -- role salary
  salary DECIMAL(10,2) NOT NULL,
  -- role department id
  department_id INT NOT NULL,
  FOREIGN KEY (department_id) REFERENCES departments(id)
);