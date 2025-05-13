const express = require('express');
const path = require('path');

const app = express();

const cities = [
    'Toronto',
];

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

app.get('/', (request, response) => {
    response.render('index');
});

app.get('/weather', (request, response) => {
    const city = request.query.city;
    response.send(city);
})

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
