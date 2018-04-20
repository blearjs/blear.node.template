'use strict';


var express = require('express');
var path = require('path');
var template = require('../src/index');

var app = express();

app.set('views', path.join(__dirname, './'));
app.set('view engine', 'html');
app.engine('html', template.express({
    cache: false
}));

app.get('/', function(req, res) {
    res.render('base.html', {
        a: 'AAAAAAAA'
    });
});

app.use(function (err, req, res, next) {
    res.send(
        '<doctype html>' +
        '<pre>' +
        err.message +
        '</pre>'
    );
});

app.listen(2018);
