-- Example 3: Employee Management System
-- You're tasked with creating an Employee Management System to manage employees, departments, and their salaries. Using PostgreSQL and pgAdmin, build the system step-by-step.

-- 1. Create the tables to store all of this data
CREATE TABLE employees (
    employee_id SERIAL PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    hire_date DATE
);

CREATE TABLE departments (
    department_id SERIAL PRIMARY KEY,
    department_name TEXT,
    department_head TEXT
);

CREATE TABLE salaries (
    employee_id INT REFERENCES employees(employee_id),
    department_id INT REFERENCES departments(department_id),
    salary DECIMAL(10, 2),
    PRIMARY KEY (employee_id, department_id)  -- Composite primary key
);

-- 2. Insert the data provided into the tables
INSERT INTO employees (first_name, last_name, email, hire_date) VALUES
    ('Sarah', 'Connor', 'sarah.connor@example.com', '2023-01-05'),
    ('John', 'Doe', 'john.doe@example.com', '2022-03-12'),
    ('Jane', 'Smith', 'jane.smith@example.com', '2023-05-15');

INSERT INTO departments (department_name, department_head) VALUES
    ('Human Resources', 'Sarah Connor'),
    ('Engineering', 'John Doe'),
    ('Marketing', 'Jane Smith');

INSERT INTO salaries (employee_id, department_id, salary) VALUES
    (1, 1, 75000),
    (2, 2, 85000), 
    (3, 3, 70000);

-- 3. Write SELECT statements to do the following:
-- a) Retrieve the full names of all employees
SELECT first_name || ' ' || last_name AS full_name FROM employees;

-- b) Retrieve the department names which have an employee with a salary greater than $70,000
SELECT DISTINCT department_name
    FROM departments
    JOIN salaries ON departments.department_id = salaries.department_id
    WHERE salary > 70000;

-- c) Retrieve the department head of "Engineering"
SELECT department_head FROM departments WHERE department_name = 'Engineering';

-- 4. Increase Jane Smith's salary to $75,000
UPDATE salaries
    SET salary = 75000
    WHERE employee_id = (SELECT employee_id FROM employees WHERE first_name = 'Jane' AND last_name = 'Smith');

-- 5. Remove "John Doe" from the "Engineering" department
DELETE FROM salaries WHERE employee_id = (SELECT employee_id FROM employees WHERE first_name = 'John' AND last_name = 'Doe');
DELETE FROM employees WHERE first_name = 'John' AND last_name = 'Doe';
