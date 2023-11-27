const Product = require('../models/productModel')



// GET ALL PRODUCTS
async function getProducts(req,res){
    try { 
        Product.getAll((error, products) => {
            {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(products));
            }
        });
    } 
    catch (error) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    }
}



// GET SINGLE PRODUCTS
async function getProduct(req, res, id) {
    try {
        const item = await Product.getById((error, product) => {
            if (error) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                return product;
            }
        }, id);

        if (!item) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Product Not Found' }));
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(item));
        }
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    }
}

// SET A NEW PRODUCT
async function setProduct(req,res){
    try { 
        const product = {
            name:"BMW X6",
            description:" high end car",
            price:"80.000"
        }
       const newProduct = Product.create(product)

       res.writeHead(201,{'Content-Type':'application/json'})
    } 
    catch (error) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    }
}

module.exports = {
    getProducts,
    getProduct,
    setProduct
}
