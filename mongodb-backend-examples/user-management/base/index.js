const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

app.get('/users', (req, res) => {
    res.json(users);
});

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

app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const userIndex = users.findIndex(user => user.id === parseInt(id));

    if (userIndex === -1) {
        return res.status(404).send('User not found');
    }

    users.splice(userIndex, 1);
    res.status(204).send();
});

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));