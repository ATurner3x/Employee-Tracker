-- Set up the employees Database
DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;
USE employee_tracker_db;

-- Create departments table
CREATE TABLE departments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

-- Insert departments
INSERT INTO departments (name) VALUES ('Development');
INSERT INTO departments (name) VALUES ('Art and Design');
INSERT INTO departments (name) VALUES ('Quality Assurance');
INSERT INTO departments (name) VALUES ('Marketing');

-- Create roles table
CREATE TABLE roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  department_id INT NOT NULL,
  FOREIGN KEY (department_id) REFERENCES departments(id)
);

-- Insert roles
INSERT INTO roles (title, salary, department_id) VALUES ('Game Developer', 80000, 1);
INSERT INTO roles (title, salary, department_id) VALUES ('Game Designer', 70000, 2);
INSERT INTO roles (title, salary, department_id) VALUES ('QA Tester', 50000, 3);
INSERT INTO roles (title, salary, department_id) VALUES ('Marketing Specialist', 60000, 4);

-- Create employees table
CREATE TABLE employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT,
  FOREIGN KEY (role_id) REFERENCES roles(id),
  FOREIGN KEY (manager_id) REFERENCES employees(id)
);

-- Insert employees
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('John', 'Smith', 1, null);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Jane', 'Doe', 2, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Mike', 'Johnson', 3, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Emily', 'Williams', 4, 1);

fesfefs
fseffse
fesfsese