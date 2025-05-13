const express = require('express');
const path = require('path');
const { getRandomWeatherReport } = require('./utils/weatherGenerator');

const app = express();

const cities = [
    'Toronto',
    'Montreal',
    'Edmonton',
    'Ottawa',
];

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

app.get('/', (request, response) => {
    response.render('index', {cities: cities} );
});

app.get('/weather', (request, response) => {
    const city = request.query.city;
    const weatherReport = getRandomWeatherReport();
    
    response.render('weather', { city: city, temperature: weatherReport.temperature, weatherCondition: weatherReport.weatherCondition});
})

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
