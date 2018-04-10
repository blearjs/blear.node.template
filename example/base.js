'use strict';


var express = require('express');
var path = require('path');
var template = require('../src/index');

var app = express();

app.set('views', path.join(__dirname, './'));
app.set('view engine', 'html');
app.engine('html', template.express());

app.get('/', function(req, res) {
    res.render('index.html', {
        a: 'AAAAAAAA'
    });
});

app.listen(2018);
