const mysql = require('mysql2')
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '31102002',
    database: 'planetaverde',
})

module.exports=pool.promise()