export function generateClientId() {
    return Math.random().toString(36).substring(2, 9);
}

export function sendNotificationToAllClients(clients, message) {
    clients.forEach((client) => {
        sendMessageToClient(client, message);
    });
}

export function sendToSpecificClient(clients, clientId, message) {
    const client = clients.get(clientId);
    sendMessageToClient(client, message);
}

export function sendMessageToClient(client, message) {
    if (client && client.readyState === 1) {
        client.send(JSON.stringify({ type: 'notification', message }));
    }
}