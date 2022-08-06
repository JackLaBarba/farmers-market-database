// Use mysql2/promise so we can use async/await instead of callbacks.
var mysql = require('mysql2/promise');

function createMysqlPool(host, username, password, database) {
    return mysql.createPool({
        connectionLimit: 10,
        host: host,
        user: username,
        password: password,
        database: database
    });
}

// Export it for use in our application
module.exports.createMysqlPool = createMysqlPool;