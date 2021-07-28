const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 3000
const app = express()
const morgan = require('morgan')
const path = require('path');
const connection = require('./database/connection');
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50 // limit each IP to 100 requests per windowMs
  });
  
  //  apply to all requests
app.use(limiter);
app.use(morgan('dev'))
app.use(cors()); // enable cors for all origins
app.use(bodyParser.urlencoded({ extended: true, limit: 100 }));
app.use(bodyParser.json({ limit: 100 }));
app.set('port', port);
app.use('/apidocs', express.static(path.join(__dirname, 'doc')))

require('./routes.js')(app);
global.app = app;
const http = require('http').Server(global.app);

http.listen(app.get('port'), () => {
    console.log(`Getir Service listening at http://localhost:${port}`, app.get('port'))
})
