'use strict';
let log = require(appRoot + '/libs/log');
const UAMS = require('@anzuev/studcloud.uams');
const Notify = require('@anzuev/notify');
const mailBoxes = require(appRoot + '/config/mailBoxes');
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;


function* preSignUp(){
	try {
		let name = this.request.body.name;
		let surname = this.request.body.surname;
		let mail = this.request.body.mail;
		let password = this.request.body.password;

		if(name * surname * mail * password == 0){
			throw new ValidationError(400, "Not enough data to process");
		}

		let authData = {
			name: name.capitilizeFirstLetter(),
			surname: surname.capitilizeFirstLetter(),
			password: password,
			mail: mail
		};
		let user = yield UAMS.createUser(authData);
		this.body = {
			name: authData.name,
			mail: authData.mail,
			key: user.authActions.mailSubmit.key
		};

		Notify.setMailAccounts(mailBoxes);
		let not = new (Notify.getMailConfirmNotification())("http://istudentapp.ru/link/to/confirm");

		yield not.sendToOne(user.auth.mail);
	}catch(err){
		if(err instanceof ValidationError){
			log.error(err);

			throw new ValidationError(400, "Not enough data to process");
		}else{
			throw err;
		}
	}
}

String.prototype.capitilizeFirstLetter = function(){
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

module.exports = preSignUp;