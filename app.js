'use strict';
// global.appRoot = __dirname + '/';
let path = require('path');
global.appRoot = path.resolve(__dirname)+ '/';
let koa = require('koa');
let app = koa();
let sso = require('@anzuev/studcloud.sso');
sso.init();
var router = require('koa-router')();
var log = require(appRoot + '/libs/log');

var bodyParser = require('koa-bodyparser');
app.use(bodyParser());

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);


router.get('/', function *(next) {
    this.status = 200;
    this.body = {"Welcome":"Hello"};
});


router.post('/test', function* (next){
    let f = require('./routes/authorize/test')(this);
    f.next();
    log.info(f);
    this.body = f;
});



router.get('/test', function*(next){this.body = "get test";});





// router.post('/test', function*(next){this.body = "post test";});
// router.post('/test', function* (){this.body = require('./routes/authorize/signUp');});
// log.info(appRoot);
// log.trace('trace');
// log.debug('debug');
// log.info('info');
// log.warn('warn');
// log.error('error');
// log.fatal('fatal');

module.exports = app;
