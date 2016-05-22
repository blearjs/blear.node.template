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
app.engine('html', template.express({
    compress: true,
    debug: false
}));
app.set('view engine', 'html');
```



## 文本声明

### 变量定义、赋值
```
{{#set abc = 123}}
{{#set abc = 456}}
```

### 忽略编译
```
{{#ignore}}
.....
{{/ignore}}
```

### 判断
```
{{#if exp}}
{{#else if exp}}
{{#else}}
{{/if}}
```

## 循环
```
{{#for index, item in list}}
{{/for}}
```

### 取消编译
```
\\{{exp}} => {{exp}}
```

## 属性指令
属性里的表达式不会进行 escape

### 循环
```
<li @for="key, val in item"></li>
```

### 判断
```
<li @if="exp"></li>
```

### 属性
````
@style="font-size: fontSize + 'px'; width: width + 'px'"
@class="class-a: classA, class-b: classB"
```

## 输出
```
转义输出 {{exp}}
原样输出 {{=exp}}
```


## 引用
不支持递归引用。
```
相对于当前文件
{{#include ./path/to/component.html}}

相对于根目录
{{#include /path/to/component.html}}
```
