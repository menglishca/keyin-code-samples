const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

const MONGO_URI = 'mongodb://localhost:27017/your_database';
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    options: [
        {
            answer: {
                type: String,
                required: true,
            },
            votes: {
                type: Number,
                required: false,
            },
        }
    ]
});

const User = mongoose.model('User', userSchema);

mongoose.connect(MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Error connecting to MongoDB:", err));

app.use(express.json());

async function seedUsers() {
    try {
        const userCount = await User.countDocuments();
        if (userCount === 0) {
            await User.insertMany([
                {
                    name: '',
                    email: '',
                    options: [
                        {
                            answer: '',
                            votes: 0,
                        },
                        {
                            answer: '',
                            votes: 0,
                        }
                    ]
                }
            ]);
            await User.insertMany([
                { name: 'John Doe', email: 'john@example.com' },
                { name: 'Jane Smith', email: 'jane@example.com' }
            ]);
            console.log("Seeded users collection.");
        }
    }
    catch (err) {
        console.error("Error seeding users collection:", err);
    }
}

app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ error: 'Error retrieving users' });
    }
});

app.post('/users', async (req, res) => {
    try {
        const { name, email } = req.body;
        const newUser = new User({ name, email });
        await newUser.save();
        res.status(201).json(newUser);
    }
    catch (err) {
        res.status(400).json({ error: 'Error adding user', details: err.message });
    }
});

app.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, email },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).send('User not found');
        }

        res.json(updatedUser);
    }
    catch (err) {
        res.status(400).json({ error: 'Error updating user', details: err.message });
    }
});

app.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).send('User not found');
        }

        res.status(204).send();
    }
    catch (err) {
        res.status(500).json({ error: 'Error deleting user' });
    }
});

mongoose.connect(MONGO_URI)
    .seedUsers()
    .then(() => app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`)));
