const Product = require('../models/productModel')



// GET ALL PRODUCTS
async function getProducts(req,res){
    try {         Product.getAll((error, products) => {
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
};



// GET SINGLE PRODUCTS
async function getProduct(req, res, id) {
    try {
        const item = await new Promise((resolve, reject) => {
            Product.getById((error, product) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(product);
                }
            }, id);
        });

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


// CREATE A NEW PRODUCT
async function setProduct(req,res){
    try { 
        let body = ''
        req.on('data',(chunk) => {
            body += chunk.toString()
        })

        req.on('end', async () => {
            const {name,description,price} = JSON.parse(body)

            const product = {
              name,
              description,
              price
            }

            const newProduct = await Product.create(product)

            res.writeHead(201,{'Content-Type':'application/json'})
            return res.end(JSON.stringify(newProduct));
        } )

       
    } 
    catch (error) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    }
};

async function updateProduct(req, res, id) {
    try {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            try {
                const { name, description, price } = JSON.parse(body);

                const productData = {
                    name,
                    description,
                    price,
                };

                const updatedProduct = await Product.update(id, productData);

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(updatedProduct));
            } catch (error) {
                console.error('Error during updateProduct:', error);
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('Invalid JSON format');
            }
        });
    } catch (error) {
        console.error('Error during updateProduct:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    }
}

async function deleteProduct(req,res,id){
    try {
        const item = await new Promise((resolve, reject) => {
            Product.deleteItem((error, product) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(product);
                }
            }, id);
        });

        if (!item) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Product Not Found' }));
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(item,{message: `Product ${id} removed`}));
        }
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    } 
}


module.exports = {
    getProducts,
    getProduct,
    setProduct,
    updateProduct,
    deleteProduct

};
