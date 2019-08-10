var express = require('express');
var fs = require('fs');
var path = require('path');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));

// create a write Usersstream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

// setup the logger
app.use(logger('combined', { stream: accessLogStream }))

app.all('/*', function (req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key,Client-Key');
    if (req.method == 'OPTIONS') {
      res
        .status(200)
        .end();
    } else {
      next();
    }
  });

app.use('/', require('./src/routes'))

// Start the server
app.set('port', 3000);
app.listen(app.get('port'), function () {
  console.log("Application is running on 3000 port....");
});

