'use strict';
let log = require(appRoot + '/libs/log');


module.exports = function*(next){
	try {
		yield next;
		this.body = 'ok';
		// еще что-то делаем если надо
	}catch (e){
		let error = new ValidationError(500, "System error");
		log.error(error);
		throw error;
	}
};
