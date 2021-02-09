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

CREATE TABLE top_albums (
  position INT NOT NULL,
  artist VARCHAR(100) NULL,
  album VARCHAR(100) NULL,
  year INT NULL,
  raw_total DECIMAL(10,4) NULL,
  raw_usa DECIMAL(10,4) NULL,
  raw_uk DECIMAL(10,4) NULL,
  raw_eur DECIMAL(10,4) NULL,
  raw_row DECIMAL(10,4) NULL,
  PRIMARY KEY (position)
);

SELECT * FROM top5000;
select * from top_albums;
