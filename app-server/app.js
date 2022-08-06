const express = require('express');
const env = require('env-var');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const { createMysqlPool } = require('./database');
const app = express();

app.use(cors());
app.use(bodyParser.json());
const reactAppPath = path.join(__dirname, 'public/');
app.use(express.static(reactAppPath));

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
app.get('/api/people', async (req, res, next) => {
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
    try {
        const result = await mysqlPool.query(query);
        res.send(JSON.stringify(result[0]));
    } catch (e) {
        next(e);
    }
});

app.post('/api/people', async (req, res, next) => {
    const query = `
    INSERT INTO people 
    (full_name, email, phone_number, is_admin) 
    VALUES 
    (?, ?, ?, ?);
    `;
    const { full_name, email, phone_number, is_admin } = req.body;
    try {
        const result = await mysqlPool.query(query, [full_name, email, phone_number, is_admin]);
        res.send(JSON.stringify(result[0]));
    } catch (e) {
        next(e);
    }
});

app.delete('/api/people/:person_id', async (req, res, next) => {
    const query = `
    DELETE FROM people
    WHERE people.person_id = ?;
    `;
    try {
        const result = await mysqlPool.query(query, req.params.person_id);
        res.send(JSON.stringify(result[0]));
    } catch (e) {
        next(e);
    }
});

app.put('/api/people/:person_id', async (req, res, next) => {
    const query = `
    UPDATE people SET
    full_name = ?,
    email = ?,
    phone_number = ?,
    is_admin = ?
    WHERE people.person_id = ?;
    `;
    const { full_name, email, phone_number, is_admin } = req.body;
    try {
        const result = await mysqlPool.query(query,
            [full_name, email, phone_number, is_admin, req.params.person_id]
        );
        res.send(JSON.stringify(result[0]));
    } catch (e) {
        next(e);
    }
});

//CRUD for vendors table
app.get('/api/vendors', async (req, res, next) => {
    const query = `
    SELECT 
      vendors.vendor_id,
      vendors.business_name,
      vendors.website_url,
      people.full_name
    FROM vendors
    LEFT JOIN people
    ON vendors.person_id = people.person_id
    ORDER BY vendors.vendor_id ASC;
    `;
    try {
        const result = await mysqlPool.query(query);
        res.send(JSON.stringify(result[0]));
    } catch (e) {
        next(e);
    }
});

app.post('/api/vendors', async (req, res, next) => {
    const query = `
    INSERT INTO vendors 
    (business_name, website_url, person_id) 
    VALUES 
    (?, ?, ?);
    `;
    let { business_name, website_url, person_id } = req.body;
    person_id = person_id === "Null" ? null : person_id
    try {
        const result = await mysqlPool.query(query, [business_name, website_url, person_id]);
        res.send(JSON.stringify(result[0]));
    } catch (e) {
        next(e);
    }
});

//CRUD for products table
app.get('/api/products', async (req, res, next) => {
    const query = `
    SELECT
      products.product_id,
      products.name,
      products.description,
      products.unit
    FROM products
    ORDER BY products.product_id ASC;
    `;
    try {
        const result = await mysqlPool.query(query);
        res.send(JSON.stringify(result[0]));
    } catch (e) {
        next(e);
    }
});

app.post('/api/products', async (req, res, next) => {
    const query = `
    INSERT INTO products 
    (name, description, unit) 
    VALUES 
    (?, ?, ?);
    `;
    const { name, description, unit } = req.body;
    try {
        const result = await mysqlPool.query(query, [name, description, unit]);
        res.send(JSON.stringify(result[0]));
    } catch (e) {
        next(e);
    }
});

app.delete('/api/products/:product_id', async (req, res, next) => {
    const query = `
    DELETE FROM products
    WHERE products.product_id = ?;
    `;
    try {
        const result = await mysqlPool.query(query, req.params.product_id);
        res.send(JSON.stringify(result[0]));
    } catch (e) {
        next(e);
    }
});

app.put('/api/products/:product_id', async (req, res) => {
    const query = `
    UPDATE products SET
    name = ?,
    description = ?,
    unit = ?
    WHERE products.product_id = ?;
    `;
    const { name, description, unit } = req.body;
    try {
        const result = await mysqlPool.query(query,
            [name, description, unit, req.params.product_id]
        );
        res.send(JSON.stringify(result[0]));
    } catch (e) {
        next(e);
    }
});

//CRUD for stocked_products table
app.get('/api/stocked_products', async (req, res, next) => {
    const query = `
    SELECT
      stocked_products.stocked_product_id,
      vendors.business_name,
      products.name,
      stocked_products.unit_price_cent,
      products.unit
    FROM stocked_products
    LEFT JOIN vendors
    ON stocked_products.vendor_id = vendors.vendor_id
    LEFT JOIN products
    ON stocked_products.product_id = products.product_id
    ORDER BY stocked_products.stocked_product_id ASC;
    `;
    try {
        const result = await mysqlPool.query(query);
        res.send(JSON.stringify(result[0]));
    } catch (e) {
        next(e);
    }
});

app.post('/api/stocked_products', async (req, res, next) => {
    const query = `
    INSERT INTO stocked_products 
    (vendor_id, product_id, unit_price_cent) 
    VALUES 
    (?, ?, ?);
    `;
    const { vendor_id, product_id, unit_price_cent } = req.body;
    try {
        const result = await mysqlPool.query(query, [vendor_id, product_id, unit_price_cent]);
        res.send(JSON.stringify(result[0]));
    } catch (e) {
        next(e);
    }
});

//CRUD for locations table
app.get('/api/locations', async (req, res, next) => {
    const query = `
    SELECT * FROM locations
    ORDER BY locations.location_id ASC;
    `;
    try {
        const result = await mysqlPool.query(query);
        res.send(JSON.stringify(result[0]));
    } catch (e) {
        next(e);
    }
});

app.post('/api/locations', async (req, res, next) => {
    const query = `
    INSERT INTO locations 
    (name, street_address, has_parking, contact_information) 
    VALUES 
    (?, ?, ?, ?);
    `;
    const { name, street_address, has_parking, contact_information } = req.body;
    try {
        const result = await mysqlPool.query(query, [name, street_address, has_parking, contact_information]);
        res.send(JSON.stringify(result[0]));
    } catch (e) {
        next(e);
    }
});

//CRUD for events table
app.get('/api/events', async (req, res, next) => {
    let whereClause = "WHERE 1=1 ";
    if (req.query.filterName) {
        whereClause += `AND events.name LIKE '%${req.query.filterName}%'`
    }
    if (req.query.filterStartsAfter) {
        whereClause += `AND events.starts_at > '${req.query.filterStartsAfter}'`
    }
    if (req.query.filterEndsBefore) {
        whereClause += `AND events.ends_at < '${req.query.filterEndsBefore}'`
    }

    const query = `
    SELECT
      events.event_id,
      events.name,
      events.starts_at,
      events.ends_at,
      locations.street_address
    FROM events
    LEFT JOIN locations
    ON events.location_id = locations.location_id
    ${whereClause}
    ORDER BY events.event_id ASC;
    `;
    try {
        const result = await mysqlPool.query(query);
        res.send(JSON.stringify(result[0]));
    } catch (e) {
        next(e);
    }
});

app.post('/api/events', async (req, res, next) => {
    const query = `
    INSERT INTO events (name, starts_at, ends_at, location_id) 
    VALUES
    (?, ?, ?, ?);
    `;
    const { name, starts_at, ends_at, location_id } = req.body;
    try {
        const result = await mysqlPool.query(query, [name, starts_at, ends_at, location_id]);
        res.send(JSON.stringify(result[0]));
    } catch (e) {
        next(e);
    }
});

//CRUD for vendors_at_events table
app.get('/api/vendors_at_events', async (req, res, next) => {
    const query = `
    SELECT
      vendors_at_events.vendor_at_event_id,
      vendors.business_name,
      events.name
    FROM vendors_at_events
    LEFT JOIN vendors
    ON vendors_at_events.vendor_id =  vendors.vendor_id
    LEFT JOIN events
    ON vendors_at_events.event_id = events.event_id
    GROUP BY vendors_at_events.vendor_at_event_id;
    `;
    try {
        const result = await mysqlPool.query(query);
        res.send(JSON.stringify(result[0]));
    } catch (e) {
        next(e);
    }
});

app.post('/api/vendors_at_events', async (req, res) => {
    const query = `
    INSERT INTO vendors_at_events (vendor_id, event_id) 
    VALUES
    (?, ?);
    `;
    const { vendor_id, event_id } = req.body;
    try {
        const result = await mysqlPool.query(query, [vendor_id, event_id]);
        res.send(JSON.stringify(result[0]));
    } catch (e) {
        next(e);
    }
});

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send(err.message)
});


// This route handler serves the react app for all paths that aren't API paths.
// This allows users to link to a specific page of the react app or reload
// their browser on a non-root page without seeing a 404 error.
// This route handler needs to be last.
app.get('(/*)?', async (req, res, next) => {
    res.sendFile(path.join(reactAppPath, 'index.html'));
});

app.listen(app_port, () => {
    console.log(`App listening on port ${app_port}`);
});