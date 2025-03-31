const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true })); // to parse form data
app.use(session({
  secret: 'supersecretkey',
  resave: false,
  saveUninitialized: false,
}));

// Fake user data for demonstration purposes
const users = [
    { username: 'testuser', password: 'password123' }
];

app.post('/login', (request, response) => {
    return response.redirect('/');
});

app.get('/', (request, response) => {
    const username = null;
    const errorMessage = null;
    response.render('index', { username, errorMessage });
});

app.post('/logout', (request, response) => {
    return response.redirect('/');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
