const mysql = require('mysql2');
// Increase the maximum number of listeners
require('events').EventEmitter.defaultMaxListeners = 15;



const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adim',
    database: 'products'
});

// Get all products from the database
async function getAll(callback) {
    connection.query('SELECT * FROM product', (error, results) => {
        if (error) {
            console.error(error);
            return callback(error, null);
        } else {
            callback(null, results);
        }
    });
}

// Get a product by ID
async function getById(callback,id) {
    connection.query('SELECT * FROM product WHERE id = ?',[id], (error, results) => {
        if (error) {
            console.error(error);
            return callback(error, null);
        } else {
            const item = results.length > 0 ? results[0] : null;
            callback(null, item);
        }
    });
};

//Create a new Product in data base
function create(product) {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO product SET ?', product, (error, results) => {
            if (error) {
                console.error(error);
                reject(error);
            } else {
                resolve(product);
            }
        });
    });
};


// Update the value of a product
function update(id) {
    return new Promise((resolve, reject) => {
        connection.query('UPDATE product SET ? WHERE id = ?', [id], (error, results) => {
            if (error) {
                console.error(error);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

function deleteItem (id,product){
    return new Promise((resolve,reject) => {
        connection.query('DELETE FROM product WHERE id = ?',[product, id], (error, results) => {
            if (error) {
                console.error(error);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });

}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteItem
};
