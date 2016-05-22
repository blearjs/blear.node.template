'use strict';

var path = require('path');
var fs = require('fs');
var Template = require('blear.classes.template');
var object = require('blear.utils.object');

var tplCahe = {};
var fileCahe = {};
var reInlcude = /\{\{#\s*?include\s([^{}]*?)}}/g;

// Template.statement('include', function (vnode) {
//     var templateOptions = this[_templateOptions];
//     var expressData = this[_expressData];
//     var viewParent = path.dirname(this[_expressViewFile]);
//     var viewRoot = expressData.settings.views;
//     var includeName = vnode.value;
//     var includeFile = path.join(path.isAbsolute(includeName) ? viewRoot : viewParent, includeName);
//     var text = ExpressTemplate.express(templateOptions)(includeFile, expressData);
//
//     return this.outputName() + ' += ' + Template.textify(text) + ';';
// });


var complieInclude = function (template, file, expressData) {
    var root = expressData.settings.views;
    var parent = path.dirname(file);

    return template.replace(reInlcude, function (source, includeName) {
        var file = path.join(path.isAbsolute((includeName)) ? root : parent, includeName);
        var includeData = fileCahe[file] || fs.readFileSync(file, 'utf8');

        if (expressData.cache) {
            fileCahe[file] = includeData;
        }

        return includeData;
    });
};


var defaults = {
    /**
     * 是否压缩输出
     * @type Boolean
     */
    compress: true,

    /**
     * 是否为调试模式
     * @type Boolean
     */
    debug: false
};
var ExpressTemplate = Template.extend({
    className: 'ExpressTemplate',
    constructor: function (template, options, file, data) {
        template = complieInclude(template, file, data);
        ExpressTemplate.parent(this, template, options);
        this[_templateOptions] = options;
        this[_expressViewFile] = file;
        this[_expressData] = data;
    }
});
var _templateOptions = ExpressTemplate.sole();
var _expressViewFile = ExpressTemplate.sole();
var _expressData = ExpressTemplate.sole();

ExpressTemplate.express = function (options) {
    /**
     * template engine for express
     * @param file {String} 模板的绝对路径
     * @param data {Object} 模板的数据
     * @param data.cache=false {Boolean} 是否缓存模板
     * @param data._locals=null {Object} 动态助手
     * @param data.settings=nul {Object} app 配置
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

        var tpl = tplCahe[file];

        if (!tpl) {
            try {
                var template = fileCahe[file] || fs.readFileSync(file, 'utf8');
            }
            catch (err) {
                /* istanbul ignore next */
                var err2 = new Error('template read file:\n' + this.path + '\n' + err.message)

                /* istanbul ignore next */
                return callback(err2);
            }

            if (data.cache) {
                fileCahe[file] = template;
            }

            tpl = new ExpressTemplate(template, options, file, data);
        }

        if (data.cache) {
            tplCahe[file] = tpl;
        }

        callback(null, tpl.render(data));
    };
};
ExpressTemplate.defaults = defaults;


module.exports = ExpressTemplate;