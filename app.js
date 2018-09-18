var express = require('express');
var app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/App/views');

var routes = require('./App/routes');
app.use('/', routes); 

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 400;
    next(err);
});

app.use(function(err, req, res, next) {
    res.send(err);
    next();
});

app.listen(8000, () => {
    console.log('Running at localhost:8000');
});