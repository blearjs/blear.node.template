'use strict';

var fs = require('fs');
var path = require('path');
var template = require('../src/index');

console.log(
    template.compile('{{=@a}}{{=a}}')({
        a: '<b></b>'
    })
);

template.filter('b', function (origin, other) {
    return '==' + origin + other + '==';
});

console.log(
    template.compile('' +
        '{{raw}}{{!@a}}' +
        '{{!a}}{{/raw}}' +
        '{{@a | b "c"}}' +
        '{{each list as item, index}}{{index}}{{item}}{{/each}}' +
        '')({
        a: '<b></b>',
        list: ['a', 'bb']
    })
);
