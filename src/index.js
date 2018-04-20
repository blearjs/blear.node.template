/**
 * 模板引擎
 * @author ydr.me
 * @create 2018-04-20 10:32
 * @update 2018-04-20 10:32
 */


'use strict';

var Template = require('/Users/cloudcome/development/github-blearjs/blear.classes.template/src/index');
var object = require('blear.utils.object');
var fs = require('fs');

var defaults = {
    cache: true
};

Template.loader = loader;

exports.Template = Template;

/**
 * 模板引擎适配 express
 * @param [options]
 * @param options.cache
 * @returns {Function}
 */
exports.express = function (options) {
    options = object.assign({}, defaults, options);
    var caches = options.cache ? Object.create(null) : null;

    return function (file, data, callback) {
        // this:
        //{
        //    defaultEngine: 'html',
        //    ext: '.html',
        //    name: 'front/index.html',
        //    root: '~/.views/',
        //    engine: [Function],
        //    path: '~/.views/front/index.html'
        //}
        var tpl = caches && caches[file];

        if (tpl) {
            return exec(tpl, data, callback);
        }

        var template = loader(file);
        tpl = new Template(template, {
            cache: options.cache,
            file: file,
            dirname: this.root,
            error: true
        });

        if (caches) {
            caches[file] = tpl;
        }

        exec(tpl, data, callback);
    };
};
exports.defaults = defaults;


// ===============================
/**
 * 执行模板引擎渲染
 * @param tpl
 * @param data
 * @param callback
 */
function exec(tpl, data, callback) {
    try {
        callback(null, tpl.render(data));
    } catch (err) {
        err.message = [
            '',
            '==================================================',
            err.message,
            '==================================================',
            ''
        ].join('\n');
        callback(err);
    }
}

/**
 * 文件加载器
 * @param file
 */
function loader(file) {
    return fs.readFileSync(file, 'utf8');
}
