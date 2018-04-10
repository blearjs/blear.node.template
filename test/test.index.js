/**
 * 测试 文件
 * @author ydr.me
 * @create 2016-05-17 12:13
 */


'use strict';

var Template = require('../src/index.js');
var path = require('path');
var request = require('supertest');
var expect = require('chai').expect;
var express = require('express');

describe('测试文件', function () {
    it('base', function (done) {
        var app = express();
    
        app.set('views', path.join(__dirname, './base/'));
        app.set('view engine', 'html');
        Template.express(app);

        app.get('/', function (req, res, next) {
            res.render('index.html', {
                a: 'AaA'
            });
        });
    
        request(app)
            .get('/')
            .expect('content-type', /html/)
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
    
                expect(res.text).to.equal('AaA');
                done();
            });
    });


    // it('cache', function (done) {
    //     var app = express();
    //
    //     app.engine('html', Template.express());
    //     app.set('views', path.join(__dirname, './base/'));
    //     app.set('view engine', 'html');
    //     app.set('view cache', true);
    //
    //     app.get('/', function (req, res, next) {
    //         res.render('index.html', {
    //             base: true
    //         });
    //     });
    //
    //     app.get('/2', function (req, res, next) {
    //         res.render('index.html', {
    //             base: true
    //         });
    //     });
    //
    //     howdo
    //         .task(function (next) {
    //             request(app)
    //                 .get('/')
    //                 .expect('content-type', /html/)
    //                 .expect(200)
    //                 .end(function (err, res) {
    //                     if (err) throw err;
    //
    //                     expect(res.text).to.equal('true');
    //                     next();
    //                 });
    //         })
    //         .task(function (next) {
    //             request(app)
    //                 .get('/2')
    //                 .expect('content-type', /html/)
    //                 .expect(200)
    //                 .end(function (err, res) {
    //                     if (err) throw err;
    //
    //                     expect(res.text).to.equal('true');
    //                     next();
    //                 });
    //         })
    //         .follow(done);
    //
    //
    // });
    //
    //
    // it('include simple', function (done) {
    //     var app = express();
    //
    //     app.engine('html', Template.express());
    //     app.set('views', path.join(__dirname, './include/'));
    //     app.set('view engine', 'html');
    //     app.set('view cache', true);
    //
    //     app.get('/', function (req, res, next) {
    //         res.render('index.html', {
    //             base: true
    //         });
    //     });
    //
    //     request(app)
    //         .get('/')
    //         .expect('content-type', /html/)
    //         .expect(200)
    //         .end(function (err, res) {
    //             if (err) throw err;
    //
    //             expect(res.text).to.equal('1componenttrue2componenttrue3');
    //             done();
    //         });
    // });
    //
    //
    // it('include complex', function (done) {
    //     var app = express();
    //
    //     app.engine('html', Template.express());
    //     app.set('views', path.join(__dirname, './include/'));
    //     app.set('view engine', 'html');
    //
    //     app.get('/list', function (req, res, next) {
    //         res.render('list.html', {
    //             list: ['a', 'b']
    //         });
    //     });
    //
    //     request(app)
    //         .get('/list')
    //         .expect('content-type', /html/)
    //         .expect(200)
    //         .end(function (err, res) {
    //             if (err) throw err;
    //
    //             expect(res.text).to.equal('<li>20a</li><li>21b</li>');
    //             done();
    //         });
    // });
    //
    // it('.locals', function (done) {
    //     var app = express();
    //
    //     app.engine('html', Template.express());
    //     app.set('views', path.join(__dirname, './locals/'));
    //     app.set('view engine', 'html');
    //
    //     app.get('/', function (req, res, next) {
    //         res.locals.$a = '1';
    //         res.render('index.html');
    //     });
    //
    //     request(app)
    //         .get('/')
    //         .expect('content-type', /html/)
    //         .expect(200)
    //         .end(function (err, res) {
    //             if (err) throw err;
    //
    //             expect(res.text).to.equal('1');
    //             done();
    //         });
    // });
});

