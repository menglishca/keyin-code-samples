const socket = new WebSocket('ws://' + window.location.host + '/stocks');

const stocksList = document.getElementById('stocks');
const stockForm = document.getElementById('stock-form');
const stockInput = document.getElementById('stock');

const updateStocksUi = (stockName, stockPrice) => {
    let stockElement = document.getElementById(stockName);
    if (!stockElement) {
        stockElement = document.createElement('li');
        stockElement.id = stock;
        stockElement.innerHTML = `${stockName}: <span></span>`;
        stocksList.appendChild(stockElement);
    }
    stockElement.querySelector('span').textContent = `$${stockPrice.toFixed(2)}`;
};

socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);

    if (message.type === 'update') {
        for (const [stock, price] of Object.entries(message.data)) {
            updateStocksUi(stock, price);
        }
    }
    else if (message.type === 'new-stock') {
        const { stock, price } = message.data;
        updateStocksUi(stock, price);
    }
});

stockForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const stock = stockInput.value.trim().toUpperCase();
    if (stock) {
        socket.send(JSON.stringify({ type: 'add-stock', stock }));
        stockInput.value = '';
    }
});