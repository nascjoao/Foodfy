const { Pool } = require('pg')

module.exports = new Pool({
    user: 'YourUserHere',
    password: 'YourPasswordHere',
    host: 'localhost',
    port: 5432,
    database: 'foodfy'
})