const express = require('express');
const { Pool } = require('pg');
const app = express();
const PORT = 3000;

// PostgreSQL connection
const pool = new Pool({
    user: 'postgres', //This _should_ be your username, as it's the default one Postgres uses
    host: 'localhost',
    database: 'keyin_test', //This should be changed to reflect your actual database
    password: 'Keyin123', //This should be changed to reflect the password you used when setting up Postgres
    port: 5432,
  });

// Middleware to parse JSON requests
app.use(express.json());

// Function to create users table
async function createUsersTable() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                price DECIMAL(10, 2) NOT NULL
            );
        `);
        console.log("Products table created successfully.");
    }
    catch (error) {
        console.error("Error creating products table:", error);
    }
}

// Helper function for data validation
const validateProduct = (name, price) => {
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
        return 'Product name is required and must be a non-empty string.';
    }
    if (!price || typeof price !== 'number' || price <= 0) {
        return 'Price must be a positive number.';
    }
    return null;
};

// Endpoint to list all products
app.get('/products', async (request, response) => {
    try {
        const result = await pool.query('SELECT * FROM products');
        response.json(result.rows);
    }
    catch (error) {
        console.error(error);
        response.status(500).send('Server error');
    }
});

// Endpoint to add a new product
app.post('/products', async (request, response) => {
    const { name, price } = request.body;

    // Validate product data
    const validationError = validateProduct(name, price);
    if (validationError) {
        return response.status(400).send(validationError);
    }

    try {
        const result = await pool.query(
            'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *',
            [name, price]
        );
        response.status(201).json(result.rows[0]);
    }
    catch (error) {
        console.error(error);
        response.status(500).send('Server error');
    }
});

// Endpoint to update a product
app.put('/products/:id', async (request, response) => {
    const { id } = request.params;
    const { name, price } = request.body;

    // Validate product data
    const validationError = validateProduct(name, price);
    if (validationError) {
        return response.status(400).send(validationError);
    }

    try {
        const result = await pool.query(
            'UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *',
            [name, price, id]
        );
        if (result.rows.length === 0) {
            return response.status(404).send('Product not found');
        }
        response.json(result.rows[0]);
    }
    catch (error) {
        console.error(error);
        response.status(500).send('Server error');
    }
});

// Endpoint to delete a product
app.delete('/products/:id', async (request, response) => {
    const { id } = request.params;

    try {
        const result = await pool.query(
            'DELETE FROM products WHERE id = $1 RETURNING *',
            [id]
        );
        if (result.rows.length === 0) {
            return response.status(404).send('Product not found');
        }
        response.status(204).send();
    }
    catch (error) {
        console.error(error);
        response.status(500).send('Server error');
    }
});

// Initialize database and start server
createUsersTable()
    .then(() => app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`)));