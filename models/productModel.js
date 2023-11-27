const mysql = require('mysql2');
const {v4: uuid} = require('uuid')

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
// Get by ID
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
}

function create(product){
    return new Promise((resolve,reject)=>{
        const newProduct = {id:uuid(), ...product}
        connection.query(`INSERT ${newProduct} FROM product`)
        resolve(newProduct)
    })

}

module.exports = {
    getAll,
    getById,
    create
};
