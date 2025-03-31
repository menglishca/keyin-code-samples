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
            CREATE TABLE IF NOT EXISTS books (
                id SERIAL PRIMARY KEY,
                title TEXT NOT NULL,
                author TEXT NOT NULL
            );
        `);
        console.log("Users table created successfully.");
    }
    catch (error) {
        console.error("Error creating users table:", error);
    }
}

// Endpoint to list all books
app.get('/books', async (request, response) => {
    try {
        const result = await pool.query('SELECT * FROM books');
        response.json(result.rows);
    }
    catch (error) {
        console.error(error);
        response.status(500).send('Server error');
    }
});

// Endpoint to add a new book
app.post('/books', async (request, response) => {
    const { title, author } = request.body;
    try {
        const result = await pool.query('INSERT INTO books (title, author) VALUES ($1, $2) RETURNING *', [title, author]);
        response.status(201).json(result.rows[0]);
    }
    catch (error) {
        console.error(error);
        response.status(500).send('Server error');
    }
});

// Endpoint to update a book
app.put('/books/:id', async (request, response) => {
    const { id } = request.params;
    const { title, author } = request.body;
    try {
        const result = await pool.query('UPDATE books SET title = $1, author = $2 WHERE id = $3 RETURNING *', [title, author, id]);
        if (result.rows.length === 0) {
            return response.status(404).send('Book not found');
        }
        response.json(result.rows[0]);
    }
    catch (error) {
        console.error(error);
        response.status(500).send('Server error');
    }
});

// Endpoint to retrieve a book by ID
app.get('/books/:id', async (request, response) => {
    const { id } = request.params;
    try {
        const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return response.status(404).send('Book not found');
        }
        response.json(result.rows[0]);
    }
    catch (error) {
        console.error(error);
        response.status(500).send('Server error');
    }
});

// Initialize database and start server
createUsersTable()
    .then(() => app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`)));
