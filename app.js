'use strict';

let path = require('path');
global.appRoot = path.resolve(__dirname)+ '/';
const Koa = require('koa');
let app = Koa();
let SSO = require('@anzuev/studcloud.sso');
let log = require(appRoot + '/libs/log');
let config = require(appRoot + '/config');
let bodyParser = require('koa-bodyparser');
let koaJsonLogger = require('koa-json-logger');

SSO.configure(config);

if(process.env.NODE_ENV == "production"){
	app.use(koaJsonLogger({
		name: 'Studcloud.WA',
		path: '/Users/anton/GitHub/StudCloud.WA/libs/logs',
		jsonapi: true
	}));
	app.use(koaJsonLogger())
}else{
	app.use(function*(next){
		try{
			yield next;
			console.log("%s %s - %s", this.method, this.url, this.status);
		}catch(err){
			this.body = err.get();
			throw err;
		}
	});
}


app.use(bodyParser());
app.keys = config.get('sso:keys');
app.use(SSO.getSessionsMiddleware());
app.use(SSO.getContextMiddleware());

// configure routes
require("./routes")(app);

module.exports = app;
