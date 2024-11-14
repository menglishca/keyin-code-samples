const express = require('express');

const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Placeholder data for books
let books = [
    { id: 1, title: 'Sample Book 1', author: 'Author A' },
    { id: 2, title: 'Sample Book 2', author: 'Author B' }
];

// Stub function to create books table
async function createBooksTable() {
    try {
        // TODO: Add SQL logic to create the books table in PostgreSQL
        console.log("Creating books table...");
    } catch (err) {
        console.error("Error creating users table:", err);
    }
}

// Endpoint to list all books
app.get('/books', (req, res) => {
    res.json(books);
});

// Endpoint to add a new book
app.post('/books', (req, res) => {
    const { title, author } = req.body;
    const newBook = {
        id: books.length + 1,
        title,
        author
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

// Endpoint to update a book
app.put('/books/:id', (req, res) => {
    const { id } = req.params;
    const { title, author } = req.body;
    const bookIndex = books.findIndex(book => book.id === parseInt(id));

    if (bookIndex === -1) {
        return res.status(404).send('Book not found');
    }

    books[bookIndex] = { ...books[bookIndex], title, author };
    res.json(books[bookIndex]);
});

// Endpoint to retrieve a book by ID
app.get('/books/:id', (req, res) => {
    const { id } = req.params;
    const book = books.find(book => book.id === parseInt(id));

    if (!book) {
        return res.status(404).send('Book not found');
    }

    res.json(book);
});

createBooksTable()
    .then(() => app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`)));