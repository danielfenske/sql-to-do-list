const pg = require('pg');

const config = {
    database: 'to-do-list',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
};

const pool = new pg.Pool(config);

pool.on('connect', () => {
    console.log('connected to postgreSQL');
});

pool.on('error', (err) => {
    console.log('error connecting to postgreSQL', err); 
});

module.exports = pool;