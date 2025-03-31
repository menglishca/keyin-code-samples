const express = require('express');
const expressWs = require('express-ws');
const path = require('path');
const { generateClientId, sendNotificationToAllClients, sendMessageToClient } = require('./utilities');

const app = express();
expressWs(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

const clients = new Map();

app.ws('/notifications', (socket) => {
    const clientId = generateClientId();
    clients.set(clientId, socket);
});

app.get('/', (request, response) => {
    response.render('index', { clients: Array.from(clients.keys()) });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));