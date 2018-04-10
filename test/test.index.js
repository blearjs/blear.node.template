/**
 * 测试 文件
 * @author ydr.me
 * @create 2016-05-17 12:13
 */


'use strict';

var template = require('../src/index.js');
var path = require('path');
var request = require('supertest');
var expect = require('chai-jasmine').expect;
var express = require('express');
var plan = require('blear.utils.plan');

describe('测试文件', function () {
    it('base', function (done) {
        var app = express();

        app.set('views', path.join(__dirname, './'));
        app.set('view engine', 'html');
        app.engine('html', template.express());

        app.get('/', function (req, res, next) {
            res.render('base.html', {
                a: 'AaA'
            });
        });

        request(app)
            .get('/')
            .expect('content-type', /html/)
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;

                expect(res.text).to.equal('AaA');
                done();
            });
    });

    it('cache', function (done) {
        var app = express();

        app.engine('html', template.express());
        app.set('views', path.join(__dirname, './'));
        app.set('view engine', 'html');
        app.set('view cache', true);

        app.get('/1', function (req, res, next) {
            res.render('cache.html', {
                cache: true
            });
        });

        app.get('/2', function (req, res, next) {
            res.render('cache.html', {
                cache: true
            });
        });

        plan
            .task(function (next) {
                request(app)
                    .get('/1')
                    .expect('content-type', /html/)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) throw err;

                        expect(res.text).to.equal('true');
                        next();
                    });
            })
            .task(function (next) {
                request(app)
                    .get('/2')
                    .expect('content-type', /html/)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) throw err;

                        expect(res.text).to.equal('true');
                        next();
                    });
            })
            .serial(done);
    });

    it('include', function (done) {
        var app = express();

        app.engine('html', template.express());
        app.set('views', path.join(__dirname, './'));
        app.set('view engine', 'html');
        app.set('view cache', true);

        app.get('/', function (req, res, next) {
            res.render('include.html', {
                include: true
            });
        });

        request(app)
            .get('/')
            .expect('content-type', /html/)
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;

                expect(res.text).to.equal('1');
                done();
            });
    });

    it('.locals', function (done) {
        var app = express();

        app.engine('html', template.express());
        app.set('views', path.join(__dirname, './'));
        app.set('view engine', 'html');
        app.locals.$a = 'a';

        app.get('/', function (req, res, next) {
            res.locals.$b = 'b';
            res.render('locals.html');
        });

        request(app)
            .get('/')
            .expect('content-type', /html/)
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;

                expect(res.text).to.equal('ab');
                done();
            });
    });

    it('raw', function (done) {
        var app = express();

        app.engine('html', template.express());
        app.set('views', path.join(__dirname, './'));
        app.set('view engine', 'html');

        app.get('/', function (req, res, next) {
            res.render('raw.html', {
                raw: '123'
            });
        });

        request(app)
            .get('/')
            .expect('content-type', /html/)
            .expect(200)
            .end(function (err, res) {
                expect(res.text).equal('{{raw}}{{abc}}');
                done();
            });
    });

    it('each', function (done) {
        var app = express();

        app.engine('html', template.express());
        app.set('views', path.join(__dirname, './'));
        app.set('view engine', 'html');

        app.get('/', function (req, res, next) {
            res.render('each.html', {
                list: ['a', 'bb']
            });
        });

        request(app)
            .get('/')
            .expect('content-type', /html/)
            .expect(200)
            .end(function (err, res) {
                expect(res.text).equal('0a1bb');
                done();
            });
    });

    it('filter', function (done) {
        var app = express();

        app.engine('html', template.express());
        app.set('views', path.join(__dirname, './'));
        app.set('view engine', 'html');

        template.filter('b', function (code) {
            return 'b' + code + 'b';
        });

        template.filter('c', function (code, other1, other2) {
            return 'c' + other1 + code + other2 + 'c';
        });

        app.get('/', function (req, res, next) {
            res.render('filter.html', {
                a: 'a'
            });
        });

        request(app)
            .get('/')
            .expect('content-type', /html/)
            .expect(200)
            .end(function (err, res) {
                expect(res.text).equal('cd dbab123c');
                done();
            });
    });

    it('error', function (done) {
        var app = express();

        app.engine('html', template.express());
        app.set('views', path.join(__dirname, './'));
        app.set('view engine', 'html');

        app.get('/', function (req, res, next) {
            res.render('error.html');
        });

        request(app)
            .get('/')
            .expect('content-type', /html/)
            .expect(500)
            .end(function (err, res) {
                expect(res.text).match(/&gt;&gt; 4/);
                done();
            });
    });
});

