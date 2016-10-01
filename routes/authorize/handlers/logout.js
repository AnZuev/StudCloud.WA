'use strict';
let log = require(appRoot + '/libs/log');
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;

module.exports = function*(next){
	try {
		yield next;
		this.status = 200;
	}catch (e){
		log.error(e);
		throw e;
	}
};
