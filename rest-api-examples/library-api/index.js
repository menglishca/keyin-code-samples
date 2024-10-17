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
    const { author } = request.query;

    let filteredBooks = books;
    if (author) {
        filteredBooks = books.filter((book) => book.author === author);
    }

    return response.json(filteredBooks);
});

// POST /books
// Adds a new book to the library. Expects title, author, and availableCopies in the request body.
app.post('/books', (request, response) => {
    const { title, author, availableCopies} = request.body;

    if (!title || !author || !availableCopies) {
        //Send back a 400 because the client sent a bad request
        return response.status(400)
            .json({message: 'Title, author, and availableCopies are required'});
    }

    const newBook = {
        id: books.length + 1,
        title,
        author,
        availableCopies
    };
    
    books.push(newBook);
    //Send back a 201 because the resource was created
    return response.status(201).json(newBook);
});

// GET /books/:id
// Returns a specific book by its ID.
app.get('/books/:id', (request, response) => {
    let bookId;
    try {
        bookId = parseInt(request.params.id);
    }
    catch (error) {
        console.error(error);
        return response.status(500).json({message: 'Error parsing the ID'});
    }

    const book = books.filter((book) => book.id === bookId);
    if (!book) {
        return response.status(404).json({message: 'Book not found'});
    }

    return response.json(book);
});

// PUT /books/:id
// Updates a book's details by its ID. Expects title, author, and availableCopies in the request body.
app.put('/books/:id', (request, response) => {
    const bookId = parseInt(request.params.id);
    const { title, author, availableCopies } = request.body;
  
    const bookIndex = books.findIndex((book) => book.id === bookId);
  
    if (bookIndex === -1) {
      return response.status(404).json({ message: 'Book not found' });
    }
  
    if (!title || !author || !availableCopies) {
      return response.status(400).json({ message: 'Title, author, and availableCopies are required' });
    }
  
    books[bookIndex] = { id: bookId, title: title, author: author, availableCopies: availableCopies };
    return response.json(books[bookIndex]);
});

// DELETE /books/:id
// Deletes a book by its ID.
app.delete('/books/:id', (request, response) => {
    const bookId = parseInt(request.params.id);
    const bookIndex = books.findIndex((book) => book.id === bookId);
  
    if (bookIndex === -1) {
      return response.status(404).json({ message: 'Book not found' });
    }
  
    books.splice(bookIndex, 1);
    return response.status(200).json({message: 'Book deleted'});
});

// GET /users
// Returns all users registered in the library.
app.get('/users', (request, response) => {
    response.json(users);
});

// POST /users
// Adds a new user to the library system. Expects name and email in the request body.
app.post('/users', (request, response) => {
    const { name, email } = request.body;

    if (!name || !email) {
        return response.status(400).json({ message: 'Name and email are required' });
    }

    const newUser = {
        id: users.length + 1,
        name,
        email,
        borrowedBooks: []
    };

    users.push(newUser);
    response.status(201).json(newUser);
});

// GET /users/:id
// Returns details of a specific user by their ID.
app.get('/users/:id', (request, response) => {
    const userId = parseInt(request.params.id);
    const user = users.find((user) => user.id === userId);

    if (!user) {
        return response.status(404).json({ message: 'User not found' });
    }

    response.json(user);
});

// PUT /users/:id
// Updates a user’s information by their ID. Expects name and email in the request body.
app.put('/users/:id', (request, response) => {
    const userId = parseInt(request.params.id);
    const { name, email } = request.body;

    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
        return response.status(404).json({ message: 'User not found' });
    }

    if (!name || !email) {
        return response.status(400).json({ message: 'Name and email are required' });
    }

    users[userIndex] = { id: userId, name, email, borrowedBooks: users[userIndex].borrowedBooks };
    response.json(users[userIndex]);
});

// DELETE /users/:id
// Removes a user from the library system by their ID.
app.delete('/users/:id', (request, response) => {
    const userId = parseInt(request.params.id);
    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
        return response.status(404).json({ message: 'User not found' });
    }

    users.splice(userIndex, 1);
    response.status(204).send();
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});