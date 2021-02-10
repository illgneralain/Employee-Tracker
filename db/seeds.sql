INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("James", "Johnson", 1, 2), ("Rey", "Mysterio", 2, 1), ("Shawn", "Loops", 3, 2);

INSERT INTO roles (title, salary, department_id)
VALUES ("Manager", 200, 1), ("Sales", 100, 2), ("Intern", 10, 2);

INSERT INTO department (name)
VALUES ("Admin"), ("Sales"), ("Marketing");