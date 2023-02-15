import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'store_db'
});


app.get('/load_products', (req, res) => {
    const query_load_items = "SELECT * FROM products_v ORDER BY item_id,date_added ASC";
    db.query(query_load_items, (err, data) => {
        return err ? res.json(err) : data.length !== 0 && (res.json(data));
    });
});


app.get('/item/:search_product', (req, res) => {
    const query_find_item = "SELECT * FROM products_v WHERE CONCAT(item_id,item_serial,item_name,item_price,description,date_added) LIKE ? ORDER BY item_id,date_added ASC";
    const search = `%${req.params.search_product}%`
    db.query(query_find_item, [search], (err, data) => {
        return err ? res.json(err) : res.json(data);
    })
});

app.post('/add_product', (req, res) => {
    const values = [
        req.body.item_serial,
        req.body.item_name,
        req.body.item_price,
        req.body.description
    ];

    const find_existing_serial = "SELECT item_serial FROM product_item_table WHERE item_serial = ? LIMIT 1";
    db.query(find_existing_serial, [values[0]], (err, data) => {
        if (data.length == 1) {
            const response = { message: 'Product With Same Serial Already Exist', status: false };
            return res.json(response);
        } else {
            const query_add_product = "INSERT INTO product_item_table(item_serial,item_name,item_price,description) VALUES(?)";
            db.query(query_add_product, [values], (err) => {
                const data = { message: `Product ${values[0]}-${values[1]} Added Succesfully!`, status: true };
                return err ? res.json(err) : res.json(data);
            })
        }
    })

})

app.delete('/delete_product/:product_id', (req, res) => {
    const query_delete_product = "DELETE FROM product_item_table WHERE item_id = ? LIMIT 1";
    db.query(query_delete_product, [req.params.product_id], (err, data) => {
        const response = { message: `Product ${req.params.product_id} deleted`, status: true }
        const err_response = { message: `Product ${req.params.product_id} doesn't exist`, status: false };
        return err ? res.json(err) :
            data.length > 0 ?
                res.json(response) : res.json(err_response)
    });
})


app.listen(3307, () => {
    const newTime = new Date();
    console.log(`Updated @ ${newTime}`);
})