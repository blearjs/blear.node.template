'use strict';

var fs = require('fs');
var path = require('path');
var art = require('art-template');

console.log(
    art.compile('{{a}}')({
        a: 1
    })
);
