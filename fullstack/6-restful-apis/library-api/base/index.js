const express = require('express');
const app = express();
const PORT = 3000;

// Sample data for the library
let books = [
    { id: 1, title: '1984', author: 'George Orwell', availableCopies: 3 },
    { id: 2, title: 'Brave New World', author: 'Aldous Huxley', availableCopies: 5 },
    { id: 3, title: 'Fahrenheit 451', author: 'Ray Bradbury', availableCopies: 4 },
    { id: 4, title: 'The Catcher in the Rye', author: 'J.D. Salinger', availableCopies: 2 },
    { id: 5, title: 'To Kill a Mockingbird', author: 'Harper Lee', availableCopies: 6 }
];

let users = [
    { id: 1, name: 'Alice', email: 'alice@example.com', borrowedBooks: [] },
    { id: 2, name: 'Bob', email: 'bob@example.com', borrowedBooks: [] },
    { id: 3, name: 'Charlie', email: 'charlie@example.com', borrowedBooks: [] },
    { id: 4, name: 'Dave', email: 'dave@example.com', borrowedBooks: [] },
    { id: 5, name: 'Eve', email: 'eve@example.com', borrowedBooks: [] }
];

// Middleware to parse JSON request bodies
app.use(express.json());

// GET /books
// Returns all books in the library. Optionally, can filter by author using a query parameter.
app.get('/books', (request, response) => {
    response.json(books);
});

// POST /books
// Adds a new book to the library. Expects title, author, and availableCopies in the request body.
app.post('/books', (request, response) => {

});

// GET /books/:id
// Returns a specific book by its ID.
app.get('/books/:id', (request, response) => {

});

// PUT /books/:id
// Updates a book's details by its ID. Expects title, author, and availableCopies in the request body.
app.put('/books/:id', (request, response) => {

});

// DELETE /books/:id
// Deletes a book by its ID.
app.delete('/books/:id', (request, response) => {

});

// GET /users/:userId/books
// Gets all books the specified user has checked out
app.get('/users/:userId/books', (request, response) => {

});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});