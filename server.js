const http = require('http');
const productController = require('./controller/productController')
const productModel = require('./models/productModel');
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    if (req.url === '/products' && req.method === 'GET') {
        productController.getProducts(req, res);
        
    } else if (req.url.match(/\/products\/([0-9]+)/) && req.method === 'GET') {
        const getId = req.url.split('/')[2];
        const id = getId.toString();
        productController.getProduct(req, res, id);

    } else if (req.url === '/products' && req.method === 'POST') {
        productController.setProduct(req, res);

    } else if (req.url.match(/\/products\/([0-9]+)/) && req.method === 'PUT') {
        const getId = req.url.split('/')[2];
        const id = getId.toString();
        productController.updateProduct(req, res, id);

    }else if (req.url.match(/\/products\/([0-9]+)/) && req.method === 'DELETE') {
        const getId = req.url.split('/')[2];
        const id = getId.toString();
        productController.deleteProduct(req, res, id);

    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Address not Found' }));
    }
});


server.listen(PORT, () => console.log(`Server running on port ${PORT}`));