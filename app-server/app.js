const express = require('express');
const env = require('env-var');
const cors = require('cors');

const { createMysqlPool } = require('./database');
const app = express();

app.use(cors());

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


// Shows all the tables in the DB.
// Not important for our API, but demonstrates that we can connect to and query
// a mysql db.
app.get('/', async (req, res) => {
    const result = await mysqlPool.query("show tables;");
    res.send(JSON.stringify(result[0]));
});

app.get('/api/products', async (req, res) => {
    const query = "select * from products;"
    const result = await mysqlPool.query(query);
    res.send(JSON.stringify(result[0]));
});

app.listen(app_port, () => {
    console.log(`App listening on port ${app_port}`);
});