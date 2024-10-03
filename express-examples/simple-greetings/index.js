const express = require('express');
const path = require('path');
const { getRandomGreeting } = require('./utils/greetingGenerator');

const port = 3000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

app.get('/', (request, response) => {
    response.render('index', { greeting: getRandomGreeting(), date: getFormattedDate(new Date())});
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

function getFormattedDate(date) {
    const options = { month: 'long', year: 'numeric', day: 'numeric' };
    const monthDayYear = date.toLocaleDateString('en-US', options);

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = String(minutes).padStart(2, '0');

    // Get the day suffix (st, nd, rd, th)
    const day = date.getDate();
    const suffix = (day) => {
        if (day % 10 === 1 && day !== 11) return 'st';
        if (day % 10 === 2 && day !== 12) return 'nd';
        if (day % 10 === 3 && day !== 13) return 'rd';
        return 'th';
    };

    return `${monthDayYear.replace(/(\d+)/, `$1${suffix(day)}`)} at ${formattedHours}:${formattedMinutes}${ampm}`;
}