'use strict';
// global.appRoot = __dirname + '/';
let path = require('path');
global.appRoot = path.resolve(__dirname)+ '/';
let koa = require('koa');
let app = koa();
let sso = require('@anzuev/studcloud.sso');
var router = require('koa-router')();
var log = require(appRoot + '/libs/log');
let config = require(appRoot + '/config');
var bodyParser = require('koa-bodyparser');
//const rds = require('@anzuev/studcloud.rds');
app.use(bodyParser());

sso.configure(config);
//rds.configure(config);


app
    .use(router.routes())
    .use(router.allowedMethods());


app.use(function *(next) {
    try {
        yield next;
    } catch (err) {
        this.status = err.status || 500;
        this.body = err.message;
        this.app.emit('error', err, this);
    }
});

app.use(function *(next) {
    //This will set status and message
    this.throw(this.err.message, 500);
});

router.get('/', function *(next) {
    this.status = 200;
    this.body = {"Welcome":"Hello"};
});

router.post('/test', function* (next){
    let f = require('./routes/authorize/test');
    let a = yield f;
    // let a = {
    //     1: this.request.body.mail,
    //     2: this.request.body.key};
    log.info(a);
    this.body = a;
});

router.post('/auth/signUp', function* (next) {
    let f = require('./routes/authorize/signUp');
    let a = yield f;
    // let a = {
    //     1: this.request.body.mail,
    //     2: this.request.body.key};
    log.info(a);
    this.body = a;
});

router.post('/auth/signIn', function* (next) {
    let f = require('./routes/authorize/signIn');
    let a = yield f;
    // let a = {
    //     1: this.request.body.mail,
    //     2: this.request.body.key};
    log.info(a);
    this.body = a;
});

router.post('/auth/signInCorrect', function*(next){
	// проверка что параметры переданы от юзера
	// ...

	/*
		Поместили данные в this.authData
	 */
	this.authData = {};
	this.authData.mail = this.request.body.mail;
	this.authData.password = this.request.body.password;

	try{
		yield next;
	}catch (err){
		//что-то пошло не так, обрабатываем ошибку
	}
}, sso.signIn);

router.post('/auth/logOut', function* (next){
    let f = require('./routes/authorize/logOut');
    let a = yield f;
    log.info(a);
    this.body = a;
});
router.post('/auth/confirmMail', function* (next){
    let f = require('./routes/authorize/confirmMail');
    let a = yield f;
    log.info(a);
    this.body = a;
});

router.post('/documents/addDocument', function* (next) {
    let f = require('./routes/documents/addDocument');
    let a = yield f;
    // let a = {
    //     1: this.request.body.mail,
    //     2: this.request.body.key};
    log.info(a);
    this.body = a;
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
app.listen(3000);
module.exports = app;