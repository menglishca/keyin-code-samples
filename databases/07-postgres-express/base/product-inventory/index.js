const express = require('express');

const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Placeholder data for products
let products = [
    { id: 1, name: 'Sample Product 1', price: 19.99 },
    { id: 2, name: 'Sample Product 2', price: 29.99 }
];

// Stub function to create products table
async function createProductsTable() {
    try {
        // TODO: Add SQL logic to create the products table in PostgreSQL
        console.log("Creating products table...");
    } catch (err) {
        console.error("Error creating users table:", err);
    }
}

// Endpoint to list all products
app.get('/products', (req, res) => {
    res.json(products);
});

// Endpoint to add a new product
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

// Endpoint to update a product
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

// Endpoint to delete a product
app.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    const productIndex = products.findIndex(product => product.id === parseInt(id));

    if (productIndex === -1) {
        return res.status(404).send('Product not found');
    }

    products.splice(productIndex, 1);
    res.status(204).send();
});

createProductsTable()
    .then(() => app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`)));