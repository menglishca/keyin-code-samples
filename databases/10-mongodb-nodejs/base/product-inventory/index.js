const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

let products = [
    { id: 1, name: 'Sample Product 1', price: 19.99 },
    { id: 2, name: 'Sample Product 2', price: 29.99 }
];

app.get('/products', (req, res) => {
    res.json(products);
});

app.post('/products', (req, res) => {
    const { name, price } = req.body;
    const newProduct = {
        id: products.length + 1,
        name,
        price
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

app.put('/products/:id', (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;
    const productIndex = products.findIndex(product => product.id === parseInt(id));

    if (productIndex === -1) {
        return res.status(404).send('Product not found');
    }

    products[productIndex] = { ...products[productIndex], name, price };
    res.json(products[productIndex]);
});

app.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    const productIndex = products.findIndex(product => product.id === parseInt(id));

    if (productIndex === -1) {
        return res.status(404).send('Product not found');
    }

    products.splice(productIndex, 1);
    res.status(204).send();
});

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));