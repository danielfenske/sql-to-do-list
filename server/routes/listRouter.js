const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

module.exports = router;

// --------------- GETTER ----------------------//
router.get('/', (req, res) => {
    // define request from database
    let queryText = 'SELECT * FROM "list" ORDER BY "id";';

    pool.query(queryText)
        .then(result =>{
            // send back results in an object
            res.send(result.rows);
        })
        .catch(error => {
            console.log('error getting list', error);
            res.sendStatus(500);
        });
});
// --------------- END GETTER ------------------//
