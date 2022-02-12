const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

module.exports = router;

// --------------- GETTER ----------------------//
router.get('/', (req, res) => {
    // define request for database
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


// --------------- POSTER ----------------------//
router.post('/', (req, res) => {
    // define request for database
    let queryText = 
    `INSERT INTO "list" ("complete", "task", "category")
    VALUES ($1, $2, $3);`;

    const values = [req.body.complete, req.body.task, req.body.category];

    pool.query(queryText, values)
        .then(result =>{
            res.sendStatus(201);
        })
        .catch(error => {
            console.log('Error adding new list item', error);
            res.sendStatus(500);
        });
});


// --------------- END POSTER ------------------//
