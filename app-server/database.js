// Use mysql2/promise so we can use async/await instead of callbacks.
var mysql = require('mysql2/promise');

function createMysqlPool(host, username, password, database) {
    return mysql.createPool({
        connectionLimit: 10,
        host: "classmysql.engr.oregonstate.edu",
        user: "cs340_kopkaewp",
        password: "3988",
        database: "cs340_kopkaewp"
    });
}

// Export it for use in our applicaton
module.exports.createMysqlPool = createMysqlPool;