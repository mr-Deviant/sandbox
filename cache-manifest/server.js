'use strict';

var express = require('express'),
    path = require('path'),
    app = express();

// Set focs folder
app.use(express.static(path.normalize(__dirname + '/app')));

// Set porta
app.listen(process.env.PORT || 3000);

// Open url in browser
console.log('Server is running on http://localhost:3000');
