const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

const MONGO_URI = 'mongodb://localhost:27017/keyin_test';

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true }
});

const Book = mongoose.model('Book', bookSchema);

app.use(express.json());

app.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

app.post('/books', async (req, res) => {
    const { title, author } = req.body;
    try {
        const newBook = new Book({ title, author });
        await newBook.save();
        res.status(201).json(newBook);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

app.put('/books/:id', async (req, res) => {
    const { id } = req.params;
    const { title, author } = req.body;
    try {
        const updatedBook = await Book.findByIdAndUpdate(
            id,
            { title, author },
            { new: true, runValidators: true }
        );
        if (!updatedBook) {
            return res.status(404).send('Book not found');
        }
        res.json(updatedBook);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

app.get('/books/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).send('Book not found');
        }
        res.json(book);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});


mongoose.connect(MONGO_URI)
    .then(() => app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`)))
    .catch(err => console.error("Error connecting to MongoDB:", err));
