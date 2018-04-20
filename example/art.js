'use strict';

var template = require('../art/index');
var fs = require('fs');

console.log(
    template.compile(fs.readFileSync('./art.html', 'utf8'))({
        a: 1,
        b: 2
    })
);

// var artRule = require('../art/lib/compile/adapter/rule.art');
// var tplTokenizer = require('../art/lib/compile/tpl-tokenizer');
//
// console.log(tplTokenizer('a', [artRule]));
