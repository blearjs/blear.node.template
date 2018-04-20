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

describe('error', function () {

    it('error', function (done) {
        var app = express();

        app.set('views', path.join(__dirname, './'));
        app.set('view engine', 'html');
        app.engine('html', template.express());

        app.get('/1', function (req, res, next) {
            res.render('error.html', {
                a: 'AaA'
            });
        });

        plan
            .task(function (next) {
                request(app)
                    .get('/1')
                    .expect('content-type', /html/)
                    .expect(500)
                    .end(function (err, res) {
                        if (err) throw err;

                        expect(res.text).toMatch(/=============================/);
                        next();
                    });
            })
            .serial(done);
    });

});

