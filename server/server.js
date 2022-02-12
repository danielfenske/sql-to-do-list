const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve static files in public directory
app.use(express.static('server/public'));

// connect to router
const listRouter = require('./routes/listRouter.js');
app.use('/list', listRouter);
//< ------------------ SERVER SETUP -------------------->
 













//< ------------------ PORT LISTENER -------------------->
const PORT = 5000;
app.listen(PORT, () => {
    console.log('listening on port', PORT);
    
});