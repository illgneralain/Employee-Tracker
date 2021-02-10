DROP DATABASE IF EXISTS employee_DB;
CREATE database employee_DB;

USE employee_DB;

CREATE TABLE employees (
  id INT AUTO_INCREMENT,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  manager_id INT (10),
  PRIMARY KEY (id)
);

CREATE TABLE roles (
  id INT AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMAL(30.2) NULL,
  department_id INT (10),
  PRIMARY KEY (id)
);

CREATE TABLE departments (
  id INT AUTO_INCREMENT,
  name VARCHAR(100),
  PRIMARY KEY (id)
);

SELECT * FROM employees;
SELECT * FROM roles;
SELECT * FROM departments;
