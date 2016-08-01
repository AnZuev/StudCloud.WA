'use strict';


let path = require('path');
global.appRoot = path.resolve(__dirname)+ '/';
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const koaJsonLogger = require('koa-json-logger');


const SSO = require('@anzuev/studcloud.sso');
const RDS = require("@anzuev/studcloud.rds");
const log = require(appRoot + '/libs/log');
const config = require(appRoot + '/config');


let app = Koa();

SSO.configure(config);
RDS.configure(config);

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

require("./routes")(app);

module.exports = app;
