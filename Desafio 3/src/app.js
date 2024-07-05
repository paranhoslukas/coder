const express = require('express');
const app = express();

const ProductManager = require('./ProductManager');
const productManager = new ProductManager('./src/products.json');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/products", async (req, res) => {
    const products = await productManager.getProducts();

    let { limit } = req.query;

    if (!limit) {
         return res.status(200).json(products);
    }
    let limitedProducts = products.slice(0, parseInt(limit));
    return res.status(200).json(limitedProducts);
});

module.exports = app;