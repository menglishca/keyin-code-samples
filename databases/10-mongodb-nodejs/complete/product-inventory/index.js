const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

const MONGO_URI = 'mongodb://localhost:27017/keyin_test';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0.01 }
});
const Product = mongoose.model('Product', productSchema);

app.use(express.json());

const validateProduct = (name, price) => {
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
        return 'Product name is required and must be a non-empty string.';
    }
    if (!price || typeof price !== 'number' || price <= 0) {
        return 'Price must be a positive number.';
    }
    return null;
};

app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

app.post('/products', async (req, res) => {
    const { name, price } = req.body;

    const validationError = validateProduct(name, price);
    if (validationError) {
        return res.status(400).send(validationError);
    }

    try {
        const newProduct = new Product({ name, price });
        await newProduct.save();
        res.status(201).json(newProduct);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;

    const validationError = validateProduct(name, price);
    if (validationError) {
        return res.status(400).send(validationError);
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, price },
            { new: true, runValidators: true }
        );
        if (!updatedProduct) {
            return res.status(404).send('Product not found');
        }
        res.json(updatedProduct);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).send('Product not found');
        }
        res.status(204).send();
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

mongoose.connect(MONGO_URI)
    .then(() => app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`)))
    .catch(err => console.error("Error connecting to MongoDB:", err));
