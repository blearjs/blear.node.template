/**
 * 测试 文件
 * @author ydr.me
 * @create 2016-05-17 12:13
 */


'use strict';

var template = require('../src/index');
var path = require('path');
var request = require('supertest');
var expect = require('chai-jasmine').expect;
var express = require('express');
var plan = require('blear.utils.plan');
var fs = require('fs');

describe('cache', function () {

    it('cache = true', function (done) {
        var app = express();
        var name = 'cache-true.html';
        var file = path.join(__dirname, name);
        var original = fs.readFileSync(file, 'utf8');
        var append = Date.now() + '';

        app.set('views', path.join(__dirname, './'));
        app.set('view engine', 'html');
        app.engine('html', template.express({
            cache: true
        }));

        app.get('/1', function (req, res, next) {
            res.render(name, {
                a: 'AaA'
            });
        });

        app.get('/2', function (req, res, next) {
            res.render(name, {
                a: 'AaA'
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

                        expect(res.text).toEqual('AaA');
                        next();
                    });
            })
            .taskSync(function () {
                fs.appendFileSync(file, append, 'utf8');
            })
            .task(function (next) {
                request(app)
                    .get('/2')
                    .expect('content-type', /html/)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) throw err;

                        expect(res.text).toEqual('AaA');
                        next();
                    });
            })
            .taskSync(function () {
                fs.writeFileSync(file, original, 'utf8');
            })
            .serial(done);
    });

    it('cache = false', function (done) {
        var app = express();
        var name = 'cache-false.html';
        var file = path.join(__dirname, name);
        var original = fs.readFileSync(file, 'utf8');
        var append = Date.now() + '';

        app.set('views', path.join(__dirname, './'));
        app.set('view engine', 'html');
        app.engine('html', template.express({
            cache: false
        }));

        app.get('/1', function (req, res, next) {
            res.render(name, {
                a: 'AaA'
            });
        });

        app.get('/2', function (req, res, next) {
            res.render(name, {
                a: 'AaA'
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

                        expect(res.text).toEqual('AaA');
                        next();
                    });
            })
            .taskSync(function () {
                fs.appendFileSync(file, append, 'utf8');
            })
            .task(function (next) {
                request(app)
                    .get('/2')
                    .expect('content-type', /html/)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) throw err;

                        expect(res.text).toEqual('AaA' + append);
                        next();
                    });
            })
            .taskSync(function () {
                fs.writeFileSync(file, original, 'utf8');
            })
            .serial(done);
    });

});

