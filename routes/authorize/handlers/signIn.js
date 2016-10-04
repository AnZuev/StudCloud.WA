'use strict';
const SSO = require('@anzuev/studcloud.sso');
const log = require(appRoot + '/libs/log');

const ValidationError = require("@anzuev/studcloud.errors").ValidationError;
const AuthError = require("@anzuev/studcloud.errors").AuthError;

function* preLogin(next){
	try{
		let mail = this.request.body.mail;
		let password = this.request.body.password;
		if(!mail || !password || mail == undefined){
			let error = new ValidationError(400, "Not enough data to process signIn");
			log.error(error);
			throw error;
		}

		this.authData = {
			mail: mail,
			password: password
		};
		yield next;
		log.trace(this.user);
		this.body = {
			id: this.user._id,
			name: this.user.pubInform.name,
			surname: this.user.pubInform.surname,
			mail: this.user.auth.mail
		};
	}catch(e){
		log.error(e);
		throw e;
	}
}
module.exports = preLogin;


