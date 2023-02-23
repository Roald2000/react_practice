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
    // ? Im fetching from a view table in MySQL that I made for less queries more results, hehe
    const query_load_items = "SELECT * FROM products_v ORDER BY item_id,date_added ASC";
    db.query(query_load_items, (err, data) => {
        return err ? res.json(err) : data.length !== 0 && (res.json(data));
    });
});


app.get('/item/:search_product', (req, res) => {
    // ? Im fetching from a view table in MySQL that I made for less queries more results, hehe
    const query_find_item = "SELECT * FROM products_v WHERE CONCAT(item_id,item_serial,item_name,item_price,description,date_added) LIKE ? ORDER BY item_id,date_added ASC";
    const search = `%${req.params.search_product}%`
    db.query(query_find_item, [search], (err, data) => {
        return err ? res.json(err) : res.json(data);
    })
});

app.get('/find_item/:id', (req, res) => {
    const query_find_product_id = "SELECT * FROM products_v WHERE item_id = ? LIMIT 1";
    db.query(query_find_product_id, [req.params.id], (err, data) => {
        return err ? res.json(err) : res.json(data);
    });
});


app.get('/find_item_serial/:serial', (req, res) => {
    const query_find_product_serial = "SELECT * FROM products_v WHERE item_serial = ? LIMIT 1";
    db.query(query_find_product_serial, [req.params.serial], (err, data) => {
        return data.length > 0 ? (err ? res.json(err) : res.json(data)) : res.json({ message: "Invalid Serial Code", status: false });
    });
});

app.post('/add_order', (req, res) => {
    const orders = [
        req.body.customer_name,
        req.body.item_serial,
        0
    ];

    function addOrder() {
        const add_order = "INSERT INTO order_list_table(customer_name,item_serial,is_ordered) VALUES(?)"
        db.query(add_order, [orders], (err_order, data_order) => {
            return err_order ? res.json(err) : res.json({ message: "Item Added to Ordered List", status: true });
        });
    }

    const validate_item = "SELECT item_serial FROM products_v WHERE item_serial = ? LIMIT 1";
    db.query(validate_item, [orders[1]], (err, validate_data) => {
        return err ? res.json(err) :
            validate_data.length > 0 ? addOrder() : res.json({ message: "Invalid Serial Number", status: false })
    })
})

app.get('/customer_orders/:customer', (req, res) => {
    const fetch_customer_orders = "SELECT * FROM orders_v_grouped_is_not_ordered WHERE customer_name = ?";
    db.query(fetch_customer_orders, [req.params.customer], (err, data) => {
        return err ? res.json(err) : data.length > 0 && res.json(data);
    })
})

app.put('/update_item/:update_id', (req, res) => {
    const update_value = [
        req.body.item_serial,
        req.body.item_name,
        req.body.item_price,
        req.body.description
    ];
    const update_id = req.params.update_id;
    const query_update = "UPDATE product_item_table SET item_serial = ?, item_name = ?, item_price = ?, description = ? WHERE item_id = ? LIMIT 1";
    db.query(query_update, [...update_value, update_id], (err, data) => {
        return err ? res.json(err) : res.json({ message: `Item 'ID : ${update_id} / Serial : ${update_value[0]}' has been updated succesfully!` });
    })
})

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
});



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
    console.log(`Updated @`, `${newTime}`);
})