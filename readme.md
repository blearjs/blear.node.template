# blear.node.template

[![npm module][npm-img]][npm-url]
[![build status][travis-img]][travis-url]
[![coverage][coveralls-img]][coveralls-url]

[travis-img]: https://img.shields.io/travis/blearjs/blear.node.template/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/blearjs/blear.node.template

[npm-img]: https://img.shields.io/npm/v/blear.node.template.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/blear.node.template

[coveralls-img]: https://img.shields.io/coveralls/blearjs/blear.node.template/master.svg?style=flat-square
[coveralls-url]: https://coveralls.io/github/blearjs/blear.node.template?branch=master


## 使用
```
app.engine('html', template({
    compress: true,
    debug: false
}));
app.set('view engine', 'html');
```
