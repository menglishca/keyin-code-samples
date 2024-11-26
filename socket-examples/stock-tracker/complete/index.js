const express = require('express');
const expressWs = require('express-ws');
const path = require('path');

const app = express();
expressWs(app); // Enable WebSocket support

app.use(express.urlencoded({ extended: true })); // For form data
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

let stocks = ['AAPL', 'TSLA', 'MSFT']; // Initial stocks
const stockPrices = {
    AAPL: 150,
    TSLA: 800,
    MSFT: 300,
};

// Update stock prices periodically
setInterval(() => {
    Object.keys(stockPrices).forEach((stock) => {
        stockPrices[stock] += (Math.random() - 0.5) * 10; // Random price change
    });
    clientSockets.forEach((ws) => ws.send(JSON.stringify({ type: 'update', data: stockPrices })));
}, 2000);

const clientSockets = [];

// Route to render the main page
app.get('/', (request, response) => {
    response.render('index', { stocks });
});

// WebSocket route for stock updates
app.ws('/stocks', (socket) => {
    console.log('Client connected via WebSocket');
    clientSockets.push(socket);

    // Send initial stock prices
    socket.send(JSON.stringify({ type: 'update', data: stockPrices }));

    // Handle incoming messages from clients
    socket.on('message', (message) => {
        try {
            const { type, stock } = JSON.parse(message);

            if (type !== 'add-stock' || stock) {
                return;
            }

            const stockSymbol = stock.toUpperCase();
            if (stocks.includes(stockSymbol)) {
                return;
            }

            stocks.push(stockSymbol);
            stockPrices[stockSymbol] = Math.random() * 100; // Initialize random price

            // Notify all clients of the new stock
            clientSockets.forEach((client) => {
                if (client.readyState === socket.OPEN) {
                    client.send(
                        JSON.stringify({
                            type: 'new-stock',
                            data: { stock: stockSymbol, price: stockPrices[stockSymbol] },
                        })
                    );
                }
            });
            

        } catch (error) {
            console.error('Error processing message:', error.message);
        }
    });

    // Clean up on client disconnect
    socket.on('close', () => {
        console.log('Client disconnected');
        const index = clientSockets.indexOf(socket);
        if (index !== -1) {
            clientSockets.splice(index, 1);
        }
    });
});

// Start server
app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
