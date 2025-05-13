const ws = new WebSocket(`ws://${window.location.host}/notifications`);
const notificationList = document.getElementById('notification-list');
let userIdentifier = null;
let clientId = null;

ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === 'id') {
        clientId = data.clientId;
        console.log('Your client ID:', clientId);
    }
    if (data.type === 'notification') {
        const listItem = document.createElement('li');
        listItem.textContent = data.message;
        notificationList.appendChild(listItem);
    }
};

document.getElementById('set-identifier-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const identifierInput = document.getElementById('identifier');
    userIdentifier = identifierInput.value;
    ws.send(JSON.stringify({ type: 'set-identifier', identifier: userIdentifier }));
    identifierInput.disabled = true;
    e.target.querySelector('button').disabled = true;
});

document.getElementById('send-notification-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const notificationInput = document.getElementById('notification');
    const recipientSelect = document.getElementById('clientId');

    const message = notificationInput.value;
    const recipientId = recipientSelect.value;
    ws.send(JSON.stringify({ type: 'send-notification', recipientId, message }));
    notificationInput.value = '';
});
