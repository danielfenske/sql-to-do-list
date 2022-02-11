const express = require('express');
const bodyParser = require('body-parser');
const listRouter = require('./routes/listRouter.js');

const app = express();
app.use(bodyParser.urlencoded({encoded: true}));

// connect to router
app.use('/list', listRouter);

// serve static files in public directory
app.use(express.static('server/public'));
//< ------------------ SERVER SETUP -------------------->
 













//< ------------------ PORT LISTENER -------------------->
const port = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('listening on port', PORT);
    
})




















// start up server 
app.listen(port, function(){
    console.log('listening on port', port);
    
})