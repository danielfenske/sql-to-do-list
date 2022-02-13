const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

module.exports = router;

// --------------- FULL LIST GETTER ----------------------//
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
// --------------- END FULL LIST GETTER ------------------//



// ----------------- CATEGORY GETTERS --------------------//
router.get('/chores', (req, res) => {
    // define request for database
    let queryText = `SELECT * FROM "list" WHERE "category" = 'Chores' ORDER BY "id";`;

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

router.get('/exercise', (req, res) => {
    // define request for database
    let queryText = `SELECT * FROM "list" WHERE "category" = 'Exercise' ORDER BY "id";`;

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

router.get('/goals', (req, res) => {
    // define request for database
    let queryText = `SELECT * FROM "list" WHERE "category" = 'Goals' ORDER BY "id";`;

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

router.get('/grocery', (req, res) => {
    // define request for database
    let queryText = `SELECT * FROM "list" WHERE "category" = 'Grocery' ORDER BY "id";`;

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

router.get('/other', (req, res) => {
    // define request for database
    let queryText = `SELECT * FROM "list" WHERE "category" = 'Other' ORDER BY "id";`;

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
// ----------------- END CATEGORY GETTERS ------------------//



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


// --------------- COMPLETION STATUS PUTTER ----------------------//
router.put('/:id', (req, res) => {
    // define request values as variables
    let completionStatus = req.body.newCompletionStatus;
    let idToUpdate = req.params.id;

    console.log('/list PUTTER:', completionStatus, idToUpdate);
    // define request for database
    const query = `UPDATE "list"
    SET complete=$1 WHERE id=$2;`;

    const values = [completionStatus, idToUpdate];

    pool.query(query, values)
        .then((results) =>{
            res.sendStatus(200);
        })
        .catch((error) => {
            res.sendStatus(500);
        })
});
// --------------- END COMPLETION STATUS PUTTER ------------------//


// --------------- DELETE TASK ------------------//
router.delete('/:id', (req, res) => {
    // define variable for unique id click
    let idToUpdate = req.params.id;

    console.log('idToUpdate', idToUpdate);
    
    let queryText = 'DELETE FROM "list" WHERE "id" = $1;';

    pool.query(queryText, [idToUpdate])
        .then((result) => {
            console.log('Task deleted');
            
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('Error deleting task', queryText, error);
            
            res.sendStatus(500);
        })
})
// --------------- END DELETE TASK ----------------//