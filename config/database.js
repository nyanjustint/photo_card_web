const mysql = require('mysql2');

const pool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"YES123456789@",
    database:"csc317db",
    connectionLimit:"50",
    waitForConnection: true,
    debug:false,

});

const promisePool = pool.promise();
module.exports = promisePool;