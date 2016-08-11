'use strict';


let path = require('path');
global.appRoot = path.resolve(__dirname)+ '/';
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const koaJsonLogger = require('koa-json-logger');

const Notify = require('@anzuev/notify');
const SSO = require('@anzuev/studcloud.sso');
const RDS = require("@anzuev/studcloud.rds");
const log = require(appRoot + '/libs/log');
const config = require(appRoot + '/config');


let app = Koa();

Notify.configure(config);
SSO.configure(config);
RDS.configure(config);

if(process.env.NODE_ENV == "production"){
	app.use(koaJsonLogger({
		name: 'Studcloud.WA',
		path: '/git/StudCloud.WA/libs/logs',
		jsonapi: true
	}));
	app.use(koaJsonLogger())
}else{
	app.use(function*(next){
		try{
			this.set("Access-Control-Allow-Origin", '*');
			yield next;
			console.log("%s %s - %s", this.method, this.url, this.status);
		}catch(err){
			log.error(err.code);
			this.response.status = err.code;
			this.body = err.get();
		}
	});
}


app.use(bodyParser());
app.keys = config.get('sso:keys');
app.use(SSO.getSessionsMiddleware());
app.use(SSO.getContextMiddleware());

require("./routes")(app);

module.exports = app;
