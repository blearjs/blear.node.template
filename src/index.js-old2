/**
 * node 模板引擎
 * @author ydr.me
 * @create 2018-02-07 10:43
 * @update 2018-02-07 10:43
 */


'use strict';

var art = require('art-template');
var object = require('blear.utils.object');
var path = require('blear.node.path');

var defaults = {
    // 控制输出是否被转义
    escape: true,
    // 是否调试模式
    debug: true
};
var artDefaults = art.defaults;
var absolutedRE = /^\//;

artDefaults.rules.unshift({
    test: /{{=\s*?([\s\S]*?)\s*?}}/,
    use: function (match, code) {
        return {
            output: 'raw',
            code: JSON.stringify('{{' + code + '}}')
        }
    }
});

artDefaults.rules.unshift({
    test: /{{\s*?raw\s*?}}([\s\S]*?){{\s*?\/raw\s*?}}/,
    use: function (match, code) {
        return {
            output: 'raw',
            code: JSON.stringify(code)
        }
    }
});

artDefaults.resolveFilename = function (filename, options) {
    var from = options.filename;

    if (filename === from) {
        return from;
    }

    var base = absolutedRE.test(filename) ? options.root : path.dirname(from);
    var file = path.join(base, filename);

    if (path.extname(file) !== options.extname) {
        file += options.extname;
    }

    return file;
};

module.exports = art;

module.exports.defaults = defaults;

/**
 * 添加过滤器
 * @param name
 * @param filter
 */
module.exports.filter = function (name, filter) {
    artDefaults.imports[name] = filter;
};

/**
 * 适配 express
 * @param [options]
 * @returns {Function}
 */
module.exports.express = function (options) {
    options = object.assign({}, defaults, options);
    /**
     * template engine for express
     * @param file {String} 模板的绝对路径
     * @param data {Object} 模板的数据
     * @param data.cache=false {Boolean} 是否缓存模板
     * @param data._locals={} {Object} 动态助手
     * @param data.settings {Object} app 配置
     * @param [data.settings.x-powered-by] {Boolean} x-powered-by
     * @param [data.settings.etag='weak'] {String} etag 模式
     * @param [data.settings.env='local'] {String} 环境
     * @param [data.settings.query parser] {String}
     * @param [data.settings.subdomain offset] {String}
     * @param [data.settings.trust proxy] {boolean}
     * @param [data.settings.view] {Function}
     * @param [data.settings.views] {string}
     * @param [data.settings.jsonp callback name] {string}
     * @param [data.settings.view engine] {string}
     * @param callback {Function} 回调
     */
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

        try {
            // https://aui.github.io/art-template/zh-cn/docs/options.html
            var render = art.compile({
                // 模板名
                filename: file,

                // 是否开启对模板输出语句自动编码功能。为 false 则关闭编码输出功能
                // escape 可以防范 XSS 攻击
                escape: options.escape,

                // 启动模板引擎调试模式。如果为 true: {cache:false, minimize:false, compileDebug:true}
                debug: options.debug,

                // bail 如果为 true，编译错误与运行时错误都会抛出异常
                bail: true,

                // 是否开启缓存
                cache: data.cache,

                // 是否开启压缩。它会运行 htmlMinifier，将页面 HTML、CSS、CSS 进行压缩输出
                // 如果模板包含没有闭合的 HTML 标签，请不要打开 minimize，否则可能被 htmlMinifier 修复或过滤
                minimize: !options.debug,

                // 是否编译调试版
                compileDebug: options.debug,

                // 模板根目录。如果 filename 字段不是本地路径，则在 root 查找模板
                root: this.root,

                // 默认后缀名。如果没有后缀名，则会自动添加 extname
                extname: this.ext
            });
            callback(null, render(data));
        } catch (err) {
            callback(err);
        }
    };
};

