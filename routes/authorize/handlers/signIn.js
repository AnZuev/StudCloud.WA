'use strict';
let log = require(appRoot + '/libs/log');
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;

function* preLogin(next){
	// проверка что параметры переданы от юзера
	// ...

	try{
		let mail = this.request.body.mail;
		let password = this.request.body.password;
		if(!mail || !password){
			// что-то не передано
			// кидаем ошибку
			let error = new ValidationError(400, "Not enough data to proccess signIn");
			log.error(error);
			throw err;
		}

		this.authData = {
			mail: mail,
			password: password
		};
		//вызываем SSO.signIn
		yield next;

		this.body = this.session;
		// делаем еще что-то
	}catch(e){
		log.error(e);
		throw e;
	}
}
module.exports = preLogin;
