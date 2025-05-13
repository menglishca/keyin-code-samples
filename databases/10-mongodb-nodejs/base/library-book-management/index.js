const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

let books = [
    { id: 1, title: 'Sample Book 1', author: 'Author A' },
    { id: 2, title: 'Sample Book 2', author: 'Author B' }
];

app.get('/books', (req, res) => {
    res.json(books);
});

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

app.get('/books/:id', (req, res) => {
    const { id } = req.params;
    const book = books.find(book => book.id === parseInt(id));

    if (!book) {
        return res.status(404).send('Book not found');
    }

    res.json(book);
});

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));