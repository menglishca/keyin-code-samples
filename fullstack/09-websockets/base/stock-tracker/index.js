const express = require('express');
const expressWs = require('express-ws');
const path = require('path');

const app = express();
expressWs(app); // Enable WebSocket support

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

const clientSockets = [];
const stockPrices = {
    AAPL: 150,
    TSLA: 800,
    MSFT: 300,
};


// Route to render the main page
app.get('/', (request, response) => {
    response.render('index', { stocks: Object.keys(stockPrices) });
});

// WebSocket route for stock updates
app.ws('/stocks', (socket) => {
    
});

// Update stock prices periodically
setInterval(() => {
    Object.keys(stockPrices).forEach((stock) => {
        stockPrices[stock] += (Math.random() - 0.5) * 10;
    });
}, 2000);

// Start server
app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
