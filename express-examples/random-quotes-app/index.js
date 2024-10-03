const express = require('express');
const path = require('path');

const port = 3000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const quotes = [
    { id: 1, text: "The only way to do great work is to love what you do.", date: new Date('2024-03-31') },
    { id: 2, text: "Success is not final; failure is not fatal: It is the courage to continue that counts.", date: new Date() }
];

app.get('/', (request, response) => {
    response.redirect('/quotes');
});

app.get('/quotes', (request, response) => {
    response.render('index', { quotes: quotes });
});

app.post('/quotes', (request, response) => {
    const { quote } = request.body;
    const newQuote = {
        id: quotes.length + 1,
        text: quote,
        date: new Date()
    };
    quotes.push(newQuote);

    response.redirect('/quotes');
});

app.get('/quotes/new', (request, response) => {
    response.render('new');
});

app.get('/quotes/:id', (request, response) => {
    let { id } = request.params;
    try {
        id = parseInt(id, 10);
    }
    catch (exception) {
        response.status(404).send("Quote not found");
    }

    const foundQuote = quotes.find((quote) => quote.id === id);

    if (foundQuote) {
        response.render('quote', { quote: foundQuote });
    }
    else {
        response.status(404).send("Quote not found");
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
