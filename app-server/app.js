const express = require('express');
const env = require('env-var');
const cors = require('cors');
const bodyParser = require('body-parser');

const { createMysqlPool } = require('./database');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Extract configuration from environment variables
// and assert that the required configuration is present.
console.log("loading env vars");
require('dotenv').config();
const db_password = env.get('DB_PASSWORD').required().asString();
const db_host = env.get('DB_HOST').required().asString();
const db_user = env.get('DB_USER').required().asString();
const db_name = env.get('DB_NAME').required().asString();
const app_port = env.get('APP_PORT').required().asInt();

console.log("connecting to db");
const mysqlPool = createMysqlPool(db_host, db_user, db_password, db_name);

//CRUD for people table
app.get('/api/people', async (req, res) => {
    const query = `
    SELECT
      people.person_id,
      people.full_name,
      people.email,
      people.phone_number,
      people.is_admin
    FROM people
    ORDER BY people.person_id ASC;
    `;
    const result = await mysqlPool.query(query);
    res.send(JSON.stringify(result[0]));
});

app.post('/api/people', async (req, res) => {
    const query = `
    INSERT INTO people 
    (full_name, email, phone_number, is_admin) 
    VALUES 
    (?, ?, ?, ?);
    `;
    const { full_name, email, phone_number, is_admin} = req.body;
    const result = await mysqlPool.query(query, [full_name, email, phone_number, is_admin]);
    res.send(JSON.stringify(result[0]));
});

app.delete('/api/people/:person_id', async (req, res) => {
    const query = `
    DELETE FROM people
    WHERE people.person_id = ?;
    `;
    const result = await mysqlPool.query(query, req.params.person_id);
    res.send(JSON.stringify(result[0]));
});

app.put('/api/people/:person_id', async (req, res) => {
    const query = `
    UPDATE people SET
    full_name = ?,
    email = ?,
    phone_number = ?,
    is_admin = ?
    WHERE people.person_id = ?;
    `;
    const { full_name, email, phone_number, is_admin} = req.body;
    const result = await mysqlPool.query(query,
        [full_name, email, phone_number,is_admin, req.params.person_id]
    );
    res.send(JSON.stringify(result[0]));
});

//CRUD for vendors table
app.get('/api/vendors', async (req, res) => {
    const query = `
    SELECT
      vendors.vendor_id,
      vendors.business_name,
      vendors.website_url,
      people.full_name
    FROM vendors
    LEFT JOIN people
    ON vendors.people_id = people.person_id
    ORDER BY vendors.vendor_id ASC;
    `;
    const result = await mysqlPool.query(query);
    res.send(JSON.stringify(result[0]));
});

app.post('/api/vendors', async (req, res) => {
    const query = `
    INSERT INTO vendors 
    (business_name, website_url, person_id) 
    VALUES 
    (?, ?, ?);
    `;
    const { business_name, website_url, person_id} = req.body;
    const result = await mysqlPool.query(query, [business_name, website_url, person_id]);
    res.send(JSON.stringify(result[0]));
});

//CRUD for products table
app.get('/api/products', async (req, res) => {
    const query = `
    SELECT
      products.product_id,
      products.name,
      products.description,
      products.unit
    FROM products
    ORDER BY products.product_id ASC;
    `;
    const result = await mysqlPool.query(query);
    res.send(JSON.stringify(result[0]));
});

app.post('/api/products', async (req, res) => {
    const query = `
    INSERT INTO products 
    (name, description, unit) 
    VALUES 
    (?, ?, ?);
    `;
    const { name, description, unit} = req.body;
    const result = await mysqlPool.query(query, [name, description, unit]);
    res.send(JSON.stringify(result[0]));
});

app.delete('/api/products/:product_id', async (req, res) => {
    const query = `
    DELETE FROM products
    WHERE products.product_id = ?;
    `;
    const result = await mysqlPool.query(query, req.params.product_id);
    res.send(JSON.stringify(result[0]));
});

app.put('/api/products/:product_id', async (req, res) => {
    const query = `
    UPDATE products SET
    name = ?,
    description = ?,
    unit = ?
    WHERE products.product_id = ?;
    `;
    const { name, description, unit} = req.body;
    const result = await mysqlPool.query(query,
        [name, description, unit, req.params.product_id]
    );
    res.send(JSON.stringify(result[0]));
});
//CRUD for stocked_products table

//CRUD for locations table
app.get('/api/locations', async (req, res) => {
    const query = `
    SELECT
      locations.location_id,
      locations.name,
      locations.street_address,
      locations.has_parking,
      locations.contact_information,
    FROM locations
    ORDER BY locations.location_id ASC;
    `;
    const result = await mysqlPool.query(query);
    res.send(JSON.stringify(result[0]));
});
app.post('/api/locations', async (req, res) => {
    const query = `
    INSERT INTO locations 
    (name, street_address, has_parking, contact_information) 
    VALUES 
    (?, ?, ?, ?);
    `;
    const { name, street_address, has_parking, contact_information} = req.body;
    const result = await mysqlPool.query(query, [name, street_address, has_parking, contact_information]);
    res.send(JSON.stringify(result[0]));
});
//CRUD for events table

//CRUD for vendors_at_events table

app.listen(app_port, () => {
    console.log(`App listening on port ${app_port}`);
});