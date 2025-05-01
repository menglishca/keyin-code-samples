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

// Placeholder data instead of a database (for now)
let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

// Stub function to create users table
async function createUsersTable() {
    try {
        // TODO: Add SQL logic to create the users table in PostgreSQL
        console.log("Creating users table...");
    } catch (err) {
        console.error("Error creating users table:", err);
    }
}

// Endpoint to list all users
app.get('/users', (req, res) => {
    res.json(users);
});

// Endpoint to add a new user
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    const newUser = {
        id: users.length + 1,
        name,
        email
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// Endpoint to update a user
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const userIndex = users.findIndex(user => user.id === parseInt(id));

    if (userIndex === -1) {
        return res.status(404).send('User not found');
    }

    users[userIndex] = { ...users[userIndex], name, email };
    res.json(users[userIndex]);
});

// Endpoint to delete a user
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const userIndex = users.findIndex(user => user.id === parseInt(id));

    if (userIndex === -1) {
        return res.status(404).send('User not found');
    }

    users.splice(userIndex, 1);
    res.status(204).send();
});

createUsersTable()
    .then(() => app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`)));