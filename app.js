'use strict';
global.appRoot = __dirname + '/';
// var path = require('path');
// global.appRoot = path.resolve(__dirname);


var app = require('koa')();
let sso = require('@anzuev/studcloud.sso');
sso.init();
var router = require('koa-router')();
var log = require(appRoot + '/libs/log');


log.trace('trace');
log.debug('debug');
log.info('info');
log.warn('warn');
log.error('error');
log.fatal('fatal');

router.post('/test', function*(next){this.body = "post test";});
router.get('/test', function*(next){this.body = "get test";});

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);

module.exports = app;
