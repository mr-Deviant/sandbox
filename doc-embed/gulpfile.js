'use strict';

var gulp = require('gulp');

// Start server
gulp.task('server', function () {
    var express = require('express'),
        open = require('open'),
        path = require('path'),
        app = express();

    // Set focs folder
    app.use(express.static(path.normalize(__dirname + '/.')));

    // Set port
    app.listen(process.env.PORT || 9000);

    // Open url in browser
    open('http://localhost:9000');
});

