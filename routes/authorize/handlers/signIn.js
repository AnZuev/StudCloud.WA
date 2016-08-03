'use strict';
let log = require(appRoot + '/libs/log');
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;

function* preLogin(next){
	try{
		let mail = this.request.body.mail;
		let password = this.request.body.password;
		if(!mail || !password){
			// что-то не передано
			// кидаем ошибку
			let error = new ValidationError(400, "Not enough data to proccess signIn");
			log.error(error);
			throw error;
		}

		this.authData = {
			mail: mail,
			password: password
		};
		yield next;
		this.body = this.session;
	}catch(e){
		log.error(e);
		throw e;
	}
}
module.exports = preLogin;
