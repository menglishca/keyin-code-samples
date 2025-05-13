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
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL
            );
        `);
        console.log("Users table created successfully.");
    }
    catch (error) {
        console.error("Error creating users table:", error);
    }
}

// Helper function for basic data validation
function validateUserData(name, email) {
    if (!name || name.trim() === '') {
        return { isValid: false, message: 'Name is required and cannot be empty' };
    }
    if (!email || email.trim() === '') {
        return { isValid: false, message: 'A valid email is required' };
    }
    return { isValid: true };
}

// Endpoint to list all users
app.get('/users', async (request, response) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        response.json(result.rows);
    }
    catch (error) {
        console.error(error);
        response.status(500).send('Server error');
    }
});

// Endpoint to add a new user
app.post('/users', async (request, response) => {
    const { name, email } = request.body;
    const validation = validateUserData(name, email);

    if (!validation.isValid) {
        return response.status(400).json({ error: validation.message });
    }

    try {
        const result = await pool.query(
            'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
            [name, email]
        );
        response.status(201).json(result.rows[0]);
    }
    catch (error) {
        console.error(error);
        response.status(500).send('Server error');
    }
});

// Endpoint to update a user
app.put('/users/:id', async (request, response) => {
    const { id } = request.params;
    const { name, email } = request.body;
    const validation = validateUserData(name, email);

    if (!validation.isValid) {
        return response.status(400).json({ error: validation.message });
    }

    try {
        const result = await pool.query(
            'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
            [name, email, id]
        );
        if (result.rows.length === 0) {
            return response.status(404).send('User not found');
        }
        response.json(result.rows[0]);
    }
    catch (error) {
        console.error(error);
        response.status(500).send('Server error');
    }
});

// Endpoint to delete a user
app.delete('/users/:id', async (request, response) => {
    const { id } = request.params;
    try {
        const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return response.status(404).send('User not found');
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
