-- Example 4: E-Commerce Order Management System
-- You're tasked with creating an E-Commerce Order Management System to manage customers, products, orders, and order details. Using PostgreSQL and pgAdmin, build the system step-by-step.

-- 1. Create the tables to store all of this data
CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    address TEXT,
    city TEXT,
    country TEXT
);

CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    product_name TEXT,
    description TEXT,
    price DECIMAL(10, 2),
    stock_quantity INT
);

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customers(customer_id),
    order_date DATE,
    total_amount DECIMAL(10, 2)
);

CREATE TABLE order_details (
    order_detail_id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(order_id),
    product_id INT REFERENCES products(product_id),
    quantity INT,
    line_total DECIMAL(10, 2)
);

-- 2. Insert the data provided into the tables
INSERT INTO customers (first_name, last_name, email, address, city, country) VALUES
    ('Emily', 'Brown', 'emily.brown@example.com', '1234 Elm Street', 'New York', 'USA'),
    ('Michael', 'Green', 'michael.green@example.com', '5678 Maple Avenue', 'Los Angeles', 'USA'),
    ('Sarah', 'White', 'sarah.white@example.com', '246 Oak Street', 'London', 'UK');

INSERT INTO products (product_name, description, price, stock_quantity) VALUES
    ('Laptop', '15" gaming laptop', 1500, 20),
    ('Smartphone', 'Latest model', 800, 50),
    ('Headphones', 'Wireless headset', 100, 100);

INSERT INTO orders (customer_id, order_date, total_amount) VALUES
    (1, '2024-09-01', 2400),
    (2, '2024-09-05', 800);

INSERT INTO order_details (order_id, product_id, quantity, line_total) VALUES
    (1, 1, 1, 1500),
    (1, 3, 3, 300),
    (2, 2, 1, 800);

-- 3. Write SELECT statements to do the following:
-- a) Retrieve the full names of all customers
SELECT first_name || ' ' || last_name AS full_name FROM customers;

-- b) Retrieve the products purchased by "Emily Brown"
SELECT product_name FROM products
    JOIN order_details ON products.product_id = order_details.product_id
    JOIN orders ON order_details.order_id = orders.order_id
    JOIN customers ON orders.customer_id = customers.customer_id
    WHERE customers.first_name = 'Emily' AND customers.last_name = 'Brown';

-- c) Retrieve all customers who ordered a product costing more than $1,000
SELECT first_name, last_name FROM customers
    JOIN orders ON customers.customer_id = orders.customer_id
    JOIN order_details ON orders.order_id = order_details.order_id
    JOIN products ON order_details.product_id = products.product_id
    WHERE products.price > 1000;

-- 4. Update the stock quantity for "Headphones" after Emily Brown's purchase
UPDATE products
    SET stock_quantity = stock_quantity - 3
    WHERE product_name = 'Headphones';

-- 5. Cancel Michael Green’s order by deleting all order details and the corresponding order
DELETE FROM order_details WHERE order_id = (SELECT order_id FROM orders WHERE customer_id = (SELECT customer_id FROM customers WHERE first_name = 'Michael' AND last_name = 'Green'));
DELETE FROM orders WHERE customer_id = (SELECT customer_id FROM customers WHERE first_name = 'Michael' AND last_name = 'Green');
