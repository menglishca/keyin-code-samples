const express = require('express');
const session = require('express-session');
const path = require('path');
const bcrypt = require('bcrypt');

const saltRounds = 10;
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


const users = [];

app.get('/register', (request, response) => {
    const errorMessage = request.query.error || null;
    return response.render('register', { errorMessage })
});

app.post('/register', (request, response) => {
    const { username, password } = request.body;
    if (users.find((user) => user.username === username)) {
      return response.status(400).render('register', {errorMessage: 'Username is taken'});
    }

    users.push({ username, password: bcrypt.hashSync(password, saltRounds) });
    return response.redirect('/');
});

app.get('/login', (request, response) => {
    const errorMessage = request.query.error || null;
    return response.render('login', { errorMessage })
});

app.post('/login', (request, response) => {
    const { username, password } = request.body;
    const user = users.find((user) => user.username === username);

    if (!!user && bcrypt.compareSync(password, user.password)) {
        request.session.username = username;
        return response.redirect('/');
    }

    return response.redirect('/login?error=Invalid username or password');
});

app.get('/', (request, response) => {
    const username = request.session.username;
    const errorMessage = request.query.error || null;
    response.render('index', { username, errorMessage });
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