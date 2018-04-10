/**
 * 文件描述
 * @author ydr.me
 * @create 2018-02-07 10:42
 * @update 2018-02-07 10:42
 */


'use strict';

var handlebars = require('../src/index').handlebars;

handlebars.registerPartial('p1', '{{username}}');
handlebars.registerPartial('p2', '{{password}}');

console.log(
    handlebars.compile('{{>p1}} {{>p2}} {{button}}')({
        username: 'a',
        password: 'b',
        button: 'c'
    })
);
