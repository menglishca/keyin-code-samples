const express = require('express');
const { Pool } = require('pg');
const app = express();
const PORT = 3000;

// PostgreSQL connection pool
const pool = new Pool({
    user: 'your_username',
    host: 'localhost',
    database: 'your_database',
    password: 'your_password',
    port: 5432,
});

// Middleware to parse JSON requests
app.use(express.json());

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
app.get('/products', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Endpoint to add a new product
app.post('/products', async (req, res) => {
    const { name, price } = req.body;

    // Validate product data
    const validationError = validateProduct(name, price);
    if (validationError) {
        return res.status(400).send(validationError);
    }

    try {
        const result = await pool.query(
            'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *',
            [name, price]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Endpoint to update a product
app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;

    // Validate product data
    const validationError = validateProduct(name, price);
    if (validationError) {
        return res.status(400).send(validationError);
    }

    try {
        const result = await pool.query(
            'UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *',
            [name, price, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).send('Product not found');
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Endpoint to delete a product
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            'DELETE FROM products WHERE id = $1 RETURNING *',
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).send('Product not found');
        }
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});