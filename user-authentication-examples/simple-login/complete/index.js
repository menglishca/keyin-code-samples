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
    const { username, password } = request.body;
    const user = users.find((user) => user.username === username);
    if (!!user && password === user.password) {
        request.session.username = username;
        return response.redirect('/');
    }

    return response.redirect('/?error=Invalid username or password');
});

app.get('/', (request, response) => {
    const username = request.session.username;
    const errorMessage = request.query.error || null;
    response.render('index', { username, errorMessage });
});

app.get('/dashboard', (request, response) => {
    if (!request.session.username) {
        return response.redirect('/?error=You must be logged in to do that.');
    }

    return response.render('dashboard', {username: request.session.username});
});

app.post('/logout', (request, response) => {
    request.session.destroy((error) => {
        if (error) {
            return response.status(500).send('Failed to log out.');
        }
        response.redirect('/');
    });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
