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

describe('base', function () {

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

                expect(res.text).toEqual('AaA');
                done();
            });
    });

});

