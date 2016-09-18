'use strict';
let log = require(appRoot + '/libs/log');
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;

module.exports = function*(next){
	try {
		yield next;
		this.status = 200;
	}catch (e){
		//TODO: почему опять ValidationError?
		// TODO: есть предположение, что отсутствует require ошибки. Может упасть
		let error = new ValidationError(500, "System error");
		log.error(error);
		throw error;
	}
};
